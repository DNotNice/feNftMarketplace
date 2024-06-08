import { Label } from "@radix-ui/react-label";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import { TrashIcon } from "@heroicons/react/16/solid";
import { toast, Toaster } from 'react-hot-toast';
import { ChangeEvent, FormEvent, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import axios from 'axios';

export const SellPage = () => {
  const backendURL = import.meta.env.VITE_BACKEND_URL;
  const [images, setImages] = useState<File[]>([]);
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [price, setPrice] = useState<number>(0);
  const [uploadingButton, setUploadingButton] = useState<boolean>(false);
  const [selectImage, setSelectImage] = useState<boolean>(false);
  const { publicKey, signMessage } = useWallet();
  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      //@ts-ignore
      setImages((prevImages) => [...prevImages, ...Array.from(event?.target.files)]);
    }
  };

  const handleImageDelete = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handlePriceInput = (e: ChangeEvent<HTMLInputElement>) => {
    const newPrice = e.target.value;
    if (/[^0-9.]/.test(newPrice) || (newPrice.split('.').length - 1 > 1)) {
      toast.error("Price should be numeric values only", { duration: 3000 });
      return;
    }
    setPrice(Number(newPrice));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!title || price === 0) {
      toast.error("Please fill in all required fields.", { duration: 1000 });
      return;
    }

    if (images.length === 0) {
      toast.error("Please add in some images.", { duration: 1000 });
      return;
    }

    setSelectImage(true);
    setUploadingButton(true);

    const signatureReceived = await signMessageFunction();

    if (signatureReceived) {
      toast.success("Signature received, uploading images" ,{duration:1000});
      const response  = await uploadtoS3();
      console.log(response);
    } else {
      toast.error("Wallet not connected or message not signed.", { duration: 1000 });
    }
    setSelectImage(false);
    setUploadingButton(false);
    location.reload();
  };


  const generatePreSignedUrl = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Authorization token is missing");
      }
      const response = await axios.get(`${backendURL}v1/sell/preSignedUrl`, {
        headers: {
          "Authorization": token
        }
      });
      return response.data;
    } catch (error) {
      console.error("Error generating pre-signed URL:", error);
      throw error;
    }
  };

  const uploadtoS3  = async () => {
    const allUrls = [];
  
    for (const image of images) {
      try {
        const response = await generatePreSignedUrl();
        const preSignedURL = response.preSignedUrl;
        const fields = response.fields;
        const formData = new FormData();

        formData.append("bucket", fields["bucket"]);
        formData.append("X-Amz-Algorithm", fields["X-Amz-Algorithm"]);
        formData.append("X-Amz-Credential", fields["X-Amz-Credential"]);
        formData.append("X-Amz-Date", fields["X-Amz-Date"]);
        formData.append("key", fields["key"]);
        formData.append("Policy", fields["Policy"]);
        formData.append("X-Amz-Signature", fields["X-Amz-Signature"]);
        formData.append("file", image);
        
  
        await axios.post(preSignedURL, formData);
  
        allUrls.push(fields["key"]);
      } catch (error) {
        console.error("Error uploading to S3:", error);
        toast.error("Error uploading image to S3", { duration: 3000 });
        return; 
      }
    }
  
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Authorization token is missing");
      }
      console.log("about to update DB")
      const UpdateDB = await axios.post(`${backendURL}v1/sell/onURLrecieved`, {
        allUrls,
        title,
        description,
        price
      }, {
        headers: {
          "Authorization": token
        }
      });
  
      if (UpdateDB) {
        toast.success("Your files are uploaded", { duration: 1000 });
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error updating database:", error);
      toast.error("Error updating database", { duration: 3000 });
      return false;
    }
  };
  
  const signMessageFunction = async (): Promise<boolean> => {
    if (!publicKey)  return false;
    const message = new TextEncoder().encode("Sign into MarketSpace");

    try {
      const signature = await signMessage?.(message);
      if (!signature) return false;
      

      const response = await axios.post(`${backendURL}signin`, {
        signature ,
        publicKey: publicKey.toString()
      });

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        return true;
      } else return false;
      
    } catch (error) {
      console.error("Error during signing or backend call:", error);
      return false;
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto p-4 md:p-8">
      <Toaster />
      <Card className="flex flex-col">
        <CardHeader>
          <CardTitle>Image Upload</CardTitle>
          <CardDescription>Upload your images and they will be displayed in a grid.</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((src, index) => (
            <div key={index} className="relative group overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800 cursor-pointer h-48">
              <img
                src={URL.createObjectURL(src)}
                alt="Uploaded Image"
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <TrashIcon className="w-6 h-6 text-white" onClick={() => handleImageDelete(index)} />
              </div>
            </div>
          ))}
        </CardContent>
        <CardFooter className="mt-auto">
          <Button disabled={selectImage}>
            <label htmlFor="imageUpload" className="cursor-pointer">
              Upload Images
            </label>
          </Button>
          <input
            id="imageUpload"
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleImageUpload}
          />
        </CardFooter>
      </Card>

      <Card className="flex flex-col">
        <CardHeader>
          <CardTitle>Asset</CardTitle>
          <CardDescription>Fill out the details for your Asset.</CardDescription>
        </CardHeader>

        <CardContent className="grid gap-4">
          <div className="space-y-1">
            <Label htmlFor="title">Title *</Label>
            <Input required onChange={(e) => { setTitle(e.target.value) }} id="title" placeholder="Enter product title" />
          </div>

          <div className="space-y-1">
            <Label htmlFor="description">Description</Label>
            <Textarea onChange={(e) => { setDescription(e.target.value) }} id="description" placeholder="Enter product description" />
          </div>  

          <div className="space-y-1">
            <Label htmlFor="price">Price *</Label>
            <div className="flex items-center space-x-2">
              <Input required onChange={handlePriceInput} id="price" placeholder="0.1" className="w-25" />
              <span>Sol</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="mt-auto">
          <div className="flex justify-end space-x-2">
            <Button disabled={uploadingButton} onClick={handleSubmit}>Publish</Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );

};

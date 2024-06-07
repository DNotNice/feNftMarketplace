import { Label } from "@radix-ui/react-label"
import { Button } from "./ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Textarea } from "./ui/textarea"
import { Input } from "./ui/input"
import { TrashIcon } from "@heroicons/react/16/solid"
import { toast, Toaster } from 'react-hot-toast';
import { ChangeEvent, FormEvent, useState } from "react"
import { useWallet } from "@solana/wallet-adapter-react"
import axios from 'axios';
export const SellPage = ()=>{
    const backendURL = import.meta.env.VITE_BACKEND_URL;
    const [images, setImages] = useState<string[]>([]);
    const [title , setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [price , setPrice] = useState<number>(0);
    const [uploadingButton , setUploadingButton] = useState<boolean>(false);
    const [selectImage , setSelectImage]  = useState<boolean>(false);
    const [allowdSignature , setAllowedSignature]  = useState<boolean>(false);
    const { publicKey , signMessage} = useWallet();


    const handleImageUpload = (e : ChangeEvent<HTMLInputElement>) => {
        if(e.target.files){
      const files    = Array.from(e.target.files);
      const newImages = files.map((file) => URL.createObjectURL(file));
      setImages((prevImages) => [...prevImages, ...newImages]);
    }};
   
    const handleImageDelete = (index : number) => {
      setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    };

    const handlePriceInput = (e: ChangeEvent<HTMLInputElement>) => {
      const newPrice = e.target.value ;
      if (/[^0-9.]/.test(newPrice) || (newPrice.split('.').length - 1 > 1)) {
        toast.error("Price should be numeric values only", { duration: 3000 });
        return;
      }
      setPrice(Number(newPrice));
    };
    
    const handleSubmit = async(e: FormEvent) => {
      e.preventDefault();
    
       if (!title  || !price) {
        toast.error("Please fill in all required fields.", { duration: 1000 });
        return;
      }
      if(images.length == 0 ) {
        toast.error("Please add in some images.", { duration: 1000 });
        return;
      }
     
       setSelectImage(true);
      setUploadingButton(true); 

       await signMessageFunction();

       console.log('allowdSignature', allowdSignature)
          if(allowdSignature){
            toast.success("signature received , generating preSigned URL")
             const response = await generatePreSignedUrl();
             
             

             uploadtoS3();
          } 
         else {
          toast.error("Wallet not connected or message not signed.", { duration: 1000 });
         }
         setSelectImage(false);
         setUploadingButton(false); 


    };
    const signMessageFunction = async()=>{
      if (!publicKey) {return; }
      const message = new TextEncoder().encode("Sign into MarketSpace");
      try {
      const signature = await signMessage?.(message);
        if(typeof(signature) == "object") setAllowedSignature(true);
      const response = await axios.post(`${backendURL}signin`, {
          signature,
          publicKey: publicKey?.toString()
      });
      
      if(response.data.token){
        localStorage.setItem("token", response.data.token);
      }else setAllowedSignature(false)
      
    } catch (error) {
        setAllowedSignature(false)
    }
    }
    
    const generatePreSignedUrl = async()=>{

    }

    const uploadtoS3 = ()=>{
      
    }
  

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto p-4 md:p-8">
        <Toaster />
      <Card>
        <CardHeader>
          <CardTitle>Image Upload</CardTitle>
          <CardDescription>Upload your images and they will be displayed in a grid.</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((src ,index)=>(
             <div key={index} className="relative group overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800 cursor-pointer">
             <img
               src={src}
               alt="Uploaded Image"
               width={200}
               height={200}
               className="object-cover w-full h-full"
             />
             <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
               <TrashIcon className="w-6 h-6 text-white" onClick={() => handleImageDelete(index)} />
             </div>
           </div>
            ))
            }
          
        </CardContent>
        <CardFooter>
          <Button disabled ={selectImage}>
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
      
      <Card>
        <CardHeader>
          <CardTitle>Asset</CardTitle>
          <CardDescription>Fill out the details for your Asset.</CardDescription>
        </CardHeader>

        <CardContent className="grid gap-4">

          <div className="space-y-1">
            <Label  htmlFor="title">Title *</Label>
            <Input  required onChange={(e)=>{setTitle(e.target.value)}} id="title" placeholder="Enter product title" />
          </div>

          <div className="space-y-1">
            <Label htmlFor="description">Description</Label>
            <Textarea  onChange={(e)=>{setDescription(e.target.value)}} id="description" placeholder="Enter product description" />
          </div>

          <div className="space-y-1">
            <Label htmlFor="price">Price *</Label>
            <div className="flex items-center space-x-2">
              <Input  required onChange={handlePriceInput} id="price"  placeholder="0.3231" className="w-25" />
              <span>Sol</span>
          </div>
          </div>
        </CardContent>
        <CardFooter>
          <div className="items-top flex space-x-2">
           
            <Button disabled={uploadingButton} onClick={handleSubmit}>Publish</Button>
           
          </div>
          
        
        </CardFooter>
      </Card>
        </div>
        
    )
  }

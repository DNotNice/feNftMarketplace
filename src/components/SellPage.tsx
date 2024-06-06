import { Label } from "@radix-ui/react-label"
import { Button } from "./ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Textarea } from "./ui/textarea"
import { Input } from "./ui/input"
import { TrashIcon } from "@heroicons/react/16/solid"
import { toast, Toaster } from 'react-hot-toast';
import { ChangeEvent, FormEvent, useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"


export const SellPage = ()=>{
    const [images, setImages] = useState<string[]>([]);
    const [title , setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [price , setPrice] = useState<number>(0);
    const [approve , setApprove] = useState<boolean>(false);
    const [uploadingButton , setUploadingButton] = useState<boolean>(false);
    const [selectImage , setSelectImage]  = useState<boolean>(false);

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
    
    const handleSubmit = (e: FormEvent) => {
      e.preventDefault();
    
       if (!title  || !price) {
        toast.error("Please fill in all required fields.", { duration: 1000 });
        return;
      }
      else if (!approve) {
        toast.error("Please accept the terms and conditions.", { duration: 3000 });
        return ;
      }
      setSelectImage(true);
      setUploadingButton(true);
      // Add your submit logic here
      toast.success(title +"\n"+description+"\n"+ price ,{duration:3000}) 
      setTimeout(()=>{
        setSelectImage(false)
        setUploadingButton(false)
      } , 3000)
    };
  

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

          <Checkbox id="terms" checked={approve} onChange={()=>{setApprove(!approve)}}/>
            <div className="grid gap-1.5 leading-none">
            <Label onClick={()=>{setApprove(!approve)}}htmlFor="terms" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Accept Terms and Conditions 
            </Label>
            <div className="my-4">
            <Button disabled={uploadingButton} onClick={handleSubmit}>Publish</Button>
              </div>  
          </div>
          </div>
          
        
        </CardFooter>
      </Card>
        </div>
        
    )
  }

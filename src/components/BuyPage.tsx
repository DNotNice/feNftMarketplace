import { useEffect, useState } from "react"
import axios from "axios";
import CarouselCard from "./ui/caraouselcard";
import { Toaster } from "./ui/toaster";

export const BuyPage = ()=>{
 const backendURL = import.meta.env.VITE_BACKEND_URL;
 const[ data , setData] = useState<Array<Object>>([]);


 const handleBuy = (id: number) => {
  console.log(`Purchasing asset with id: ${id}`);
  
  // Implement your purchase logic here
};

  useEffect( ()=>{
    const fetchData = async ()=>{
      const response =  await axios.get(`${backendURL}v1/buy/all`)
     setData(response.data)
    }
    fetchData();
    const handleContextMenu = (event: MouseEvent) => {
      event.preventDefault();
    };

    document.addEventListener('contextmenu', handleContextMenu);

    // Clean up the event listener on component unmount
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
    };

   
  },[])

    return (  
         data.length == 0 ? (<h1>Thank You for Supporting MarketSpace</h1>) : (
          
        <div className="flex flex-wrap justify-center items-center gap-4 p-4">  
        <Toaster/>
        {data.map((item: any) => (
          <CarouselCard  
          key={item.id}
          carouselData={item.Image_urls}
          cardData={{ name: item.name,description: item.description,price: item.price,status: item.status, id : item.id }}
          onBuy={handleBuy}/>
          
          ))}
          
         </div>  
         )
       
         )}
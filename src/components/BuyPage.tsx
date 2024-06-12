import { useEffect, useState } from "react"
import axios from "axios";
import { CarouselWithCards } from "./ui/caraouselcard";

export const BuyPage = ()=>{
 const backendURL = import.meta.env.VITE_BACKEND_URL;
 const[ data , setData] = useState<Array<Object>>([]);

  useEffect( ()=>{
    const fetchData = async ()=>{
      const response =  await axios.get(`${backendURL}v1/buy/all`)
      JSON.stringify(response.data)
      console.log( response.data);
      setData(response.data)
      return ;
    }

    fetchData();
    JSON.stringify(data)

  },[])

    return (  
         data.length == 0 ? (<h1>Thank You for Supporting MarketSpace</h1>) : (
        <div>
        {data.map((item: any) => (
        <CarouselWithCards  key={item.id}
          carouselData={item.Image_urls}
          cardData={{ name: item.name,description: item.description,price: item.price,status: item.status, id : item.id }}/>
        ))}
          
         </div>  
         ))}
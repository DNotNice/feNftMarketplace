import React from "react";
import { Button } from "./button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "./card";

interface CardProps {
  name: string;
  description: string;
  price: number;
  status: string;
  id:Number 
}
const onBuy = ()=>{
    console.log("")
}

export const DisplayCard: React.FC<CardProps> = ({ name, description, price, status, id }) => {
    return (
        <div className="w-full max-w-sm mx-auto">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>{name}</CardTitle> 
            </CardHeader>
            <CardDescription className="ml-6">{description}</CardDescription>
            <CardFooter className="flex justify-between items-center">
              <span className="text-lg font-bold">{price} SOL</span>
              {status === "AVAILABLE" ? (
                <Button variant="ghost" onClick={onBuy}>Buy</Button>
              ) : (
                <Button variant="destructive">SOLD</Button>
              )}
            </CardFooter>
          </Card>
        </div>
      );
};


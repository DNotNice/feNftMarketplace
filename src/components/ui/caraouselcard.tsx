import React from "react";
import { Carouselcompo } from "./caraouselcompo";
import { DisplayCard } from "./displayCard";

interface CarouselWithCardsProps {
  carouselData: string[];
  cardData: {
    name: string;
    description: string;
    price: number;
    status: string;
    id: number;
  };
}

export const CarouselWithCards: React.FC<CarouselWithCardsProps> = ({ carouselData, cardData }) => {
    return (
        <div className="flex flex-col items-center -mx-2">
          <div className="w-full px-2 mb-4">
            <Carouselcompo images={carouselData} />
          </div>
              <div className="w-full px-2 mb-4">
              <DisplayCard
                name={cardData.name}
                description={cardData.description}
                price={cardData.price}
                status={cardData.status}
                id = {cardData.id}
                />
            </div>
        </div>
      );
};


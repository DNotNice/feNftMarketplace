import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '@/components/ui/carousel';
import { Button } from '@/components/ui/button';
import toast from 'react-hot-toast';

interface CarouselCardProps {
  cardData: {
    name: string;
    description: string;
    price: number;
    status: string;
    id: number;
  };
  carouselData: string[];
  onBuy: (id: number) => void;
}

const CarouselCard: React.FC<CarouselCardProps> = ({ cardData, carouselData, onBuy }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? carouselData.length - 1 : prevIndex - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === carouselData.length - 1 ? 0 : prevIndex + 1));
  };

  const handleBuy = () => {
    onBuy(cardData.id);
    toast.success('Purchase successful!');
  };

  return (
    <Card
      className="w-full max-w-xs rounded-lg overflow-hidden shadow-lg m-4"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        <Carousel className="h-40 sm:h-48">
          <CarouselContent
            className="flex transition-transform duration-300"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {carouselData.map((image, index) => (
              <CarouselItem key={index} className="relative w-full h-40 sm:h-48 flex-shrink-0">
                <img
                  src={image}
                  alt={`carousel-item-${index}`}
                  className="object-cover w-full h-full"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious
            className="absolute top-1/2 left-4 -translate-y-1/2 z-10 bg-white/50 hover:bg-white/75 rounded-full p-2 cursor-pointer"
            onClick={prevSlide}
          >
            <ChevronLeftIcon className="w-6 h-6" />
          </CarouselPrevious>
          <CarouselNext
            className="absolute top-1/2 right-4 -translate-y-1/2 z-10 bg-white/50 hover:bg-white/75 rounded-full p-2 cursor-pointer"
            onClick={nextSlide}
          >
            <ChevronRightIcon className="w-6 h-6" />
          </CarouselNext>
        </Carousel>
        {isHovered && (
          <div className="absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4">
            <p className="text-white text-center">{cardData.description}</p>
          </div>
        )}
      </div>
      <CardContent className="p-4 space-y-4">
        <div className="space-y-2">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">{cardData.name}</CardTitle>
          </CardHeader>
        </div>
        <CardFooter className="flex items-center justify-between">
          <div className="text-xl font-bold">${cardData.price}</div>
          {cardData.status === 'AVAILABLE' ? (
            <Button size="lg" onClick={handleBuy}>
              Buy Now
            </Button>
          ) : (
            <Button disabled size="lg" variant="destructive">
              SOLD
            </Button>
          )}
        </CardFooter>
      </CardContent>
    </Card>
  );
};

function ChevronLeftIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

function ChevronRightIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

export default CarouselCard;

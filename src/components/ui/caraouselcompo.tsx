import React, { useState } from "react";

interface CarouselProps {
  images: string[];
}

export const Carouselcompo: React.FC<CarouselProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };
  return (
    <div className="relative w-full max-w-sm mx-auto">
      <div className="overflow-hidden">
        <img
          src={images[currentIndex]}
          alt={`carousel-item-${currentIndex}`}
          className="w-full h-64 object-contain"
        />
        <button onClick={prevSlide} className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white opacity-50 px-3 py-1">
          &lt;
        </button>
        <button onClick={nextSlide} className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white opacity-50 px-3 py-1">
          &gt;
        </button>
      </div>
    </div>
  );
};


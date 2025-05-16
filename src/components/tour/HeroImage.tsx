
import React from 'react';

interface HeroImageProps {
  image: string;
  title: string;
  destination: string;
  duration: number;
}

const HeroImage: React.FC<HeroImageProps> = ({ image, title, destination, duration }) => {
  return (
    <section className="relative h-[60vh] min-h-[400px] max-h-[600px]">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: `url(${image})`,
          filter: 'brightness(0.7)' 
        }}
      ></div>
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
      
      <div className="container relative h-full flex items-end pb-12 z-10">
        <div className="text-white max-w-3xl">
          <div className="flex items-center mb-4 space-x-4">
            <span className="bg-accent px-3 py-1 rounded-full text-sm font-medium">
              {destination}
            </span>
            <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
              {duration} days
            </span>
          </div>
          
          <h1 className="heading-xl mb-4">{title}</h1>
        </div>
      </div>
    </section>
  );
};

export default HeroImage;

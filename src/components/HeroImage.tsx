
import React, { useEffect } from 'react';

interface HeroImageProps {
  imageUrl: string;
  title: string;
  subtitle?: string;
}

const HeroImage: React.FC<HeroImageProps> = ({ imageUrl, title, subtitle }) => {
  useEffect(() => {
    console.debug('[HeroImage] mounted', { imageUrl, title });
  }, [imageUrl, title]);

  return (
    <div 
      className="bg-cover bg-center h-96 relative w-full"
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
        <h1 className="font-bold text-4xl mb-2">{title}</h1>
        {subtitle && <p className="font-normal text-lg">{subtitle}</p>}
      </div>
    </div>
  );
};

export default HeroImage;

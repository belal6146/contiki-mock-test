
import React, { useEffect } from 'react';

interface HeroImageProps {
  imageUrl: string;
  title: string;
  subtitle?: string;
}

const HeroImage: React.FC<HeroImageProps> = ({ imageUrl, title, subtitle }) => {
  // Generate a fallback image based on the title if imageUrl is not provided
  const getFallbackImage = () => {
    // Convert title to URL-friendly search term
    const searchTerm = title.toLowerCase().replace(/\s+/g, ',');
    return `https://source.unsplash.com/random/1600x900/?travel,${searchTerm}`;
  };

  useEffect(() => {
    console.debug('[HeroImage] mounted', { imageUrl, title });
  }, [imageUrl, title]);

  return (
    <div 
      className="bg-cover bg-center h-96 relative w-full"
      style={{ backgroundImage: `url(${imageUrl || getFallbackImage()})` }}
      role="img"
      aria-label={`Hero image: ${title}`}
    >
      <div className="absolute inset-0 bg-black/40" aria-hidden="true" />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
        <h1 className="font-bold text-4xl mb-2">{title}</h1>
        {subtitle && <p className="font-normal text-lg">{subtitle}</p>}
      </div>
    </div>
  );
};

export default HeroImage;

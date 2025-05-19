
import React from 'react';

interface HeroImageProps {
  imageUrl: string;
  title: string;
  subtitle: string;
}

const HeroImage: React.FC<HeroImageProps> = ({ imageUrl, title, subtitle }) => {
  React.useEffect(() => {
    console.debug('[HeroImage] mounted', { title, subtitle });
  }, [title, subtitle]);

  return (
    <section 
      className="relative h-[60vh] min-h-[400px] max-h-[600px] w-full"
      role="banner"
      aria-label={`${title} - ${subtitle}`}
    >
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: `url(${imageUrl})`,
          filter: 'brightness(0.7)' 
        }}
        aria-hidden="true"
      />
      
      <div 
        className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"
        aria-hidden="true"
      />
      
      <div className="container relative h-full flex items-end pb-12 z-10">
        <div className="text-white max-w-3xl">
          <div className="flex items-center mb-4 space-x-4">
            <span className="bg-[#CCFF00] px-3 py-1 rounded-full text-black text-sm font-medium transition-all duration-150 ease-in-out">
              {subtitle}
            </span>
          </div>
          
          <h1 className="font-montserrat font-bold text-4xl md:text-5xl lg:text-6xl mb-4">
            {title}
          </h1>
        </div>
      </div>
    </section>
  );
};

export default HeroImage;

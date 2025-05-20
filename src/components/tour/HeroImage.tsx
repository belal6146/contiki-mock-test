
import React from 'react';
import { trackEvent } from '@/lib/analytics';
import { Skeleton } from '@/components/ui/skeleton';

interface HeroImageProps {
  imageUrl: string;
  title: string;
  subtitle: string;
}

const HeroImage: React.FC<HeroImageProps> = ({ imageUrl, title, subtitle }) => {
  // Generate a fallback hero image based on the title and subtitle
  const getFallbackImage = () => {
    // Convert title and subtitle to URL-friendly search terms
    const searchTerms = `${title},${subtitle}`.toLowerCase().replace(/\s+/g, ',');
    return `https://source.unsplash.com/random/1920x1080/?travel,${searchTerms}`;
  };

  React.useEffect(() => {
    trackEvent('hero_image_rendered', { title, subtitle });
  }, [title, subtitle]);

  // Guard against undefined props
  if (!title || !subtitle) {
    return <Skeleton className="h-[60vh] min-h-[400px] max-h-[600px] w-full" />;
  }
  
  const displayImageUrl = imageUrl || getFallbackImage();

  return (
    <section 
      className="relative h-[60vh] min-h-[400px] max-h-[600px] w-full"
      role="banner"
      aria-label={`${title} - ${subtitle}`}
    >
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-300 ease-in-out"
        style={{ 
          backgroundImage: `url(${displayImageUrl})`,
          filter: 'brightness(0.7)' 
        }}
        aria-hidden="true"
      />
      
      {/* Gradient Overlay */}
      <div 
        className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent transition-opacity duration-300 ease-in-out"
        aria-hidden="true"
      />
      
      {/* Content */}
      <div className="container relative h-full flex items-end pb-12 z-10">
        <div className="text-white max-w-3xl">
          <div className="flex items-center mb-4 space-x-4">
            <span className="bg-[#CCFF00] px-4 py-2 rounded-full text-black text-sm font-medium transition-all duration-150 ease-in-out hover:bg-[#CCFF00]/90 hover:scale-105">
              {subtitle}
            </span>
          </div>
          
          <h1 className="heading-xl mb-4 text-white transition-all duration-300 ease-in-out">
            {title}
          </h1>
        </div>
      </div>
    </section>
  );
};

export default HeroImage;


import React, { useState, useEffect } from 'react';
import { trackEvent } from '@/lib/analytics';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

interface HeroImageProps {
  imageUrl: string;
  title: string;
  subtitle?: string;
}

const HeroImage: React.FC<HeroImageProps> = ({ imageUrl, title, subtitle }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Generate a fallback image based on the title if imageUrl is not provided
  const getFallbackImage = () => {
    const searchTerm = title ? title.toLowerCase().replace(/\s+/g, ',') : 'travel';
    return `https://source.unsplash.com/random/1600x900/?travel,${searchTerm}`;
  };

  useEffect(() => {
    console.debug('[HeroImage] mounted', { imageUrl, title });
    
    const img = new Image();
    img.src = imageUrl || getFallbackImage();
    img.onload = () => setIsLoaded(true);
    img.onerror = () => {
      console.debug('[HeroImage] Error loading primary image, using fallback');
      setImageError(true);
      const fallbackImg = new Image();
      fallbackImg.src = getFallbackImage();
      fallbackImg.onload = () => setIsLoaded(true);
    };

    trackEvent('hero_image_rendered', { title });
  }, [imageUrl, title]);

  // Guard against undefined props
  if (!title) {
    return <Skeleton className="h-[60vh] min-h-[400px] max-h-[600px] w-full" data-testid="hero-skeleton" />;
  }

  const displayImageUrl = imageError || !imageUrl ? getFallbackImage() : imageUrl;

  return (
    <div 
      className="relative bg-cover bg-center h-[60vh] min-h-[400px] max-h-[600px] w-full overflow-hidden"
      role="img"
      aria-label={`Hero image: ${title}`}
    >
      {/* Background image */}
      <div 
        className={cn(
          "absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-700",
          isLoaded ? "opacity-100" : "opacity-0"
        )}
        style={{ 
          backgroundImage: `url(${displayImageUrl})`
        }}
      />
      
      {/* Contiki-style gradient overlay */}
      <div className="absolute inset-0" style={{
        background: 'linear-gradient(45deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 50%, rgba(255,105,0,0.1) 100%)'
      }} aria-hidden="true" />
      
      {/* Content with Contiki styling */}
      <div className={cn(
        "absolute inset-0 flex flex-col items-start justify-end text-white pb-12 px-4 md:px-8 transition-all duration-500",
        isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      )}>
        <div className="container max-w-4xl">
          {subtitle && (
            <div className="mb-4">
              <span 
                className="inline-block px-4 py-2 text-xs font-semibold tracking-wider uppercase rounded-full"
                style={{ backgroundColor: '#FF6900', color: 'white' }}
              >
                {subtitle}
              </span>
            </div>
          )}
          
          <h1 className="font-bold text-4xl md:text-5xl lg:text-6xl mb-4 text-white leading-tight drop-shadow-lg">
            {title}
          </h1>
          
          <p className="text-white/90 text-lg md:text-xl max-w-2xl leading-relaxed drop-shadow-lg">
            Join thousands of 18-35s on the adventure of a lifetime
          </p>
        </div>
      </div>

      {/* Loading indicator with Contiki orange */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900/50" role="status">
          <div 
            className="w-12 h-12 border-4 border-gray-200 rounded-full animate-spin"
            style={{ borderTopColor: '#FF6900' }}
          ></div>
        </div>
      )}
    </div>
  );
};

export default HeroImage;

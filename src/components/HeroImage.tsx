
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

  const getFallbackImage = () => {
    const searchTerm = title ? title.toLowerCase().replace(/\s+/g, ',') : 'travel';
    const subtitleTerm = subtitle ? subtitle.toLowerCase().replace(/\s+/g, ',') : '';
    const combinedTerms = [searchTerm, subtitleTerm, 'adventure', 'landscape', 'destination']
      .filter(Boolean)
      .join(',');
    
    return `https://source.unsplash.com/featured/1600x900/?${combinedTerms}`;
  };

  useEffect(() => {
    console.debug('[HeroImage] mounted', { imageUrl, title });
    
    const img = new Image();
    img.src = imageUrl || getFallbackImage();
    img.onload = () => {
      setIsLoaded(true);
      console.debug('[HeroImage] imageLoaded');
    };
    img.onerror = () => {
      console.debug('[HeroImage] Error loading primary image, using fallback');
      setImageError(true);
      const fallbackImg = new Image();
      fallbackImg.src = getFallbackImage();
      fallbackImg.onload = () => setIsLoaded(true);
    };

    trackEvent('hero_image_rendered', { title });
  }, [imageUrl, title]);

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
          "absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000 transform",
          isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-105"
        )}
        style={{ 
          backgroundImage: `url(${displayImageUrl})`
        }}
      />
      
      {/* Enhanced gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/50 to-transparent" aria-hidden="true" />
      
      {/* Content */}
      <div className={cn(
        "absolute inset-0 flex flex-col items-start justify-end text-white pb-16 px-6 md:px-8 transition-all duration-1000",
        isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      )}>
        <div className="container max-w-4xl">
          {subtitle && (
            <div className="mb-6">
              <span 
                className="inline-block px-6 py-3 text-sm font-bold tracking-wider uppercase rounded-full shadow-lg backdrop-blur-sm"
                style={{ backgroundColor: 'rgba(255, 105, 0, 0.9)', color: 'white' }}
              >
                {subtitle}
              </span>
            </div>
          )}
          
          <h1 className="font-bold text-4xl md:text-5xl lg:text-6xl mb-6 text-white leading-tight drop-shadow-2xl">
            {title}
          </h1>
          
          <p className="text-white/90 text-lg md:text-xl max-w-2xl leading-relaxed drop-shadow-lg">
            Join thousands of 18-35s on the adventure of a lifetime
          </p>
        </div>
      </div>

      {/* Loading indicator */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900/80" role="status">
          <div className="text-center">
            <div 
              className="w-16 h-16 border-4 border-gray-200 rounded-full animate-spin mb-4"
              style={{ borderTopColor: '#FF6900' }}
            ></div>
            <p className="text-white text-sm">Loading adventure...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeroImage;

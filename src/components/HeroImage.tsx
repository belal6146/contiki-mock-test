import React, { useState, useEffect, memo } from 'react';
import { trackEvent } from '@/lib/analytics';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

interface HeroImageProps {
  imageUrl: string;
  title: string;
  subtitle?: string;
}

const HeroImage = memo<HeroImageProps>(({ imageUrl, title, subtitle }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const getFallbackImage = () => {
    return 'https://lovable-uploads.s3.amazonaws.com/contiki-hero-default.jpg';
  };

  useEffect(() => {
    console.debug('[HeroImage] mounted', { imageUrl, title });
    
    const targetUrl = imageUrl || getFallbackImage();
    const img = new Image();
    img.src = targetUrl;
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
    <section 
      className="relative bg-cover bg-center h-[60vh] min-h-[400px] max-h-[600px] w-full overflow-hidden"
      role="banner"
      aria-labelledby="hero-title"
      aria-describedby="hero-description"
    >
      {/* Background image */}
      <img 
        src={displayImageUrl}
        alt={`Hero image for ${title}`}
        className={cn(
          "absolute inset-0 w-full h-full object-cover transition-all duration-1000 transform",
          isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-105"
        )}
        loading="lazy"
      />
      
      {/* Enhanced gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/50 to-transparent" aria-hidden="true" />
      
      {/* Content */}
      <div className={cn(
        "absolute inset-0 flex flex-col items-start justify-end text-white pb-20 px-6 md:px-12 transition-all duration-1000",
        isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      )}>
        <div className="container max-w-5xl">
          {subtitle && (
            <div className="mb-8">
              <span 
                className="inline-block px-8 py-4 text-base font-extrabold tracking-widest uppercase rounded-full shadow-xl backdrop-blur-sm"
                style={{ backgroundColor: 'rgba(204, 255, 0, 0.95)', color: 'black' }}
                role="badge"
                aria-label={`Trip category: ${subtitle}`}
              >
                {subtitle}
              </span>
            </div>
          )}
          
          <h1 
            id="hero-title"
            className="font-extrabold text-5xl md:text-6xl lg:text-7xl mb-8 text-white leading-tight drop-shadow-2xl tracking-tight"
            style={{ letterSpacing: '-0.02em' }}
          >
            {title}
          </h1>
          
          <p 
            id="hero-description"
            className="text-white/95 text-xl md:text-2xl max-w-3xl leading-relaxed drop-shadow-lg font-medium"
          >
            Join thousands of 18-35s on the adventure of a lifetime
          </p>

          <div className="mt-10">
            <button className="bg-[#CCFF00] text-black font-extrabold py-5 px-12 rounded-full text-lg uppercase tracking-wider shadow-xl hover:bg-[#b8e600] transition-all duration-200 transform hover:scale-105">
              Find Your Trip
            </button>
          </div>
        </div>
      </div>

      {/* Loading indicator */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900/80" role="status" aria-label="Loading adventure content">
          <div className="text-center">
            <div 
              className="w-16 h-16 border-4 border-gray-200 rounded-full animate-spin mb-4"
              style={{ borderTopColor: '#CCFF00' }}
              aria-hidden="true"
            ></div>
            <p className="text-white text-sm">Loading adventure...</p>
          </div>
        </div>
      )}
    </section>
  );
});

HeroImage.displayName = 'HeroImage';

export default HeroImage;

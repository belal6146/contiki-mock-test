
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
  const [parallaxOffset, setParallaxOffset] = useState(0);

  // Generate a fallback image based on the title if imageUrl is not provided
  const getFallbackImage = () => {
    // Convert title to URL-friendly search term
    const searchTerm = title ? title.toLowerCase().replace(/\s+/g, ',') : 'travel';
    return `https://source.unsplash.com/random/1600x900/?travel,${searchTerm}`;
  };

  // Handle parallax effect on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setParallaxOffset(scrollPosition * 0.1);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    return <Skeleton className="h-[50vh] min-h-[300px] max-h-[500px] w-full" />;
  }

  const displayImageUrl = imageError || !imageUrl ? getFallbackImage() : imageUrl;

  return (
    <div 
      className="relative bg-cover bg-center h-96 w-full overflow-hidden"
      role="img"
      aria-label={`Hero image: ${title}`}
    >
      {/* Background image with parallax effect */}
      <div 
        className={cn(
          "absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-700",
          isLoaded ? "opacity-100" : "opacity-0"
        )}
        style={{ 
          backgroundImage: `url(${displayImageUrl})`,
          transform: `translateY(${parallaxOffset}px)` 
        }}
      />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/30" aria-hidden="true" />
      
      {/* Content */}
      <div className={cn(
        "absolute inset-0 flex flex-col items-center justify-center text-white transition-all duration-500",
        isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      )}>
        <h1 className="font-bold text-4xl mb-2 text-center px-4 drop-shadow-lg">{title}</h1>
        {subtitle && (
          <p className="font-normal text-lg text-center px-4 max-w-2xl drop-shadow-lg">{subtitle}</p>
        )}
      </div>

      {/* Loading indicator */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900/50">
          <div className="w-12 h-12 border-4 border-t-[#CCFF00] border-gray-200 rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
};

export default HeroImage;

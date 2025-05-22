
import React, { useState, useEffect } from 'react';
import { trackEvent } from '@/lib/analytics';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

interface HeroImageProps {
  imageUrl: string;
  title: string;
  subtitle: string;
}

const HeroImage: React.FC<HeroImageProps> = ({ imageUrl, title, subtitle }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [parallaxOffset, setParallaxOffset] = useState(0);

  // Generate a fallback hero image based on the title and subtitle
  const getFallbackImage = () => {
    // Ensure title and subtitle are strings before using toLowerCase
    const searchTitleTerm = title ? title.toLowerCase().replace(/\s+/g, ',') : 'travel';
    const searchSubtitleTerm = subtitle ? subtitle.toLowerCase().replace(/\s+/g, ',') : '';
    const searchTerms = `${searchTitleTerm},${searchSubtitleTerm}`;
    return `https://source.unsplash.com/random/1920x1080/?travel,${searchTerms}`;
  };

  // Handle parallax effect on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      // Limit the parallax effect to avoid too much movement
      setParallaxOffset(scrollPosition * 0.15);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Preload the image
  useEffect(() => {
    const img = new Image();
    img.src = imageUrl || getFallbackImage();
    img.onload = () => setIsLoaded(true);
    img.onerror = () => {
      console.debug('[HeroImage] Error loading primary image, using fallback');
      setImageError(true);
      // Try loading the fallback
      const fallbackImg = new Image();
      fallbackImg.src = getFallbackImage();
      fallbackImg.onload = () => setIsLoaded(true);
    };
    
    trackEvent('hero_image_rendered', { title, subtitle });
  }, [imageUrl, title, subtitle]);

  // Guard against undefined props
  if (!title && !subtitle) {
    return <Skeleton className="h-[60vh] min-h-[400px] max-h-[600px] w-full" />;
  }
  
  const displayImageUrl = imageError || !imageUrl ? getFallbackImage() : imageUrl;

  return (
    <section 
      className="relative h-[60vh] min-h-[400px] max-h-[600px] w-full overflow-hidden"
      role="banner"
      aria-label={`${title || 'Tour'} - ${subtitle || 'Destination'}`}
    >
      {/* Background Image with parallax effect */}
      <div 
        className={cn(
          "absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-700",
          isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-105",
          "transform-gpu transition-transform duration-7000 ease-out" // Subtle zoom effect on hover
        )}
        style={{ 
          backgroundImage: `url(${displayImageUrl})`,
          filter: 'brightness(0.75)',
          transform: `translateY(${parallaxOffset}px) scale(${1 + parallaxOffset * 0.001})` 
        }}
        aria-hidden="true"
      />
      
      {/* Enhanced gradient overlay with more depth */}
      <div 
        className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent transition-opacity duration-500 ease-in-out"
        aria-hidden="true"
      />
      
      {/* Content with animation */}
      <div className="container relative h-full flex items-end pb-12 z-10">
        <div className={cn(
          "text-white max-w-3xl transition-all duration-700 ease-out transform-gpu",
          isLoaded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        )}>
          <div className="flex items-center mb-4 space-x-4">
            <span className="bg-[#CCFF00] px-4 py-2 rounded-full text-black text-sm font-medium transition-all duration-150 ease-in-out hover:bg-[#CCFF00]/90 hover:scale-105 shadow-lg">
              {subtitle || 'Explore'}
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white transition-all duration-300 ease-in-out drop-shadow-lg">
            {title || 'Discover Amazing Places'}
          </h1>
          
          {/* Optional description line that animates in */}
          <p className={cn(
            "text-white/90 max-w-lg text-lg transition-all duration-1000 delay-300 transform-gpu",
            isLoaded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          )}>
            Unforgettable adventures await with our carefully crafted experiences
          </p>
        </div>
      </div>

      {/* Loading overlay */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-900/80 flex items-center justify-center z-20">
          <div className="w-16 h-16 border-4 border-t-[#CCFF00] border-gray-200 rounded-full animate-spin"></div>
        </div>
      )}
    </section>
  );
};

export default HeroImage;

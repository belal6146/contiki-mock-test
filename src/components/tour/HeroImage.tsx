
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

  const getFallbackImage = () => {
    const searchTitleTerm = title ? title.toLowerCase().replace(/\s+/g, ',') : 'travel';
    const searchSubtitleTerm = subtitle ? subtitle.toLowerCase().replace(/\s+/g, ',') : '';
    const searchTerms = `${searchTitleTerm},${searchSubtitleTerm}`;
    return `https://source.unsplash.com/random/1920x1080/?travel,${searchTerms}`;
  };

  useEffect(() => {
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
    
    trackEvent('hero_image_rendered', { title, subtitle });
  }, [imageUrl, title, subtitle]);

  if (!title && !subtitle) {
    return <Skeleton className="h-[60vh] min-h-[500px] max-h-[700px] w-full" />;
  }
  
  const displayImageUrl = imageError || !imageUrl ? getFallbackImage() : imageUrl;

  return (
    <section 
      className="relative h-[60vh] min-h-[500px] max-h-[700px] w-full overflow-hidden"
      role="banner"
      aria-label={`${title || 'Tour'} - ${subtitle || 'Destination'}`}
    >
      {/* Background Image */}
      <div 
        className={cn(
          "absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-700",
          isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-105"
        )}
        style={{ 
          backgroundImage: `url(${displayImageUrl})`
        }}
        aria-hidden="true"
      />
      
      {/* Contiki brand gradient overlay */}
      <div 
        className="absolute inset-0 transition-opacity duration-500 ease-in-out"
        style={{
          background: 'linear-gradient(135deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 40%, rgba(255,105,0,0.1) 100%)'
        }}
        aria-hidden="true"
      />
      
      {/* Content with Contiki styling */}
      <div className="container relative h-full flex items-end pb-12 z-10">
        <div className={cn(
          "text-white max-w-4xl transition-all duration-700 ease-out transform-gpu",
          isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        )}>
          {/* Destination badge */}
          <div className="flex items-center mb-6">
            <span 
              className="px-6 py-3 rounded-full text-white text-sm font-bold tracking-wider uppercase shadow-lg"
              style={{ backgroundColor: '#FF6900' }}
            >
              {subtitle || 'Explore'}
            </span>
          </div>
          
          {/* Tour title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 text-white leading-tight drop-shadow-2xl">
            {title || 'Discover Amazing Places'}
          </h1>
          
          {/* Description */}
          <div className={cn(
            "text-white/95 max-w-2xl text-lg md:text-xl leading-relaxed transition-all duration-1000 delay-300 transform-gpu",
            isLoaded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          )}>
            <p className="mb-4">
              Experience the adventure of a lifetime with like-minded travelers aged 18-35
            </p>
            <p className="text-white/80 text-base">
              ★ Expert local guides • Small groups • Authentic experiences
            </p>
          </div>
        </div>
      </div>

      {/* Loading overlay with Contiki branding */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-900/80 flex items-center justify-center z-20">
          <div className="text-center">
            <div 
              className="w-16 h-16 border-4 border-gray-200 rounded-full animate-spin mb-4"
              style={{ borderTopColor: '#FF6900' }}
            ></div>
            <p className="text-white text-sm">Loading your adventure...</p>
          </div>
        </div>
      )}
    </section>
  );
};

export default HeroImage;

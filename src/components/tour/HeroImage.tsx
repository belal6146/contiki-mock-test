
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
    // Enhanced search terms based on title and subtitle
    const titleTerms = title ? title.toLowerCase().replace(/\s+/g, ',').replace(/[^\w,]/g, '') : '';
    const subtitleTerms = subtitle ? subtitle.toLowerCase().replace(/\s+/g, ',').replace(/[^\w,]/g, '') : '';
    
    // Combine and create more specific search
    const searchTerms = [titleTerms, subtitleTerms, 'travel', 'adventure', 'landscape', 'destination']
      .filter(Boolean)
      .join(',');
    
    return `https://source.unsplash.com/featured/1920x1080/?${searchTerms}`;
  };

  useEffect(() => {
    const img = new Image();
    const targetUrl = imageUrl || getFallbackImage();
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
          "absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000 transform",
          isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-105"
        )}
        style={{ 
          backgroundImage: `url(${displayImageUrl})`
        }}
        aria-hidden="true"
      />
      
      {/* Enhanced gradient overlay */}
      <div 
        className="absolute inset-0 transition-opacity duration-500 ease-in-out"
        style={{
          background: 'linear-gradient(135deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.5) 40%, rgba(255,105,0,0.1) 100%)'
        }}
        aria-hidden="true"
      />
      
      {/* Content */}
      <div className="container relative h-full flex items-end pb-16 z-10">
        <div className={cn(
          "text-white max-w-4xl transition-all duration-1000 ease-out transform-gpu",
          isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        )}>
          {/* Destination badge */}
          <div className="flex items-center mb-8">
            <span 
              className="px-6 py-3 rounded-full text-white text-sm font-bold tracking-wider uppercase shadow-2xl backdrop-blur-sm"
              style={{ backgroundColor: 'rgba(255, 105, 0, 0.9)' }}
            >
              {subtitle || 'Explore'}
            </span>
          </div>
          
          {/* Tour title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-8 text-white leading-tight drop-shadow-2xl uppercase tracking-tight">
            {title || 'Discover Amazing Places'}
          </h1>
          
          {/* Enhanced description */}
          <div className={cn(
            "text-white/95 max-w-3xl text-lg md:text-xl leading-relaxed transition-all duration-1000 delay-300 transform-gpu",
            isLoaded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          )}>
            <p className="mb-6 drop-shadow-lg">
              Experience the adventure of a lifetime with like-minded travelers aged 18-35
            </p>
            <div className="flex flex-wrap gap-4 text-base">
              <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                ★ Expert local guides
              </span>
              <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                Small groups
              </span>
              <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                Authentic experiences
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Loading overlay */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-900/90 flex items-center justify-center z-20">
          <div className="text-center">
            <div 
              className="w-20 h-20 border-4 border-gray-200 rounded-full animate-spin mb-6"
              style={{ borderTopColor: '#FF6900' }}
            ></div>
            <p className="text-white text-lg font-medium">Loading your adventure...</p>
          </div>
        </div>
      )}
    </section>
  );
};

export default HeroImage;

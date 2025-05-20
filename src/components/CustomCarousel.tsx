
import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CustomCarouselProps {
  images: { src: string; alt: string }[];
  autoRotate?: boolean;
  interval?: number;
  category?: string;
}

const CustomCarousel: React.FC<CustomCarouselProps> = ({ 
  images, 
  autoRotate = true, 
  interval = 5000,
  category = 'travel'
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Generate default carousel images from Unsplash if none provided
  const getCarouselImages = () => {
    if (images && images.length > 0) {
      return images;
    }
    
    // Create 5 placeholder images
    return Array.from({ length: 5 }, (_, i) => ({
      src: `https://source.unsplash.com/random/1200x800/?${category},landscape&sig=${i}`,
      alt: `${category} image ${i + 1}`
    }));
  };

  const carouselImages = getCarouselImages();

  useEffect(() => {
    // Clear any existing timers
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    // Set up auto-rotation if enabled and not paused
    if (autoRotate && !isPaused) {
      timerRef.current = setInterval(() => {
        const nextIndex = (currentIndex + 1) % carouselImages.length;
        setCurrentIndex(nextIndex);
        console.debug('[Carousel] slideChanged', nextIndex);
      }, interval);
    }

    // Cleanup on unmount
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [autoRotate, isPaused, currentIndex, interval, carouselImages.length]);

  const handlePrev = () => {
    const nextIndex = (currentIndex - 1 + carouselImages.length) % carouselImages.length;
    setCurrentIndex(nextIndex);
    console.debug('[Carousel] slideChanged', nextIndex);
  };

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % carouselImages.length;
    setCurrentIndex(nextIndex);
    console.debug('[Carousel] slideChanged', nextIndex);
  };

  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  return (
    <div 
      className="relative overflow-hidden rounded-lg"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role="region"
      aria-roledescription="carousel"
      aria-label="Image carousel"
    >
      {/* Image container */}
      <div className="relative h-96">
        {carouselImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === currentIndex ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
            aria-hidden={index !== currentIndex}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover object-center transition-transform duration-300 ease-in-out"
              loading="lazy"
            />
          </div>
        ))}
      </div>
      
      {/* Navigation buttons */}
      <Button
        variant="outline"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm hover:bg-white/90 rounded-full transition-all duration-150 ease-in-out hover:scale-110"
        onClick={handlePrev}
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
      
      <Button
        variant="outline"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm hover:bg-white/90 rounded-full transition-all duration-150 ease-in-out hover:scale-110"
        onClick={handleNext}
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </Button>
      
      {/* Indicator dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2" role="tablist">
        {carouselImages.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-150 ease-in-out hover:scale-125 ${
              index === currentIndex ? 'bg-white' : 'bg-white/50'
            }`}
            onClick={() => {
              setCurrentIndex(index);
              console.debug('[Carousel] slideChanged', index);
            }}
            aria-label={`Go to slide ${index + 1}`}
            aria-selected={index === currentIndex}
            role="tab"
            tabIndex={0}
          />
        ))}
      </div>
    </div>
  );
};

export default CustomCarousel;

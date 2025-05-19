
import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Sample trending destinations data
const destinations = [
  { id: 'japan', name: 'JAPAN', image: 'https://images.unsplash.com/photo-1492571350019-22de08371fd3' },
  { id: 'costa-rica', name: 'COSTA RICA', image: 'https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86' },
  { id: 'thailand', name: 'THAILAND', image: 'https://images.unsplash.com/photo-1528181304800-259b08848526' },
  { id: 'morocco', name: 'MOROCCO', image: 'https://images.unsplash.com/photo-1539020140153-e8c5525dd0f5' },
  { id: 'croatia', name: 'CROATIA', image: 'https://images.unsplash.com/photo-1596097635121-14b38eaed139' }, 
  { id: 'iceland', name: 'ICELAND', image: 'https://images.unsplash.com/photo-1500673922987-e212871fec22' }
];

const TrendingDestinations = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.debug('[TrendingDestinations] mounted');
  }, []);

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.offsetWidth;
      const scrollPosition = direction === 'left' 
        ? scrollContainerRef.current.scrollLeft - scrollAmount
        : scrollContainerRef.current.scrollLeft + scrollAmount;
        
      scrollContainerRef.current.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
      
      console.debug('[TrendingDestinations] scroll', direction);
    }
  };

  return (
    <section className="py-12">
      <div className="container">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-medium text-black">Trending destinations</h2>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-white shadow-md"
              onClick={() => handleScroll('left')}
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-white shadow-md"
              onClick={() => handleScroll('right')}
              aria-label="Scroll right"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>
        </div>
        
        <div className="relative">
          <div 
            ref={scrollContainerRef} 
            className="overflow-x-auto whitespace-nowrap pb-4 scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <div className="grid grid-flow-col auto-cols-max gap-4">
              {destinations.map((destination) => (
                <Link 
                  key={destination.id}
                  to={`/tours/${destination.id}`}
                  className="block w-40 hover:opacity-90 transition-opacity"
                >
                  <div className="relative aspect-square rounded-lg overflow-hidden">
                    <img 
                      src={destination.image} 
                      alt={destination.name} 
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <p className="mt-2 text-center font-medium text-sm">
                    {destination.name}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrendingDestinations;

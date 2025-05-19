
import React, { useRef, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Sample partner logos data
const partners = [
  { 
    id: 'buzzfeed', 
    name: 'BuzzFeed', 
    logo: 'https://placeholder.com/wp-content/uploads/2018/10/placeholder.com-logo1.png', 
    url: 'https://www.buzzfeed.com' 
  },
  { 
    id: 'pinknews', 
    name: 'PinkNews', 
    logo: 'https://placeholder.com/wp-content/uploads/2018/10/placeholder.com-logo1.png', 
    url: 'https://www.pinknews.co.uk' 
  },
  { 
    id: 'traveler', 
    name: 'Condé Nast Traveler', 
    logo: 'https://placeholder.com/wp-content/uploads/2018/10/placeholder.com-logo1.png', 
    url: 'https://www.cntraveler.com' 
  },
  { 
    id: 'unilad', 
    name: 'UNILAD', 
    logo: 'https://placeholder.com/wp-content/uploads/2018/10/placeholder.com-logo1.png', 
    url: 'https://www.unilad.com' 
  },
  { 
    id: 'cosmopolitan', 
    name: 'Cosmopolitan', 
    logo: 'https://placeholder.com/wp-content/uploads/2018/10/placeholder.com-logo1.png', 
    url: 'https://www.cosmopolitan.com' 
  }
];

const PartnerLogos = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    console.debug('[PartnerLogos] mounted');
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
      
      const newSlide = direction === 'left' ? Math.max(0, currentSlide - 1) : currentSlide + 1;
      setCurrentSlide(newSlide);
      console.debug('[PartnerLogos] slide', newSlide);
    }
  };

  return (
    <section className="py-12">
      <div className="container">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-medium text-black">As seen in</h2>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-white shadow-md"
              onClick={() => handleScroll('left')}
              aria-label="Scroll left"
              disabled={currentSlide === 0}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-white shadow-md"
              onClick={() => handleScroll('right')}
              aria-label="Scroll right"
              disabled={currentSlide >= Math.ceil(partners.length / 4) - 1}
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>
        </div>
        
        <div className="relative">
          <div 
            ref={scrollContainerRef} 
            className="overflow-x-auto scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <div className="flex space-x-6 py-4">
              {partners.map((partner) => (
                <a 
                  key={partner.id}
                  href={partner.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center min-w-[180px]"
                >
                  <img 
                    src={partner.logo} 
                    alt={partner.name} 
                    className="h-12 max-w-full object-contain grayscale hover:grayscale-0 transition-all"
                    loading="lazy"
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnerLogos;

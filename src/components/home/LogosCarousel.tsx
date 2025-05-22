
import React, { useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '@/components/ui/carousel';

// Sample partner logos
const partnerLogos = [
  { name: 'BuzzFeed', logoUrl: 'https://placeholder.com/wp-content/uploads/2018/10/placeholder.com-logo1.png' },
  { name: 'PinkNews', logoUrl: 'https://placeholder.com/wp-content/uploads/2018/10/placeholder.com-logo1.png' },
  { name: 'Traveler', logoUrl: 'https://placeholder.com/wp-content/uploads/2018/10/placeholder.com-logo1.png' },
  { name: 'UNILAD', logoUrl: 'https://placeholder.com/wp-content/uploads/2018/10/placeholder.com-logo1.png' },
  { name: 'Cosmopolitan', logoUrl: 'https://placeholder.com/wp-content/uploads/2018/10/placeholder.com-logo1.png' }
];

const LogosCarousel = () => {
  useEffect(() => {
    console.debug('[LogosCarousel] mounted');
  }, []);

  return (
    <section className="py-12 bg-white">
      <div className="container max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">As seen in</h2>
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              size="icon" 
              className="rounded-full h-10 w-10 border-gray-300"
              aria-label="Previous"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              className="rounded-full h-10 w-10 border-gray-300"
              aria-label="Next"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
        
        <div className="flex justify-between items-center space-x-12 mb-6">
          {partnerLogos.map((logo, index) => (
            <div key={index} className="flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300">
              <img 
                src={logo.logoUrl} 
                alt={`${logo.name} logo`} 
                className="max-h-12 object-contain"
              />
            </div>
          ))}
        </div>
        
        <div className="flex justify-center space-x-2 mt-6">
          <span className="h-2 w-2 rounded-full bg-black"></span>
          <span className="h-2 w-2 rounded-full bg-gray-300"></span>
        </div>
      </div>
    </section>
  );
};

export default LogosCarousel;

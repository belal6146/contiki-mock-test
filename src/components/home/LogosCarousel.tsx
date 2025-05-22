
import React, { useEffect } from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

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
    <section className="py-8 bg-white">
      <div className="container">
        <h2 className="text-lg font-medium text-center mb-6">As seen in</h2>
        
        <div className="max-w-4xl mx-auto">
          <Carousel
            opts={{
              align: "center",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {partnerLogos.map((logo, index) => (
                <CarouselItem key={index} className="md:basis-1/3 lg:basis-1/5 flex justify-center">
                  <div className="p-2 flex items-center justify-center h-16">
                    <img 
                      src={logo.logoUrl} 
                      alt={`${logo.name} logo`} 
                      className="max-h-full max-w-full object-contain grayscale hover:grayscale-0 transition-all duration-300"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default LogosCarousel;

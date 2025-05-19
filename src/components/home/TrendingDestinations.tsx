
import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Slider from 'react-slick';
// Import slick carousel CSS
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Import destination images
import japanImage from '/images/destination-japan.jpg';
import costaRicaImage from '/images/destination-costa-rica.jpg';
import thailandImage from '/images/destination-thailand.jpg';
import moroccoImage from '/images/destination-morocco.jpg';
import croatiaImage from '/images/destination-croatia.jpg';
import icelandImage from '/images/destination-iceland.jpg';

// Sample trending destinations data
const destinations = [
  { id: 'japan', name: 'JAPAN', image: japanImage },
  { id: 'costa-rica', name: 'COSTA RICA', image: costaRicaImage },
  { id: 'thailand', name: 'THAILAND', image: thailandImage },
  { id: 'morocco', name: 'MOROCCO', image: moroccoImage },
  { id: 'croatia', name: 'CROATIA', image: croatiaImage }, 
  { id: 'iceland', name: 'ICELAND', image: icelandImage }
];

const TrendingDestinations = () => {
  const sliderRef = useRef<Slider | null>(null);

  useEffect(() => {
    console.debug('[TrendingDestinations] mounted');
  }, []);

  const handlePrev = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
      console.debug('[TrendingDestinations] scroll', 'left');
    }
  };

  const handleNext = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
      console.debug('[TrendingDestinations] scroll', 'right');
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
              onClick={handlePrev}
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-white shadow-md"
              onClick={handleNext}
              aria-label="Scroll right"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {destinations.map((destination) => (
            <Link 
              key={destination.id}
              to={`/tours/${destination.id}`}
              className="block hover:scale-105 transition-all duration-150 shadow-sm hover:shadow-md"
            >
              <div className="relative h-[300px] w-[200px] rounded-lg overflow-hidden">
                <img 
                  src={destination.image} 
                  alt={destination.name} 
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute bottom-0 left-0 p-3 bg-black/40 w-full">
                  <p className="font-medium text-white">
                    {destination.name}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingDestinations;


import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Sample trending destinations data
const destinations = [
  { 
    id: 'japan', 
    name: 'JAPAN', 
    image: `https://source.unsplash.com/random/200x300/?japan,travel` 
  },
  { 
    id: 'costa-rica', 
    name: 'COSTA RICA', 
    image: `https://source.unsplash.com/random/200x300/?costa,rica,travel` 
  },
  { 
    id: 'thailand', 
    name: 'THAILAND', 
    image: `https://source.unsplash.com/random/200x300/?thailand,travel` 
  },
  { 
    id: 'morocco', 
    name: 'MOROCCO', 
    image: `https://source.unsplash.com/random/200x300/?morocco,travel` 
  },
  { 
    id: 'croatia', 
    name: 'CROATIA', 
    image: `https://source.unsplash.com/random/200x300/?croatia,travel` 
  },
  { 
    id: 'iceland', 
    name: 'ICELAND', 
    image: `https://source.unsplash.com/random/200x300/?iceland,travel` 
  }
];

const TrendingDestinations = () => {
  useEffect(() => {
    console.debug('[TrendingDestinations] mounted');
  }, []);

  return (
    <section className="py-12">
      <div className="container">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-medium text-black">Trending destinations</h2>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="icon"
              className="w-10 h-10 rounded-full border-2 border-gray-300 bg-white shadow-md"
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="w-10 h-10 rounded-full border-2 border-gray-300 bg-white shadow-md"
              aria-label="Scroll right"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-5 gap-6">
          {destinations.map((destination) => (
            <Link 
              key={destination.id}
              to={`/tours/${destination.id}`}
              className="block hover:scale-105 transition-all duration-150 shadow-sm hover:shadow-md"
            >
              <div className="relative h-48 w-full rounded-lg overflow-hidden">
                <img 
                  src={destination.image} 
                  alt={destination.name} 
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute bottom-3 left-3">
                  <p className="font-semibold text-white text-sm">
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

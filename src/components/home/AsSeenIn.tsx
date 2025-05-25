
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const AsSeenIn = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Partner logos matching the Contiki website
  const logos = [
    { 
      name: 'BuzzFeed', 
      logoText: 'BuzzFeed',
      className: 'text-black font-bold text-2xl'
    },
    { 
      name: 'PinkNews', 
      logoText: 'PinkNews',
      className: 'text-black font-bold text-2xl'
    },
    { 
      name: 'Condé Nast Traveler', 
      logoText: 'Traveler',
      className: 'text-black font-bold text-2xl'
    },
    { 
      name: 'UNILAD', 
      logoText: 'UNILAD',
      className: 'text-black font-bold text-2xl'
    },
    { 
      name: 'Cosmopolitan', 
      logoText: 'COSMOPOLITAN',
      className: 'text-black font-bold text-xl tracking-wider'
    }
  ];

  useEffect(() => {
    console.debug('[AsSeenIn] mounted');
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % logos.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [logos.length]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + logos.length) % logos.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % logos.length);
  };

  return (
    <section className="py-16 bg-white">
      <div className="container max-w-6xl mx-auto px-6">
        <div className="text-center">
          {/* Header with navigation arrows */}
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-2xl font-bold text-black flex items-center gap-2">
              As seen in 
              <span className="text-2xl">👀</span>
            </h2>
            <div className="flex items-center gap-2">
              <button 
                onClick={goToPrevious}
                className="w-12 h-12 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors"
                aria-label="Previous logos"
              >
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>
              <button 
                onClick={goToNext}
                className="w-12 h-12 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors"
                aria-label="Next logos"
              >
                <ChevronRight className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
          
          {/* Logos Display */}
          <div className="flex items-center justify-center space-x-16 min-w-0 flex-1 mb-8">
            {logos.map((logo, index) => (
              <div key={logo.name} className="flex-shrink-0 flex items-center justify-center min-w-0">
                <span className={`${logo.className} transition-opacity duration-300`}>
                  {logo.logoText}
                </span>
              </div>
            ))}
          </div>
          
          {/* Navigation dots */}
          <div className="flex justify-center space-x-2">
            {logos.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-black' : 'bg-gray-300'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AsSeenIn;

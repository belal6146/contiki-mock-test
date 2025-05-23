
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const AsSeenIn = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const logos = [
    { name: 'BuzzFeed', className: 'text-black font-bold text-xl' },
    { name: 'PinkNews', className: 'text-pink-600 font-bold text-xl' },
    { name: 'Traveler', className: 'text-black font-serif text-xl italic' },
    { name: 'UNILAD', className: 'text-black font-bold text-xl' },
    { name: 'COSMOPOLITAN', className: 'text-black font-bold text-xl tracking-wide' }
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

  const getVisibleLogos = () => {
    const visible = [];
    for (let i = 0; i < 5; i++) {
      const index = (currentIndex + i) % logos.length;
      visible.push(logos[index]);
    }
    return visible;
  };

  return (
    <section className="py-12 bg-white">
      <div className="container max-w-6xl mx-auto px-6">
        <div className="text-center mb-8">
          <h2 className="text-lg font-medium text-gray-800 mb-6">As seen in</h2>
          
          <div className="flex items-center justify-center space-x-8">
            <button 
              onClick={goToPrevious}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Previous logos"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            
            <div className="flex items-center justify-center space-x-12 min-w-0 flex-1">
              {getVisibleLogos().map((logo, index) => (
                <div key={`${logo.name}-${index}`} className="flex-shrink-0">
                  <span className={logo.className}>
                    {logo.name}
                  </span>
                  {index < 4 && (
                    <div className="w-px h-8 bg-red-500 ml-6 inline-block" />
                  )}
                </div>
              ))}
            </div>
            
            <button 
              onClick={goToNext}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Next logos"
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>
          
          <div className="flex justify-center mt-6 space-x-2">
            {logos.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-gray-800' : 'bg-gray-300'
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

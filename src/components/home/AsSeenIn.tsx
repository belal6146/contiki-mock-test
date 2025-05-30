import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const AsSeenIn = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Partner logos matching the Contiki website
  const logos = [
    {
      name: 'BuzzFeed',
      logoText: 'BuzzFeed',
      className: 'text-black font-bold text-2xl md:text-3xl' // Adjusted size
    },
    {
      name: 'PinkNews',
      logoText: 'PinkNews',
      className: 'text-black font-bold text-2xl md:text-3xl' // Adjusted size
    },
    {
      name: 'Condé Nast Traveler',
      logoText: 'Traveler',
      className: 'text-black font-bold text-2xl md:text-3xl' // Adjusted size
    },
    {
      name: 'UNILAD',
      logoText: 'UNILAD',
      className: 'text-black font-bold text-2xl md:text-3xl' // Adjusted size
    },
    {
      name: 'Cosmopolitan',
      logoText: 'COSMOPOLITAN',
      className: 'text-black font-bold text-xl md:text-2xl tracking-wider' // Adjusted size and tracking
    }
  ];

  // Note: Auto-scrolling commented out to prevent interference during styling.
  // Will re-enable or implement slider functionality later.
  // useEffect(() => {
  //   console.debug('[AsSeenIn] mounted');
  //   const interval = setInterval(() => {
  //     setCurrentIndex((prev) => (prev + 1) % logos.length);
  //   }, 3000);
  //   return () => clearInterval(interval);
  // }, [logos.length]);

  const goToPrevious = () => {
    // Simple logic for cycling through logos
    setCurrentIndex((prev) => (prev === 0 ? logos.length - 1 : prev - 1));
  };

  const goToNext = () => {
     // Simple logic for cycling through logos
    setCurrentIndex((prev) => (prev + 1) % logos.length);
  };

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container max-w-6xl mx-auto px-4 lg:px-8">
        <div className="text-center">
          {/* Header with navigation arrows */}
          {/* Using flex to center title and position arrows on the sides */}
          <div className="flex items-center justify-between mb-10 md:mb-16">
             {/* Navigation arrows on the left */}
             <div className="flex items-center gap-2 flex-shrink-0">
               <button
                 onClick={goToPrevious}
                 className="w-10 h-10 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors duration-200"
                 aria-label="Previous logos"
               >
                 <ChevronLeft className="w-5 h-5 text-gray-700" />
               </button>
             </div>
            {/* Title */}
            <h2 className="text-3xl md:text-4xl font-bold text-black flex items-center gap-2 mx-auto">
              As seen in
              <span className="text-3xl md:text-4xl">👀</span> {/* Adjusted eye size */}
            </h2>
             {/* Navigation arrows on the right */}
             <div className="flex items-center gap-2 flex-shrink-0">
               <button
                 onClick={goToNext}
                 className="w-10 h-10 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors duration-200"
                 aria-label="Next logos"
               >
                 <ChevronRight className="w-5 h-5 text-gray-700" />
               </button>
             </div>
          </div>

          {/* Logos Display - Adjusted spacing and ensured centering */}
          {/* Displaying only the current logo for simple cycling */}
          <div className="flex items-center justify-center mb-10 md:mb-12">
            <div key={logos[currentIndex].name} className="flex items-center justify-center">
              <span className={`${logos[currentIndex].className} transition-opacity duration-300`}>
                {logos[currentIndex].logoText}
              </span>
            </div>
          </div>

          {/* Navigation dots - Adjusted spacing and size */}
          <div className="flex justify-center space-x-2 mt-8">
            {logos.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-black' : 'bg-gray-300'
                }`}
                aria-label={`Go to logo ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AsSeenIn;

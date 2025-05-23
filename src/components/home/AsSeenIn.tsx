
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const AsSeenIn = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Updated list with actual Contiki partner logos
  const logos = [
    { 
      name: 'BuzzFeed', 
      src: 'https://www.contiki.com/media/voxkq3ue/feefo-lockup.png?height=126&mode=max&width=126', 
      className: 'text-black font-bold text-xl' 
    },
    { 
      name: 'PinkNews', 
      src: 'https://www.contiki.com/media/2degaq2e/six-two-logo.svg?height=101&mode=max&width=123', 
      className: 'text-pink-600 font-bold text-xl' 
    },
    { 
      name: 'Traveler', 
      src: 'https://www.contiki.com/media/opwmano4/treadright-1.svg?center=0.5%2C0.5&format=webp&height=100&mode=crop&quality=80&width=300', 
      className: 'text-black font-serif text-xl italic' 
    },
    { 
      name: 'UNILAD', 
      src: 'https://www.contiki.com/media/z0kkjtoj/ttc-core-logo-white-rgb.svg?center=0.5%2C0.5&format=webp&height=100&mode=crop&quality=80&width=300', 
      className: 'text-black font-bold text-xl' 
    },
    { 
      name: 'COSMOPOLITAN', 
      src: 'https://www.contiki.com/media/h2qob34a/unwto-2.svg?center=0.5%2C0.5&format=webp&height=100&mode=crop&quality=80&width=300', 
      className: 'text-black font-bold text-xl tracking-wide' 
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
        <div className="text-center">
          <h2 className="text-lg font-medium text-gray-800 mb-8">As seen in</h2>
          
          <div className="flex items-center justify-center">
            <button 
              onClick={goToPrevious}
              className="p-2 rounded-full border border-gray-200 hover:bg-gray-100 transition-colors mr-8"
              aria-label="Previous logos"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            
            <div className="flex items-center justify-center space-x-8 min-w-0 flex-1">
              {getVisibleLogos().map((logo, index) => (
                <React.Fragment key={`${logo.name}-${index}`}>
                  <div className="flex-shrink-0 flex items-center justify-center min-w-0 h-12">
                    {logo.src ? (
                      <img 
                        src={logo.src} 
                        alt={logo.name} 
                        className="h-8 object-contain max-w-[120px]"
                      />
                    ) : (
                      <span className={logo.className}>
                        {logo.name}
                      </span>
                    )}
                  </div>
                  {index < 4 && (
                    <div className="w-px h-8 bg-[#FF6900] flex-shrink-0" />
                  )}
                </React.Fragment>
              ))}
            </div>
            
            <button 
              onClick={goToNext}
              className="p-2 rounded-full border border-gray-200 hover:bg-gray-100 transition-colors ml-8"
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
                  index === currentIndex ? 'bg-[#FF6900]' : 'bg-gray-300'
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

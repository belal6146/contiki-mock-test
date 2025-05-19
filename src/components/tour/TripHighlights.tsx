
import React, { useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Highlight {
  id: string;
  title: string;
  description: string;
  image: string;
  type: string;
}

interface TripHighlightsProps {
  highlights: Highlight[];
}

const TripHighlights: React.FC<TripHighlightsProps> = ({ highlights }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    console.debug('[TripHighlights] mounted', { highlightsCount: highlights.length });
  }, [highlights.length]);
  
  const handleScroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    
    const container = scrollContainerRef.current;
    const scrollAmount = container.offsetWidth;
    const newScrollPosition = direction === 'left' 
      ? container.scrollLeft - scrollAmount 
      : container.scrollLeft + scrollAmount;
      
    container.scrollTo({
      left: newScrollPosition,
      behavior: 'smooth'
    });
    
    console.debug('[TripHighlights] scroll', { direction, newScrollPosition });
  };
  
  if (!highlights || highlights.length === 0) {
    return null;
  }
  
  return (
    <section className="py-12">
      <div className="container">
        <h2 className="text-2xl font-medium text-primary mb-6">Trip Highlights</h2>
        <p className="text-gray-600 mb-8">The must-do experiences that you can cross off your bucket list</p>
        
        <div className="relative">
          {/* Left arrow */}
          <button 
            onClick={() => handleScroll('left')}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 z-10 bg-white rounded-full p-2 shadow-lg"
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          
          {/* Scrollable container */}
          <div 
            ref={scrollContainerRef}
            className="flex overflow-x-auto gap-4 pb-4 hide-scrollbar"
          >
            {highlights.map((highlight) => (
              <div
                key={highlight.id}
                className="min-w-[280px] max-w-[280px] flex-shrink-0 bg-white rounded-lg overflow-hidden shadow"
              >
                <div className="relative">
                  <img
                    src={highlight.image}
                    alt={highlight.title}
                    className="w-full h-44 object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-accent text-white text-xs font-medium px-2 py-1 rounded-md">
                    {highlight.type} Experience
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-2">{highlight.title}</h3>
                  <p className="text-sm text-gray-700 line-clamp-3">{highlight.description}</p>
                  <button className="text-secondary font-medium text-sm mt-3">Read more</button>
                </div>
              </div>
            ))}
          </div>
          
          {/* Right arrow */}
          <button 
            onClick={() => handleScroll('right')}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 z-10 bg-white rounded-full p-2 shadow-lg"
            aria-label="Scroll right"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
        
        {/* Pagination dots */}
        <div className="flex justify-center mt-6 space-x-2">
          {highlights.map((_, index) => (
            <div 
              key={index}
              className={`w-2 h-2 rounded-full ${index === 0 ? 'bg-accent' : 'bg-gray-300'}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TripHighlights;


import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  from: string;
  to: string;
}

interface MapItineraryProps {
  itinerary: ItineraryDay[];
  mapImageUrl?: string;
}

const MapItinerary: React.FC<MapItineraryProps> = ({ 
  itinerary,
  mapImageUrl = '/placeholder.svg'
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  useEffect(() => {
    console.debug('[MapItinerary] mounted', { daysCount: itinerary.length });
  }, [itinerary.length]);
  
  const handleNavigation = (index: number) => {
    setActiveIndex(index);
    console.debug('[MapItinerary] slide', { index, title: itinerary[index].title });
  };
  
  return (
    <section className="py-12">
      <div className="container">
        <h2 className="text-2xl font-medium text-primary mb-6">Map & Itinerary</h2>
        
        {/* Map section */}
        <div className="bg-gray-200 rounded-lg overflow-hidden mb-8 h-[400px] relative">
          <img 
            src={mapImageUrl} 
            alt="Trip route map" 
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Itinerary timeline */}
        <div className="relative mb-12">
          {/* Day indicators */}
          <div className="flex justify-between items-center relative mb-8">
            {/* Line connecting all days */}
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-300 -z-10" />
            
            {/* Day dots */}
            <div className="flex justify-between w-full relative z-0">
              {itinerary.map((day, index) => (
                <button
                  key={index}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-colors ${
                    index <= activeIndex 
                      ? 'bg-accent text-white' 
                      : 'bg-white border border-gray-300 text-gray-600'
                  }`}
                  onClick={() => handleNavigation(index)}
                  aria-label={`Day ${day.day}`}
                >
                  {day.day}
                </button>
              ))}
            </div>
          </div>
          
          {/* Location indicators */}
          <div className="flex overflow-x-auto hide-scrollbar pb-6">
            {itinerary.map((day, index) => (
              <div
                key={index}
                className={`min-w-[180px] ${
                  index < itinerary.length - 1 ? 'border-r border-gray-300' : ''
                } px-4 first:pl-0 last:border-0`}
              >
                <div className="font-medium text-sm mb-1">
                  {day.from}
                  {day.to && day.to !== day.from && (
                    <span className="mx-1">-</span>
                  )}
                  {day.to && day.to !== day.from && day.to}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Download itinerary button */}
        <div className="flex justify-center mb-8">
          <button className="flex items-center space-x-2 text-primary font-medium">
            <span>DOWNLOAD ITINERARY</span>
          </button>
        </div>
        
        {/* Expand all days button */}
        <div className="flex justify-end mb-4">
          <button className="text-secondary text-sm font-medium">
            EXPAND ALL DAYS
          </button>
        </div>
      </div>
    </section>
  );
};

export default MapItinerary;

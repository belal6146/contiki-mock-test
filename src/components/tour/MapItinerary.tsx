
import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  from?: string;
  to?: string;
  meals?: string[];
  accommodation?: string;
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
  
  // Ensure each day has from/to fields (use defaults if missing)
  const processedItinerary = itinerary.map(day => ({
    ...day,
    from: day.from || day.title.split(' to ')[0] || 'Location',
    to: day.to || day.title.split(' to ')[1] || day.from || 'Location'
  }));
  
  return (
    <section className="py-12 bg-white">
      <div className="container">
        <h2 className="text-2xl font-medium text-primary mb-6">Map & Itinerary</h2>
        
        {/* Map section */}
        <div className="bg-gray-200 rounded-lg overflow-hidden mb-8 h-[400px] relative">
          <img 
            src={mapImageUrl} 
            alt="Trip route map" 
            className="w-full h-full object-cover"
          />
          
          {/* Mapbox placeholder overlay with message */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 text-white">
            <div className="text-center">
              <p className="text-lg font-medium mb-2">Interactive Map</p>
              <p className="text-sm opacity-80">Map visualization would appear here</p>
            </div>
          </div>
        </div>
        
        {/* Itinerary timeline */}
        <div className="relative mb-12">
          {/* Day indicators */}
          <div className="flex justify-between items-center relative mb-8">
            {/* Line connecting all days */}
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-300 -z-10" />
            
            {/* Day dots */}
            <div className="flex justify-between w-full relative z-0">
              {processedItinerary.map((day, index) => (
                <button
                  key={index}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-colors duration-150 ${
                    index <= activeIndex 
                      ? 'bg-accent text-white' 
                      : 'bg-white border border-gray-300 text-gray-600'
                  }`}
                  onClick={() => handleNavigation(index)}
                  aria-label={`Day ${day.day}`}
                  aria-current={index === activeIndex ? 'step' : undefined}
                >
                  {day.day}
                </button>
              ))}
            </div>
          </div>
          
          {/* Location indicators */}
          <div className="flex overflow-x-auto hide-scrollbar pb-6 scrollbar-hide">
            {processedItinerary.map((day, index) => (
              <div
                key={index}
                className={`min-w-[180px] ${
                  index < processedItinerary.length - 1 ? 'border-r border-gray-300' : ''
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
          <Button 
            variant="outline" 
            className="flex items-center space-x-2 text-primary font-medium border-primary hover:bg-primary/5 transition-colors duration-150"
          >
            <span>DOWNLOAD ITINERARY</span>
          </Button>
        </div>
        
        {/* Expand all days button */}
        <div className="flex justify-end mb-4">
          <Button 
            variant="ghost" 
            className="text-secondary text-sm font-medium hover:bg-secondary/5 transition-colors duration-150"
          >
            EXPAND ALL DAYS
          </Button>
        </div>
      </div>
    </section>
  );
};

export default MapItinerary;

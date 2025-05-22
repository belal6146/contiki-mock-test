
import React from 'react';

interface ItineraryTimelineProps {
  itinerary: Array<{
    day: number;
    title: string;
    from?: string;
    to?: string;
  }>;
  activeDay: number;
  onDayClick: (index: number) => void;
}

const ItineraryTimeline: React.FC<ItineraryTimelineProps> = ({
  itinerary = [],
  activeDay,
  onDayClick
}) => {
  // Handle empty itinerary
  if (!itinerary || itinerary.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        Itinerary information not available
      </div>
    );
  }

  // Ensure each day has from/to fields (use defaults if missing)
  const processedItinerary = itinerary.map(day => ({
    ...day,
    day: day.day || 1,
    title: day.title || 'Tour Day',
    from: day.from || (day.title ? day.title.split(' to ')[0] : 'Location'),
    to: day.to || (day.title ? day.title.split(' to ')[1] || day.from : 'Location')
  }));

  return (
    <div className="relative mb-8">
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
                index <= activeDay 
                  ? 'bg-accent text-black' 
                  : 'bg-white border border-gray-300 text-gray-600'
              }`}
              onClick={() => onDayClick(index)}
              aria-label={`Day ${day.day}`}
              aria-current={index === activeDay ? 'step' : undefined}
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
  );
};

export default ItineraryTimeline;

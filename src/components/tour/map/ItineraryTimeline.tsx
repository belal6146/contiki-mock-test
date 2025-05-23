
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
      {/* Main timeline container */}
      <div className="relative">
        {/* Background line */}
        <div className="absolute top-6 left-0 w-full h-0.5 bg-gray-300 z-0" />
        
        {/* Day markers and labels */}
        <div className="relative z-10">
          {/* Day circles */}
          <div className="flex justify-between items-center mb-6">
            {processedItinerary.map((day, index) => (
              <button
                key={index}
                className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-200 border-2 ${
                  index === activeDay 
                    ? 'bg-[#CCFF00] border-black text-black shadow-lg scale-110' 
                    : index < activeDay
                    ? 'bg-gray-800 border-gray-800 text-white'
                    : 'bg-white border-gray-300 text-gray-600 hover:border-gray-400'
                }`}
                onClick={() => onDayClick(index)}
                aria-label={`Day ${day.day}: ${day.title}`}
                aria-current={index === activeDay ? 'step' : undefined}
              >
                {day.day}
              </button>
            ))}
          </div>
          
          {/* Location labels */}
          <div className="flex justify-between">
            {processedItinerary.map((day, index) => (
              <div
                key={index}
                className="text-center max-w-[120px] px-2"
              >
                <div className={`text-xs font-medium transition-colors duration-200 ${
                  index === activeDay 
                    ? 'text-black font-bold' 
                    : 'text-gray-600'
                }`}>
                  {day.title.includes(' to ') ? (
                    <div className="flex flex-col">
                      <span>{day.from}</span>
                      <span className="text-gray-400">to</span>
                      <span>{day.to}</span>
                    </div>
                  ) : (
                    <span>{day.from}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItineraryTimeline;

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
        {/* Background line - using Chartreuse */}
        <div className="absolute top-6 left-0 w-full h-0.5 bg-gray-300 z-0" />
        
        {/* Day markers and labels */}
        <div className="relative z-10">
          {/* Day circles - using Chartreuse for active state */}
          <div className="flex justify-between items-center mb-3">
            {processedItinerary.map((day, index) => (
              <button
                key={index}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-200 border-2 ${
                  index === activeDay
                    ? 'bg-[#CCFF00] border-[#CCFF00] text-black shadow-lg'
                    : index < activeDay
                    ? 'bg-gray-500 border-gray-500 text-white'
                    : 'bg-white border-gray-300 text-gray-600 hover:border-gray-400'
                }`}
                onClick={() => onDayClick(index)}
                aria-label={`Day ${day.day}: ${day.title}`}
                aria-current={index === activeDay ? 'step' : undefined}
                tabIndex={0}
                type="button"
              >
                {day.day}
              </button>
            ))}
          </div>
          
          {/* Location labels */}
          <div className="flex justify-between text-center">
            {processedItinerary.map((day, index) => (
              <div
                key={index}
                className="text-center max-w-[120px] px-1"
              >
                <div className={`text-[10px] font-semibold transition-colors duration-200 ${index === activeDay ? 'text-[#CCFF00]' : 'text-gray-600'}`}>
                  {day.title.includes(' to ') ? (
                    <div className="flex flex-col items-center">
                      <span>{day.from}</span>
                      <span className="text-gray-400 font-normal text-[9px]">to</span>
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

import React from 'react';
import { MapPin, ChevronUp, ChevronDown, Utensils, Building } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DayDetailViewProps {
  day: {
    day: number;
    title: string;
    description: string;
    coordinates?: [number, number];
    from?: string;
    to?: string;
    meals?: string[];
    accommodation?: string;
  };
  isExpanded: boolean;
  onToggle: () => void;
  onPrevious: () => void;
  onNext: () => void;
  hasPrevious: boolean;
  hasNext: boolean;
}

const DayDetailView: React.FC<DayDetailViewProps> = ({
  day,
  isExpanded,
  onToggle,
  onPrevious,
  onNext,
  hasPrevious,
  hasNext
}) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      {/* Header - Adjusted spacing and font weight */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="bg-[#CCFF00] text-black px-3 py-0.5 rounded-full text-xs font-bold uppercase">
            Day {day.day}
          </div>
          <h3 className="text-lg font-black text-black">{day.from || day.title}</h3>
        </div>
        {/* Toggle Button - Adjusted font and spacing */}
        <button
          onClick={onToggle}
          className="flex items-center gap-1 text-[10px] font-bold text-gray-600 hover:text-gray-800 uppercase"
        >
          {isExpanded ? 'COLLAPSE' : 'EXPAND'}
          {isExpanded ? (
            <ChevronUp className="w-3 h-3" />
          ) : (
            <ChevronDown className="w-3 h-3" />
          )}
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Location with pin icon and image - Adjusted image container styling */}
        <div className="flex items-start gap-4 mb-4">
          <div className="bg-[#CCFF00] rounded-full p-2 mt-1">
            <MapPin className="w-4 h-4 text-black" />
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-base text-black mb-2">{day.from || day.title}</h4>
            <p className="text-gray-700 text-sm leading-relaxed">{day.description}</p>

            {day.to && (
              <div className="flex items-center gap-2 mt-3 text-sm text-gray-600">
                <span className="font-medium">Full day to enjoy the beaches and town of {day.to}</span>
              </div>
            )}
          </div>
          {/* Image - Styling to match blueprint */}
          <div className="w-48 h-32 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 border border-gray-200 shadow-sm">
            <img
              src="https://www.contiki.com/media/uhxfozab/group-of-people-in-blue-lake-surrounded-by-mountains.jpg?center=0.5%2C0.5&format=webp&height=200&mode=crop&quality=80&width=300"
              alt={`${day.from || day.title} scenery`}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Accommodation and Meals - Adjusted spacing and icon color */}
        <div className="space-y-4 mb-4 text-sm text-gray-700">
          {day.accommodation && (
            <div className="flex items-center gap-3">
              <Building className="w-4 h-4 text-gray-600" />
              <div>
                <span className="font-medium">Paradise Beach (or similar)</span>
                <div className="text-xs text-gray-500">View Details</div>
              </div>
            </div>
          )}

          {day.meals && day.meals.length > 0 && (
            <div className="flex items-center gap-3">
              <Utensils className="w-4 h-4 text-gray-600" />
              <div>
                <span className="font-medium">Included Meals</span>
                <div className="text-xs text-gray-500">{day.meals.join(', ')}</div>
              </div>
            </div>
          )}
        </div>

        {isExpanded && (
          <div className="border-t border-gray-200 pt-4">
            {/* Day Highlights */}
            <div className="mb-6">
              <h5 className="font-bold text-lg text-black mb-4">Day Highlights</h5>

              {/* Adjusted container styling */}
              <div className="bg-gray-100 rounded-lg p-4 border border-gray-200 shadow-sm">
                <div className="flex items-start gap-4">
                  {/* Adjusted image container styling */}
                  <div className="w-48 h-32 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0 border border-gray-300 shadow-sm">
                    <img
                      src="https://www.contiki.com/media/jfzlex0q/colosseum-destiantion-image.jpg?center=0.44179409763085564%2C0.5350877192982456&format=webp&height=200&mode=crop&quality=80&width=300"
                      alt="Beach experience"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    {/* Badge styling */}
                    <div className="bg-red-600 text-white text-xs px-2 py-1 rounded inline-block mb-2 uppercase font-bold">
                      Included Experience
                    </div>
                    {/* Title and Description styling */}
                    <h6 className="font-bold text-black mb-2">Chill out on Mykonos' LGBTQIA+ Friendly Beach</h6>
                    <p className="text-sm text-gray-600 mb-3">
                      Mykonos is the LGBTQIA+ capital of Greece. So obviously, we'll spend a full day chilling on one...
                    </p>
                    {/* Read More link styling */}
                    <button className="text-sm font-bold text-blue-600 underline hover:text-blue-800">
                      Read More
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation - Removed middle text and adjusted button styling */}
        <div className="flex justify-between items-center pt-4 border-t border-gray-200">
          <Button
            variant="ghost"
            onClick={onPrevious}
            disabled={!hasPrevious}
            className="flex items-center gap-1 text-sm font-bold text-gray-600 hover:text-gray-800"
          >
            ← Previous Day
          </Button>

          <Button
            variant="ghost"
            onClick={onNext}
            disabled={!hasNext}
            className="flex items-center gap-1 text-sm font-bold text-gray-600 hover:text-gray-800"
          >
            Next Day →
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DayDetailView;

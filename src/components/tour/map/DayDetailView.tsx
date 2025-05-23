
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
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="bg-[#FF6900] text-white px-2 py-1 rounded text-sm font-bold">
            Day {day.day}
          </div>
          <h3 className="text-lg font-bold">{day.from || day.title}</h3>
        </div>
        <button
          onClick={onToggle}
          className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-800"
        >
          {isExpanded ? 'COLLAPSE' : 'EXPAND'}
          {isExpanded ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Location with pin icon */}
        <div className="flex items-start gap-3 mb-4">
          <div className="bg-[#CCFF00] rounded-full p-2 mt-1">
            <MapPin className="w-4 h-4 text-black" />
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-lg mb-2">{day.from || day.title}</h4>
            <p className="text-gray-700 text-sm leading-relaxed">{day.description}</p>
            
            {day.to && (
              <div className="flex items-center gap-2 mt-3 text-sm text-gray-600">
                <span className="font-medium">Full day to enjoy the beaches and town of {day.to}</span>
              </div>
            )}
          </div>
          <div className="w-64 h-40 bg-gray-200 rounded-lg overflow-hidden">
            <img
              src="https://www.contiki.com/media/uhxfozab/group-of-people-in-blue-lake-surrounded-by-mountains.jpg?center=0.5%2C0.5&format=webp&height=200&mode=crop&quality=80&width=300"
              alt={`${day.from || day.title} scenery`}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Accommodation and Meals */}
        <div className="space-y-3 mb-4">
          {day.accommodation && (
            <div className="flex items-center gap-3">
              <Building className="w-4 h-4 text-gray-500" />
              <div>
                <span className="font-medium text-sm">Paradise Beach (or similar)</span>
                <div className="text-xs text-gray-500">View Details</div>
              </div>
            </div>
          )}
          
          {day.meals && day.meals.length > 0 && (
            <div className="flex items-center gap-3">
              <Utensils className="w-4 h-4 text-gray-500" />
              <div>
                <span className="font-medium text-sm">Included Meals</span>
                <div className="text-xs text-gray-500">{day.meals.join(', ')}</div>
              </div>
            </div>
          )}
        </div>

        {isExpanded && (
          <div className="border-t border-gray-200 pt-4">
            {/* Day Highlights */}
            <div className="mb-6">
              <h5 className="font-bold text-lg mb-4">Day Highlights</h5>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-start gap-4">
                  <div className="w-48 h-32 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src="https://www.contiki.com/media/jfzlex0q/colosseum-destiantion-image.jpg?center=0.44179409763085564%2C0.5350877192982456&format=webp&height=200&mode=crop&quality=80&width=300"
                      alt="Beach experience"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="bg-red-500 text-white text-xs px-2 py-1 rounded inline-block mb-2">
                      Included Experience
                    </div>
                    <h6 className="font-bold mb-2">Chill out on Mykonos' LGBTQIA+ Friendly Beach</h6>
                    <p className="text-sm text-gray-600 mb-3">
                      Mykonos is the LGBTQIA+ capital of Greece. So obviously, we'll spend a full day chilling on one...
                    </p>
                    <button className="text-sm font-medium text-black underline">
                      Read More
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between items-center pt-4 border-t border-gray-200">
          <Button
            variant="ghost"
            onClick={onPrevious}
            disabled={!hasPrevious}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
          >
            ← Previous Day
          </Button>
          
          <div className="text-sm text-gray-500">
            {day.to && `Full day to enjoy the beaches and town of ${day.to}`}
          </div>
          
          <Button
            variant="ghost"
            onClick={onNext}
            disabled={!hasNext}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
          >
            Next Day →
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DayDetailView;

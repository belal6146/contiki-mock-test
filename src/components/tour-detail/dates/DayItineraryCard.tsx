import React from 'react';
import { MapPin, Building, Utensils, ArrowRight } from 'lucide-react';

interface DayItineraryCardProps {
  day: {
    day: number;
    title: string;
    description: string;
    from?: string;
    to?: string;
    accommodation?: string;
    meals?: string[];
    image?: string;
  };
}

const DayItineraryCard: React.FC<DayItineraryCardProps> = ({ day }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
      {/* Header */}
      <div className="bg-[#CCFF00] text-black px-4 py-2">
        <span className="font-bold">Day {day.day}</span>
      </div>
      
      {/* Content */}
      <div className="p-4">
        {/* Location */}
        <div className="flex items-start gap-3 mb-4">
          <div className="bg-[#CCFF00] rounded-full p-2 mt-1">
            <MapPin className="w-4 h-4 text-black" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-lg mb-1">{day.from || day.title}</h3>
            <p className="text-gray-600 text-sm mb-3">{day.description}</p>
            
            {day.to && (
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                <span className="font-medium">Full day to enjoy the beaches and town of {day.to}</span>
              </div>
            )}
          </div>
          
          {/* Image */}
          <div className="w-32 h-24 bg-gray-200 rounded-lg overflow-hidden">
            <img
              src={day.image || "https://www.contiki.com/media/uhxfozab/group-of-people-in-blue-lake-surrounded-by-mountains.jpg?center=0.5%2C0.5&format=webp&height=200&mode=crop&quality=80&width=300"}
              alt={`${day.from || day.title} scenery`}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Accommodation and Meals */}
        <div className="space-y-2">
          {day.accommodation && (
            <div className="flex items-center gap-2 text-sm">
              <Building className="w-4 h-4 text-gray-500" />
              <span className="font-medium">{day.accommodation}</span>
              <span className="text-blue-600 underline cursor-pointer text-xs">View Details</span>
            </div>
          )}
          
          {day.meals && day.meals.length > 0 && (
            <div className="flex items-center gap-2 text-sm">
              <Utensils className="w-4 h-4 text-gray-500" />
              <div>
                <span className="font-medium">Included Meals</span>
                <div className="text-gray-500 text-xs">{day.meals.join(', ')}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DayItineraryCard;

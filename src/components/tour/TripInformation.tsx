
import React from 'react';
import { Users, Heart, Calendar, Map, Briefcase, Utensils } from 'lucide-react';

interface TripInformationProps {
  ageRange: string;
  groupSize: string;
  physicalRating: number;
  countries: number;
  tripType: string;
  meals: {
    breakfasts: number;
    lunches: number;
    dinners: number;
  };
}

const TripInformation: React.FC<TripInformationProps> = ({
  ageRange = '18-35',
  groupSize = 'Average 30, Maximum 45',
  physicalRating = 2,
  countries = 1,
  tripType = 'Island Hopping',
  meals = {
    breakfasts: 10,
    lunches: 0,
    dinners: 3
  }
}) => {
  const renderPhysicalRating = (rating: number) => {
    const levels = [];
    for (let i = 1; i <= 5; i++) {
      levels.push(
        <div 
          key={i}
          className={`h-2 w-5 rounded ${i <= rating ? 'bg-[#CCFF00]' : 'bg-gray-200'}`}
        />
      );
    }
    return levels;
  };
  
  const getPhysicalRatingText = (rating: number) => {
    switch(rating) {
      case 1: return 'Easy - Little physical activity';
      case 2: return 'Moderate - Some walking, stairs';
      case 3: return 'Active - Regular walking, some hiking';
      case 4: return 'Challenging - Daily activity, hiking';
      case 5: return 'Demanding - Very active, strenuous';
      default: return 'Moderate';
    }
  };

  return (
    <section className="py-12 bg-white border-t border-gray-200">
      <div className="container">
        <h2 className="text-2xl md:text-3xl font-bold mb-8">Trip Information</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Age Range */}
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 hover:shadow-sm transition-shadow">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-[#CCFF00] p-3 rounded-full">
                <Users className="w-5 h-5 text-black" />
              </div>
              <h3 className="font-bold text-lg">Age Range</h3>
            </div>
            
            <div>
              <div className="text-3xl font-bold mb-2">{ageRange}</div>
              <p className="text-gray-600 text-sm">
                Contiki trips are designed for young travelers between 18-35 years old.
              </p>
            </div>
          </div>
          
          {/* Group Size */}
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 hover:shadow-sm transition-shadow">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-[#CCFF00] p-3 rounded-full">
                <Users className="w-5 h-5 text-black" />
              </div>
              <h3 className="font-bold text-lg">Group Size</h3>
            </div>
            
            <div>
              <div className="text-2xl font-bold mb-2">{groupSize}</div>
              <p className="text-gray-600 text-sm">
                The perfect size to meet new friends while still feeling intimate.
              </p>
            </div>
          </div>
          
          {/* Physical Rating */}
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 hover:shadow-sm transition-shadow">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-[#CCFF00] p-3 rounded-full">
                <Heart className="w-5 h-5 text-black" />
              </div>
              <h3 className="font-bold text-lg">Physical Rating</h3>
            </div>
            
            <div>
              <div className="flex gap-1 mb-2">
                {renderPhysicalRating(physicalRating)}
              </div>
              <div className="font-bold mb-1">{getPhysicalRatingText(physicalRating)}</div>
              <p className="text-gray-600 text-sm">
                Some walking between locations and sightseeing spots, with stairs and uneven surfaces.
              </p>
            </div>
          </div>
          
          {/* Trip Type */}
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 hover:shadow-sm transition-shadow">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-[#CCFF00] p-3 rounded-full">
                <Briefcase className="w-5 h-5 text-black" />
              </div>
              <h3 className="font-bold text-lg">Trip Type</h3>
            </div>
            
            <div>
              <div className="text-2xl font-bold mb-2">{tripType}</div>
              <p className="text-gray-600 text-sm">
                Experience multiple destinations via boat transfers and local transport.
              </p>
            </div>
          </div>
          
          {/* Countries */}
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 hover:shadow-sm transition-shadow">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-[#CCFF00] p-3 rounded-full">
                <Map className="w-5 h-5 text-black" />
              </div>
              <h3 className="font-bold text-lg">Countries</h3>
            </div>
            
            <div>
              <div className="text-2xl font-bold mb-2">{countries} Country</div>
              <p className="text-gray-600 text-sm">
                Deep dive into Greek culture, cuisine and incredible landscapes.
              </p>
            </div>
          </div>
          
          {/* Meals */}
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 hover:shadow-sm transition-shadow">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-[#CCFF00] p-3 rounded-full">
                <Utensils className="w-5 h-5 text-black" />
              </div>
              <h3 className="font-bold text-lg">Meals</h3>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Breakfasts</span>
                <span className="font-bold">{meals.breakfasts}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Lunches</span>
                <span className="font-bold">{meals.lunches}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Dinners</span>
                <span className="font-bold">{meals.dinners}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TripInformation;

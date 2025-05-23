import React, { useState } from 'react';
import { MapPin, ChevronUp, ChevronDown, Utensils, Building, Camera, Compass, Coffee, GlassWater, Bus, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

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
  const [showMoreHighlights, setShowMoreHighlights] = useState(false);
  
  // Mock data for day highlights
  const dayHighlights = [
    {
      title: 'Chill out on Mykonos Beach',
      description: "Mykonos is the LGBTQIA+ capital of Greece. So obviously, we'll spend a full day chilling on one of its stunning beaches.",
      image: 'https://www.contiki.com/media/jfzlex0q/colosseum-destiantion-image.jpg?center=0.44179409763085564%2C0.5350877192982456&format=webp&height=200&mode=crop&quality=80&width=300',
      type: 'Included Experience'
    },
    {
      title: 'Coastal Walking Tour',
      description: 'Explore the stunning coastal paths with a knowledgeable local guide who will share stories and history.',
      image: 'https://www.contiki.com/media/uhxfozab/group-of-people-in-blue-lake-surrounded-by-mountains.jpg?center=0.5%2C0.5&format=webp&height=200&mode=crop&quality=80&width=300',
      type: 'Optional Experience'
    }
  ];

  // Helper function to determine badge color
  const getBadgeColor = (type: string) => {
    if (type.includes('Included')) return 'bg-red-500 text-white';
    if (type.includes('Optional')) return 'bg-blue-500 text-white';
    return 'bg-green-500 text-white';
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="bg-[#CCFF00] text-black px-2 py-1 rounded text-sm font-bold">
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
                <span className="font-medium">{day.from}</span>
                <ArrowRight className="w-4 h-4" />
                <span className="font-medium">{day.to}</span>
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

        {/* Travel Details */}
        <div className="border-t border-gray-200 pt-4 pb-4">
          <div className="flex flex-wrap gap-4">
            {day.to && (
              <div className="flex items-center gap-2 bg-gray-50 rounded-lg p-2">
                <Bus className="w-4 h-4 text-gray-600" />
                <span className="text-sm font-medium">Travel Day</span>
              </div>
            )}
            
            {day.meals && day.meals.includes('breakfast') && (
              <div className="flex items-center gap-2 bg-gray-50 rounded-lg p-2">
                <Coffee className="w-4 h-4 text-gray-600" />
                <span className="text-sm font-medium">Breakfast</span>
              </div>
            )}
            
            {day.meals && day.meals.includes('dinner') && (
              <div className="flex items-center gap-2 bg-gray-50 rounded-lg p-2">
                <Utensils className="w-4 h-4 text-gray-600" />
                <span className="text-sm font-medium">Dinner</span>
              </div>
            )}
            
            {day.accommodation && (
              <div className="flex items-center gap-2 bg-gray-50 rounded-lg p-2">
                <Building className="w-4 h-4 text-gray-600" />
                <span className="text-sm font-medium">Hotel Stay</span>
              </div>
            )}
          </div>
        </div>

        {/* Accommodation and Meals */}
        <div className="space-y-3 mb-4">
          {day.accommodation && (
            <div className="flex items-center gap-3">
              <Building className="w-4 h-4 text-gray-500" />
              <div>
                <span className="font-medium text-sm">{day.accommodation || 'Paradise Beach Resort (or similar)'}</span>
                <div className="text-xs text-gray-500 underline cursor-pointer">View Details</div>
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
              
              <div className="space-y-4">
                {dayHighlights.map((highlight, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-start gap-4">
                      <div className="w-48 h-32 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={highlight.image}
                          alt={highlight.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className={`${getBadgeColor(highlight.type)} text-xs px-2 py-1 rounded inline-block mb-2`}>
                          {highlight.type}
                        </div>
                        <h6 className="font-bold mb-2">{highlight.title}</h6>
                        <p className="text-sm text-gray-600 mb-3">
                          {highlight.description}
                        </p>
                        <button className="text-sm font-medium text-black underline">
                          Read More
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {dayHighlights.length > 2 && !showMoreHighlights && (
                <button 
                  className="text-sm font-medium text-black underline mt-4"
                  onClick={() => setShowMoreHighlights(true)}
                >
                  Show More Highlights
                </button>
              )}
            </div>
            
            {/* Free Time Add-Ons */}
            <div className="mb-6">
              <h5 className="font-bold text-lg mb-4">Free Time Add-Ons</h5>
              
              <div className="bg-[#F7F7F7] rounded-lg p-4">
                <div className="flex items-start gap-4">
                  <div className="w-48 h-32 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src="https://www.contiki.com/media/smpji2l0/group-of-young-people-riding-bikes-vietnam-road.jpg?center=0.6161542586835618%2C0.4987480082915613&format=webp&height=616&mode=crop&quality=80&width=720"
                      alt="Sunset Sailing Cruise"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="bg-blue-500 text-white text-xs px-2 py-1 rounded inline-block mb-2">
                      Optional Experience
                    </div>
                    <h6 className="font-bold mb-2">Sunset Sailing Cruise</h6>
                    <p className="text-sm text-gray-600 mb-3">
                      Cruise around the crystal clear waters of the Aegean Sea, taking in the stunning Mykonos coastline at sunset.
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="font-bold">€45</span>
                      <button className="bg-[#CCFF00] text-black text-sm px-3 py-1 rounded font-medium">
                        Add to My Trip
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Local Recommendations */}
            <div className="mb-6">
              <h5 className="font-bold text-lg mb-4">Local Recommendations</h5>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Coffee className="w-5 h-5 text-gray-700" />
                    <h6 className="font-bold">Best Coffee</h6>
                  </div>
                  <p className="text-sm text-gray-600">
                    Visit Kosta's Cafe near the beach for the best traditional Greek coffee experience.
                  </p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Compass className="w-5 h-5 text-gray-700" />
                    <h6 className="font-bold">Hidden Gem</h6>
                  </div>
                  <p className="text-sm text-gray-600">
                    Check out the small chapel on the hill for amazing views of the harbor and sunset.
                  </p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Camera className="w-5 h-5 text-gray-700" />
                    <h6 className="font-bold">Photo Spot</h6>
                  </div>
                  <p className="text-sm text-gray-600">
                    Head to the Old Port early in the morning for the perfect Instagram-worthy shots.
                  </p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <GlassWater className="w-5 h-5 text-gray-700" />
                    <h6 className="font-bold">Local Drink</h6>
                  </div>
                  <p className="text-sm text-gray-600">
                    Try the local ouzo at Dimitri's Taverna in the heart of the old town.
                  </p>
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
            {day.to && `Full day to enjoy ${day.to}`}
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

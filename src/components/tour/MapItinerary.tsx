
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import MapDisplay from './map/MapDisplay';
import ItineraryTimeline from './map/ItineraryTimeline';

// Define both types for compatibility
export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  coordinates: [number, number]; // This is a tuple type
  from?: string;
  to?: string;
  meals?: string[];
  accommodation?: string;
}

// Accept both the older DayDetails type and the newer ItineraryDay type
export type MapItineraryProps = {
  itinerary: Array<ItineraryDay | {
    day: number;
    title: string;
    description: string;
    meals?: string[];
    accommodation?: string;
  }>;
};

const MapItinerary: React.FC<MapItineraryProps> = ({ itinerary = [] }) => {
  const [activeDay, setActiveDay] = useState<number>(0);
  const [viewType, setViewType] = useState<'list' | 'grid'>('list');
  
  useEffect(() => {
    if (itinerary.length > 0) {
      setActiveDay(0);
    }
  }, [itinerary]);

  // Find currently selected day details
  const currentDay = itinerary[activeDay];
  
  // Safely check if coordinates exist before accessing
  const hasCoordinates = currentDay && 'coordinates' in currentDay && currentDay.coordinates;

  const handleDayClick = (index: number) => {
    setActiveDay(index);
  };

  return (
    <section className="py-12 bg-white border-t border-gray-200">
      <div className="container">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Trip Map & Itinerary</h2>
            <p className="text-gray-600">Follow the route of your trip and see the key places you'll visit</p>
          </div>
          
          {/* View Toggle */}
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">Change view</span>
            <div className="flex border border-gray-300 rounded">
              <button
                onClick={() => setViewType('list')}
                className={`p-2 ${viewType === 'list' ? 'bg-gray-200' : 'bg-white'}`}
                aria-label="List view"
              >
                <div className="w-4 h-4 flex flex-col gap-1">
                  <div className="h-0.5 bg-gray-600"></div>
                  <div className="h-0.5 bg-gray-600"></div>
                  <div className="h-0.5 bg-gray-600"></div>
                </div>
              </button>
              <button
                onClick={() => setViewType('grid')}
                className={`p-2 ${viewType === 'grid' ? 'bg-[#CCFF00]' : 'bg-white'}`}
                aria-label="Grid view"
              >
                <div className="w-4 h-4 grid grid-cols-2 gap-0.5">
                  <div className="bg-gray-600"></div>
                  <div className="bg-gray-600"></div>
                  <div className="bg-gray-600"></div>
                  <div className="bg-gray-600"></div>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center mb-8">
          <Button 
            variant="outline" 
            className="flex items-center space-x-2 text-black font-medium border-black hover:bg-gray-50"
          >
            <span>📥</span>
            <span>DOWNLOAD ITINERARY</span>
          </Button>
          
          <Button 
            variant="ghost" 
            className="text-gray-600 text-sm font-medium hover:bg-gray-50"
          >
            EXPAND ALL DAYS
          </Button>
        </div>

        {/* Timeline */}
        <ItineraryTimeline 
          itinerary={itinerary} 
          activeDay={activeDay}
          onDayClick={handleDayClick} 
        />

        {/* Map and Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          {/* Map Component */}
          <div className="h-[500px] bg-gray-100 rounded-lg overflow-hidden">
            {hasCoordinates ? (
              <MapDisplay 
                itinerary={itinerary.filter((day): day is ItineraryDay => 'coordinates' in day)}
                onMarkerClick={(index) => setActiveDay(index)}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-500">
                <div className="text-center">
                  <div className="text-4xl mb-4">🗺️</div>
                  <p>Interactive map coming soon</p>
                </div>
              </div>
            )}
          </div>

          {/* Day Details */}
          {currentDay && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold mb-2">Day {currentDay.day}</h3>
                <h4 className="text-lg font-semibold mb-3 text-gray-800">{currentDay.title}</h4>
                <p className="text-gray-700 mb-4">{currentDay.description}</p>
                
                {/* Additional details if available */}
                {'meals' in currentDay && currentDay.meals && currentDay.meals.length > 0 && (
                  <div className="mb-4">
                    <h5 className="font-semibold mb-2">Meals included:</h5>
                    <ul className="list-disc list-inside text-gray-700">
                      {currentDay.meals.map((meal, index) => (
                        <li key={index}>{meal}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {'accommodation' in currentDay && currentDay.accommodation && (
                  <div className="mb-4">
                    <h5 className="font-semibold mb-2">Accommodation:</h5>
                    <p className="text-gray-700">{currentDay.accommodation}</p>
                  </div>
                )}
              </div>
              
              {/* Navigation */}
              <div className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => setActiveDay(Math.max(0, activeDay - 1))}
                  disabled={activeDay === 0}
                  className="flex items-center gap-2"
                >
                  <span>←</span>
                  Previous Day
                </Button>
                
                <Button
                  variant="outline"
                  onClick={() => setActiveDay(Math.min(itinerary.length - 1, activeDay + 1))}
                  disabled={activeDay === itinerary.length - 1}
                  className="flex items-center gap-2"
                >
                  Next Day
                  <span>→</span>
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default MapItinerary;

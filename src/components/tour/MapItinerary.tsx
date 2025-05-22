
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import MapDisplay from './map/MapDisplay';
import ItineraryTimeline from './map/ItineraryTimeline';
import ActionButtons from './map/ActionButtons';

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
  const [activeDay, setActiveDay] = useState<number>(1);
  
  useEffect(() => {
    if (itinerary.length > 0) {
      setActiveDay(itinerary[0].day);
    }
  }, [itinerary]);

  // Find currently selected day details
  const currentDay = itinerary.find(day => day.day === activeDay);
  
  // Safely check if coordinates exist before accessing
  const hasCoordinates = currentDay && 'coordinates' in currentDay && currentDay.coordinates;

  const handleDayChange = (day: number) => {
    setActiveDay(day);
  };

  return (
    <section className="py-12 bg-gray-50">
      <div className="container">
        <h2 className="text-3xl font-bold mb-2">Trip Map & Itinerary</h2>
        <p className="text-gray-600 mb-8">Follow the route of your trip and see the key places you'll visit</p>

        <Card className="p-4 md:p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Map Component - Only show if we have coordinates */}
            <div className="h-[400px] bg-gray-100 rounded-lg overflow-hidden">
              {hasCoordinates ? (
                <MapDisplay 
                  itinerary={itinerary.filter((day): day is ItineraryDay => 'coordinates' in day)} 
                  activeDay={activeDay}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-500">
                  <p>Map view not available for this itinerary</p>
                </div>
              )}
            </div>

            {/* Itinerary Timeline */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">Daily Itinerary</h3>
                <ActionButtons />
              </div>
              
              <ItineraryTimeline 
                itinerary={itinerary} 
                activeDay={activeDay} 
                onDayChange={handleDayChange} 
              />
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default MapItinerary;

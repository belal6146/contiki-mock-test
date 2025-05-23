
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import MapDisplay from './map/MapDisplay';
import ItineraryTimeline from './map/ItineraryTimeline';
import DayDetailView from './map/DayDetailView';

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
  const [isDayExpanded, setIsDayExpanded] = useState<boolean>(false);
  const [expandAll, setExpandAll] = useState<boolean>(false);
  
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

  const handleToggleExpand = () => {
    setIsDayExpanded(!isDayExpanded);
  };

  const handleToggleExpandAll = () => {
    setExpandAll(!expandAll);
    // When expandAll changes, also update the current day's expanded state
    setIsDayExpanded(!expandAll);
  };

  const handlePreviousDay = () => {
    if (activeDay > 0) {
      setActiveDay(activeDay - 1);
    }
  };

  const handleNextDay = () => {
    if (activeDay < itinerary.length - 1) {
      setActiveDay(activeDay + 1);
    }
  };

  const handleDownloadItinerary = () => {
    console.log('Downloading itinerary...');
    // Logic to download itinerary would go here
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
                className={`p-2 ${viewType === 'list' ? 'bg-[#CCFF00]' : 'bg-white'}`}
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
            onClick={handleDownloadItinerary}
          >
            <span>📥</span>
            <span>DOWNLOAD ITINERARY</span>
          </Button>
          
          <Button 
            variant="ghost" 
            className="text-gray-600 text-sm font-medium hover:bg-gray-50"
            onClick={handleToggleExpandAll}
          >
            {expandAll ? 'COLLAPSE ALL DAYS' : 'EXPAND ALL DAYS'}
          </Button>
        </div>

        {/* Timeline */}
        <ItineraryTimeline 
          itinerary={itinerary} 
          activeDay={activeDay}
          onDayClick={handleDayClick} 
        />

        {/* Map and Day Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          {/* Map Component */}
          <div className="h-[500px] bg-gray-100 rounded-lg overflow-hidden border border-gray-200 shadow-md">
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

          {/* Day Details using new component */}
          {currentDay && (
            <DayDetailView
              day={currentDay}
              isExpanded={expandAll || isDayExpanded}
              onToggle={handleToggleExpand}
              onPrevious={handlePreviousDay}
              onNext={handleNextDay}
              hasPrevious={activeDay > 0}
              hasNext={activeDay < itinerary.length - 1}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default MapItinerary;

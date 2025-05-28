import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import MapDisplay from './map/MapDisplay';
import ItineraryTimeline from './map/ItineraryTimeline';
import DayDetailView from './map/DayDetailView';
import { Download, ChevronDown, ChevronUp } from 'lucide-react';

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
  const [allExpanded, setAllExpanded] = useState<boolean>(false);
  
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

  const handleToggleAllDays = () => {
    setAllExpanded(!allExpanded);
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

  return (
    <section className="py-12 bg-white border-t border-gray-200">
      <div className="container max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 md:gap-0">
          <div className="flex-1">
            <h2 className="text-2xl md:text-3xl font-black mb-2">Trip Map & Itinerary</h2>
            <p className="text-gray-600 text-base">Follow the route of your trip and see the key places you'll visit</p>
          </div>
          
          {/* View Toggle */}
          <div className="flex-shrink-0">
            <div className="hidden md:flex items-center gap-4">
              <span className="text-sm text-gray-600 font-semibold">Change view</span>
              <div className="flex border border-gray-300 rounded-md overflow-hidden">
                <button
                  onClick={() => setViewType('list')}
                  className={`p-2 ${viewType === 'list' ? 'bg-gray-200 text-black font-bold' : 'bg-white text-gray-600'} transition-colors duration-150`}
                  aria-label="List view"
                >
                  {/* List icon */}
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
                </button>
                <button
                  onClick={() => setViewType('grid')}
                  className={`p-2 ${viewType === 'grid' ? 'bg-gray-200 text-black font-bold' : 'bg-white text-gray-600'} transition-colors duration-150`}
                  aria-label="Grid view"
                >
                  {/* Grid icon */}
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4 md:gap-6">
          <Button
            variant="outline"
            className="flex items-center gap-2 text-gray-700 font-bold border-gray-400 hover:bg-gray-100 w-full md:w-auto rounded-full px-6 py-3 uppercase text-sm transition-colors duration-150"
          >
            <Download size={16} />
            <span>DOWNLOAD ITINERARY</span>
          </Button>
          
          <Button
            variant="ghost"
            onClick={handleToggleAllDays}
            className="text-gray-600 text-sm font-semibold hover:bg-gray-100 w-full md:w-auto px-4 py-2 transition-colors duration-150"
          >
            {allExpanded ? 'COLLAPSE ALL DAYS' : 'EXPAND ALL DAYS'}
            {allExpanded ? <ChevronUp size={16} className="ml-2" /> : <ChevronDown size={16} className="ml-2" />}
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
          {/* Map Component with better styling */}
          <div className="h-[500px] bg-gray-100 rounded-lg overflow-hidden border border-gray-300 shadow-md">
            {hasCoordinates ? (
              <MapDisplay
                itinerary={itinerary.filter((day): day is ItineraryDay => 'coordinates' in day)}
                onMarkerClick={(index) => setActiveDay(index)}
                activeMarkerIndex={activeDay}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-500">
                <div className="text-center">
                  <div className="text-4xl mb-4">🗺️</div>
                  <p>Interactive map coming soon</p>
                  <p className="text-sm text-gray-400 mt-2">We're working on bringing you a detailed map of your journey</p>
                </div>
              </div>
            )}
          </div>

          {/* Day Details using enhanced component */}
          {currentDay && (
            <DayDetailView
              day={currentDay}
              isExpanded={allExpanded || isDayExpanded}
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

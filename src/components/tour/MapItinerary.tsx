
import React, { useState } from 'react';
import MapDisplay from './map/MapDisplay';
import ItineraryTimeline from './map/ItineraryTimeline';
import ActionButtons from './map/ActionButtons';

interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  from?: string;
  to?: string;
  meals?: string[];
  accommodation?: string;
  coordinates?: [number, number]; // [longitude, latitude]
}

interface MapItineraryProps {
  itinerary: ItineraryDay[];
  mapImageUrl?: string;
  mapboxToken?: string; // Optional prop to pass a Mapbox token
}

const MapItinerary: React.FC<MapItineraryProps> = ({ 
  itinerary,
  mapImageUrl = '/placeholder.svg',
  mapboxToken
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const handleNavigation = (index: number) => {
    setActiveIndex(index);
    console.debug('[MapItinerary] slide', { index, title: itinerary[index].title });
  };
  
  return (
    <section className="py-12 bg-white">
      <div className="container">
        <h2 className="text-2xl font-medium text-primary mb-6">Map & Itinerary</h2>
        
        {/* Map component */}
        <div className="mb-8">
          <MapDisplay 
            itinerary={itinerary} 
            onMarkerClick={handleNavigation}
            mapboxToken={mapboxToken}
          />
        </div>
        
        {/* Timeline component */}
        <ItineraryTimeline
          itinerary={itinerary}
          activeIndex={activeIndex}
          onDayClick={handleNavigation}
        />
        
        {/* Action buttons */}
        <ActionButtons />
      </div>
    </section>
  );
};

export default MapItinerary;

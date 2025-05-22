
import React, { useEffect } from 'react';
import { Map, MapPin, Ship } from 'lucide-react';

// Define proper ItineraryDay type with coordinates as tuple
export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  coordinates: [number, number]; // This ensures exactly 2 elements
  from?: string;
  to?: string;
}

interface MapItineraryProps {
  itinerary: ItineraryDay[];
}

const MapItinerary: React.FC<MapItineraryProps> = ({ itinerary }) => {
  useEffect(() => {
    console.debug('[MapItinerary] mounted', { daysCount: itinerary.length });
  }, [itinerary.length]);
  
  // For now we'll just show a placeholder for the map
  return (
    <section className="py-12 bg-slate-50">
      <div className="container">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Map Side */}
          <div className="w-full md:w-1/2">
            <div className="relative h-96 bg-slate-200 rounded-lg overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <Map className="h-16 w-16 text-slate-400" />
                <span className="sr-only">Map loading</span>
              </div>
              
              {/* Map would be rendered here with proper coordinates */}
              <div className="absolute bottom-4 right-4 p-2 bg-white rounded-md shadow-md z-10">
                <div className="flex items-center gap-2 text-sm">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-blue-500 mr-1"></div>
                    <span>Location</span>
                  </div>
                  <div className="flex items-center">
                    <Ship className="w-4 h-4 text-blue-700 mr-1" />
                    <span>Ferry</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-4 flex justify-center">
              <div className="inline-flex p-2 rounded-md bg-white shadow-sm">
                <button className="px-4 py-2 text-sm font-medium bg-blue-100 text-blue-700 rounded-md">Map</button>
                <button className="px-4 py-2 text-sm font-medium text-gray-600">List</button>
              </div>
            </div>
          </div>
          
          {/* Itinerary Side */}
          <div className="w-full md:w-1/2">
            <h2 className="text-2xl font-bold mb-6">Itinerary</h2>
            <div className="space-y-6">
              {itinerary.map((day, index) => (
                <div key={day.day} className="border-l-2 border-gray-200 pl-4">
                  <div className="flex items-center">
                    <div className="w-8 h-8 flex items-center justify-center bg-blue-500 rounded-full text-white text-sm font-bold -ml-6">
                      {day.day}
                    </div>
                    <h3 className="ml-4 text-lg font-semibold">{day.title}</h3>
                  </div>
                  
                  <div className="mt-2 ml-6">
                    <p className="text-gray-600">{day.description}</p>
                    
                    {day.from && day.to && (
                      <div className="mt-2 flex items-center text-sm text-gray-500">
                        <Ship className="w-4 h-4 mr-2" />
                        <span>{day.from} to {day.to}</span>
                      </div>
                    )}
                    
                    <div className="mt-3 flex items-center">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span className="ml-1 text-sm text-gray-500">
                        {day.coordinates[0].toFixed(2)}, {day.coordinates[1].toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MapItinerary;

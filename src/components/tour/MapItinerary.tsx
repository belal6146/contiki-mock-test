
import React, { useEffect, useState, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

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
}

const MAPBOX_TOKEN = 'YOUR_MAPBOX_TOKEN'; // Replace with your actual token in production

const MapItinerary: React.FC<MapItineraryProps> = ({ 
  itinerary,
  mapImageUrl = '/placeholder.svg'
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markers = useRef<mapboxgl.Marker[]>([]);
  
  useEffect(() => {
    console.debug('[MapItinerary] mounted', { daysCount: itinerary.length });
    
    // Check if we have coordinates to render a real map
    const hasCoordinates = itinerary.some(day => day.coordinates);
    
    if (hasCoordinates && mapContainer.current) {
      // Initialize Mapbox
      mapboxgl.accessToken = MAPBOX_TOKEN;
      
      const bounds = new mapboxgl.LngLatBounds();
      
      // Create map instance
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/light-v11',
        center: [-74.5, 40], // Default center
        zoom: 1
      });
      
      // Add navigation controls
      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
      
      // Wait for map to load before adding markers
      map.current.on('load', () => {
        // Add markers for each itinerary point with coordinates
        itinerary.forEach((day, index) => {
          if (day.coordinates) {
            // Create custom marker element
            const el = document.createElement('div');
            el.className = 'custom-marker';
            el.style.backgroundColor = '#CCFF00';
            el.style.borderRadius = '50%';
            el.style.width = '24px';
            el.style.height = '24px';
            el.style.display = 'flex';
            el.style.alignItems = 'center';
            el.style.justifyContent = 'center';
            el.style.color = 'black';
            el.style.fontWeight = 'bold';
            el.style.fontSize = '12px';
            el.innerText = day.day.toString();
            el.style.border = '2px solid white';
            el.style.boxShadow = '0 2px 4px rgba(0,0,0,0.3)';
            
            // Create marker
            const marker = new mapboxgl.Marker(el)
              .setLngLat(day.coordinates)
              .setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML(
                `<strong>Day ${day.day}:</strong> ${day.title}`
              ))
              .addTo(map.current!);
              
            markers.current.push(marker);
            bounds.extend(day.coordinates);
          }
        });
        
        // Fit map to bounds if we have coordinates
        if (!bounds.isEmpty()) {
          map.current!.fitBounds(bounds, {
            padding: 50,
            maxZoom: 12
          });
        }
      });
      
      return () => {
        if (map.current) {
          map.current.remove();
        }
      };
    }
  }, [itinerary]);
  
  const handleNavigation = (index: number) => {
    setActiveIndex(index);
    console.debug('[MapItinerary] slide', { index, title: itinerary[index].title });
    
    // If we have a map and the day has coordinates, center the map on that location
    if (map.current && itinerary[index].coordinates) {
      map.current.flyTo({
        center: itinerary[index].coordinates,
        zoom: 12,
        duration: 1500,
        essential: true
      });
      
      // Open the popup for this marker
      markers.current.forEach((marker, i) => {
        if (i === index && itinerary[index].coordinates) {
          marker.togglePopup();
        }
      });
    }
  };
  
  // Ensure each day has from/to fields (use defaults if missing)
  const processedItinerary = itinerary.map(day => ({
    ...day,
    from: day.from || day.title.split(' to ')[0] || 'Location',
    to: day.to || day.title.split(' to ')[1] || day.from || 'Location'
  }));
  
  return (
    <section className="py-12 bg-white">
      <div className="container">
        <h2 className="text-2xl font-medium text-primary mb-6">Map & Itinerary</h2>
        
        {/* Map section */}
        <div className="bg-gray-200 rounded-lg overflow-hidden mb-8 h-[400px] relative">
          <div 
            ref={mapContainer} 
            className="w-full h-full"
            aria-label="Trip route map"
          />
          
          {/* Mapbox placeholder overlay with message - only shown if no coordinates */}
          {!itinerary.some(day => day.coordinates) && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 text-white">
              <div className="text-center">
                <p className="text-lg font-medium mb-2">Interactive Map</p>
                <p className="text-sm opacity-80">Map visualization would appear here</p>
              </div>
            </div>
          )}
        </div>
        
        {/* Itinerary timeline */}
        <div className="relative mb-12">
          {/* Day indicators */}
          <div className="flex justify-between items-center relative mb-8">
            {/* Line connecting all days */}
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-300 -z-10" />
            
            {/* Day dots */}
            <div className="flex justify-between w-full relative z-0">
              {processedItinerary.map((day, index) => (
                <button
                  key={index}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-colors duration-150 ${
                    index <= activeIndex 
                      ? 'bg-accent text-black' 
                      : 'bg-white border border-gray-300 text-gray-600'
                  }`}
                  onClick={() => handleNavigation(index)}
                  aria-label={`Day ${day.day}`}
                  aria-current={index === activeIndex ? 'step' : undefined}
                >
                  {day.day}
                </button>
              ))}
            </div>
          </div>
          
          {/* Location indicators */}
          <div className="flex overflow-x-auto hide-scrollbar pb-6 scrollbar-hide">
            {processedItinerary.map((day, index) => (
              <div
                key={index}
                className={`min-w-[180px] ${
                  index < processedItinerary.length - 1 ? 'border-r border-gray-300' : ''
                } px-4 first:pl-0 last:border-0`}
              >
                <div className="font-medium text-sm mb-1">
                  {day.from}
                  {day.to && day.to !== day.from && (
                    <span className="mx-1">-</span>
                  )}
                  {day.to && day.to !== day.from && day.to}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Download itinerary button */}
        <div className="flex justify-center mb-8">
          <Button 
            variant="outline" 
            className="flex items-center space-x-2 text-primary font-medium border-primary hover:bg-primary/5 transition-colors duration-150"
          >
            <span>DOWNLOAD ITINERARY</span>
          </Button>
        </div>
        
        {/* Expand all days button */}
        <div className="flex justify-end mb-4">
          <Button 
            variant="ghost" 
            className="text-secondary text-sm font-medium hover:bg-secondary/5 transition-colors duration-150"
          >
            EXPAND ALL DAYS
          </Button>
        </div>
      </div>
      
      <style jsx global>{`
        .mapboxgl-popup-content {
          border-radius: 8px;
          padding: 12px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.15);
        }
        .mapboxgl-popup-close-button {
          font-size: 16px;
          padding: 5px;
        }
      `}</style>
    </section>
  );
};

export default MapItinerary;

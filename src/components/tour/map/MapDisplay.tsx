
import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface MapDisplayProps {
  itinerary: Array<{
    day: number;
    title: string;
    coordinates?: [number, number]; // [longitude, latitude]
  }>;
  onMarkerClick?: (index: number) => void;
}

const MAPBOX_TOKEN = 'YOUR_MAPBOX_TOKEN'; // Replace with your actual token in production

const MapDisplay: React.FC<MapDisplayProps> = ({ itinerary, onMarkerClick }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markers = useRef<mapboxgl.Marker[]>([]);
  
  useEffect(() => {
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
            
            // Add click handler to element if provided
            if (onMarkerClick) {
              el.style.cursor = 'pointer';
              el.addEventListener('click', () => onMarkerClick(index));
            }
            
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
  }, [itinerary, onMarkerClick]);

  const focusLocation = (index: number) => {
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

  // Expose the focusLocation method
  React.useImperativeHandle(
    React.createRef(),
    () => ({
      focusLocation
    })
  );

  return (
    <div className="bg-gray-200 rounded-lg overflow-hidden h-[400px] relative">
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
      
      <style>
        {`
        .mapboxgl-popup-content {
          border-radius: 8px;
          padding: 12px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.15);
        }
        .mapboxgl-popup-close-button {
          font-size: 16px;
          padding: 5px;
        }
        `}
      </style>
    </div>
  );
};

export default MapDisplay;

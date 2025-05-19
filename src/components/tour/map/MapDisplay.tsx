
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface MapDisplayProps {
  itinerary: Array<{
    day: number;
    title: string;
    coordinates?: [number, number]; // [longitude, latitude]
  }>;
  onMarkerClick?: (index: number) => void;
  mapboxToken?: string;
}

const LOCAL_STORAGE_TOKEN_KEY = 'mapbox_token';

const MapDisplay: React.FC<MapDisplayProps> = ({ 
  itinerary, 
  onMarkerClick,
  mapboxToken
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markers = useRef<mapboxgl.Marker[]>([]);
  
  // State for token management
  const [token, setToken] = useState<string>(
    mapboxToken || 
    localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY) || 
    ''
  );
  const [inputToken, setInputToken] = useState<string>('');
  
  // Initialize map whenever token changes
  useEffect(() => {
    // Check if we have coordinates to render a real map and a valid token
    const hasCoordinates = itinerary.some(day => day.coordinates);
    const hasToken = !!token;
    
    if (hasCoordinates && hasToken && mapContainer.current) {
      // Initialize Mapbox
      mapboxgl.accessToken = token;
      
      const bounds = new mapboxgl.LngLatBounds();
      
      try {
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
          // Clear any existing markers
          markers.current.forEach(marker => marker.remove());
          markers.current = [];
          
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
      } catch (error) {
        console.error('Error initializing Mapbox map:', error);
        // Clear invalid token if there was an error
        if (error.message?.includes('access token')) {
          localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
          setToken('');
        }
      }
      
      return () => {
        if (map.current) {
          map.current.remove();
        }
      };
    }
  }, [itinerary, token, onMarkerClick]);

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
  
  // Save token to localStorage and state
  const handleSaveToken = () => {
    if (inputToken.trim()) {
      localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, inputToken.trim());
      setToken(inputToken.trim());
      setInputToken('');
    }
  };

  // Expose the focusLocation method
  React.useImperativeHandle(
    React.createRef(),
    () => ({
      focusLocation
    })
  );

  // Check if we should render the token input form
  const showTokenInput = !token && itinerary.some(day => day.coordinates);
  
  // Add custom CSS for mapbox popups
  useEffect(() => {
    // Add custom styles for mapbox popups
    const styleElement = document.createElement('style');
    styleElement.textContent = `
      .mapboxgl-popup-content {
        border-radius: 8px;
        padding: 12px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.15);
      }
      .mapboxgl-popup-close-button {
        font-size: 16px;
        padding: 5px;
      }
    `;
    document.head.appendChild(styleElement);
    
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);
  
  return (
    <div className="bg-gray-200 rounded-lg overflow-hidden h-[400px] relative">
      {showTokenInput ? (
        <div className="absolute inset-0 flex items-center justify-center p-6 bg-black/10">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="font-medium text-lg mb-3">Mapbox API Token Required</h3>
            <p className="text-sm text-gray-600 mb-4">
              To display interactive maps, please enter your Mapbox public access token.
              You can find this in your Mapbox account dashboard.
            </p>
            <div className="flex gap-2">
              <Input
                type="text"
                value={inputToken}
                onChange={(e) => setInputToken(e.target.value)}
                placeholder="Enter your Mapbox token"
                className="flex-1"
              />
              <Button onClick={handleSaveToken}>Save</Button>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Your token will be stored locally on your device.
            </p>
          </div>
        </div>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
};

export default MapDisplay;

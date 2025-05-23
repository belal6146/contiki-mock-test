
import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { ItineraryDay } from '../MapItinerary';

interface MapDisplayProps {
  itinerary: ItineraryDay[];
  onMarkerClick?: (index: number) => void;
  activeMarkerIndex?: number;
}

const MapDisplay: React.FC<MapDisplayProps> = ({ 
  itinerary, 
  onMarkerClick,
  activeMarkerIndex = 0 
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markers = useRef<mapboxgl.Marker[]>([]);

  useEffect(() => {
    if (!mapContainer.current) return;

    // Initialize map with a public token placeholder
    mapboxgl.accessToken = 'pk.eyJ1IjoiZXhhbXBsZSIsImEiOiJjbGV4YW1wbGUifQ.example'; // User needs to replace this

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [25.3667, 37.4415], // Center on Greek islands
      zoom: 6,
    });

    // Add markers for each day
    itinerary.forEach((day, index) => {
      const el = document.createElement('div');
      el.className = `w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm cursor-pointer ${
        index === activeMarkerIndex ? 'bg-[#FF6900]' : 'bg-[#CCFF00] text-black'
      }`;
      el.textContent = day.day.toString();
      
      el.addEventListener('click', () => {
        onMarkerClick?.(index);
      });

      const marker = new mapboxgl.Marker(el)
        .setLngLat(day.coordinates)
        .addTo(map.current!);
      
      markers.current.push(marker);
    });

    return () => {
      markers.current.forEach(marker => marker.remove());
      markers.current = [];
      map.current?.remove();
    };
  }, [itinerary, onMarkerClick, activeMarkerIndex]);

  return (
    <div className="w-full h-full relative">
      <div ref={mapContainer} className="w-full h-full rounded-lg" />
      <div className="absolute top-4 left-4 bg-white p-2 rounded shadow-sm text-sm">
        <p className="font-medium">Interactive Map</p>
        <p className="text-gray-500 text-xs">Click markers to explore</p>
      </div>
    </div>
  );
};

export default MapDisplay;

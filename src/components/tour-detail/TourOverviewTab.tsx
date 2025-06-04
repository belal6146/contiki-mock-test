import React from 'react';
import { Trip } from '@/types/trip';
import TripHighlights from '@/components/tour/TripHighlights';
import MapItinerary from '@/components/tour/MapItinerary';
import WhereYouWillStay from '@/components/tour/WhereYouWillStay';
import RelatedTrips from '@/components/tour/RelatedTrips';
import TourVariations from './TourVariations';
import TourDetailsGrid from './TourDetailsGrid';
import SocialMediaGallery from './SocialMediaGallery';
import { ItineraryDay } from '@/components/tour/MapItinerary';

interface TourOverviewTabProps {
  trip: Trip;
  highlights: any[];
  trips: Trip[];
  accommodation: any;
  tripFAQs: any[];
  generalFAQs: any[];
}

const TourOverviewTab: React.FC<TourOverviewTabProps> = ({ 
  trip, 
  highlights, 
  trips, 
  accommodation 
}) => {
  // Mock data for the components that need it
  const mockItinerary: ItineraryDay[] = [
    {
      day: 1,
      title: 'Start Athens',
      description: 'Arrive in Athens and meet your fellow travelers.',
      coordinates: [23.7275, 37.9838] as [number, number]
    },
    {
      day: 2,
      title: 'Athens to Mykonos',
      description: 'Morning ferry to Mykonos. Afternoon free to explore.',
      from: 'Athens',
      to: 'Mykonos',
      coordinates: [25.3667, 37.4415] as [number, number]
    },
    {
      day: 3,
      title: 'Mykonos',
      description: 'Full day to enjoy the beaches and town of Mykonos.',
      coordinates: [25.3667, 37.4415] as [number, number]
    },
    {
      day: 4,
      title: 'Mykonos to Paros',
      description: 'Ferry to Paros. Explore the charming villages.',
      from: 'Mykonos',
      to: 'Paros',
      coordinates: [25.1484, 37.0853] as [number, number]
    },
    {
      day: 5,
      title: 'Paros',
      description: 'Free day to explore Paros at your own pace.',
      coordinates: [25.1484, 37.0853] as [number, number]
    },
    {
      day: 6,
      title: 'Paros to Santorini',
      description: 'Ferry to the iconic island of Santorini.',
      from: 'Paros',
      to: 'Santorini',
      coordinates: [25.4615, 36.3932] as [number, number]
    },
    {
      day: 7,
      title: 'Santorini',
      description: 'Explore the famous white buildings and blue domes.',
      coordinates: [25.4615, 36.3932] as [number, number]
    },
    {
      day: 8,
      title: 'Santorini to Ios',
      description: 'Ferry to Ios, known for its vibrant nightlife.',
      from: 'Santorini',
      to: 'Ios',
      coordinates: [25.2919, 36.7214] as [number, number]
    },
    {
      day: 9,
      title: 'Ios',
      description: 'Enjoy the beaches and nightlife of Ios.',
      coordinates: [25.2919, 36.7214] as [number, number]
    },
    {
      day: 10,
      title: 'Ios to Athens',
      description: 'Return ferry to Athens.',
      from: 'Ios',
      to: 'Athens',
      coordinates: [23.7275, 37.9838] as [number, number]
    },
    {
      day: 11,
      title: 'End Athens',
      description: 'Trip ends in Athens. Safe travels!',
      coordinates: [23.7275, 37.9838] as [number, number]
    }
  ];

  return (
    <div className="bg-white">
      <div className="container max-w-7xl mx-auto py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Hero Image */}
          <div>
            <img
              src="https://www.contiki.com/media/j2ljq1yb/3211eurs2022-1.jpg?crop=0%2C0%2C0.3326776261074397%2C0&cropmode=percentage&format=webp&mode=crop&width=1920&height=800&quality=80"
              alt="Greek Island Hopping Plus Trip"
              className="w-full h-[420px] md:h-[520px] lg:h-[600px] object-cover rounded-2xl shadow-lg"
            />
          </div>
          {/* Right side - Content */}
          <div>
            <div className="mb-8">
              <div className="flex items-center gap-4 mb-6">
                <span className="bg-black text-white px-3 py-1 text-xs font-bold rounded-full uppercase">I'm planning to travel in</span>
                <div className="flex bg-gray-100 rounded-full overflow-hidden">
                  <button className="bg-[#CCFF00] text-black px-4 py-1 text-sm font-bold rounded-full">2025</button>
                  <button className="bg-gray-100 text-gray-700 px-4 py-1 text-sm font-bold hover:bg-gray-200 rounded-full">2026</button>
                </div>
              </div>
              <h1 className="text-2xl lg:text-3xl font-black text-black mb-6 leading-tight normal-case">The one that takes you through Mykonos, Paros, Santorini and Ios with comfy sleeps between island hops, with upgraded accommodation too.</h1>
              {/* Trip Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {/* Days */}
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xl">📅</span>
                    <span className="font-bold text-sm uppercase text-gray-600">Days</span>
                  </div>
                  <p className="text-base text-gray-700">11 days, 1 country</p>
                </div>
                {/* Accommodation */}
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xl">🏨</span>
                    <span className="font-bold text-sm uppercase text-gray-600">Accommodation</span>
                  </div>
                  <p className="text-base text-gray-700">8 nights in Hotels, 2 nights in Special Stay</p>
                </div>
                {/* Meals */}
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xl">🍽️</span>
                    <span className="font-bold text-sm uppercase text-gray-600">Meals</span>
                  </div>
                  <p className="text-base text-gray-700">10 Breakfasts, 3 Dinners</p>
                </div>
                {/* Transport */}
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xl">🚢</span>
                    <span className="font-bold text-sm uppercase text-gray-600">Transport</span>
                  </div>
                  <p className="text-base text-gray-700">Ferry</p>
                </div>
                {/* Group Size */}
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xl">👥</span>
                    <span className="font-bold text-sm uppercase text-gray-600">Group Size</span>
                  </div>
                  <p className="text-base text-gray-700">Average 30 people</p>
                </div>
                {/* Team */}
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xl">👨‍💼</span>
                    <span className="font-bold text-sm uppercase text-gray-600">Team</span>
                  </div>
                  <p className="text-base text-gray-700">Expert Trip Manager, Local Guides</p>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed mb-8 text-base">Embark on a Greek island hopping adventure, bouncing between Greece's major islands, where the nightlife's as endless as the architecture. You'll immerse yourself in Greece's wonderful city, sun, and sumptuous culture. Villages, volcanos, castles for days and enough grapes come to put glowing hearts in your eyes. By day you'll have ample time for exploring, and by night you'll sleep like a baby in accommodation that's specially selected for island hopping.</p>
              {/* On the road to Net Zero Banner */}
              <div className="bg-[#CCFF00] text-black p-3 rounded-xl flex items-center justify-between mb-8 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="bg-white text-[#CCFF00] w-7 h-7 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold">🌱</span>
                  </div>
                  <span className="font-bold text-xs uppercase">On the road to Net Zero</span>
                </div>
                <button className="text-black underline font-bold text-xs rounded-full px-2 py-1 hover:bg-black/5 transition">Find out more</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Tour Variations */}
      <TourVariations />
      
      {/* Map & Itinerary */}
      <MapItinerary itinerary={mockItinerary} />
      
      {/* Where You Will Stay with Contiki image */}
      <div className="bg-white py-12 border-t border-gray-200">
        <div className="container">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">Where You Will Stay</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
              <img
                src="https://www.contiki.com/media/vsqbfbwh/dubrovnik-croatia.jpg?center=0.5%2C0.5&format=webp&height=600&mode=crop&quality=80&width=1920"
                alt="Dubrovnik, Croatia"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-bold text-lg mb-2">Premium Hotels</h3>
                <p className="text-gray-600 text-sm">Comfortable and centrally located accommodations to make your stay memorable.</p>
              </div>
            </div>
            
            {/* Additional accommodation cards would go here */}
          </div>
        </div>
      </div>
      
      {/* Social Media Gallery using Contiki images */}
      <SocialMediaGallery />
      
      {/* Related Trips */}
      <RelatedTrips trips={trips} />
    </div>
  );
};

export default TourOverviewTab;

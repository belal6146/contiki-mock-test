
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
      {/* Hero Section with Trip Description */}
      <div className="container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left side - Image */}
          <div className="lg:col-span-1">
            <img 
              src="/lovable-uploads/5e0100cf-7b75-4182-a99a-02030aca7240.png"
              alt="Greek islands tour - couple walking in Mykonos"
              className="w-full h-[400px] object-cover rounded-lg"
            />
          </div>
          
          {/* Right side - Content */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-black text-white px-3 py-1 text-sm font-bold rounded">
                  I'm planning to travel in
                </span>
                <div className="flex bg-gray-100 rounded overflow-hidden">
                  <button className="bg-black text-white px-4 py-1 text-sm font-bold">
                    2025
                  </button>
                  <button className="bg-gray-100 text-gray-700 px-4 py-1 text-sm font-bold hover:bg-gray-200">
                    2026
                  </button>
                </div>
              </div>
              
              <h1 className="text-2xl lg:text-3xl font-bold text-black mb-4">
                The one that takes you through Mykonos, Paros, Santorini and Ios with comfy sleeps between island hops, with upgraded accommodation too.
              </h1>
              
              {/* Trip Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                {/* Days */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl">📅</span>
                    <span className="font-bold text-sm">Days</span>
                  </div>
                  <p className="text-sm text-gray-700">11 days, 1 country</p>
                </div>
                
                {/* Accommodation */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl">🏨</span>
                    <span className="font-bold text-sm">Accommodation</span>
                  </div>
                  <p className="text-sm text-gray-700">8 nights in Hotels, 2 nights in Special Stay</p>
                </div>
                
                {/* Meals */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl">🍽️</span>
                    <span className="font-bold text-sm">Meals</span>
                  </div>
                  <p className="text-sm text-gray-700">10 Breakfasts, 3 Dinners</p>
                </div>
                
                {/* Transport */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl">🚢</span>
                    <span className="font-bold text-sm">Transport</span>
                  </div>
                  <p className="text-sm text-gray-700">Ferry</p>
                </div>
                
                {/* Group Size */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl">👥</span>
                    <span className="font-bold text-sm">Group Size</span>
                  </div>
                  <p className="text-sm text-gray-700">Average 30 people</p>
                </div>
                
                {/* Team */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl">👨‍💼</span>
                    <span className="font-bold text-sm">Team</span>
                  </div>
                  <p className="text-sm text-gray-700">Expert Trip Manager, Local Guides</p>
                </div>
              </div>
              
              <p className="text-gray-700 leading-relaxed mb-6 text-sm">
                Embark on a Greek island hopping adventure, bouncing between Greece's major islands, where the nightlife's as endless as the architecture. You'll immerse yourself in Greece's wonderful city, sun, and sumptuous culture. Villages, volcanos, castles for days and enough grapes come to put glowing hearts in your eyes. By day you'll have ample time for exploring, and by night you'll sleep like a baby in accommodation that's specially selected for island hopping.
              </p>
              
              {/* On the road to Net Zero Banner */}
              <div className="bg-[#CCFF00] text-black p-4 rounded-lg flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="bg-black text-[#CCFF00] w-8 h-8 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold">🌱</span>
                  </div>
                  <span className="font-bold">On the road to Net Zero</span>
                </div>
                <button className="text-black underline font-semibold text-sm">
                  Find out more
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Selected Variation Section */}
      <div className="bg-gray-50 py-8">
        <div className="container">
          <h2 className="text-xl font-bold mb-4">Selected Variation</h2>
          {/* This would show the selected trip variation */}
        </div>
      </div>
      
      {/* Tour Variations */}
      <TourVariations />
      
      {/* Map & Itinerary */}
      <MapItinerary itinerary={mockItinerary} />
      
      {/* Trip Highlights */}
      <TripHighlights highlights={highlights} />
      
      {/* Where You Will Stay */}
      <WhereYouWillStay accommodation={accommodation} />
      
      {/* Social Media Gallery */}
      <SocialMediaGallery />
      
      {/* Related Trips */}
      <RelatedTrips trips={trips} />
    </div>
  );
};

export default TourOverviewTab;

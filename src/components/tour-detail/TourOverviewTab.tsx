
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
          {/* Left side - Image from Contiki */}
          <div className="lg:col-span-1">
            <img 
              src="https://www.contiki.com/media/uhxfozab/group-of-people-in-blue-lake-surrounded-by-mountains.jpg?center=0.5%2C0.5&format=webp&height=616&mode=crop&quality=80&width=720"
              alt="Greek islands tour - group of people in blue lake surrounded by mountains"
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
                  <button className="bg-[#CCFF00] text-white px-4 py-1 text-sm font-bold">
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
              
              {/* On the road to Net Zero Banner - using Contiki orange instead of lime */}
              <div className="bg-[#CCFF00] text-white p-4 rounded-lg flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="bg-white text-[#CCFF00] w-8 h-8 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold">🌱</span>
                  </div>
                  <span className="font-bold">On the road to Net Zero</span>
                </div>
                <button className="text-white underline font-semibold text-sm">
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
          <div className="flex flex-col md:flex-row items-center gap-6 bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <img 
              src="https://www.contiki.com/media/smpji2l0/group-of-young-people-riding-bikes-vietnam-road.jpg?center=0.6161542586835618%2C0.4987480082915613&format=webp&height=616&mode=crop&quality=80&width=720" 
              alt="Group of travelers on bikes" 
              className="w-full md:w-1/3 h-48 object-cover rounded-lg"
            />
            <div className="flex-1">
              <h3 className="text-lg font-bold mb-2">Greek Island Hopping Plus</h3>
              <p className="text-gray-600 mb-4">Our most popular variation with premium accommodations and additional experiences.</p>
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-[#CCFF00]">From $1,899</span>
                <button className="bg-[#CCFF00] text-white px-4 py-2 rounded hover:bg-[#CCFF00]/90 transition-colors">
                  Select
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Tour Variations */}
      <TourVariations />
      
      {/* Map & Itinerary */}
      <MapItinerary itinerary={mockItinerary} />
      
      {/* Trip Highlights with Contiki image */}
      <div className="bg-gray-50 py-12">
        <div className="container">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">Trip Highlights</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex flex-col space-y-6">
                {highlights.slice(0, 3).map((highlight, index) => (
                  <div key={index} className="flex gap-4">
                    <span className="text-2xl">✨</span>
                    <div>
                      <h3 className="font-semibold mb-2">{highlight.title || 'Authentic Local Experiences'}</h3>
                      <p className="text-gray-600 text-sm">{highlight.description || 'Immerse yourself in the local culture with unique experiences curated by our expert guides.'}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <img
              src="https://www.contiki.com/media/jfzlex0q/colosseum-destiantion-image.jpg?center=0.44179409763085564%2C0.5350877192982456&format=webp&height=600&mode=crop&quality=80&width=1920"
              alt="The Colosseum, Rome"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
      
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

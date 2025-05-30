import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Placeholder data for travel destinations. Replace with actual data as needed.
const travelDestinations = [
  { name: 'Europe', imageUrl: 'https://via.placeholder.com/300x400' },
  { name: 'Asia', imageUrl: 'https://via.placeholder.com/300x400' },
  { name: 'New Zealand', imageUrl: 'https://via.placeholder.com/300x400' },
  { name: 'USA & Canada', imageUrl: 'https://via.placeholder.com/300x400' },
  { name: 'Africa & The Middle East', imageUrl: 'https://via.placeholder.com/300x400' },
  { name: 'Latin America', imageUrl: 'https://via.placeholder.com/300x400' },
  // Add more if needed to match the slider
];

const TravelDestinations = () => {
  // Note: Implementing the slider functionality (arrows, pagination) requires JavaScript.
  // For now, I will set up the basic structure and styling for the visible items and controls.
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            {/* Title - Corrected capitalization */}
            <h2 className="text-3xl font-bold text-gray-800">Travel destinations</h2>
            {/* Subtitle */}
            <p className="text-gray-600">Trips for 18-35s across 6 continents</p>
          </div>
          {/* Navigation Arrows */}
          <div className="flex space-x-2">
            <button className="p-2 rounded-full border border-gray-300 hover:bg-gray-100">
              <ChevronLeft size={24} />
            </button>
            <button className="p-2 rounded-full border border-gray-300 hover:bg-gray-100">
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        {/* Destinations Slider/Grid - Basic structure for items (will need JS for slider) */}
        {/* Using flexbox with overflow-x for horizontal scrolling for now */}
        <div className="flex overflow-x-auto space-x-4 pb-4 no-scrollbar">
          {travelDestinations.map((destination, index) => (
            <div key={index} className="flex-none w-60 relative rounded-lg overflow-hidden shadow-lg">
              <img
                src={destination.imageUrl}
                alt={destination.name}
                className="w-full h-72 object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end p-4">
                <p className="text-white text-lg font-semibold">{destination.name}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Dots - Placeholder (will need JS for active state) */}
        <div className="flex justify-center space-x-2 mt-4">
          {/* Render dots based on number of slides/items */}
          <div className="w-2 h-2 rounded-full bg-gray-800"></div>
          <div className="w-2 h-2 rounded-full bg-gray-300"></div>
          <div className="w-2 h-2 rounded-full bg-gray-300"></div>
          {/* ... more dots based on actual slider implementation */}
        </div>
      </div>
    </section>
  );
};

export default TravelDestinations; 
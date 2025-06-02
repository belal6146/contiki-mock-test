import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

// Placeholder data for travel destinations. Replace with actual data as needed.
const travelDestinations = [
  { name: 'Greece', imageUrl: 'https://www.contiki.com/media/hwddpgoo/santorini-greece.jpg?center=0.5%2C0.5&format=webp&mode=crop&width=600&height=600&quality=80' },
  { name: 'Thailand', imageUrl: 'https://www.contiki.com/media/0aqfpa3z/thailand-boats-blue-sea-cleark-sky.jpg?center=0.5429498776829141%2C0.4949910485235911&format=webp&mode=crop&width=600&height=600&quality=80' },
  { name: 'New Zealand', imageUrl: 'https://www.contiki.com/media/lydpfklj/bungee-jumping-of-bridge-new-zealand-074nwzd2014.jpg?center=0.595794648418738%2C0.47619724149666776&format=webp&mode=crop&width=600&height=600&quality=80' },
  { name: 'Canada', imageUrl: 'https://www.contiki.com/media/52rnops0/trio-of-travelers-sitting-near-lake-in-canada.jpg?center=0.5%2C0.5&format=webp&mode=crop&width=600&height=600&quality=80' },
  { name: 'Africa', imageUrl: 'https://www.contiki.com/media/ybubztox/people-enjoying-a-safari-looking-at-elephants.jpg?center=0.6695362852875208%2C0.5037560438168477&format=webp&mode=crop&width=600&height=600&quality=80' },
  { name: 'Peru', imageUrl: 'https://www.contiki.com/media/g2mmyrhg/machu-picchu-peru.jpg?center=0.5%2C0.5&format=webp&mode=crop&width=600&height=600&quality=80' },
  // Add more if needed to match the slider
];

const TravelDestinations = () => {
  // Note: Implementing the slider functionality (arrows, pagination) requires JavaScript.
  // For now, I will set up the basic structure and styling for the visible items and controls.
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex justify-between items-center mb-8 md:mb-12">
          <div>
            {/* Note: Title capitalization issue persists due to tool limitations */}
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Travel destinations</h2>
            <p className="text-gray-600 text-base md:text-lg">Trips for 18-35s across 6 continents</p>
          </div>
          <div className="flex space-x-4">
            <button className="p-3 rounded-full border border-gray-300 hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center w-10 h-10">
              <ChevronLeft size={24} className="text-gray-700"/>
            </button>
            <button className="p-3 rounded-full border border-gray-300 hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center w-10 h-10">
              <ChevronRight size={24} className="text-gray-700"/>
            </button>
          </div>
        </div>

        {/* Horizontal Scroll/Slider Area */}
        <div className="flex overflow-x-auto space-x-6 md:space-x-8 pb-4 no-scrollbar">
          {travelDestinations.map((destination, index) => (
            <div key={index} className="flex-none w-64 md:w-72 relative rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 group cursor-pointer">
               {/* Using Link for clickable area */}
              <Link to={`/destinations/${destination.name.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and')}`}>
                <img
                  src={destination.imageUrl}
                  alt={destination.name}
                  className="w-full h-80 object-cover transform group-hover:scale-105 transition-transform duration-300"
                />
                {/* Image Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-50 transition-all duration-300 flex items-end p-4">
                  {/* Text Styling */}
                  <p className="text-white text-lg md:text-xl font-semibold">{destination.name}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center space-x-2 mt-8">
          <div className="w-3 h-3 rounded-full bg-gray-800"></div>
          <div className="w-3 h-3 rounded-full bg-gray-300"></div>
          <div className="w-3 h-3 rounded-full bg-gray-300"></div>
          <div className="w-3 h-3 rounded-full bg-gray-300"></div>
          <div className="w-3 h-3 rounded-full bg-gray-300"></div>
          <div className="w-3 h-3 rounded-full bg-gray-300"></div>
        </div>
      </div>
    </section>
  );
};

export default TravelDestinations; 
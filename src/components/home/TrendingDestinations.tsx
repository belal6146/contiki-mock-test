import React from 'react';

// Placeholder data for trending destinations. Replace with actual data as needed.
const trendingDestinations = [
  { name: 'Japan', imageUrl: 'https://via.placeholder.com/300x200' },
  { name: 'Costa Rica', imageUrl: 'https://via.placeholder.com/300x200' },
  { name: 'New Zealand', imageUrl: 'https://via.placeholder.com/300x200' },
  { name: 'Peru', imageUrl: 'https://via.placeholder.com/300x200' },
  { name: 'Vietnam', imageUrl: 'https://via.placeholder.com/300x200' },
  { name: 'Thailand', imageUrl: 'https://via.placeholder.com/300x200' },
  { name: 'Morocco', imageUrl: 'https://via.placeholder.com/300x200' },
  { name: 'Croatia', imageUrl: 'https://via.placeholder.com/300x200' },
];

const TrendingDestinations = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 text-center">
        {/* Title - Corrected capitalization */}
        <h2 className="text-3xl font-bold mb-12 text-gray-800">Trending destinations</h2>

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {trendingDestinations.map((destination, index) => (
            <div key={index} className="relative rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <img
                src={destination.imageUrl}
                alt={destination.name}
                className="w-full h-60 object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end p-4">
                <p className="text-white text-xl font-semibold">{destination.name}</p>
              </div>
            </div>
          ))}
        </div>

        {/* SEE POPULAR TRIPS Button */}
        <button className="bg-[#CCFF00] hover:bg-[#b8e600] text-black font-bold py-3 px-8 rounded-full transition-colors duration-200 uppercase tracking-wider text-base shadow-md">
          See Popular Trips
        </button>
      </div>
    </section>
  );
};

export default TrendingDestinations;

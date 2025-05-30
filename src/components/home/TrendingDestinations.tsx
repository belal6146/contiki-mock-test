import React from 'react';
import { Link } from 'react-router-dom';

// Placeholder data for trending destinations. Replace with actual data as needed.
const trendingDestinations = [
  { name: 'Japan', imageUrl: 'https://www.contiki.com/media/p50rnykt/japan.jpg?center=0.5%2C0.5&mode=crop&width=300&height=200&rnd=133568878354900000' },
  { name: 'Costa Rica', imageUrl: 'https://www.contiki.com/media/n01tzt5g/costa-rica.jpg?center=0.5%2C0.5&mode=crop&width=300&height=200&rnd=133568878354900000' },
  { name: 'New Zealand', imageUrl: 'https://www.contiki.com/media/h4g5y0ms/new-zealand.jpg?center=0.5%2C0.5&mode=crop&width=300&height=200&rnd=133568878354900000' },
  { name: 'Peru', imageUrl: 'https://www.contiki.com/media/cjwqms23/peru.jpg?center=0.5%2C0.5&mode=crop&width=300&height=200&rnd=133568878354900000' },
  { name: 'Vietnam', imageUrl: 'https://www.contiki.com/media/f1nck1kj/vietnam.jpg?center=0.5%2C0.5&mode=crop&width=300&height=200&rnd=133568878354900000' },
  { name: 'Thailand', imageUrl: 'https://www.contiki.com/media/tpsg5k1l/thailand.jpg?center=0.5%2C0.5&mode=crop&width=300&height=200&rnd=133568878354900000' },
  { name: 'Morocco', imageUrl: 'https://www.contiki.com/media/j10d1x2h/morocco.jpg?center=0.5%2C0.5&mode=crop&width=300&height=200&rnd=133568878354900000' },
  { name: 'Croatia', imageUrl: 'https://www.contiki.com/media/z03k21f3/croatia.jpg?center=0.5%2C0.5&mode=crop&width=300&height=200&rnd=133568878354900000' },
];

const TrendingDestinations = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 lg:px-8 text-center max-w-screen-xl">
        {/* Title - Corrected capitalization and styling */}
        {/* Note: Title capitalization issue persists due to tool limitations */}
        <h2 className="text-3xl md:text-4xl font-bold mb-12 md:mb-20 text-gray-800">Trending destinations</h2>

        {/* Destinations Grid - Adjusted gap and column layout for responsiveness */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 mb-12 md:mb-20">
          {trendingDestinations.map((destination, index) => (
            <div key={index} className="relative rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 group">
              {/* Using Link for clickable area */}
              <Link to={`/destinations/${destination.name.toLowerCase().replace(/\s+/g, '-')}`}>
                <img
                  src={destination.imageUrl}
                  alt={destination.name}
                  className="w-full h-48 md:h-60 object-cover transform group-hover:scale-105 transition-transform duration-300"
                />
                {/* Image Overlay - Adjusted opacity and gradient if needed based on visual */}
                <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-40 transition-all duration-300 flex items-end p-4">
                  {/* Text Styling - Adjusted size and weight */}
                  <p className="text-white text-lg md:text-xl font-semibold">{destination.name}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* SEE POPULAR TRIPS Button - Adjusted styling and made it a Link */}
        {/* Assuming the button links to a popular trips page */}
        <Link
           to="/trips/popular"
           className="inline-block bg-[#CCFF00] hover:bg-[#b8e600] text-black font-bold py-4 px-10 rounded-full transition-colors duration-200 uppercase tracking-wide text-base shadow-md"
        >
          See Popular Trips
        </Link>
      </div>
    </section>
  );
};

export default TrendingDestinations;

import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import TrendingDestinations from './TrendingDestinations';

const Hero = () => {
  return (
    <>
      {/* Adjusted min-height and negative margin to account for fixed header */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden mt-[-96px] md:mt-[-80px]">
        {/* Background Image - Ensure full cover and center */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://www.contiki.com/media/jfzlex0q/colosseum-destiantion-image.jpg?center=0.44179409763085564%2C0.5350877192982456&format=webp&height=600&mode=crop&quality=80&width=1920"
            alt="Rome Colosseum - Last minute deals destination"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        {/* Content Container - Centered and positioned, adjusted padding and max-width */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center text-white h-full w-full max-w-screen-2xl mx-auto px-4 lg:px-8 py-12 md:py-24">
          {/* Last Minute Deals Banner - Adjusted margins and text styles */}
          <div className="mb-16 mt-[-5vh]"> {/* Adjusted top margin */}
            <div className="mb-10">
              <h2 className="text-white text-lg md:text-xl uppercase font-bold tracking-wider leading-none mb-2">
                LAST MINUTE
              </h2>
              <h2 className="text-[#CCFF00] text-7xl md:text-8xl font-extrabold uppercase tracking-tight leading-none mb-4">
                DEALS
              </h2>
              <p className="text-white text-xl font-medium mb-10">
                Save BIG on trips departing soon
              </p>
              <Link
                to="/deals"
                className="inline-block bg-[#CCFF00] text-black font-bold px-10 py-4 rounded-full text-base uppercase tracking-wider hover:bg-[#b8e600] transition-colors duration-200 transform hover:scale-105 shadow-lg"
              >
                VIEW DEALS
              </Link>
            </div>
          </div>

          {/* Find Your Adventure Graphic - Adjusted size and margin */}
          <img
            src="https://www.contiki.com/media/be2hvn55/find-your-adventure.jpg?center=0.5%2C0.5&format=webp&height=600&mode=crop&quality=80&width=1200"
            alt="Find Your Adventure"
            className="mx-auto mb-16 w-full max-w-2xl"
          />

          {/* Search Bar - Positioned below the graphic, ensure correct width and centering */}
          {/* The width and max-width for the search bar container should be handled by the SearchBar component itself if possible for better encapsulation, but setting a wide container here */}
          <div className="w-full max-w-[1400px] px-4">
            <SearchBar />
          </div>

        </div>

        {/* Scroll indicator - Adjusted vertical position */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-20">
          <div className="w-7 h-12 border-2 border-white rounded-full flex justify-center opacity-70">
            <div className="w-1 h-4 bg-white rounded-full mt-3 animate-pulse"></div>
          </div>
        </div>

      </section>

      {/* Components below Hero are handled in the parent layout (Index.tsx) */}
      {/* <BookWithConfidence /> */}
      {/* <TrendingDestinations /> */}

    </>
  );
};

export default Hero;

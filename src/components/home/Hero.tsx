import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import TrendingDestinations from './TrendingDestinations';

const Hero = () => {
  return (
    <>
      <section className="relative min-h-[calc(100vh-70px)] flex items-center justify-center overflow-hidden mt-[-70px]">
        {/* Background Image - Updated to use the correct external URL */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://www.contiki.com/media/jfzlex0q/colosseum-destiantion-image.jpg?center=0.44179409763085564%2C0.5350877192982456&format=webp&height=600&mode=crop&quality=80&width=1920"
            alt="Rome Colosseum - Last minute deals destination"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        {/* Last Minute Deals Banner */}
        <div className="absolute top-32 left-1/2 transform -translate-x-1/2 z-20 text-center">
          <div className="mb-8">
            <h2 className="text-white text-base uppercase font-bold tracking-wider leading-none mb-2">
              LAST MINUTE
            </h2>
            <h2 className="text-[#CCFF00] text-7xl font-extrabold uppercase tracking-tight leading-none mb-4">
              DEALS
            </h2>
            <p className="text-white text-lg font-medium mb-10">
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

        {/* Main Content (Centered text and search bar) */}
        {/* This content appears below the Last Minute Deals banner and is centered */}
        <div className="relative z-10 text-center text-white max-w-screen-xl mx-auto px-4 lg:px-8 mt-60">
          {/* Find Your Adventure Graphic */}
          <img
            src="https://www.contiki.com/media/be2hvn55/find-your-adventure.jpg?center=0.5%2C0.5&format=webp&height=600&mode=crop&quality=80&width=1200"
            alt="Find Your Adventure"
            className="mx-auto mb-8 w-full max-w-md"
          />
        </div>

        {/* Search Bar - Positioned over the hero image */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 w-[90%] max-w-[1400px] px-4">
          <SearchBar />
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center opacity-70">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>

      </section>

      {/* BookWithConfidence component should be placed in the parent layout, not here */}
      {/* Trending Destinations component placed after Hero (in the parent layout) */}
      {/* <TrendingDestinations /> */}

    </>
  );
};

export default Hero;


import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-40">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1552832230-c0197dd311b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080&q=80"
          alt="Rome Colosseum - Last minute deals destination"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Last Minute Deals Banner */}
      <div className="absolute top-32 left-1/2 transform -translate-x-1/2 z-20 text-center">
        <div className="mb-4">
          <h2 className="text-white text-4xl md:text-6xl font-black uppercase tracking-tight leading-none mb-2">
            LAST MINUTE
          </h2>
          <h2 className="text-[#CCFF00] text-5xl md:text-8xl font-black uppercase tracking-tight leading-none mb-4">
            DEALS
          </h2>
          <p className="text-white text-xl md:text-2xl font-semibold mb-6">
            Save BIG on trips departing soon
          </p>
          <Link
            to="/deals"
            className="inline-block bg-[#CCFF00] text-black font-black px-8 py-4 rounded-lg text-lg uppercase tracking-wider hover:bg-[#b8e600] transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            VIEW DEALS
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white max-w-screen-xl mx-auto px-4 lg:px-8 mt-32">
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-black mb-8 tracking-tight leading-none uppercase">
          TRAVEL FOR
          <br />
          <span className="text-[#CCFF00] font-black">18-35S</span>
        </h1>
        
        <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto font-semibold leading-relaxed opacity-95">
          Experience epic adventures with like-minded travellers on trips designed for 18-35 year olds
        </p>

        {/* Search Bar */}
        <div className="mb-12">
          <SearchBar />
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
          <Link
            to="/tours"
            className="bg-[#CCFF00] text-black font-black px-12 py-5 rounded-lg text-lg uppercase tracking-wider hover:bg-[#b8e600] transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            FIND YOUR TRIP
          </Link>
          
          <Link
            to="/destinations"
            className="border-2 border-white text-white font-black px-12 py-5 rounded-lg text-lg uppercase tracking-wider hover:bg-white hover:text-black transition-all duration-200 shadow-lg"
          >
            EXPLORE DESTINATIONS
          </Link>
        </div>

        {/* Trust indicators */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-sm opacity-90 font-medium">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-[#CCFF00] rounded-full"></span>
            <span>50+ years of travel experience</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-[#CCFF00] rounded-full"></span>
            <span>ATOL & ABTA protected</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-[#CCFF00] rounded-full"></span>
            <span>26000+ verified reviews</span>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center opacity-70">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

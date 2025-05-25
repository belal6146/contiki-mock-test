
import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';

const Hero = () => {
  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://www.contiki.com/media/vsqbfbwh/dubrovnik-croatia.jpg?center=0.5%2C0.5&format=webp&height=600&mode=crop&quality=80&width=1920"
          alt="Travel destination"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white max-w-5xl mx-auto px-6">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold mb-6 tracking-tight">
          TRAVEL FOR 
          <br />
          <span className="text-[#CCFF00]">18-35S</span>
        </h1>
        
        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto font-medium leading-relaxed">
          Experience epic adventures with like-minded travellers on trips designed for 18-35 year olds
        </p>

        {/* Search Bar */}
        <div className="mb-8">
          <SearchBar />
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            to="/tours"
            className="bg-[#CCFF00] text-black font-bold px-8 py-4 rounded-lg text-lg uppercase tracking-wide hover:bg-[#b8e600] transition-all duration-200 transform hover:scale-105"
          >
            FIND YOUR TRIP
          </Link>
          
          <Link
            to="/destinations"
            className="border-2 border-white text-white font-bold px-8 py-4 rounded-lg text-lg uppercase tracking-wide hover:bg-white hover:text-black transition-all duration-200"
          >
            EXPLORE DESTINATIONS
          </Link>
        </div>

        {/* Trust indicators */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm opacity-90">
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
            <span>20,000+ verified reviews</span>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

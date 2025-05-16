
import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background image with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat" 
        style={{ 
          backgroundImage: `url('/placeholder.svg')`,
          filter: 'brightness(0.7)' 
        }}
      ></div>
      
      {/* Content */}
      <div className="container relative z-10 text-white text-center px-4">
        <h1 className="heading-xl mb-6 animate-[fadeIn_1s_ease-in]">
          Discover The <span className="text-highlight">World</span> Your Way
        </h1>
        
        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto animate-[fadeIn_1s_0.3s_both]">
          Unforgettable travel experiences for 18-35 year olds. 
          Find your perfect trip across 6 continents.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4 animate-[fadeIn_1s_0.6s_both]">
          <Link 
            to="/tours" 
            className="btn-primary px-8 py-3 text-lg font-medium"
          >
            Explore Tours
          </Link>
          
          <Link 
            to="/destinations" 
            className="btn-outline bg-transparent border-white text-white hover:bg-white/30 px-8 py-3 text-lg font-medium"
          >
            View Destinations
          </Link>
        </div>
        
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="40" 
            height="40" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M12 5v14"></path>
            <path d="m19 12-7 7-7-7"></path>
          </svg>
        </div>
      </div>
    </section>
  );
};

export default Hero;

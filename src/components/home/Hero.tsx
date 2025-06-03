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
          {/* Last Minute Deals Banner - Updated structure to fix nested p tags */}
          <div className="title-section__description-text title-section--aligned-center title-section__description--alone rich-text text-paragraph-l" data-testid="genericText" id="title-section__description-textundefined" style={{ color: 'rgb(255, 255, 255)' }}>
            <div> {/* Changed outer p to div */}
              <img
                height="92"
                width="251"
                alt=""
                src="https://www.contiki.com/media/1mklcgdh/lmd-lockup-general.svg?width=251&height=92&mode=max"
                style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto' }}
              />
            </div>
            <div style={{ textAlign: 'center' }}> {/* Changed inner p to div */}
              <strong>
                <span style={{ color: '#ffffff' }}>Save BIG on trips departing soon&nbsp;</span>
              </strong>
            </div>
          </div>

          {/* Search Bar - Positioned below the graphic, ensure correct width and centering */}
          <div className="w-full max-w-[1400px] px-4 mt-8"> {/* Added top margin to separate from the banner */}
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

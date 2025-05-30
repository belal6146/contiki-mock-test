import React from 'react';

const PayOverTimeSection = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 lg:px-8 text-center max-w-screen-xl">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Pay over time, interest-free</h2>
        <p className="text-gray-700 text-base md:text-lg mb-8">Flexible payment options to help you book your dream trip.</p>
        <button className="bg-black hover:bg-gray-700 text-white font-bold py-4 px-10 rounded-full transition-colors duration-200 uppercase tracking-wide text-base shadow-md">
          Learn More
        </button>
      </div>
    </section>
  );
};

export default PayOverTimeSection; 
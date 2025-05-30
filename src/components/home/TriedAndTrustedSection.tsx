import React from 'react';

const TriedAndTrustedSection = () => {
  return (
    <section className="py-8 md:py-16 bg-white">
      <div className="container mx-auto px-4 lg:px-8 text-center max-w-screen-xl">
        {/* Title - Adjusted text size, font weight, and bottom margin */}
        <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-1">Tried and trusted by millions of travelers since 1962</h2>
        {/* Subtitle/Review Count - Adjusted text size and color */}
        <p className="text-gray-700 text-sm md:text-base">Based on 20,000+ verified reviews</p>
      </div>
    </section>
  );
};

export default TriedAndTrustedSection; 
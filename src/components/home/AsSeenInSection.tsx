import React from 'react';

// Placeholder data for logos. Replace with actual logo image URLs as needed.
const logos = [
  'https://via.placeholder.com/150x50?text=Logo1',
  'https://via.placeholder.com/150x50?text=Logo2',
  'https://via.placeholder.com/150x50?text=Logo3',
  'https://via.placeholder.com/150x50?text=Logo4',
  'https://via.placeholder.com/150x50?text=Logo5',
  'https://via.placeholder.com/150x50?text=Logo6',
];

const AsSeenInSection = () => {
  return (
    <section className="py-12 md:py-20 bg-white">
      <div className="container mx-auto px-4 lg:px-8 text-center max-w-screen-xl">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-8">As seen in</h2>

        <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-6 md:gap-x-12 md:gap-y-8">
          {logos.map((logoUrl, index) => (
            <img
              key={index}
              src={logoUrl}
              alt={`As seen in ${index + 1}`}
              className="h-10 md:h-12 object-contain"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AsSeenInSection; 
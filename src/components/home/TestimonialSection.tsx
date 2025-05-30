import React from 'react';

// Placeholder data for testimonials. Replace with actual data as needed.
const testimonials = [
  {
    quote: "Great value for money! Beyond words to explain, just book that flight!!",
    author: "Christopher",
    trip: "Ultimate South East Asia"
  },
  {
    quote: "This trip was amazing, the itinerary was perfect!",
    author: "Amy",
    trip: "Canada & the Rockies"
  },
  {
    quote: "This trip was great value. Great bunch of people. I\'m glad I did it and I highly recommend.",
    author: "Steven",
    trip: "Canada & the Rockies"
  },
];

const TestimonialSection = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 lg:px-8 text-center max-w-screen-xl">
        {/* Section Title - Assuming this title is present based on commented code and typical sections */}
        {/* Adjusted styling for the title */}
        <h2 className="text-3xl md:text-4xl font-bold mb-12 md:mb-20 text-gray-800">What our travellers say</h2>

        {/* Testimonials Grid - Adjusted gap and responsiveness */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-20">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gray-50 p-6 rounded-lg shadow flex flex-col justify-between text-left">
              {/* Quote Text - Adjusted color, font style, and margin */}
              <p className="text-gray-700 italic mb-4 text-base md:text-lg">\"{testimonial.quote}\"</p>
              <div>
                {/* Author - Adjusted font weight and color */}
                <p className="font-bold text-gray-800 text-sm md:text-base">{testimonial.author}</p>
                {/* Trip - Adjusted font size and color */}
                <p className="text-xs md:text-sm text-gray-600">{testimonial.trip}</p>
              </div>
            </div>
          ))}
        </div>

         {/* Call to action/Link - Assuming this button is present */}
         {/* Adjusted button styling */}
         <button className="mt-8 bg-[#CCFF00] hover:bg-[#b8e600] text-black font-bold py-4 px-10 rounded-full transition-colors duration-200 uppercase tracking-wide text-base shadow-md">
           Read More Reviews
         </button>
      </div>
    </section>
  );
};

export default TestimonialSection; 
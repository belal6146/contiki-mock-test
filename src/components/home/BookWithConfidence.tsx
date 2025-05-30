import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const BookWithConfidence = () => {
  const confidenceItems = [
    {
      icon: "💳",
      text: "Lock in your spot with a £60 deposit"
    },
    {
      icon: "⏰",
      text: "Pay monthly or bi-weekly"
    },
    {
      icon: "📅",
      text: "Amend your booking up to 60 days pre-trip"
    },
    {
      icon: "🛡️",
      text: "ABTA & ATOL Protected"
    }
  ];

  return (
    <section className="w-full bg-[#F0F8E7] py-16 md:py-24">
      <div className="container max-w-6xl mx-auto px-4 lg:px-8">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 md:mb-20 text-gray-800">Book with confidence</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-6 md:gap-x-8 mb-12 md:mb-20">
          {confidenceItems.map((item, index) => (
            <div key={index} className="flex flex-col items-center text-center p-4">
              <div className="mb-6 bg-white rounded-full p-4 flex items-center justify-center w-16 h-16 shadow-md">
                <span className="text-2xl md:text-3xl">{item.icon}</span>
              </div>
              <p className="text-sm md:text-base font-semibold text-gray-700 max-w-xs leading-tight">
                {item.text}
              </p>
            </div>
          ))}
        </div>
        
        <div className="flex justify-center">
          <button
            className="bg-white text-gray-800 font-bold py-3 px-8 rounded-full shadow-lg hover:bg-gray-100 transition-colors duration-200 text-base uppercase tracking-wide"
            aria-label="Find out more"
          >
            FIND OUT MORE
          </button>
        </div>
      </div>
    </section>
  );
};

export default BookWithConfidence;

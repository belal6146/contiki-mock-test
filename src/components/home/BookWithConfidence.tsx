import React, { useEffect } from 'react';
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
    <section className="w-full bg-lime-100 py-16">
      <div className="container max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-black">Book with confidence</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {confidenceItems.map((item, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="mb-4 bg-white rounded-full p-4 flex items-center justify-center w-20 h-20 shadow-sm">
                <span className="text-2xl">{item.icon}</span>
              </div>
              <p className="text-lg font-medium text-black max-w-xs">
                {item.text}
              </p>
            </div>
          ))}
        </div>
        
        <div className="flex justify-center">
          <Button 
            variant="default" 
            className="bg-black text-white hover:bg-gray-800 font-medium px-8 py-3 rounded-full text-lg"
            asChild
          >
            <Link to="/book-with-confidence">FIND OUT MORE</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BookWithConfidence;

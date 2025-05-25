
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const BookWithConfidence = () => {
  useEffect(() => {
    console.debug('[BookWithConfidence] mounted');
  }, []);

  const confidenceItems = [
    {
      icon: (
        <img 
          src="https://www.contiki.com/media/bcoftwgx/details-sorted-icon.jpg?center=0.5%2C0.5&format=webp&height=600&mode=crop&quality=80&width=1200" 
          alt="Details Sorted" 
          className="w-12 h-12 object-contain"
        />
      ),
      text: "Includes accommodation, local transport & epic experiences"
    },
    {
      icon: (
        <img 
          src="https://www.contiki.com/media/0ficmavf/experience-social-icon.jpg?center=0.5%2C0.5&format=webp&height=600&mode=crop&quality=80&width=1200" 
          alt="Experience Social Travel" 
          className="w-12 h-12 object-contain"
        />
      ),
      text: "Explore with a Trip Manager, Driver and other awesome travellers"
    },
    {
      icon: (
        <img 
          src="https://www.contiki.com/media/4vvbzugm/abta-logo.svg?center=0.5%2C0.5&format=webp&height=100&mode=crop&quality=80&width=300" 
          alt="ABTA Protected" 
          className="w-12 h-12 object-contain"
        />
      ),
      text: "ABTA protected"
    },
    {
      icon: (
        <img 
          src="https://www.contiki.com/media/scmo443v/atol-logo.svg?center=0.5%2C0.5&format=webp&height=100&mode=crop&quality=80&width=300" 
          alt="ATOL Protected" 
          className="w-12 h-12 object-contain"
        />
      ),
      text: "ATOL protected"
    }
  ];

  return (
    <section className="w-full bg-[#F5FFE0] py-16">
      <div className="container max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Book with confidence</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {confidenceItems.map((item, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="mb-4 bg-white rounded-full p-4 flex items-center justify-center w-20 h-20">
                {item.icon}
              </div>
              <p className="text-lg font-medium">
                {item.text}
              </p>
            </div>
          ))}
        </div>
        
        <div className="flex justify-center">
          <Button 
            variant="default" 
            className="bg-black text-white hover:bg-black/90 font-medium px-8 py-3 rounded-full text-lg"
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

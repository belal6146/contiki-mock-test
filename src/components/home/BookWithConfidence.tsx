
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Lock, Calendar, Edit, Shield } from 'lucide-react';

const BookWithConfidence = () => {
  useEffect(() => {
    console.debug('[BookWithConfidence] mounted');
  }, []);

  const confidenceItems = [
    {
      icon: <Lock className="h-8 w-8" />,
      text: "Lock in your spot with a £50 deposit"
    },
    {
      icon: <Calendar className="h-8 w-8" />,
      text: "Pay monthly or bi-weekly"
    },
    {
      icon: <Edit className="h-8 w-8" />,
      text: "Amend your booking up to 60 days pre-trip"
    },
    {
      icon: <Shield className="h-8 w-8" />,
      text: "ABTA & ATOL protected"
    }
  ];

  return (
    <section className="w-full bg-[#F5FFE0] py-16">
      <div className="container max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Book with confidence</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {confidenceItems.map((item, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="mb-4 bg-black rounded-full p-4 text-white">
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

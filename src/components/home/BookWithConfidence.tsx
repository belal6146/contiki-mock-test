
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Calendar, Edit, Lock, Shield } from 'lucide-react';

const BookWithConfidence = () => {
  useEffect(() => {
    console.debug('[BookWithConfidence] mounted');
  }, []);

  const confidenceItems = [
    {
      icon: <Lock className="h-6 w-6" />,
      text: "Lock in your spot with a £50 deposit"
    },
    {
      icon: <Calendar className="h-6 w-6" />,
      text: "Pay monthly at 0% APR"
    },
    {
      icon: <Edit className="h-6 w-6" />,
      text: "Amend your booking up to 42 days before trip"
    },
    {
      icon: <Shield className="h-6 w-6" />,
      text: "ABTA & ATOL protected"
    }
  ];

  return (
    <section className="w-full bg-[#F5F5F5] py-12 md:py-16">
      <div className="container">
        <div className="flex flex-col items-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10 max-w-5xl mx-auto">
            {confidenceItems.map((item, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <div className="mb-4 text-primary">
                  {item.icon}
                </div>
                <p className="text-sm md:text-base font-medium">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
          
          <Button 
            variant="default" 
            className="bg-primary text-white hover:bg-primary/90 font-medium"
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


import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Users } from 'lucide-react';
import { useBooking } from '@/context/BookingContext';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';

interface BookingBarProps {
  price: number;
  slug: string;
}

const BookingBar: React.FC<BookingBarProps> = ({ price, slug }) => {
  const navigate = useNavigate();
  const { date, travelers, setDate, setTravelers } = useBooking();
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    console.debug('[BookingBar] mounted', { price });
    
    const handleScroll = () => {
      const offset = window.scrollY;
      setIsSticky(offset > 200);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [price]);

  const handleBookNowClick = () => {
    console.debug('[BookingBar] bookNow', { slug });
    
    // Scroll to booking section if on the same page
    const bookingSection = document.getElementById('booking');
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      // Navigate to booking section on tour detail page
      navigate(`/tours/${slug}#booking`);
    }
  };

  return (
    <div 
      className={`${isSticky ? 'fixed top-0' : 'relative'} left-0 right-0 bg-white shadow-lg p-4 flex justify-between items-center z-40 border-t border-gray-200 transition-all duration-300`}
    >
      <div className="flex items-center gap-6">
        <div className="flex flex-col">
          <span className="text-sm text-gray-600">From</span>
          <span className="text-xl font-bold text-primary">${price}</span>
        </div>
        
        <div className="hidden md:flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4" />
            <span>{date ? format(new Date(date), 'MMM d, yyyy') : 'Select dates'}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <Users className="h-4 w-4" />
            <span>{travelers} traveler{travelers !== 1 ? 's' : ''}</span>
          </div>
        </div>
      </div>
      
      <Button 
        onClick={handleBookNowClick}
        className="bg-[#CCFF00] hover:bg-[#CCFF00]/90 text-black font-medium"
      >
        Book Now
      </Button>
    </div>
  );
};

export default BookingBar;

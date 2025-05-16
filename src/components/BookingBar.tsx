
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface BookingBarProps {
  price: number;
  slug: string;
}

const BookingBar: React.FC<BookingBarProps> = ({ price, slug }) => {
  const navigate = useNavigate();

  useEffect(() => {
    console.debug('[BookingBar] mounted', { price });
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
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg p-4 flex justify-between items-center z-40 border-t border-gray-200">
      <div className="flex flex-col">
        <span className="text-sm text-gray-600">From</span>
        <span className="text-xl font-bold text-primary">${price}</span>
      </div>
      
      <button 
        onClick={handleBookNowClick}
        className="bg-accent hover:bg-accent/90 text-white px-6 py-2 rounded-md font-medium transition-colors"
      >
        Book Now
      </button>
    </div>
  );
};

export default BookingBar;

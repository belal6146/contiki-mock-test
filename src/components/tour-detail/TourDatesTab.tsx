
import React from 'react';
import VariationCards from '@/components/tour/VariationCards';
import BookingFlow from '@/components/BookingFlow';
import { Trip } from '@/types/trip';

interface TourDatesTabProps {
  trip: Trip;
}

const TourDatesTab: React.FC<TourDatesTabProps> = ({ trip }) => {
  return (
    <div>
      <h2 className="heading-md mb-6 container">Available Dates & Pricing</h2>
      
      <div className="grid grid-cols-1 gap-6 container">
        <VariationCards variations={trip.variations} />
        
        <div id="booking" className="mt-8">
          <h3 className="text-xl font-bold mb-4">Book This Trip</h3>
          <BookingFlow />
        </div>
      </div>
    </div>
  );
};

export default TourDatesTab;

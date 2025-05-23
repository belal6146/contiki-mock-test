
import React, { useState } from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useConsent } from '@/context/ConsentManager';
import { maskName, maskAge } from '@/utils/DataMasking';
import { Button } from '@/components/ui/button';

export interface BookingPassenger {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  gender: string;
  address: {
    country: string;
  };
  travelPassion?: string;
  numberOfTimesTravelledPreviously?: number;
  passengerId: number;
}

interface TravelersInfoProps {
  passengers: BookingPassenger[];
}

const TravelersInfo: React.FC<TravelersInfoProps> = ({ passengers }) => {
  const { hasConsented, toggleConsent } = useConsent();
  const [showAll, setShowAll] = useState(false);
  
  const displayedPassengers = showAll ? passengers : passengers.slice(0, 5);
  
  if (!passengers || passengers.length === 0) {
    return (
      <div className="p-6 bg-gray-50 rounded-md">
        <p className="text-gray-500 text-center">No travelers have booked this trip yet.</p>
      </div>
    );
  }

  const getFullName = (passenger: BookingPassenger) => `${passenger.firstName} ${passenger.lastName}`;
  
  const getSeatId = (passenger: BookingPassenger) => {
    // Generate seat based on passenger ID for demo purposes
    const seatRow = Math.floor((passenger.passengerId - 1) / 2) + 1;
    const seatLetter = (passenger.passengerId - 1) % 2 === 0 ? 'A' : 'B';
    return `${seatRow}${seatLetter}`;
  };

  return (
    <div className="p-6">
      <div className="mb-6 space-y-6">
        {displayedPassengers.map(passenger => (
          <div key={passenger.id} className="flex items-start">
            <Avatar className="h-12 w-12 mr-4 bg-gray-100">
              <AvatarFallback className="bg-gray-200 text-gray-600 font-medium">
                {hasConsented ? getFullName(passenger).charAt(0) : passenger.firstName.charAt(0)}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-lg text-gray-900">
                    {hasConsented ? getFullName(passenger) : maskName(getFullName(passenger))}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {hasConsented ? `${passenger.age} years` : maskAge(passenger.age)} • {passenger.address.country}
                  </p>
                  {passenger.travelPassion && (
                    <p className="text-sm text-gray-600 mt-1">
                      Interested in: {passenger.travelPassion}
                    </p>
                  )}
                  {passenger.numberOfTimesTravelledPreviously !== undefined && (
                    <p className="text-sm text-gray-500 mt-1">
                      {passenger.numberOfTimesTravelledPreviously} previous trips
                    </p>
                  )}
                </div>
                
                <div className="ml-4">
                  <div className="bg-black text-white text-xs py-1 px-3 rounded font-medium">
                    Seat {getSeatId(passenger)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Privacy consent toggle */}
      <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-md">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-blue-900">
              {hasConsented ? "Showing full traveler details" : "Privacy mode enabled"}
            </p>
            <p className="text-xs text-blue-700 mt-1">
              {hasConsented 
                ? "Personal information is visible" 
                : "Names and ages are anonymized for privacy"}
            </p>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={toggleConsent}
            className="text-xs h-8 border-blue-300 text-blue-700 hover:bg-blue-100"
          >
            {hasConsented ? "Enable privacy mode" : "Show full details"}
          </Button>
        </div>
      </div>
      
      {/* View all button */}
      {passengers.length > 5 && !showAll && (
        <div className="text-center">
          <Button
            variant="link"
            onClick={() => setShowAll(true)}
            className="text-orange-500 hover:text-orange-600 font-medium"
          >
            View all {passengers.length} travelers
          </Button>
        </div>
      )}
    </div>
  );
};

export default TravelersInfo;

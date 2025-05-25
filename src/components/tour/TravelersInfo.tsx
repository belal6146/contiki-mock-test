
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
      <div className="p-8 bg-gray-50 rounded-lg border border-gray-200 font-montserrat">
        <p className="text-gray-500 text-center font-medium">No travelers have booked this trip yet.</p>
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
    <div className="p-6 bg-white font-montserrat">
      <div className="mb-6 space-y-6">
        {displayedPassengers.map(passenger => (
          <div key={passenger.id} className="flex items-start p-4 bg-gray-50 rounded-lg border border-gray-200 hover:shadow-sm transition-all duration-200">
            <Avatar className="h-14 w-14 mr-4 bg-[rgb(204,255,0)] border-2 border-[rgb(184,230,0)]">
              <AvatarFallback className="bg-[rgb(204,255,0)] text-black font-bold text-lg">
                {hasConsented ? getFullName(passenger).charAt(0) : passenger.firstName.charAt(0)}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-lg text-black mb-1">
                    {hasConsented ? getFullName(passenger) : maskName(getFullName(passenger))}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2 font-medium">
                    {hasConsented ? `${passenger.age} years` : maskAge(passenger.age)} • {passenger.address.country}
                  </p>
                  {passenger.travelPassion && (
                    <p className="text-sm text-gray-600 mb-1 font-medium">
                      <span className="font-bold text-black">Interested in:</span> {passenger.travelPassion}
                    </p>
                  )}
                  {passenger.numberOfTimesTravelledPreviously !== undefined && (
                    <p className="text-sm text-gray-500 font-medium">
                      <span className="font-bold text-black">{passenger.numberOfTimesTravelledPreviously}</span> previous trips
                    </p>
                  )}
                </div>
                
                <div className="ml-4">
                  <div className="bg-black text-white text-xs py-2 px-4 rounded-full font-bold uppercase tracking-wide">
                    Seat {getSeatId(passenger)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Privacy consent toggle */}
      <div className="mb-6 p-4 bg-[rgb(204,255,0)] border-2 border-[rgb(184,230,0)] rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-bold text-black uppercase tracking-wide mb-1">
              {hasConsented ? "Showing full traveler details" : "Privacy mode enabled"}
            </p>
            <p className="text-xs text-black font-medium">
              {hasConsented 
                ? "Personal information is visible" 
                : "Names and ages are anonymized for privacy"}
            </p>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={toggleConsent}
            className="text-xs h-8 bg-white border-2 border-black text-black hover:bg-gray-100 font-bold uppercase tracking-wide"
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
            className="text-black hover:text-gray-700 font-bold uppercase tracking-wide underline"
          >
            View all {passengers.length} travelers
          </Button>
        </div>
      )}
    </div>
  );
};

export default TravelersInfo;

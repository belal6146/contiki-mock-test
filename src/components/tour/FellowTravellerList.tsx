import React, { useState } from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useConsent } from '@/context/ConsentManager';
import { maskName, maskAge } from '@/utils/DataMasking';
import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';

export interface FellowTraveller {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  gender: string;
  address: {
    country: string;
    countryCode: string;
  };
  travelPassion?: string;
  numberOfTimesTravelledPreviously?: number;
  passengerId: number;
  roomType?: string;
  roomMate?: {
    firstName: string;
    lastName: string;
  };
  beddingPreference?: string;
  additionalProducts?: Array<{
    name: string;
    type: string;
  }>;
  dateOfBirthActual?: {
    year: string;
    month: string;
    date: string;
  };
}

interface FellowTravellerListProps {
  passengers: FellowTraveller[];
}

const FellowTravellerList: React.FC<FellowTravellerListProps> = ({ passengers }) => {
  const { hasConsented, toggleConsent } = useConsent();
  const [showAll, setShowAll] = useState(false);
  
  const displayedPassengers = showAll ? passengers : passengers.slice(0, 8);
  
  if (!passengers || passengers.length === 0) {
    return (
      <div className="p-8 bg-gray-50 rounded-lg border border-gray-200 font-montserrat">
        <p className="text-gray-500 text-center font-medium">No travelers have booked this trip yet.</p>
      </div>
    );
  }

  const getInitials = (passenger: FellowTraveller) => {
    return `${passenger.firstName.charAt(0)}.${passenger.lastName.charAt(0)}.`;
  };

  const getFullName = (passenger: FellowTraveller) => `${passenger.firstName} ${passenger.lastName}`;
  
  const calculateAgeRange = (dateOfBirth?: { year: string; month: string; date: string }) => {
    if (!dateOfBirth) return "Age not specified";
    const birthYear = parseInt(dateOfBirth.year);
    const currentYear = new Date().getFullYear();
    const age = currentYear - birthYear;
    
    // Group into age ranges
    if (age < 25) return "18-24";
    if (age < 35) return "25-34";
    if (age < 45) return "35-44";
    if (age < 55) return "45-54";
    if (age < 65) return "55-64";
    return "65+";
  };

  const getRoomInfo = (passenger: FellowTraveller) => {
    if (!passenger.roomType) return "Room not assigned";
    const roomTypeLabel = passenger.roomType === "double" ? "Double" : passenger.roomType === "twin" ? "Twin" : passenger.roomType;
    if (passenger.roomMate) {
      return `${roomTypeLabel} (w/ ${passenger.roomMate.firstName})`;
    }
    return roomTypeLabel;
  };

  const getExtras = (passenger: FellowTraveller) => {
    if (!passenger.additionalProducts || passenger.additionalProducts.length === 0) {
      return "No extras";
    }
    return passenger.additionalProducts.map(p => p.name).join(', ');
  };

  const getSeatId = (passenger: FellowTraveller) => {
    // Generate seat based on passenger ID for demo purposes
    const seatRow = Math.floor((passenger.passengerId - 1) / 2) + 1;
    const seatLetter = (passenger.passengerId - 1) % 2 === 0 ? 'A' : 'B';
    return `${seatRow}${seatLetter}`;
  };

  const openChat = (passengerId: number) => {
    console.log(`Opening chat for passenger ${passengerId}`);
    // This would open the chat functionality
    alert(`Chat feature would open for passenger ${passengerId}`);
  };

  return (
    <div className="contiki-card font-montserrat">
      <div className="p-8 border-b border-gray-100">
        <h2 className="heading-md">
          Fellow Travelers
        </h2>
        <p className="text-body leading-relaxed">
          Connect with your travel companions before the trip begins!
        </p>
      </div>

      <div className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {displayedPassengers.map(passenger => (
            <div key={passenger.id} className="flex items-start p-6 bg-white rounded-xl border border-gray-100 hover:shadow-md transition-all duration-200">
              <Avatar className="h-12 w-12 mr-4 bg-[var(--secondary)] border-2 border-[#b8e600] flex-shrink-0">
                <AvatarFallback className="bg-[var(--secondary)] text-black font-bold text-sm">
                  {hasConsented ? getInitials(passenger) : passenger.firstName.charAt(0)}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1">
                    <h3 className="font-bold text-base text-gray-900 mb-1 truncate">
                      {hasConsented ? getFullName(passenger) : maskName(getFullName(passenger))}
                    </h3>
                    <p className="text-xs text-gray-600 mb-1 font-medium">
                      {hasConsented ? calculateAgeRange(passenger.dateOfBirthActual) : maskAge(passenger.age)} • {passenger.address.countryCode?.toUpperCase()}
                    </p>
                  </div>
                  
                  <div className="ml-2 flex-shrink-0">
                    <div className="bg-black text-white text-xs py-1 px-3 rounded-full font-bold uppercase tracking-wide">
                      Seat {getSeatId(passenger)}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4 mt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openChat(passenger.id)}
                    className="btn-outline text-xs h-8 border-black text-black hover:bg-gray-100 font-bold uppercase tracking-wide"
                  >
                    Message
                  </Button>
                  {hasConsented && passenger.travelPassion && (
                    <span className="text-xs text-gray-600 font-medium">
                      {passenger.travelPassion}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Privacy consent toggle */}
        <div className="mt-8 p-6 bg-[#CCFF00] border-2 border-[#b8e600] rounded-lg">
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
          <div className="text-center mt-8">
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
    </div>
  );
};

export default FellowTravellerList;

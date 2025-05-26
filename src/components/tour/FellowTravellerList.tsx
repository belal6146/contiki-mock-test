
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
    <div className="p-6 bg-white font-montserrat">
      <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {displayedPassengers.map(passenger => (
          <div key={passenger.id} className="flex items-start p-4 bg-gray-50 rounded-lg border border-gray-200 hover:shadow-sm transition-all duration-200">
            <Avatar className="h-12 w-12 mr-4 bg-[rgb(204,255,0)] border-2 border-[rgb(184,230,0)] flex-shrink-0">
              <AvatarFallback className="bg-[rgb(204,255,0)] text-black font-bold text-sm">
                {hasConsented ? getInitials(passenger) : passenger.firstName.charAt(0)}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start mb-2">
                <div className="flex-1">
                  <h3 className="font-bold text-base text-black mb-1 truncate">
                    {hasConsented ? getFullName(passenger) : maskName(getFullName(passenger))}
                  </h3>
                  <p className="text-xs text-gray-600 mb-1 font-medium">
                    {hasConsented ? calculateAgeRange(passenger.dateOfBirthActual) : maskAge(passenger.age)} • {passenger.address.countryCode?.toUpperCase()}
                  </p>
                </div>
                
                <div className="ml-2 flex-shrink-0">
                  <div className="bg-black text-white text-xs py-1 px-2 rounded-full font-bold uppercase tracking-wide">
                    {getSeatId(passenger)}
                  </div>
                </div>
              </div>

              <div className="space-y-1 text-xs">
                {passenger.travelPassion && (
                  <p className="text-gray-600 font-medium">
                    <span className="font-bold text-black">Interested in:</span> {passenger.travelPassion}
                  </p>
                )}
                {passenger.numberOfTimesTravelledPreviously !== undefined && (
                  <p className="text-gray-600 font-medium">
                    <span className="font-bold text-black">{passenger.numberOfTimesTravelledPreviously}</span> previous trips
                  </p>
                )}
                <p className="text-gray-600 font-medium">
                  <span className="font-bold text-black">Room:</span> {getRoomInfo(passenger)}
                </p>
                {passenger.beddingPreference && (
                  <p className="text-gray-600 font-medium">
                    <span className="font-bold text-black">Bedding:</span> {passenger.beddingPreference === "doubleBed" ? "Double bed" : "Twin beds"}
                  </p>
                )}
                <p className="text-gray-600 font-medium">
                  <span className="font-bold text-black">Extras:</span> {getExtras(passenger)}
                </p>
              </div>

              <div className="mt-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => openChat(passenger.passengerId)}
                  className="text-xs h-7 bg-white border border-gray-300 text-black hover:bg-gray-50 font-medium"
                >
                  <MessageCircle className="w-3 h-3 mr-1" />
                  Chat in-app
                </Button>
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
      {passengers.length > 8 && !showAll && (
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

export default FellowTravellerList;

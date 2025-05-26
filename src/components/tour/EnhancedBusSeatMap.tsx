
import React, { useState } from 'react';
import { Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { mockPassengers } from '@/data/mockPassengers';
import { cn } from '@/lib/utils';

export interface BookingPassenger {
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
}

interface EnhancedBusSeatMapProps {
  passengers: BookingPassenger[];
}

interface SeatData {
  id: string;
  row: number;
  position: 'left' | 'right';
  passenger?: any;
  isOccupied: boolean;
  isSelected: boolean;
}

const EnhancedBusSeatMap: React.FC<EnhancedBusSeatMapProps> = ({ passengers }) => {
  const [selectedSeat, setSelectedSeat] = useState<string | null>(null);
  const [hoveredSeat, setHoveredSeat] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Create seat layout with driver, courier, toilet, and passenger seats
  const generateSeats = (): SeatData[] => {
    const seats: SeatData[] = [];
    const enhancedPassengers = mockPassengers.slice(0, 40);
    
    // Generate 18 rows of seats (2 seats per row = 36 passenger seats)
    for (let row = 1; row <= 18; row++) {
      // Left seat
      const leftSeatId = `${row}L`;
      const leftPassengerIndex = (row - 1) * 2;
      const leftPassenger = enhancedPassengers[leftPassengerIndex];
      
      seats.push({
        id: leftSeatId,
        row,
        position: 'left',
        passenger: leftPassenger,
        isOccupied: !!leftPassenger,
        isSelected: selectedSeat === leftSeatId
      });
      
      // Right seat
      const rightSeatId = `${row}R`;
      const rightPassengerIndex = (row - 1) * 2 + 1;
      const rightPassenger = enhancedPassengers[rightPassengerIndex];
      
      seats.push({
        id: rightSeatId,
        row,
        position: 'right',
        passenger: rightPassenger,
        isOccupied: !!rightPassenger,
        isSelected: selectedSeat === rightSeatId
      });
    }
    
    return seats;
  };

  const seats = generateSeats();
  
  const handleSeatClick = (seatId: string) => {
    const seat = seats.find(s => s.id === seatId);
    if (seat && !seat.isOccupied) {
      setSelectedSeat(prev => prev === seatId ? null : seatId);
      setErrorMessage(null);
    }
  };

  const handleSaveSelection = () => {
    if (!selectedSeat) {
      setErrorMessage('Please select a seat to continue.');
      return;
    }
    console.log(`Seat selected: ${selectedSeat}`);
    alert(`You selected seat ${selectedSeat}`);
  };

  const renderSeat = (seat: SeatData) => {
    const isHovered = hoveredSeat === seat.id;
    
    return (
      <div
        key={seat.id}
        className="relative"
        onMouseEnter={() => setHoveredSeat(seat.id)}
        onMouseLeave={() => setHoveredSeat(null)}
      >
        <button
          onClick={() => handleSeatClick(seat.id)}
          disabled={seat.isOccupied}
          className={cn(
            "w-8 h-12 rounded-lg border-2 font-bold text-xs transition-all duration-200 font-montserrat flex items-center justify-center relative",
            seat.isOccupied
              ? seat.passenger?.gender === 'Male'
                ? "bg-blue-100 border-blue-200 text-blue-800"
                : "bg-pink-100 border-pink-200 text-pink-800"
              : seat.isSelected
              ? "bg-[rgb(204,255,0)] border-[rgb(184,230,0)] text-black shadow-md"
              : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 cursor-pointer",
            seat.isOccupied && "cursor-not-allowed"
          )}
        >
          {seat.id}
        </button>
        
        {/* Passenger Info Tooltip */}
        {isHovered && seat.passenger && (
          <div className="absolute z-50 bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-black text-white text-xs rounded-lg p-3 shadow-lg whitespace-nowrap">
            <div className="font-bold">{seat.passenger.firstName} {seat.passenger.lastName}</div>
            <div className="text-gray-300">{seat.passenger.age} years, {seat.passenger.address.country}</div>
            {seat.passenger.travelPassion && (
              <div className="text-gray-300">Interested in: {seat.passenger.travelPassion}</div>
            )}
            <div className="text-gray-300">{seat.passenger.numberOfTimesTravelledPreviously || 0} previous trips</div>
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black"></div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="p-6 bg-white font-montserrat">
      <div className="mb-6">
        <p className="text-sm text-gray-600 leading-relaxed">
          Select a seat to see who you'll be sitting next to. Hover over occupied seats to see passenger information.
        </p>
      </div>
      
      {/* Traveler Connection Banner */}
      <div className="bg-[rgb(204,255,0)] border border-[rgb(184,230,0)] rounded-lg p-4 mb-6 flex items-start">
        <div className="text-black mr-3 flex-shrink-0 mt-0.5">
          <Settings size={20} />
        </div>
        <div>
          <h3 className="text-black font-bold text-sm mb-1 uppercase tracking-wide">Traveler Connection</h3>
          <p className="text-sm text-black leading-relaxed">
            Hover over seats to see passenger details and connect with fellow travelers!
          </p>
        </div>
      </div>
      
      {/* Bus Layout */}
      <div className="max-w-2xl mx-auto bg-gray-50 rounded-2xl border-4 border-[rgb(204,255,0)] p-6 relative">
        {/* Emergency Door */}
        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-[rgb(204,255,0)] text-black text-xs font-bold px-3 py-1 rounded-full">
          EMERGENCY DOOR
        </div>
        
        {/* Front Door */}
        <div className="absolute -bottom-2 left-8 bg-[rgb(204,255,0)] text-black text-xs font-bold px-3 py-1 rounded-full">
          FRONT DOOR
        </div>
        
        <div className="grid grid-cols-12 gap-2">
          {/* Driver Seat */}
          <div className="col-span-3 flex items-center justify-center">
            <div className="w-16 h-12 bg-gray-700 rounded-lg flex items-center justify-center text-white text-xs font-bold">
              DRIVER SEAT
            </div>
          </div>
          
          {/* First row with courier seat */}
          <div className="col-span-4 flex justify-center">
            <div className="w-8 h-12 bg-gray-700 rounded-lg flex items-center justify-center text-white text-xs font-bold">
              C
            </div>
          </div>
          
          {/* Toilet */}
          <div className="col-span-5 flex items-center justify-center">
            <div className="w-20 h-16 bg-gray-300 rounded-lg flex items-center justify-center text-gray-700 text-xs font-bold">
              TOILET
            </div>
          </div>
          
          {/* Passenger Seats */}
          <div className="col-span-12 mt-4">
            <div className="text-center text-xs text-gray-500 mb-2 font-medium uppercase tracking-wide">
              Passenger Seating
            </div>
            
            <div className="grid grid-cols-4 gap-x-8 gap-y-2 max-w-md mx-auto">
              {Array.from({ length: 18 }, (_, rowIndex) => {
                const rowNumber = rowIndex + 1;
                const leftSeat = seats.find(s => s.id === `${rowNumber}L`);
                const rightSeat = seats.find(s => s.id === `${rowNumber}R`);
                
                return (
                  <React.Fragment key={rowNumber}>
                    <div className="flex justify-end">
                      {leftSeat && renderSeat(leftSeat)}
                    </div>
                    <div className="flex justify-start">
                      {rightSeat && renderSeat(rightSeat)}
                    </div>
                    <div className="flex justify-end">
                      {/* Right side seats would go here if this was a 4-seat-per-row layout */}
                    </div>
                    <div className="flex justify-start">
                      {/* More right side seats would go here */}
                    </div>
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      
      {/* Seat Legend */}
      <div className="mt-6">
        <h3 className="text-sm font-bold mb-4 uppercase tracking-wide text-black">Seat Legend</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-center">
            <div className="w-5 h-5 bg-white border-2 border-gray-300 rounded mr-3"></div>
            <span className="text-sm text-gray-700 font-medium">Available</span>
          </div>
          <div className="flex items-center">
            <div className="w-5 h-5 bg-blue-100 border-2 border-blue-200 rounded mr-3"></div>
            <span className="text-sm text-gray-700 font-medium">Occupied (Male)</span>
          </div>
          <div className="flex items-center">
            <div className="w-5 h-5 bg-pink-100 border-2 border-pink-200 rounded mr-3"></div>
            <span className="text-sm text-gray-700 font-medium">Occupied (Female)</span>
          </div>
          <div className="flex items-center">
            <div className="w-5 h-5 bg-[rgb(204,255,0)] border-2 border-[rgb(184,230,0)] rounded mr-3"></div>
            <span className="text-sm text-gray-700 font-medium">Selected</span>
          </div>
        </div>
      </div>
      
      {/* Warning Message */}
      <div className="bg-red-50 border-l-4 border-red-400 rounded-r p-4 mt-6">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-red-700 font-bold text-sm uppercase tracking-wide">This booking is non-refundable</p>
            <p className="text-red-600 text-sm mt-1">This booking falls under the 100% cancellation policy</p>
          </div>
        </div>
      </div>
      
      {/* Error message */}
      {errorMessage && (
        <div className="text-red-600 text-sm mt-4 p-3 bg-red-50 border border-red-200 rounded font-medium">
          {errorMessage}
        </div>
      )}
      
      {/* Action Button */}
      <div className="flex justify-end mt-6">
        <Button 
          onClick={handleSaveSelection}
          className="bg-[rgb(204,255,0)] hover:bg-[rgb(184,230,0)] text-black font-bold px-8 py-3 text-sm uppercase tracking-wide transition-all duration-200 border-2 border-[rgb(204,255,0)] hover:border-[rgb(184,230,0)]"
        >
          Save Seat Selection
        </Button>
      </div>
    </div>
  );
};

export default EnhancedBusSeatMap;

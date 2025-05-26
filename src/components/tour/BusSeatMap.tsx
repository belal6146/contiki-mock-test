
import React, { useState } from 'react';
import { Settings } from 'lucide-react';
import SeatGrid, { Seat } from './SeatGrid';
import { Button } from '@/components/ui/button';
import { mockPassengers } from '@/data/mockPassengers';

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

interface BusSeatMapProps {
  passengers: BookingPassenger[];
}

const BusSeatMap: React.FC<BusSeatMapProps> = ({ passengers }) => {
  const [selectedSeat, setSelectedSeat] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Use the enhanced mock passenger data for seat assignments
  const enhancedPassengers = mockPassengers.slice(0, 20); // Use first 20 for seat assignments

  // Generate seat data based on enhanced passengers
  const generateSeats = () => {
    const upperDeckSeats: Seat[] = [];
    const lowerDeckSeats: Seat[] = [];
    
    // Generate 40 seats total (20 lower deck, 20 upper deck)
    for (let i = 1; i <= 20; i++) {
      const seatA = `${i}A`;
      const seatB = `${i}B`;
      
      // Check if passenger is assigned to this seat
      const passengerA = enhancedPassengers.find((p, idx) => {
        const seatRow = Math.floor(idx / 2) + 1;
        const seatLetter = idx % 2 === 0 ? 'A' : 'B';
        return `${seatRow}${seatLetter}` === seatA;
      });
      
      const passengerB = enhancedPassengers.find((p, idx) => {
        const seatRow = Math.floor(idx / 2) + 1;
        const seatLetter = idx % 2 === 0 ? 'A' : 'B';
        return `${seatRow}${seatLetter}` === seatB;
      });

      if (i <= 10) {
        // Lower deck
        lowerDeckSeats.push({
          id: seatA,
          status: passengerA ? (passengerA.gender === 'Male' ? 'occupied_male' : 'occupied_female') : 'available',
          traveler: passengerA ? {
            id: passengerA.id.toString(),
            name: `${passengerA.firstName} ${passengerA.lastName}`
          } : undefined
        });
        
        lowerDeckSeats.push({
          id: seatB,
          status: passengerB ? (passengerB.gender === 'Male' ? 'occupied_male' : 'occupied_female') : 'available',
          traveler: passengerB ? {
            id: passengerB.id.toString(),
            name: `${passengerB.firstName} ${passengerB.lastName}`
          } : undefined
        });
      } else {
        // Upper deck (seats 21-30)
        const upperSeatA = `${i + 10}A`;
        const upperSeatB = `${i + 10}B`;
        
        upperDeckSeats.push({
          id: upperSeatA,
          status: 'available'
        });
        
        upperDeckSeats.push({
          id: upperSeatB,
          status: 'available'
        });
      }
    }
    
    return { upperDeckSeats, lowerDeckSeats };
  };

  const { upperDeckSeats, lowerDeckSeats } = generateSeats();

  const handleSeatSelect = (seatId: string) => {
    setSelectedSeat(prev => prev === seatId ? null : seatId);
    setErrorMessage(null);
  };

  const handleSaveSelection = () => {
    if (!selectedSeat) {
      setErrorMessage('Please select a seat to continue.');
      return;
    }
    
    console.log(`Seat selected: ${selectedSeat}`);
    alert(`You selected seat ${selectedSeat}`);
  };

  return (
    <div className="p-6 bg-white font-montserrat">
      <div className="mb-6">
        <p className="text-sm text-gray-600 leading-relaxed">
          Select a seat to see who you'll be sitting next to. Some seats may already be booked by other travelers.
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
            See who you'll be traveling with and connect with them before the trip!
          </p>
        </div>
      </div>
      
      {/* Upper Deck */}
      <SeatGrid 
        seats={upperDeckSeats}
        deckTitle="Upper Deck"
        onSeatSelect={handleSeatSelect}
        selectedSeat={selectedSeat}
      />
      
      {/* Lower Deck */}
      <SeatGrid 
        seats={lowerDeckSeats}
        deckTitle="Lower Deck"
        onSeatSelect={handleSeatSelect}
        selectedSeat={selectedSeat}
      />
      
      {/* Seat Legend */}
      <div className="mb-6">
        <h3 className="text-sm font-bold mb-4 uppercase tracking-wide text-black">Seat Legend</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
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
          <div className="flex items-center">
            <div className="w-5 h-5 bg-gray-100 border-2 border-gray-300 rounded mr-3"></div>
            <span className="text-sm text-gray-700 font-medium">Profile available</span>
          </div>
        </div>
      </div>
      
      {/* Warning Message */}
      <div className="bg-red-50 border-l-4 border-red-400 rounded-r p-4 mb-6">
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
        <div className="text-red-600 text-sm mb-4 p-3 bg-red-50 border border-red-200 rounded font-medium">
          {errorMessage}
        </div>
      )}
      
      {/* Action Button */}
      <div className="flex justify-end">
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

export default BusSeatMap;

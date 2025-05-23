
import React, { useState } from 'react';
import { Settings } from 'lucide-react';
import SeatGrid, { Seat } from './SeatGrid';
import { Button } from '@/components/ui/button';
import { BookingPassenger } from './TravelersInfo';

interface BusSeatMapProps {
  passengers: BookingPassenger[];
}

const BusSeatMap: React.FC<BusSeatMapProps> = ({ passengers }) => {
  const [selectedSeat, setSelectedSeat] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Generate seat data based on passengers
  const generateSeats = () => {
    const upperDeckSeats: Seat[] = [];
    const lowerDeckSeats: Seat[] = [];
    
    // Generate 40 seats total (20 lower deck, 20 upper deck)
    for (let i = 1; i <= 20; i++) {
      const seatA = `${i}A`;
      const seatB = `${i}B`;
      
      // Check if passenger is assigned to this seat
      const passengerA = passengers.find((p, idx) => {
        const seatRow = Math.floor(idx / 2) + 1;
        const seatLetter = idx % 2 === 0 ? 'A' : 'B';
        return `${seatRow}${seatLetter}` === seatA;
      });
      
      const passengerB = passengers.find((p, idx) => {
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
    <div className="p-6">
      <div className="mb-6">
        <p className="text-sm text-gray-600">
          Select a seat to see who you'll be sitting next to. Some seats may already be booked by other travelers.
        </p>
      </div>
      
      {/* Traveler Connection Banner */}
      <div className="bg-blue-50 border border-blue-100 rounded-md p-4 mb-6 flex">
        <div className="text-blue-600 mr-3">
          <Settings size={20} />
        </div>
        <div>
          <h3 className="text-blue-800 font-medium text-sm">Traveler Connection</h3>
          <p className="text-sm text-blue-600">
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
        <h3 className="text-sm font-medium mb-3">Seat Legend</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-white border border-gray-300 rounded mr-2"></div>
            <span className="text-sm text-gray-700">Available</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-blue-100 border border-gray-300 rounded mr-2"></div>
            <span className="text-sm text-gray-700">Occupied (Male)</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-pink-100 border border-gray-300 rounded mr-2"></div>
            <span className="text-sm text-gray-700">Occupied (Female)</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-green-500 border border-gray-300 rounded mr-2"></div>
            <span className="text-sm text-gray-700">Selected</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-gray-100 border border-gray-300 rounded mr-2"></div>
            <span className="text-sm text-gray-700">Profile available</span>
          </div>
        </div>
      </div>
      
      {/* Warning Message */}
      <div className="bg-red-50 border border-red-100 rounded p-4 mb-4 text-center">
        <p className="text-red-600 font-bold text-sm">THIS BOOKING IS NON-REFUNDABLE</p>
        <p className="text-red-500 text-sm">This booking falls under the 100% cancellation policy</p>
      </div>
      
      {/* Error message */}
      {errorMessage && (
        <div className="text-red-500 text-sm mb-4 p-3 bg-red-50 border border-red-200 rounded">
          {errorMessage}
        </div>
      )}
      
      {/* Action Button */}
      <div className="flex justify-end">
        <Button 
          onClick={handleSaveSelection}
          className="bg-orange-500 hover:bg-orange-600 text-white font-medium px-6 py-2"
        >
          Save Seat Selection
        </Button>
      </div>
    </div>
  );
};

export default BusSeatMap;

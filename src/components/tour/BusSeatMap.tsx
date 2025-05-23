
import React, { useState, useEffect } from 'react';
import { Settings } from 'lucide-react';
import SeatGrid, { Seat } from './SeatGrid';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';

interface BusSeatMapProps {
  upperDeckSeats: Seat[];
  lowerDeckSeats: Seat[];
}

const BusSeatMap: React.FC<BusSeatMapProps> = ({ upperDeckSeats, lowerDeckSeats }) => {
  const [selectedSeat, setSelectedSeat] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSeatSelect = (seatId: string) => {
    setSelectedSeat(prev => prev === seatId ? null : seatId);
    setErrorMessage(null);
  };

  const handleSaveSelection = () => {
    if (!selectedSeat) {
      setErrorMessage('Please select a seat to continue.');
      return;
    }
    
    // In a real implementation, this would save the selection to an API
    console.log(`Seat selected: ${selectedSeat}`);
    alert(`You selected seat ${selectedSeat}`);
  };

  return (
    <div className="mt-2">
      <div className="mb-4">
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
        <h3 className="text-sm font-medium mb-2">Seat Legend</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
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
            <span className="text-sm text-gray-700">Traveler profile available</span>
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
        <div className="text-red-500 text-sm mb-4">{errorMessage}</div>
      )}
      
      {/* Action Button */}
      <div className="flex justify-end">
        <Button 
          onClick={handleSaveSelection}
          className="bg-orange-500 hover:bg-orange-600 text-white"
        >
          Save Seat Selection
        </Button>
      </div>
    </div>
  );
};

export default BusSeatMap;

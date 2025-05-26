
import React from 'react';
import { Button } from '@/components/ui/button';
import SeatMapBanner from './seat-map/SeatMapBanner';
import SeatMapLayout from './seat-map/SeatMapLayout';
import SeatMapLegend from './seat-map/SeatMapLegend';
import WarningMessage from './seat-map/WarningMessage';
import { useSeatSelection } from './seat-map/useSeatSelection';
import { BookingPassenger } from './seat-map/SeatMapTypes';

interface EnhancedBusSeatMapProps {
  passengers: BookingPassenger[];
}

const EnhancedBusSeatMap: React.FC<EnhancedBusSeatMapProps> = ({ passengers }) => {
  const {
    selectedSeat,
    hoveredSeat,
    errorMessage,
    setHoveredSeat,
    generateSeats,
    handleSeatClick,
    handleSaveSelection
  } = useSeatSelection(passengers);

  const seats = generateSeats();

  return (
    <div className="p-6 bg-gradient-to-br from-gray-50 to-white font-montserrat">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Choose Your Seat</h2>
        <p className="text-sm text-gray-600 leading-relaxed">
          Select a seat to see who you'll be sitting next to. Hover over occupied seats to see passenger information and connect with fellow travelers!
        </p>
      </div>
      
      <SeatMapBanner />
      
      <SeatMapLayout
        seats={seats}
        hoveredSeat={hoveredSeat}
        onSeatClick={handleSeatClick}
        onSeatHover={setHoveredSeat}
      />
      
      <SeatMapLegend />
      
      <WarningMessage />
      
      {/* Error message */}
      {errorMessage && (
        <div className="text-red-600 text-sm mt-6 p-4 bg-red-50 border border-red-200 rounded-lg font-medium shadow-sm">
          {errorMessage}
        </div>
      )}
      
      {/* Action Button */}
      <div className="flex justify-end mt-8">
        <Button 
          onClick={handleSaveSelection}
          className="bg-[rgb(204,255,0)] hover:bg-[rgb(184,230,0)] text-black font-bold px-10 py-4 text-base uppercase tracking-wide transition-all duration-200 border-2 border-[rgb(204,255,0)] hover:border-[rgb(184,230,0)] shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          Save Seat Selection
        </Button>
      </div>
    </div>
  );
};

export default EnhancedBusSeatMap;

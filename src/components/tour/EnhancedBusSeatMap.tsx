
import React from 'react';
import { Button } from '@/components/ui/button';
import SeatMapBanner from './seat-map/SeatMapBanner';
import BusLayout from './seat-map/BusLayout';
import SeatLegend from './seat-map/SeatLegend';
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
    <div className="p-6 bg-white font-montserrat">
      <div className="mb-6">
        <p className="text-sm text-gray-600 leading-relaxed">
          Select a seat to see who you'll be sitting next to. Hover over occupied seats to see passenger information.
        </p>
      </div>
      
      <SeatMapBanner />
      
      <BusLayout
        seats={seats}
        hoveredSeat={hoveredSeat}
        onSeatClick={handleSeatClick}
        onSeatHover={setHoveredSeat}
      />
      
      <SeatLegend />
      
      <WarningMessage />
      
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

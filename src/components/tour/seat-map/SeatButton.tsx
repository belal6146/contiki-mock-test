
import React from 'react';
import { cn } from '@/lib/utils';
import { SeatData } from './SeatMapTypes';

interface SeatButtonProps {
  seat: SeatData;
  hoveredSeat: string | null;
  onSeatClick: (seatId: string) => void;
  onSeatHover: (seatId: string | null) => void;
}

const SeatButton: React.FC<SeatButtonProps> = ({
  seat,
  hoveredSeat,
  onSeatClick,
  onSeatHover
}) => {
  const isHovered = hoveredSeat === seat.id;
  
  return (
    <div
      className="relative"
      onMouseEnter={() => onSeatHover(seat.id)}
      onMouseLeave={() => onSeatHover(null)}
    >
      <button
        onClick={() => onSeatClick(seat.id)}
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

export default SeatButton;

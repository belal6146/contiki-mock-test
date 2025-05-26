
import React from 'react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { SeatData } from './SeatMapTypes';

interface SeatMapLayoutProps {
  seats: SeatData[];
  hoveredSeat: string | null;
  onSeatClick: (seatId: string) => void;
  onSeatHover: (seatId: string | null) => void;
}

const SeatMapLayout: React.FC<SeatMapLayoutProps> = ({
  seats,
  hoveredSeat,
  onSeatClick,
  onSeatHover
}) => {
  // Group seats by row
  const seatsByRow = seats.reduce((acc, seat) => {
    if (!acc[seat.row]) {
      acc[seat.row] = {};
    }
    acc[seat.row][seat.position] = seat;
    return acc;
  }, {} as Record<number, Record<string, SeatData>>);

  const rows = Object.keys(seatsByRow).map(Number).sort((a, b) => a - b);

  const getSeatStyle = (seat: SeatData) => {
    if (seat.isSelected) {
      return "bg-[rgb(204,255,0)] border-[rgb(184,230,0)] text-black shadow-lg transform scale-110";
    }
    if (seat.isOccupied) {
      if (seat.passenger?.gender === 'Male') {
        return "bg-blue-100 border-blue-200 text-blue-800 opacity-60";
      } else {
        return "bg-pink-100 border-pink-200 text-pink-800 opacity-60";
      }
    }
    return "bg-green-500 border-green-600 text-white hover:bg-green-600 hover:scale-110 hover:shadow-lg";
  };

  const renderSeat = (seat: SeatData) => {
    const SeatComponent = (
      <button
        onClick={() => onSeatClick(seat.id)}
        disabled={seat.isOccupied}
        onMouseEnter={() => onSeatHover(seat.id)}
        onMouseLeave={() => onSeatHover(null)}
        className={`
          w-[60px] h-[60px] rounded-lg border-2 font-bold text-xs transition-all duration-200 
          flex items-center justify-center relative cursor-pointer
          ${getSeatStyle(seat)}
          ${seat.isOccupied ? 'cursor-not-allowed' : 'cursor-pointer'}
        `}
        style={{
          transformOrigin: 'center',
        }}
      >
        {seat.id}
      </button>
    );

    if (seat.passenger) {
      return (
        <HoverCard key={seat.id} openDelay={200}>
          <HoverCardTrigger asChild>
            {SeatComponent}
          </HoverCardTrigger>
          <HoverCardContent className="w-80 p-4">
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {seat.passenger.firstName[0]}{seat.passenger.lastName[0]}
                </div>
                <div>
                  <h4 className="font-bold text-lg">
                    {seat.passenger.firstName} {seat.passenger.lastName}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {seat.passenger.age} years old • {seat.passenger.address.country}
                  </p>
                </div>
              </div>
              
              {seat.passenger.travelPassion && (
                <div className="border-t pt-3">
                  <p className="text-sm">
                    <span className="font-semibold">Travel Passion:</span> {seat.passenger.travelPassion}
                  </p>
                </div>
              )}
              
              <div className="border-t pt-3">
                <p className="text-sm">
                  <span className="font-semibold">Previous Trips:</span> {seat.passenger.numberOfTimesTravelledPreviously || 0}
                </p>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
      );
    }

    return SeatComponent;
  };

  return (
    <div className="max-w-4xl mx-auto bg-gray-50 rounded-2xl border-4 border-green-500 p-8 relative">
      {/* Emergency Door */}
      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-green-500 text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg">
        EMERGENCY DOOR
      </div>
      
      {/* Front Door */}
      <div className="absolute -bottom-3 left-12 bg-green-500 text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg">
        FRONT DOOR
      </div>
      
      <div className="space-y-6">
        {/* Driver and Courier Section */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-4">
            <div className="w-20 h-16 bg-gray-700 rounded-lg flex items-center justify-center text-white text-xs font-bold">
              <div className="text-center">
                <div>🚗</div>
                <div>DRIVER</div>
              </div>
            </div>
            <div className="w-16 h-16 bg-gray-700 rounded-lg flex items-center justify-center text-white text-xs font-bold">
              C
            </div>
          </div>
          
          <div className="w-24 h-20 bg-gray-300 rounded-lg flex items-center justify-center text-gray-700 text-xs font-bold">
            🚽 TOILET
          </div>
        </div>
        
        {/* Passenger Seating Area */}
        <div className="space-y-4">
          <div className="text-center text-sm text-gray-600 font-medium uppercase tracking-wide mb-6">
            Passenger Seating (2-Aisle-2 Layout)
          </div>
          
          {rows.map((rowNumber) => {
            const rowSeats = seatsByRow[rowNumber];
            const leftSeat = rowSeats?.left;
            const rightSeat = rowSeats?.right;
            
            return (
              <div key={rowNumber} className="flex items-center justify-center space-x-6">
                {/* Left side seats */}
                <div className="flex space-x-2">
                  {leftSeat && renderSeat(leftSeat)}
                  <div className="w-[60px]"></div> {/* Space for second left seat if needed */}
                </div>
                
                {/* Aisle */}
                <div className="w-16 flex items-center justify-center">
                  <div className="text-xs text-gray-400 font-medium">AISLE</div>
                </div>
                
                {/* Right side seats */}
                <div className="flex space-x-2">
                  <div className="w-[60px]"></div> {/* Space for first right seat if needed */}
                  {rightSeat && renderSeat(rightSeat)}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SeatMapLayout;


import React from 'react';
import SeatButton from './SeatButton';
import { SeatData } from './SeatMapTypes';

interface BusLayoutProps {
  seats: SeatData[];
  hoveredSeat: string | null;
  onSeatClick: (seatId: string) => void;
  onSeatHover: (seatId: string | null) => void;
}

const BusLayout: React.FC<BusLayoutProps> = ({
  seats,
  hoveredSeat,
  onSeatClick,
  onSeatHover
}) => {
  return (
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
                    {leftSeat && (
                      <SeatButton
                        seat={leftSeat}
                        hoveredSeat={hoveredSeat}
                        onSeatClick={onSeatClick}
                        onSeatHover={onSeatHover}
                      />
                    )}
                  </div>
                  <div className="flex justify-start">
                    {rightSeat && (
                      <SeatButton
                        seat={rightSeat}
                        hoveredSeat={hoveredSeat}
                        onSeatClick={onSeatClick}
                        onSeatHover={onSeatHover}
                      />
                    )}
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
  );
};

export default BusLayout;

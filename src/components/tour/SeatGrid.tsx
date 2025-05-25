
import React from 'react';
import SeatButton, { SeatStatus } from './SeatButton';

export interface Seat {
  id: string;
  status: SeatStatus;
  traveler?: {
    id: string;
    name: string;
  };
}

interface SeatGridProps {
  seats: Seat[];
  deckTitle: string;
  onSeatSelect?: (seatId: string) => void;
  selectedSeat?: string | null;
}

const SeatGrid: React.FC<SeatGridProps> = ({ seats, deckTitle, onSeatSelect, selectedSeat }) => {
  if (!seats || seats.length === 0) {
    return null;
  }

  // Get unique rows from seat IDs (considering the number part)
  const getUniqueRows = () => {
    const rowMap = new Map<string, Seat[]>();
    
    seats.forEach(seat => {
      // Extract the row number from the seat ID
      const rowNum = seat.id.match(/\d+/)?.[0] || '';
      if (!rowMap.has(rowNum)) {
        rowMap.set(rowNum, []);
      }
      rowMap.get(rowNum)?.push(seat);
    });
    
    // Sort rows by number
    return Array.from(rowMap.entries())
      .sort((a, b) => Number(a[0]) - Number(b[0]))
      .map(([_, seats]) => seats);
  };

  const rows = getUniqueRows();

  return (
    <div className="mb-8 font-montserrat">
      <div className="flex justify-between items-center mb-4 px-1">
        <h3 className="text-sm font-bold uppercase tracking-wide text-black">{deckTitle}</h3>
        {deckTitle === "Upper Deck" ? (
          <div className="text-xs text-gray-500 font-medium uppercase tracking-wide">Rear of Bus</div>
        ) : null}
      </div>
      
      <div className="border-2 border-gray-200 rounded-lg p-6 bg-gray-50">
        {deckTitle === "Lower Deck" ? (
          <div className="text-xs text-gray-500 text-center mb-6 font-medium uppercase tracking-wide">Front of Bus</div>
        ) : null}
        
        <div className="grid grid-cols-1 gap-y-3">
          {rows.map((rowSeats, rowIndex) => (
            <div key={`row-${rowIndex}`} className="grid grid-cols-2 gap-4">
              {rowSeats
                .sort((a, b) => a.id.localeCompare(b.id))
                .map(seat => (
                  <SeatButton
                    key={seat.id}
                    seatId={seat.id}
                    status={seat.id === selectedSeat ? 'selected' : seat.status}
                    onClick={onSeatSelect}
                  />
                ))}
            </div>
          ))}
        </div>
        
        {deckTitle === "Lower Deck" ? (
          <div className="text-xs text-gray-500 text-center mt-6 font-medium uppercase tracking-wide">Rear of Bus</div>
        ) : null}
      </div>
    </div>
  );
};

export default SeatGrid;

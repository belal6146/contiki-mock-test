import { useState } from 'react';
import { SeatData, BookingPassenger } from './SeatMapTypes';

export const useSeatSelection = (passengers: BookingPassenger[]) => {
  const [selectedSeat, setSelectedSeat] = useState<string | null>(null);
  const [hoveredSeat, setHoveredSeat] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Create seat layout with driver, courier, toilet, and passenger seats
  const generateSeats = (): SeatData[] => {
    const seats: SeatData[] = [];
    const enhancedPassengers = passengers.slice(0, 40);
    
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

  const handleSeatClick = (seatId: string) => {
    const seats = generateSeats();
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

  return {
    selectedSeat,
    hoveredSeat,
    errorMessage,
    setHoveredSeat,
    generateSeats,
    handleSeatClick,
    handleSaveSelection
  };
};

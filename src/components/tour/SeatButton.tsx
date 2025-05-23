
import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export type SeatStatus = 'available' | 'occupied_male' | 'occupied_female' | 'selected' | 'profile_available';

interface SeatButtonProps {
  seatId: string;
  status: SeatStatus;
  onClick?: (seatId: string) => void;
  className?: string;
}

const SeatButton: React.FC<SeatButtonProps> = ({ seatId, status, onClick, className }) => {
  // Determine background color based on status
  const getBackgroundColor = () => {
    switch (status) {
      case 'occupied_male':
        return 'bg-blue-100 text-black';
      case 'occupied_female':
        return 'bg-pink-100 text-black';
      case 'selected':
        return 'bg-green-500 text-white';
      case 'profile_available':
        return 'bg-gray-100 text-black';
      default:
        return 'bg-white text-black';
    }
  };

  // Handle click event
  const handleClick = () => {
    if (onClick && status === 'available') {
      onClick(seatId);
    }
  };

  return (
    <Button
      variant="outline"
      onClick={handleClick}
      disabled={status !== 'available' && status !== 'selected'}
      className={cn(
        'w-full h-10 text-sm font-medium border rounded transition-colors',
        getBackgroundColor(),
        status === 'available' && 'hover:bg-gray-50',
        status === 'selected' && 'ring-2 ring-green-500',
        className
      )}
    >
      {seatId}
    </Button>
  );
};

export default SeatButton;

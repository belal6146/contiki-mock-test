
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
        return 'bg-blue-100 text-black border-blue-200 hover:bg-blue-150';
      case 'occupied_female':
        return 'bg-pink-100 text-black border-pink-200 hover:bg-pink-150';
      case 'selected':
        return 'bg-[rgb(204,255,0)] text-black border-[rgb(184,230,0)] ring-2 ring-[rgb(184,230,0)]';
      case 'profile_available':
        return 'bg-gray-100 text-black border-gray-300 hover:bg-gray-150';
      default:
        return 'bg-white text-black border-gray-300 hover:bg-gray-50';
    }
  };

  // Handle click event
  const handleClick = () => {
    if (onClick && (status === 'available' || status === 'selected')) {
      onClick(seatId);
    }
  };

  return (
    <Button
      variant="outline"
      onClick={handleClick}
      disabled={status !== 'available' && status !== 'selected'}
      className={cn(
        'w-full h-12 text-sm font-bold border-2 rounded-lg transition-all duration-200 font-montserrat uppercase tracking-wide',
        getBackgroundColor(),
        status === 'available' && 'hover:shadow-sm',
        status === 'selected' && 'shadow-md',
        className
      )}
    >
      {seatId}
    </Button>
  );
};

export default SeatButton;

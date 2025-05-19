
import React from 'react';
import { ChevronRight } from 'lucide-react';

interface NextArrowProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
  ariaLabel?: string;
  variant?: 'default' | 'outline' | 'circle' | 'minimal';
}

const NextArrow: React.FC<NextArrowProps> = ({
  onClick,
  className = '',
  ariaLabel = 'Next slide',
  variant = 'default'
}) => {
  // Define styles based on variant
  const getStyles = () => {
    const baseStyles = "absolute right-0 top-1/2 -translate-y-1/2 z-10 transition-all focus:outline-none focus:ring-2 focus:ring-accent";
    
    switch(variant) {
      case 'outline':
        return `${baseStyles} translate-x-4 bg-white/80 rounded-full p-2 shadow-lg hover:bg-white/90 border border-gray-200`;
      case 'circle':
        return `${baseStyles} translate-x-6 bg-black text-white rounded-full p-3 hover:bg-black/90`;
      case 'minimal':
        return `${baseStyles} translate-x-2 bg-transparent hover:text-accent`;
      default:
        return `${baseStyles} translate-x-4 bg-white/80 rounded-full p-2 shadow-lg hover:bg-white/90`;
    }
  };

  return (
    <button
      onClick={onClick}
      className={`${getStyles()} ${className}`}
      aria-label={ariaLabel}
      type="button"
    >
      <ChevronRight className="h-6 w-6" />
    </button>
  );
};

export default NextArrow;

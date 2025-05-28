import React from 'react';
import { Info, ChevronUp, ChevronDown } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

interface DepartureOptionHeaderProps {
  option: {
    dayOfWeek: string;
    day: number;
    month: string;
    year: number;
    price: number;
    oldPrice?: number;
    discount?: number;
    variants: Array<{ id: string; name: string; price: number }>;
    type: string;
  };
  displayPrice: number;
  hasDiscount: boolean;
  tripTypeLabels: Record<string, string>;
  isOpen: boolean;
  onToggle: () => void;
  onBookNow: (e: React.MouseEvent) => void;
}

const DepartureOptionHeader: React.FC<DepartureOptionHeaderProps> = ({
  option,
  displayPrice,
  hasDiscount,
  tripTypeLabels,
  isOpen,
  onToggle,
  onBookNow
}) => {
  return (
    <div 
      className="bg-white cursor-pointer hover:bg-gray-50 transition-colors p-4"
      onClick={onToggle}
    >
      <div className="flex items-center justify-between">
        {/* Left side - Dates and Trip Info */}
        <div className="flex items-center gap-6">
          <div className="min-w-[100px]">
            <div className="text-xs text-gray-500 mb-1">{option.dayOfWeek}</div>
            <div className="font-bold text-base text-black">
              {option.month} {option.day}, {option.year}
            </div>
            <button className="flex items-center text-xs text-blue-600 hover:text-blue-800 mt-1 transition-colors">
              <Info size={10} className="mr-1" />
              Further Information
            </button>
          </div>
          
          <div className="min-w-[100px]">
            <div className="text-xs text-gray-500 mb-1">Friday</div>
            <div className="font-bold text-base text-black">
              Jun {option.day + 10}, {option.year}
            </div>
          </div>
          
          <div className="flex items-center">
            <span className="bg-[rgb(204,255,0)] text-black px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
              {tripTypeLabels[option.type] || option.type}
            </span>
            {option.variants.length > 1 && (
              <span className="text-xs text-gray-600 font-medium ml-2">
                + {option.variants.length - 1} other{option.variants.length > 2 ? 's' : ''}
              </span>
            )}
          </div>
        </div>
        
        {/* Right side - Price and Actions */}
        <div className="flex items-center gap-4">
          {hasDiscount && (
            <div className="text-center discount">
              <div className="text-sm font-semibold mb-1 uppercase text-red-600">
                -{option.discount}% off
              </div>
            </div>
          )}
          
          <div className="text-right min-w-[80px]">
            <div className="text-xs text-gray-500 mb-1">Price</div>
            <div className="flex items-center justify-end gap-2">
              {option.oldPrice && hasDiscount && (
                <span className="oldPrice text-sm line-through text-gray-500">
                  £{option.oldPrice}
                </span>
              )}
              <span className="newPrice font-bold text-lg text-gray-900">
                {formatCurrency(displayPrice)}
              </span>
            </div>
          </div>
          
          <button 
            className="callUsBtn ml-4 px-6 py-3 rounded-full bg-secondary text-gray-900 font-semibold uppercase hover:bg-secondary-dark focus:ring-2 focus:ring-secondary"
            onClick={onBookNow}
          >
            CALL US
          </button>
          
          <button className="text-gray-400 hover:text-gray-600 transition-colors">
            {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DepartureOptionHeader;

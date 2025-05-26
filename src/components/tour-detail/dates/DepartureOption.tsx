
import React from 'react';
import { TooltipProvider } from '@/components/ui/tooltip';
import DepartureOptionHeader from './DepartureOptionHeader';
import DepartureOptionContent from './DepartureOptionContent';
import { BookingPassenger } from './types';

export interface DepartureOptionData {
  id: string;
  startDate: Date;
  endDate: Date;
  types: string[];
  basePrice: number;
  discount: number;
  dealLabel: string;
  variants: {
    id: string;
    name: string;
    price: number;
  }[];
}

interface OptionVariant {
  id: string;
  name: string;
  price: number;
  availability: 'available' | 'limited' | 'soldOut';
}

interface DepartureOptionProps {
  option: {
    id: string;
    startDate: string;
    endDate: string;
    dayOfWeek: string;
    day: number;
    month: string;
    year: number;
    price: number;
    oldPrice?: number;
    discount?: number;
    availability: 'available' | 'limited' | 'soldOut';
    variants: OptionVariant[];
    type: string;
  };
  isOpen: boolean;
  selectedVariant: string | null;
  onToggle: (id: string) => void;
  onVariantSelect: (optionId: string, variantId: string) => void;
  onBookByPhone: (optionId: string) => void;
  onRequestInfo: (optionId: string) => void;
  tripTypeLabels: Record<string, string>;
  passengers: BookingPassenger[];
}

const DepartureOption: React.FC<DepartureOptionProps> = ({
  option,
  isOpen,
  selectedVariant,
  onToggle,
  onVariantSelect,
  onBookByPhone,
  onRequestInfo,
  tripTypeLabels,
  passengers
}) => {
  const handleToggle = () => {
    onToggle(option.id);
  };
  
  const handleVariantSelect = (variantId: string) => {
    onVariantSelect(option.id, variantId);
  };

  const handleBookNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (option.availability === 'soldOut') return;
    onBookByPhone(option.id);
  };

  const handleBookByPhone = () => {
    onBookByPhone(option.id);
  };

  const handleRequestInfo = () => {
    onRequestInfo(option.id);
  };

  const isSoldOut = option.availability === 'soldOut';
  const variant = selectedVariant 
    ? option.variants.find(v => v.id === selectedVariant) 
    : option.variants[0];

  const displayPrice = variant?.price || option.price;
  const hasDiscount = option.discount && option.discount > 0;
  
  return (
    <div className="border border-gray-200 overflow-hidden transition-all duration-200 mb-0 bg-white">
      <TooltipProvider>
        {/* Compact Header */}
        <DepartureOptionHeader
          option={option}
          displayPrice={displayPrice}
          hasDiscount={hasDiscount}
          tripTypeLabels={tripTypeLabels}
          isOpen={isOpen}
          onToggle={handleToggle}
          onBookNow={handleBookNow}
        />
        
        {/* Expanded content */}
        {isOpen && (
          <DepartureOptionContent
            option={option}
            selectedVariant={selectedVariant}
            displayPrice={displayPrice}
            hasDiscount={hasDiscount}
            passengers={passengers}
            onVariantSelect={handleVariantSelect}
            onBookByPhone={handleBookByPhone}
            onRequestInfo={handleRequestInfo}
          />
        )}
      </TooltipProvider>
    </div>
  );
};

export default DepartureOption;

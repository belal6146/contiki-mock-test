
import React from 'react';
import { ChevronDown, ChevronUp, Info } from 'lucide-react';
import { formatCurrency, formatDate } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

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
}

const DepartureOption: React.FC<DepartureOptionProps> = ({
  option,
  isOpen,
  selectedVariant,
  onToggle,
  onVariantSelect,
  onBookByPhone,
  onRequestInfo,
  tripTypeLabels
}) => {
  const handleToggle = () => {
    onToggle(option.id);
  };
  
  const handleVariantSelect = (variantId: string) => {
    onVariantSelect(option.id, variantId);
  };

  const handleBookNow = () => {
    if (option.availability === 'soldOut') return;
    onBookByPhone(option.id);
  };

  const isSoldOut = option.availability === 'soldOut';
  const variant = selectedVariant 
    ? option.variants.find(v => v.id === selectedVariant) 
    : option.variants[0];

  const displayPrice = variant?.price || option.price;
  const hasDiscount = option.discount && option.discount > 0;
  
  return (
    <div className={`border rounded-md overflow-hidden ${isOpen ? 'border-black' : 'border-gray-200 hover:border-gray-300'} transition-colors`}>
      {/* Header row */}
      <div 
        className={`grid grid-cols-3 md:grid-cols-12 bg-white cursor-pointer transition-all ${isOpen ? 'shadow-md' : ''}`}
        onClick={handleToggle}
      >
        {/* Date info */}
        <div className="col-span-1 md:col-span-3 p-4 border-r border-gray-200">
          <div className="flex flex-col">
            <span className="text-sm text-gray-500">{option.dayOfWeek}</span>
            <div className="flex gap-1 items-baseline">
              <span className="font-bold text-lg">{option.month} {option.day},</span>
              <span>{option.year}</span>
            </div>
            <div className="hidden md:block mt-1">
              <button className="flex items-center text-sm text-gray-600 hover:text-black">
                <Info size={14} className="mr-1" />
                <span>Further Information</span>
              </button>
            </div>
          </div>
        </div>
        
        {/* Type & Trip Info */}
        <div className="col-span-1 md:col-span-5 p-4 border-r border-gray-200 flex items-center">
          <div className="flex items-center gap-2">
            <div className="bg-gray-100 px-2 py-1 text-xs font-medium rounded">
              {tripTypeLabels[option.type] || option.type}
            </div>
            
            {option.variants.length > 0 && (
              <div className="text-sm text-gray-700">
                + {option.variants.length} other{option.variants.length > 1 ? 's' : ''}
              </div>
            )}
          </div>
        </div>
        
        {/* Price & Action */}
        <div className="col-span-1 md:col-span-4 p-4 flex flex-col md:flex-row justify-between items-center">
          <div>
            {hasDiscount && (
              <div className="inline-block bg-yellow-100 text-yellow-800 text-xs font-bold px-2 py-1 rounded mb-1">
                LAST MINUTE DEAL
              </div>
            )}
            <div className="flex items-baseline gap-2">
              <span className="text-sm text-gray-500">Price</span>
              {option.oldPrice && hasDiscount && (
                <span className="text-sm line-through text-gray-400">{formatCurrency(option.oldPrice)}</span>
              )}
              <span className={`font-bold ${hasDiscount ? 'text-red-600' : ''}`}>
                {formatCurrency(displayPrice)}
              </span>
              {hasDiscount && (
                <span className="text-xs font-bold bg-yellow-400 text-black px-1 py-0.5 rounded">
                  {option.discount}% off
                </span>
              )}
            </div>
          </div>
          
          <div className="flex items-center mt-2 md:mt-0">
            <button 
              className={`text-black bg-[#CCFF00] px-4 py-1 rounded text-sm font-bold hover:bg-[#b8e600] ${isSoldOut ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={isSoldOut}
              onClick={isSoldOut ? undefined : handleBookNow}
            >
              CALL US
            </button>
            <button className="ml-2" onClick={handleToggle}>
              {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Expanded content */}
      {isOpen && (
        <div className="bg-gray-50 p-4 border-t border-gray-200">
          {option.variants.length > 0 ? (
            <div className="space-y-4">
              <h4 className="font-medium text-sm">Select your option:</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {option.variants.map((variant) => (
                  <div 
                    key={variant.id}
                    className={`border rounded p-3 cursor-pointer transition-all ${
                      selectedVariant === variant.id 
                        ? 'border-black ring-2 ring-black ring-opacity-10' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => handleVariantSelect(variant.id)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-medium">{variant.name}</span>
                      <div className={`w-4 h-4 border border-gray-300 rounded-full flex items-center justify-center ${
                        selectedVariant === variant.id ? 'bg-black border-black' : 'bg-white'
                      }`}>
                        {selectedVariant === variant.id && <div className="w-2 h-2 rounded-full bg-white"></div>}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-sm text-gray-500">From</span>
                        <div className="font-bold">{formatCurrency(variant.price)}</div>
                      </div>
                      <div className="flex items-center">
                        <span className={`inline-block w-2 h-2 rounded-full mr-2 ${
                          variant.availability === 'available' ? 'bg-green-500' :
                          variant.availability === 'limited' ? 'bg-yellow-500' : 'bg-red-500'
                        }`}></span>
                        <span className="text-xs font-medium">
                          {variant.availability === 'available' ? 'Available' :
                           variant.availability === 'limited' ? 'Limited' : 'Sold Out'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-4 text-gray-600">
              No additional options available for this departure date.
            </div>
          )}
          
          <div className="mt-6 flex justify-end gap-4">
            <button 
              className="px-4 py-2 border border-gray-300 text-gray-800 rounded hover:bg-gray-50"
              onClick={() => onRequestInfo(option.id)}
            >
              Request Info
            </button>
            <button 
              className={`px-4 py-2 bg-[#CCFF00] text-black rounded font-medium hover:bg-[#b8e600] ${
                isSoldOut ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={isSoldOut}
              onClick={!isSoldOut ? () => onBookByPhone(option.id) : undefined}
            >
              {isSoldOut ? 'Sold Out' : 'Call Us'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DepartureOption;

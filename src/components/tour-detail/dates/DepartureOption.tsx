
import React from 'react';
import { ChevronDown, ChevronUp, Info, Users, Bus } from 'lucide-react';
import { formatCurrency, formatDate } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import PriceBreakdown from './PriceBreakdown';
import TripTimeline from './TripTimeline';
import TravelersInfo, { BookingPassenger } from '../../tour/TravelersInfo';
import BusSeatMap from '../../tour/BusSeatMap';

// Export the interface that utils.ts is trying to import
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
  const [travelersOpen, setTravelersOpen] = React.useState(false);
  const [seatingOpen, setSeatingOpen] = React.useState(false);
  
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
    <div className={`border border-gray-200 rounded-md overflow-hidden transition-all duration-200 ${isOpen ? 'border-gray-400 shadow-md' : 'hover:border-gray-300'}`}>
      {/* Header row */}
      <div 
        className={`grid grid-cols-12 bg-white cursor-pointer transition-all ${isOpen ? 'bg-gray-50' : ''}`}
        onClick={handleToggle}
      >
        {/* Date info */}
        <div className="col-span-3 p-4 border-r border-gray-200">
          <div className="flex flex-col">
            <span className="text-sm text-gray-600 font-medium">{option.dayOfWeek}</span>
            <div className="flex gap-1 items-baseline mt-1">
              <span className="font-bold text-lg text-black">{option.month} {option.day},</span>
              <span className="text-gray-700">{option.year}</span>
            </div>
            <div className="mt-2">
              <button className="flex items-center text-sm text-gray-600 hover:text-black transition-colors">
                <Info size={14} className="mr-1" />
                <span>Further Information</span>
              </button>
            </div>
          </div>
        </div>
        
        {/* Type & Trip Info */}
        <div className="col-span-5 p-4 border-r border-gray-200 flex items-center">
          <div className="flex items-center gap-3">
            <div className="bg-gray-100 px-3 py-1 text-sm font-semibold rounded-full text-gray-800">
              {tripTypeLabels[option.type] || option.type}
            </div>
            
            {option.variants.length > 0 && (
              <div className="text-sm text-gray-600">
                + {option.variants.length} other{option.variants.length > 1 ? 's' : ''}
              </div>
            )}
          </div>
        </div>
        
        {/* Price & Action */}
        <div className="col-span-4 p-4 flex justify-between items-center">
          <div className="flex flex-col">
            {hasDiscount && (
              <div className="inline-block bg-yellow-200 text-yellow-800 text-xs font-bold px-2 py-1 rounded mb-2 self-start">
                LAST MINUTE DEAL
              </div>
            )}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">From</span>
              {option.oldPrice && hasDiscount && (
                <span className="text-sm line-through text-gray-400">{formatCurrency(option.oldPrice)}</span>
              )}
              <span className={`font-bold text-lg ${hasDiscount ? 'text-orange-600' : 'text-black'}`}>
                {formatCurrency(displayPrice)}
              </span>
              {hasDiscount && (
                <span className="text-xs font-bold bg-yellow-300 text-yellow-800 px-2 py-1 rounded">
                  {option.discount}% off
                </span>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button 
              className={`bg-lime-400 text-black px-6 py-2 rounded font-bold text-sm hover:bg-lime-500 transition-colors ${isSoldOut ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={isSoldOut}
              onClick={isSoldOut ? undefined : handleBookNow}
            >
              {isSoldOut ? 'SOLD OUT' : 'BOOK BY PHONE'}
            </button>
            <button className="text-gray-600 hover:text-black transition-colors" onClick={handleToggle}>
              {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Expanded content */}
      {isOpen && (
        <div className="bg-white border-t border-gray-200">
          <div className="grid grid-cols-12 gap-6 p-6">
            {/* Left side - Variant selection and trip details */}
            <div className="col-span-8">
              {option.variants.length > 0 ? (
                <div className="space-y-4">
                  <h4 className="font-semibold text-lg text-black mb-4">Choose Variation</h4>
                  <div className="space-y-3">
                    {option.variants.map((variant) => (
                      <div 
                        key={variant.id}
                        className={`border rounded-lg p-4 cursor-pointer transition-all ${
                          selectedVariant === variant.id 
                            ? 'border-black ring-2 ring-black ring-opacity-20 bg-gray-50' 
                            : 'border-gray-200 hover:border-gray-300 bg-white'
                        }`}
                        onClick={() => handleVariantSelect(variant.id)}
                      >
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-3">
                            <div className={`w-5 h-5 border-2 rounded-full flex items-center justify-center ${
                              selectedVariant === variant.id ? 'border-black bg-black' : 'border-gray-300 bg-white'
                            }`}>
                              {selectedVariant === variant.id && <div className="w-2 h-2 rounded-full bg-white"></div>}
                            </div>
                            <span className="font-semibold text-black">{variant.name}</span>
                          </div>
                          <div className="text-right">
                            <div className="text-sm text-gray-500">More Info</div>
                            <div className="font-bold text-lg">{formatCurrency(variant.price)}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-600">
                  No additional options available for this departure date.
                </div>
              )}
              
              {/* Trip Timeline */}
              <div className="mt-8">
                <TripTimeline 
                  startDate={new Date(option.startDate)}
                  endDate={new Date(option.endDate)}
                />
              </div>

              {/* See Who's Travelling Section */}
              <div className="mt-8">
                <Collapsible open={travelersOpen} onOpenChange={setTravelersOpen}>
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <CollapsibleTrigger className="w-full px-6 py-4 bg-gray-50 hover:bg-gray-100 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Users className="mr-3 h-5 w-5 text-gray-600" />
                          <span className="font-medium text-gray-900">See Who's Travelling</span>
                        </div>
                        {travelersOpen ? <ChevronUp className="h-5 w-5 text-gray-600" /> : <ChevronDown className="h-5 w-5 text-gray-600" />}
                      </div>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <TravelersInfo passengers={passengers} />
                    </CollapsibleContent>
                  </div>
                </Collapsible>
              </div>

              {/* Bus Seating Plan Section */}
              <div className="mt-4">
                <Collapsible open={seatingOpen} onOpenChange={setSeatingOpen}>
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <CollapsibleTrigger className="w-full px-6 py-4 bg-gray-50 hover:bg-gray-100 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Bus className="mr-3 h-5 w-5 text-gray-600" />
                          <span className="font-medium text-gray-900">Bus Seating Plan</span>
                        </div>
                        {seatingOpen ? <ChevronUp className="h-5 w-5 text-gray-600" /> : <ChevronDown className="h-5 w-5 text-gray-600" />}
                      </div>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <BusSeatMap passengers={passengers} />
                    </CollapsibleContent>
                  </div>
                </Collapsible>
              </div>
            </div>
            
            {/* Right side - Price breakdown */}
            <div className="col-span-4">
              <PriceBreakdown
                basePrice={displayPrice}
                discount={option.discount || 0}
                dealLabel={hasDiscount ? "Last minute deal" : undefined}
                onBookByPhone={() => onBookByPhone(option.id)}
                onRequestInfo={() => onRequestInfo(option.id)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DepartureOption;

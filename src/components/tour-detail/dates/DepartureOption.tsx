
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
    <div className={`border border-gray-200 rounded-lg overflow-hidden transition-all duration-200 mb-4 ${isOpen ? 'shadow-md' : 'hover:shadow-sm'}`}>
      {/* Header row - matches the screenshot layout */}
      <div 
        className="bg-white border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={handleToggle}
      >
        <div className="grid grid-cols-12 items-center">
          {/* Date Column */}
          <div className="col-span-3 p-4 border-r border-gray-100">
            <div className="text-sm text-gray-600 mb-1">{option.dayOfWeek}</div>
            <div className="font-bold text-lg text-black">
              {option.month} {option.day}, {option.year}
            </div>
            <button className="flex items-center text-xs text-blue-600 hover:text-blue-800 mt-2 transition-colors">
              <Info size={12} className="mr-1" />
              Further information
            </button>
          </div>
          
          {/* Trip Type Column */}
          <div className="col-span-5 p-4 border-r border-gray-100">
            <div className="inline-flex items-center">
              <span className="bg-[#CCFF00] text-black px-3 py-1 rounded-full text-sm font-semibold">
                {tripTypeLabels[option.type] || option.type}
              </span>
              {option.variants.length > 0 && (
                <span className="ml-3 text-sm text-gray-600">
                  + {option.variants.length} other option{option.variants.length > 1 ? 's' : ''}
                </span>
              )}
            </div>
          </div>
          
          {/* Price and Action Column */}
          <div className="col-span-4 p-4 flex justify-between items-center">
            <div className="text-right">
              {hasDiscount && (
                <div className="text-red-600 text-xs font-bold mb-1">
                  LAST MINUTE DEAL
                </div>
              )}
              <div className="flex items-center justify-end gap-2 mb-1">
                <span className="text-sm text-gray-500">Price</span>
                {option.oldPrice && hasDiscount && (
                  <span className="text-sm line-through text-gray-400">
                    {formatCurrency(option.oldPrice)}
                  </span>
                )}
                <span className="font-bold text-xl text-black">
                  {formatCurrency(displayPrice)}
                </span>
                {hasDiscount && (
                  <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-1 rounded">
                    {option.discount}% off
                  </span>
                )}
              </div>
            </div>
            
            <div className="flex items-center gap-3 ml-4">
              <button 
                className="bg-[#CCFF00] text-black px-4 py-2 rounded font-bold text-sm hover:bg-[#bfff00] transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  handleBookNow();
                }}
              >
                CALL US
              </button>
              <button className="text-gray-400 hover:text-gray-600 transition-colors">
                {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Expanded content */}
      {isOpen && (
        <div className="bg-white">
          <div className="grid grid-cols-12 gap-8 p-8">
            {/* Left side - Variant selection and trip details */}
            <div className="col-span-8">
              {/* Choose Variation Section */}
              {option.variants.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-lg font-bold text-black mb-4">Choose Variation</h3>
                  <div className="space-y-3">
                    {option.variants.map((variant) => (
                      <div 
                        key={variant.id}
                        className={`border rounded-lg p-4 cursor-pointer transition-all ${
                          selectedVariant === variant.id 
                            ? 'border-[#CCFF00] bg-[#CCFF00]/10' 
                            : 'border-gray-200 hover:border-gray-300 bg-white'
                        }`}
                        onClick={() => handleVariantSelect(variant.id)}
                      >
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-3">
                            <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                              selectedVariant === variant.id 
                                ? 'border-black bg-black' 
                                : 'border-gray-300 bg-white'
                            }`}>
                              {selectedVariant === variant.id && (
                                <div className="w-2 h-2 rounded-full bg-white"></div>
                              )}
                            </div>
                            <span className="font-semibold text-black uppercase text-sm">
                              {variant.name}
                            </span>
                          </div>
                          <div className="text-right">
                            <button className="text-sm text-blue-600 hover:text-blue-800 hover:underline mb-1">
                              More info
                            </button>
                            <div className="font-bold text-lg text-black">
                              {formatCurrency(variant.price)}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Trip Timeline */}
              <div className="mb-8">
                <TripTimeline 
                  startDate={new Date(option.startDate)}
                  endDate={new Date(option.endDate)}
                />
              </div>

              {/* Further Information */}
              <div className="mb-6">
                <h4 className="font-bold text-black mb-3">Further Information</h4>
                <div className="flex items-start gap-3 mb-4">
                  <div className="bg-yellow-400 text-black rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mt-0.5">
                    !
                  </div>
                  <p className="text-sm text-gray-700">
                    This trip ends at 10am in Athens. For those participating in the Athens Sightseeing Free Time Add On, the trip will end in Athens at 12pm.
                  </p>
                </div>
                <p className="text-xs italic text-gray-600">
                  Flights there and back again aren't included.
                </p>
              </div>

              {/* See Who's Travelling Section */}
              <div className="mb-4">
                <Collapsible open={travelersOpen} onOpenChange={setTravelersOpen}>
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <CollapsibleTrigger className="w-full px-6 py-4 bg-gray-50 hover:bg-gray-100 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Users className="mr-3 h-5 w-5 text-black" />
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
              <div className="mb-4">
                <Collapsible open={seatingOpen} onOpenChange={setSeatingOpen}>
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <CollapsibleTrigger className="w-full px-6 py-4 bg-gray-50 hover:bg-gray-100 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Bus className="mr-3 h-5 w-5 text-black" />
                          <span className="font-medium text-gray-900">Bus Seating Plan</span>
                        </div>
                        {seatingOpen ? <ChevronUp className="h-5 w-5 text-gray-600" /> : <ChevronDown className="h-5 w-5 text-gray-600" />}
                      </div>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="font-semibold text-lg">Choose Your Seat</h4>
                          <span className="text-sm text-gray-600">Seats are assigned on a first-come, first-served basis</span>
                        </div>
                        <BusSeatMap passengers={passengers} />
                      </div>
                    </CollapsibleContent>
                  </div>
                </Collapsible>
              </div>
            </div>
            
            {/* Right side - Price breakdown */}
            <div className="col-span-4">
              <div className="sticky top-4">
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
        </div>
      )}
    </div>
  );
};

export default DepartureOption;

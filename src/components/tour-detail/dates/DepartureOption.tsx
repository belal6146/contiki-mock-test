import React from 'react';
import { Info, Users, Bus, ChevronUp, ChevronDown } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import { TooltipProvider } from '@/components/ui/tooltip';
import PriceBreakdown from './PriceBreakdown';
import TripTimeline from './TripTimeline';
import FellowTravellerList from '../../tour/FellowTravellerList';
import EnhancedBusSeatMap from '../../tour/EnhancedBusSeatMap';
import OptionVariantSelector from './OptionVariantSelector';
import FurtherInformation from './FurtherInformation';
import CollapsibleSection from './CollapsibleSection';
import { mockPassengers } from '@/data/mockPassengers';

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

export interface BookingPassenger {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  gender: string;
  address: {
    country: string;
    countryCode: string;
  };
  travelPassion?: string;
  numberOfTimesTravelledPreviously?: number;
  passengerId: number;
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
    <div className="border border-gray-200 overflow-hidden transition-all duration-200 mb-0 bg-white">
      {/* Compact Header */}
      <div 
        className="bg-white cursor-pointer hover:bg-gray-50 transition-colors p-4"
        onClick={handleToggle}
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
              <div className="text-center">
                <div className="text-orange-600 text-xs font-bold mb-1 uppercase tracking-wide">
                  {option.discount}% off
                </div>
              </div>
            )}
            
            <div className="text-right min-w-[80px]">
              <div className="text-xs text-gray-500 mb-1">Price</div>
              <div className="flex items-center justify-end gap-2">
                {option.oldPrice && hasDiscount && (
                  <span className="text-xs line-through text-gray-400">
                    £{option.oldPrice}
                  </span>
                )}
                <span className="font-bold text-lg text-black">
                  {formatCurrency(displayPrice)}
                </span>
              </div>
            </div>
            
            <button 
              className="bg-[rgb(204,255,0)] text-black px-4 py-2 rounded-full text-sm font-bold hover:bg-[rgb(184,230,0)] transition-colors uppercase tracking-wide"
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
      
      {/* Expanded content */}
      {isOpen && (
        <div className="bg-white border-t border-gray-100">
          <div className="grid grid-cols-12 gap-0">
            {/* Left side - Choose Variation and Trip Details */}
            <div className="col-span-7 p-6">
              {option.variants.length > 0 && (
                <OptionVariantSelector 
                  variants={option.variants}
                  selectedVariantId={selectedVariant || ''}
                  onVariantSelect={handleVariantSelect}
                />
              )}
              
              <div className="mb-8">
                <TripTimeline 
                  startDate={new Date(option.startDate)}
                  endDate={new Date(option.endDate)}
                />
              </div>
              
              <FurtherInformation />
            </div>
            
            {/* Right side - Price Breakdown */}
            <div className="col-span-5 p-6">
              <PriceBreakdown
                basePrice={displayPrice}
                discount={option.discount || 0}
                dealLabel={hasDiscount ? "Last minute deal" : undefined}
                onBookByPhone={() => onBookByPhone(option.id)}
                onRequestInfo={() => onRequestInfo(option.id)}
              />
            </div>
          </div>

          {/* Bottom sections with enhanced components */}
          <div className="p-6 border-t border-gray-100">
            <div className="mb-4">
              <CollapsibleSection 
                title="See Who's Travelling" 
                icon={Users}
                isOpen={travelersOpen}
                onToggle={setTravelersOpen}
              >
                <FellowTravellerList passengers={mockPassengers} />
              </CollapsibleSection>
            </div>

            <div className="mb-4">
              <CollapsibleSection 
                title="Bus Seating Plan" 
                icon={Bus}
                isOpen={seatingOpen}
                onToggle={setSeatingOpen}
              >
                <EnhancedBusSeatMap passengers={mockPassengers} />
              </CollapsibleSection>
            </div>
            
            <div className="mt-6 pt-4 border-t border-gray-200">
              <p className="text-xs text-gray-600 italic">Flights there and back again aren't included.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DepartureOption;

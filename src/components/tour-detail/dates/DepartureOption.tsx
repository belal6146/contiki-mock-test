
import React from 'react';
import { Info, Users, Bus, ChevronUp, ChevronDown } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import { TooltipProvider } from '@/components/ui/tooltip';
import PriceBreakdown from './PriceBreakdown';
import TripTimeline from './TripTimeline';
import TravelersInfo, { BookingPassenger } from '../../tour/TravelersInfo';
import BusSeatMap from '../../tour/BusSeatMap';
import OptionVariantSelector from './OptionVariantSelector';
import FurtherInformation from './FurtherInformation';
import CollapsibleSection from './CollapsibleSection';

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
    <div className={`border border-gray-200 rounded-lg overflow-hidden transition-all duration-200 mb-4 ${isOpen ? 'shadow-md' : 'hover:shadow-sm'} font-montserrat bg-white`}>
      {/* Header row */}
      <div 
        className="bg-white cursor-pointer hover:bg-gray-50 transition-colors p-4"
        onClick={handleToggle}
      >
        <div className="flex items-center justify-between">
          {/* Left side - Date info */}
          <div className="flex items-center gap-6">
            <div>
              <div className="text-sm text-gray-600 mb-1 font-medium">{option.dayOfWeek}</div>
              <div className="font-bold text-lg text-black">
                {option.month} {option.day}, {option.year}
              </div>
              <button className="flex items-center text-xs text-blue-600 hover:text-blue-800 mt-2 transition-colors font-medium">
                <Info size={12} className="mr-1" />
                Further information
              </button>
            </div>
            
            {/* Trip Type Badge */}
            <div className="flex items-center gap-3">
              <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold uppercase tracking-wide">
                {tripTypeLabels[option.type] || option.type}
              </span>
              {option.variants.length > 0 && (
                <span className="text-sm text-gray-600 font-medium">
                  + {option.variants.length} other option{option.variants.length > 1 ? 's' : ''}
                </span>
              )}
            </div>
          </div>
          
          {/* Right side - Price and Action */}
          <div className="flex items-center gap-6">
            {/* Last Minute Deal and Price */}
            <div className="text-right">
              {hasDiscount && (
                <div className="text-orange-600 text-xs font-bold mb-1 uppercase tracking-wide bg-orange-100 px-2 py-1 rounded">
                  LAST MINUTE DEAL
                </div>
              )}
              <div className="flex items-center justify-end gap-2 mb-1">
                <span className="text-sm text-gray-500 font-medium">Price</span>
                {option.oldPrice && hasDiscount && (
                  <span className="text-sm line-through text-gray-400 font-medium">
                    {formatCurrency(option.oldPrice)}
                  </span>
                )}
                <span className="font-bold text-xl text-black">
                  {formatCurrency(displayPrice)}
                </span>
                {hasDiscount && (
                  <span className="bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded uppercase tracking-wide">
                    {option.discount}% OFF
                  </span>
                )}
              </div>
            </div>
            
            {/* Call Us Button */}
            <button 
              className="bg-[rgb(204,255,0)] text-black px-4 py-2 rounded font-bold text-sm hover:bg-[rgb(184,230,0)] transition-colors uppercase tracking-wide border border-[rgb(204,255,0)]"
              onClick={(e) => {
                e.stopPropagation();
                handleBookNow();
              }}
            >
              CALL US
            </button>
            
            {/* Chevron */}
            <button className="text-gray-400 hover:text-gray-600 transition-colors">
              {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Expanded content */}
      {isOpen && (
        <div className="bg-white border-t border-gray-100">
          {/* Main content container */}
          <div className="grid grid-cols-12 gap-0">
            {/* Left side - Choose Variation and Trip Details */}
            <div className="col-span-8 p-6">
              {/* Choose Variation Section */}
              {option.variants.length > 0 && (
                <OptionVariantSelector 
                  variants={option.variants}
                  selectedVariantId={selectedVariant || ''}
                  onVariantSelect={handleVariantSelect}
                />
              )}
              
              {/* Trip Timeline Section */}
              <div className="mb-8">
                <TripTimeline 
                  startDate={new Date(option.startDate)}
                  endDate={new Date(option.endDate)}
                />
              </div>
              
              {/* Further Information Section */}
              <FurtherInformation />
            </div>
            
            {/* Right side - Price Breakdown Card */}
            <div className="col-span-4 p-6 bg-gray-50 border-l border-gray-100">
              <PriceBreakdown
                basePrice={displayPrice}
                discount={option.discount || 0}
                dealLabel={hasDiscount ? "Last minute deal" : undefined}
                onBookByPhone={() => onBookByPhone(option.id)}
                onRequestInfo={() => onRequestInfo(option.id)}
              />
            </div>
          </div>

          {/* Bottom sections - full width */}
          <div className="p-6 border-t border-gray-100">
            {/* See Who's Travelling Section */}
            <div className="mb-4">
              <CollapsibleSection 
                title="See Who's Travelling" 
                icon={Users}
                isOpen={travelersOpen}
                onToggle={setTravelersOpen}
              >
                <TravelersInfo passengers={passengers} />
              </CollapsibleSection>
            </div>

            {/* Bus Seating Plan Section */}
            <div className="mb-4">
              <CollapsibleSection 
                title="Bus Seating Plan" 
                icon={Bus}
                isOpen={seatingOpen}
                onToggle={setSeatingOpen}
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-bold text-lg">Choose Your Seat</h4>
                    <span className="text-sm text-gray-600">Seats are assigned on a first-come, first-served basis</span>
                  </div>
                  <BusSeatMap passengers={passengers} />
                </div>
              </CollapsibleSection>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DepartureOption;

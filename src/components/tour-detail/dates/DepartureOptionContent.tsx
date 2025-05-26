import React from 'react';
import { Users, Bus } from 'lucide-react';
import PriceBreakdown from './PriceBreakdown';
import TripTimeline from './TripTimeline';
import FellowTravellerList from '../../tour/FellowTravellerList';
import EnhancedBusSeatMap from '../../tour/EnhancedBusSeatMap';
import OptionVariantSelector from './OptionVariantSelector';
import FurtherInformation from './FurtherInformation';
import CollapsibleSection from './CollapsibleSection';
import { mockPassengers } from '@/data/mockPassengers';
import { BookingPassenger } from '../../tour/seat-map/SeatMapTypes';

interface OptionVariant {
  id: string;
  name: string;
  price: number;
  availability: 'available' | 'limited' | 'soldOut';
}

interface DepartureOptionContentProps {
  option: {
    id: string;
    startDate: string;
    endDate: string;
    discount?: number;
    variants: OptionVariant[];
  };
  selectedVariant: string | null;
  displayPrice: number;
  hasDiscount: boolean;
  passengers: BookingPassenger[];
  onVariantSelect: (variantId: string) => void;
  onBookByPhone: () => void;
  onRequestInfo: () => void;
}

const DepartureOptionContent: React.FC<DepartureOptionContentProps> = ({
  option,
  selectedVariant,
  displayPrice,
  hasDiscount,
  passengers,
  onVariantSelect,
  onBookByPhone,
  onRequestInfo
}) => {
  const [travelersOpen, setTravelersOpen] = React.useState(false);
  const [seatingOpen, setSeatingOpen] = React.useState(false);

  return (
    <div className="bg-white border-t border-gray-100">
      <div className="grid grid-cols-12 gap-0">
        {/* Left side - Choose Variation and Trip Details */}
        <div className="col-span-7 p-6">
          {option.variants.length > 0 && (
            <OptionVariantSelector 
              variants={option.variants}
              selectedVariantId={selectedVariant || ''}
              onVariantSelect={onVariantSelect}
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
            onBookByPhone={onBookByPhone}
            onRequestInfo={onRequestInfo}
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
  );
};

export default DepartureOptionContent;

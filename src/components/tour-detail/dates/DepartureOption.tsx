
import React from 'react';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

import VariantSelector, { VariantOption } from './VariantSelector';
import TripTimeline from './TripTimeline';
import PriceBreakdown from './PriceBreakdown';

export interface DepartureOptionData {
  id: string;
  startDate: Date;
  endDate: Date;
  types: string[];
  basePrice: number;
  discount: number;
  dealLabel: string;
  variants: VariantOption[];
}

interface DepartureOptionProps {
  option: DepartureOptionData;
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
  return (
    <Collapsible
      key={option.id}
      open={isOpen}
      onOpenChange={() => onToggle(option.id)}
      className="border rounded-md overflow-hidden"
    >
      <CollapsibleTrigger className="w-full">
        <div className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-white hover:bg-gray-50">
          <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-8 text-left">
            <div>
              <div className="font-bold">
                {format(option.startDate, 'EEEE')} {format(option.startDate, 'MMM d, yyyy')}
              </div>
              <div className="text-sm text-gray-500">
                Depart
              </div>
            </div>
            
            <div>
              <div className="font-bold">
                {format(option.endDate, 'EEEE')} {format(option.endDate, 'MMM d, yyyy')}
              </div>
              <div className="text-sm text-gray-500">
                Return
              </div>
            </div>
            
            <div className="flex items-center gap-1">
              {option.types.slice(0, 1).map(type => (
                <Badge 
                  key={type}
                  variant={type === 'plus' ? 'default' : 'outline'}
                  className={type === 'plus' ? 'bg-gray-100 text-black' : ''}
                >
                  {tripTypeLabels[type] || type}
                </Badge>
              ))}
              
              {option.types.length > 1 && (
                <span className="text-xs text-gray-500">
                  +{option.types.length - 1} other
                </span>
              )}
            </div>
          </div>
          
          <div className="flex items-center justify-between mt-2 md:mt-0">
            <Button 
              variant="secondary" 
              className="flex items-center gap-1 ml-auto"
              onClick={(e) => {
                e.stopPropagation();
                onBookByPhone(option.id);
              }}
            >
              CALL US £{option.basePrice}
            </Button>
            
            <div className="ml-4">
              {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </div>
          </div>
        </div>
      </CollapsibleTrigger>
      
      <CollapsibleContent>
        <Card className="border-t-0 rounded-t-none m-4 shadow-md">
          <CardContent className="p-0">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6">
              {/* Left Column - Variants & Timeline */}
              <div className="lg:col-span-7">
                {/* Variant Selector */}
                <VariantSelector 
                  variants={option.variants} 
                  selectedVariantId={selectedVariant || option.variants[0].id}
                  onSelectVariant={(variantId) => onVariantSelect(option.id, variantId)}
                />
                
                {/* Itinerary Timeline */}
                <TripTimeline
                  startDate={option.startDate}
                  endDate={option.endDate}
                />
                
                {/* Further Information */}
                <div className="bg-blue-50 border-l-4 border-blue-400 rounded-md p-4">
                  <h4 className="text-sm font-medium text-blue-800">Further Information</h4>
                  <p className="text-sm text-blue-700 leading-relaxed">
                    The meeting point for this trip is at the designated hotel at 18:00.
                    Make sure to arrive with enough time to check in and get settled.
                  </p>
                </div>
              </div>
              
              {/* Right Column - Price Breakdown */}
              <div className="lg:col-span-5">
                <PriceBreakdown 
                  basePrice={option.basePrice}
                  discount={option.discount}
                  dealLabel={option.dealLabel}
                  onBookByPhone={() => onBookByPhone(option.id)}
                  onRequestInfo={() => onRequestInfo(option.id)}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default DepartureOption;

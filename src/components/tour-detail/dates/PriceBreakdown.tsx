
import React from 'react';
import { Button } from '@/components/ui/button';
import { Tag } from 'lucide-react';

interface PriceBreakdownProps {
  basePrice: number;
  discount: number;
  dealLabel?: string;
  onBookByPhone: () => void;
  onRequestInfo: () => void;
}

const PriceBreakdown: React.FC<PriceBreakdownProps> = ({ 
  basePrice, 
  discount, 
  dealLabel,
  onBookByPhone,
  onRequestInfo
}) => {
  return (
    <div className="bg-green-50 rounded-md p-6">
      <h3 className="text-lg font-bold mb-4">Price Breakdown</h3>
      
      <div className="space-y-2 mb-4">
        <div className="flex justify-between">
          <span>Plus</span>
          <span className="font-medium">£{basePrice}</span>
        </div>
        
        {discount > 0 && (
          <div className="flex justify-between text-green-700">
            <span className="flex items-center gap-1">
              <Tag size={14} />
              Total Savings
            </span>
            <span className="font-medium">£{discount}</span>
          </div>
        )}
        
        {dealLabel && discount > 0 && (
          <div className="text-sm text-green-700 pl-5">
            {dealLabel}
          </div>
        )}
      </div>
      
      <div className="border-t border-green-200 pt-4 mb-6">
        <div className="flex justify-between text-xl font-bold">
          <span>Total Price</span>
          <span>£{basePrice}</span>
        </div>
      </div>
      
      <div className="space-y-3">
        <Button
          variant="secondary"
          className="w-full"
          onClick={onBookByPhone}
        >
          BOOK BY PHONE
        </Button>
        
        <Button
          variant="outline"
          className="w-full border-secondary text-secondary hover:bg-secondary/10"
          onClick={onRequestInfo}
        >
          REQUEST MORE INFO
        </Button>
      </div>
    </div>
  );
};

export default PriceBreakdown;

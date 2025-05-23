
import React from 'react';
import { Button } from '@/components/ui/button';
import { Tag } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

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
  const finalPrice = basePrice - discount;
  
  return (
    <div className="bg-green-50 border border-green-200 rounded-lg p-6">
      <h3 className="text-lg font-bold text-black mb-4">PRICE BREAKDOWN</h3>
      
      <div className="space-y-3 mb-6">
        <div className="flex justify-between items-center">
          <span className="text-gray-700">Plus</span>
          <span className="font-semibold text-black">{formatCurrency(basePrice)}</span>
        </div>
        
        {discount > 0 && (
          <>
            <div className="flex justify-between items-center text-green-700">
              <span className="flex items-center gap-2">
                <Tag size={16} />
                Total Savings
              </span>
              <span className="font-semibold">-{formatCurrency(discount)}</span>
            </div>
            
            {dealLabel && (
              <div className="text-sm text-green-700 pl-6">
                {dealLabel}
              </div>
            )}
          </>
        )}
      </div>
      
      <div className="border-t border-green-300 pt-4 mb-6">
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold text-black">Total Price</span>
          <span className="text-xl font-bold text-black">{formatCurrency(finalPrice)}</span>
        </div>
        <div className="text-sm text-gray-600 mt-1">Based on twin/double room</div>
      </div>
      
      <div className="space-y-3">
        <Button
          className="w-full bg-lime-400 text-black hover:bg-lime-500 font-bold py-3 text-sm"
          onClick={onBookByPhone}
        >
          BOOK BY PHONE
        </Button>
        
        <Button
          variant="outline"
          className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold py-3 text-sm"
          onClick={onRequestInfo}
        >
          REQUEST MORE INFO
        </Button>
      </div>
    </div>
  );
};

export default PriceBreakdown;

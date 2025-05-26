
import React from 'react';
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
  const discountAmount = basePrice * (discount / 100);
  const finalPrice = basePrice - discountAmount;
  
  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
      <div className="bg-green-50 p-4 border-b border-gray-200">
        <h3 className="font-bold text-lg text-gray-900 uppercase tracking-wide">PRICE BREAKDOWN</h3>
      </div>
      
      <div className="p-4">
        <div className="space-y-3 mb-6">
          <div className="flex justify-between items-center">
            <span className="text-gray-600 font-medium">Standard</span>
            <div className="text-right">
              <div className="text-xs text-gray-500 line-through">£{Math.round(basePrice + discountAmount)}</div>
              <span className="font-bold">{formatCurrency(basePrice)}</span>
            </div>
          </div>
          
          <div className="border-t border-gray-200 pt-3 flex justify-between items-center">
            <span className="font-bold text-gray-800">Total Savings</span>
            <span className="font-bold text-lg">£{discountAmount.toFixed(0)}</span>
          </div>
          
          <div className="bg-green-50 p-4 rounded-md mt-4">
            <div className="text-center">
              <p className="text-lg font-bold text-black mb-1">Total Price</p>
              <p className="text-xs text-gray-600 mb-2">Based on multishare room</p>
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="text-sm line-through text-gray-500">£{Math.round(basePrice + discountAmount)}</span>
              </div>
              <p className="text-2xl font-bold text-black">{formatCurrency(finalPrice)}</p>
            </div>
          </div>
        </div>
        
        <div className="space-y-3">
          <button 
            onClick={onBookByPhone} 
            className="w-full bg-yellow-300 text-black py-3 px-4 rounded font-bold hover:bg-yellow-400 transition-colors text-sm uppercase tracking-wide"
          >
            BOOK BY PHONE
          </button>
          
          <button 
            onClick={onRequestInfo} 
            className="w-full border-2 border-gray-300 text-gray-700 py-3 px-4 rounded font-bold hover:bg-gray-50 transition-colors text-sm uppercase tracking-wide"
          >
            REQUEST MORE INFO
          </button>
        </div>
      </div>
    </div>
  );
};

export default PriceBreakdown;

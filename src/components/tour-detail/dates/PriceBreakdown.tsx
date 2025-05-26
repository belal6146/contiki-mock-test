
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
  const originalPrice = Math.round(basePrice + discountAmount);
  
  return (
    <div className="bg-green-50 border border-green-200 rounded-lg overflow-hidden shadow-sm">
      <div className="bg-green-100 p-4 border-b border-green-200">
        <h3 className="font-bold text-lg text-gray-900 uppercase tracking-wide">PRICE BREAKDOWN</h3>
      </div>
      
      <div className="p-6">
        <div className="space-y-4 mb-6">
          <div className="flex justify-between items-center">
            <span className="text-gray-700 font-medium">Standard</span>
            <div className="text-right">
              <div className="text-sm text-gray-500 line-through">£{originalPrice}</div>
              <span className="font-bold text-lg">{formatCurrency(finalPrice)}</span>
            </div>
          </div>
          
          <div className="border-t border-green-200 pt-4 flex justify-between items-center">
            <span className="font-bold text-gray-800">Total Savings</span>
            <span className="font-bold text-lg text-black">£{Math.round(discountAmount)}</span>
          </div>
        </div>
        
        <div className="bg-white border border-green-200 rounded-lg p-6 mb-6">
          <div className="text-center">
            <h4 className="text-lg font-bold text-black mb-1">Total Price</h4>
            <p className="text-sm text-gray-600 mb-3">Based on multishare room</p>
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="text-sm line-through text-gray-500">£{originalPrice}</span>
            </div>
            <p className="text-3xl font-bold text-black">{formatCurrency(finalPrice)}</p>
          </div>
        </div>
        
        <div className="space-y-3">
          <button 
            onClick={onBookByPhone} 
            className="w-full bg-[rgb(204,255,0)] text-black py-3 px-4 rounded-full font-bold hover:bg-[rgb(184,230,0)] transition-colors text-sm uppercase tracking-wide"
          >
            BOOK BY PHONE
          </button>
          
          <button 
            onClick={onRequestInfo} 
            className="w-full border-2 border-gray-300 text-gray-700 py-3 px-4 rounded-full font-bold hover:bg-gray-50 transition-colors text-sm uppercase tracking-wide"
          >
            REQUEST MORE INFO
          </button>
        </div>
      </div>
    </div>
  );
};

export default PriceBreakdown;

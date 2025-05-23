
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
  const depositAmount = 60; // Hardcoded deposit amount
  
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm">
      <div className="bg-gray-50 p-4 border-b border-gray-200">
        <h3 className="font-bold text-lg text-gray-900">PRICE BREAKDOWN</h3>
      </div>
      
      <div className="p-4">
        {dealLabel && (
          <div className="flex items-center mb-4">
            <span className="font-bold text-red-600 text-sm">LAST MINUTE DEAL</span>
          </div>
        )}
        
        <div className="space-y-3 mb-6">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Plus</span>
            <span className="font-semibold">—</span>
            <span className="font-semibold">{formatCurrency(basePrice)}</span>
          </div>
          
          <div className="border-t border-gray-200 pt-3 flex justify-between items-center">
            <span className="font-bold text-gray-800">Total Savings</span>
            <span className="font-bold text-lg">£467</span>
          </div>
          
          <div className="flex items-center mt-3">
            <div className="bg-black rounded-full p-1.5 mr-2">
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="font-medium text-sm">Last minute deal</span>
          </div>
          
          <div className="bg-green-50 p-4 rounded-md mt-4">
            <div className="text-center">
              <p className="text-sm text-gray-700 mb-1">Total Price</p>
              <p className="text-xs text-gray-600 mb-2">Based on twinshare room</p>
              <p className="text-lg line-through text-gray-500 mb-1">£2,335</p>
              <p className="text-2xl font-bold text-black">{formatCurrency(finalPrice)}</p>
            </div>
          </div>
        </div>
        
        <div className="space-y-3">
          <button 
            onClick={onBookByPhone} 
            className="w-full bg-[rgb(204,255,0)] text-black py-3 px-4 rounded font-bold hover:bg-[rgb(204,255,0)/90] transition-colors text-sm"
          >
            BOOK BY PHONE
          </button>
          
          <button 
            onClick={onRequestInfo} 
            className="w-full border-2 border-gray-300 text-gray-700 py-3 px-4 rounded font-bold hover:bg-gray-50 transition-colors text-sm"
          >
            REQUEST MORE INFO
          </button>
        </div>
      </div>
    </div>
  );
};

export default PriceBreakdown;


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
    <div className="border border-gray-200 rounded-xl overflow-hidden bg-white">
      <div className="bg-gray-50 p-5 border-b border-gray-200">
        <h3 className="font-bold text-xl text-gray-900 mb-1">PRICE BREAKDOWN</h3>
      </div>
      
      <div className="p-5">
        {dealLabel && (
          <div className="flex items-center mb-4">
            <span className="font-medium text-red-600">LAST MINUTE DEAL</span>
          </div>
        )}
        
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Plus</span>
            <span className="font-semibold">—</span>
            <span className="font-semibold">{formatCurrency(basePrice)}</span>
          </div>
          
          <div className="border-t border-gray-200 pt-4 flex justify-between items-center">
            <span className="font-bold text-gray-800">Total Savings</span>
            <span className="font-bold text-xl">£467</span>
          </div>
          
          <div className="flex items-center mt-3">
            <div className="bg-black rounded-full p-1.5 mr-2">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="font-medium">Last minute deal</span>
          </div>
          
          <div className="bg-green-50 p-5 rounded-md mt-5">
            <div className="flex flex-col items-center">
              <p className="mb-1 text-center text-gray-700">Total Price</p>
              <p className="text-center text-xs text-gray-600 mb-2">Based on twinshare room</p>
              <p className="text-lg line-through text-gray-500 mb-1">£2,335</p>
              <p className="text-3xl font-bold">{formatCurrency(finalPrice)}</p>
            </div>
          </div>
        </div>
        
        <div className="mt-6 space-y-3">
          <button 
            onClick={onBookByPhone} 
            className="w-full bg-[#CCFF00] text-black py-3 px-4 rounded-md font-bold hover:bg-[#b3e600] transition-colors flex items-center justify-center"
          >
            BOOK BY PHONE
          </button>
          
          <button 
            onClick={onRequestInfo} 
            className="w-full border-2 border-gray-300 text-gray-700 py-3 px-4 rounded-md font-bold hover:bg-gray-50 transition-colors"
          >
            REQUEST MORE INFO
          </button>
        </div>
      </div>
    </div>
  );
};

export default PriceBreakdown;

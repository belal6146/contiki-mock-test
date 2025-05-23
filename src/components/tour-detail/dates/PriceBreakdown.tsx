
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
    <div className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-md">
      <div className="bg-gray-50 p-5 border-b border-gray-200">
        <h3 className="font-bold text-xl text-gray-900 mb-1">Price Breakdown</h3>
        <p className="text-gray-600 text-sm">Total per person, land only</p>
      </div>
      
      <div className="p-5">
        {dealLabel && (
          <div className="bg-yellow-100 text-yellow-800 px-4 py-3 rounded-md mb-4 flex items-center">
            <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
            </svg>
            <span className="font-medium">{dealLabel}</span>
          </div>
        )}
        
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Base Price</span>
            <span className="font-semibold">{formatCurrency(basePrice)}</span>
          </div>
          
          {discount > 0 && (
            <div className="flex justify-between items-center text-green-600">
              <span>Discount ({discount}%)</span>
              <span>-{formatCurrency(discountAmount)}</span>
            </div>
          )}
          
          <div className="border-t border-gray-200 pt-3 flex justify-between items-center">
            <span className="font-bold text-gray-800">Total Price</span>
            <span className="font-bold text-xl">{formatCurrency(finalPrice)}</span>
          </div>
          
          <div className="bg-orange-50 p-3 rounded-md mt-4">
            <div className="flex justify-between items-center">
              <span className="text-orange-800 font-medium">Deposit Due Today</span>
              <span className="font-bold text-orange-800">{formatCurrency(depositAmount)}</span>
            </div>
          </div>
        </div>
        
        <div className="mt-6 space-y-3">
          <button 
            onClick={onBookByPhone} 
            className="w-full bg-orange-500 text-white py-3 px-4 rounded-md font-bold hover:bg-orange-600 transition-colors flex items-center justify-center"
          >
            BOOK NOW
          </button>
          
          <button 
            onClick={onRequestInfo} 
            className="w-full border-2 border-gray-300 text-gray-700 py-3 px-4 rounded-md font-bold hover:bg-gray-50 transition-colors"
          >
            REQUEST INFO
          </button>
        </div>
        
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>Need help with your booking?</p>
          <a href="tel:+18662668454" className="text-orange-500 font-medium hover:underline">
            Call 1-866-266-8454
          </a>
        </div>
      </div>
    </div>
  );
};

export default PriceBreakdown;

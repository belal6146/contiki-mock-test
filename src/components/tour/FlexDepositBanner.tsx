
import React from 'react';
import { X } from 'lucide-react';

interface FlexDepositBannerProps {
  onClose?: () => void;
}

const FlexDepositBanner: React.FC<FlexDepositBannerProps> = ({ onClose }) => {
  return (
    <div className="bg-white py-16">
      <div className="container">
        {/* Four Benefits Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div className="flex items-center gap-4">
            <div className="bg-lime-400 rounded-full w-16 h-16 flex items-center justify-center shrink-0">
              <span className="text-black text-2xl font-bold">£</span>
            </div>
            <div>
              <p className="font-bold text-lg text-black">Only £60 deposit</p>
              <p className="text-gray-600">to book</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="bg-lime-400 rounded-full w-16 h-16 flex items-center justify-center shrink-0">
              <span className="text-black text-2xl font-bold">⏱</span>
            </div>
            <div>
              <p className="font-bold text-lg text-black">Pay over time, interest</p>
              <p className="text-gray-600">free</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="bg-lime-400 rounded-full w-16 h-16 flex items-center justify-center shrink-0">
              <span className="text-black text-2xl font-bold">✓</span>
            </div>
            <div>
              <p className="font-bold text-lg text-black">No booking fee, no change</p>
              <p className="text-gray-600">fee</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="bg-lime-400 rounded-full w-16 h-16 flex items-center justify-center shrink-0">
              <span className="text-black text-2xl font-bold">✓</span>
            </div>
            <div>
              <p className="font-bold text-lg text-black">FlexDeposit</p>
              <p className="text-gray-600">options</p>
            </div>
          </div>
        </div>
        
        {/* Flexibility Promise Banner */}
        <div className="bg-black text-white p-8 rounded-lg relative">
          {onClose && (
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 text-white hover:text-gray-300"
            >
              <X className="w-6 h-6" />
            </button>
          )}
          
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="md:pr-8">
              <h3 className="text-3xl font-bold mb-3">Flexibility Promise</h3>
              <p className="text-lg">
                Your money is safe with us and the TTC Promise. Book today and enjoy the benefits of flexible travel dates and money guarantee. Covid is part of the TTC Promise. Learn more.
              </p>
            </div>
            <button className="mt-6 md:mt-0 bg-white text-black hover:bg-gray-100 px-8 py-3 font-bold transition-colors duration-200 rounded">
              FIND OUT MORE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlexDepositBanner;

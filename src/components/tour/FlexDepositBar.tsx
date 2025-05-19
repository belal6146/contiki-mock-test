
import React, { useEffect } from 'react';

const FlexDepositBar: React.FC = () => {
  useEffect(() => {
    console.debug('[FlexDepositBar] mounted');
  }, []);
  
  return (
    <section className="py-8 bg-bgLight">
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-center space-x-3">
            <div className="bg-accent rounded-full w-10 h-10 flex items-center justify-center">
              <span className="text-white text-lg font-bold">£</span>
            </div>
            <div>
              <p className="font-medium">Only £60 deposit</p>
              <p className="text-sm text-gray-600">to book</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="bg-accent rounded-full w-10 h-10 flex items-center justify-center">
              <span className="text-white text-lg font-bold">⏱</span>
            </div>
            <div>
              <p className="font-medium">Pay over time</p>
              <p className="text-sm text-gray-600">interest free</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="bg-accent rounded-full w-10 h-10 flex items-center justify-center">
              <span className="text-white text-lg font-bold">✓</span>
            </div>
            <div>
              <p className="font-medium">No booking fee</p>
              <p className="text-sm text-gray-600">no change fee</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="bg-accent rounded-full w-10 h-10 flex items-center justify-center">
              <span className="text-white text-lg font-bold">⚡</span>
            </div>
            <div>
              <p className="font-medium">FlexDeposit</p>
              <p className="text-sm text-gray-600">options</p>
            </div>
          </div>
        </div>
        
        {/* Flexibility Promise banner */}
        <div className="bg-black text-white mt-8 p-6 rounded-lg">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div>
              <h3 className="text-xl font-bold mb-2">Flexibility Promise</h3>
              <p className="text-sm">
                Your money is safe with us and the TTC Promise. Book today and enjoy the benefits of flexible travel dates and money guarantee.
              </p>
            </div>
            <button className="mt-4 md:mt-0 border border-white px-4 py-2 rounded-md text-sm font-medium hover:bg-white hover:text-black transition-colors">
              FIND OUT MORE
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FlexDepositBar;

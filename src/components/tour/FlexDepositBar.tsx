
import React, { useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import ContikiButton from '@/components/ContikiButton';

const FlexDepositBar: React.FC = () => {
  useEffect(() => {
    console.debug('[FlexDepositBar] mounted');
  }, []);
  
  return (
    <section className="py-16 bg-bgLight">
      <div className="container">
        <h3 className="heading-sm mb-8">Flexible Booking Options</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex items-center gap-4">
            <div className="bg-secondary rounded-full w-12 h-12 flex items-center justify-center shrink-0">
              <span className="text-secondary-foreground text-xl font-bold">£</span>
            </div>
            <div>
              <p className="font-medium text-base">Only £60 deposit</p>
              <p className="text-gray-600 text-sm">to book</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="bg-secondary rounded-full w-12 h-12 flex items-center justify-center shrink-0">
              <span className="text-secondary-foreground text-xl font-bold">⏱</span>
            </div>
            <div>
              <p className="font-medium text-base">Pay over time</p>
              <p className="text-gray-600 text-sm">interest free</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="bg-secondary rounded-full w-12 h-12 flex items-center justify-center shrink-0">
              <span className="text-secondary-foreground text-xl font-bold">✓</span>
            </div>
            <div>
              <p className="font-medium text-base">No booking fee</p>
              <p className="text-gray-600 text-sm">no change fee</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="bg-secondary rounded-full w-12 h-12 flex items-center justify-center shrink-0">
              <span className="text-secondary-foreground text-xl font-bold">⚡</span>
            </div>
            <div>
              <p className="font-medium text-base">FlexDeposit</p>
              <p className="text-gray-600 text-sm">options</p>
            </div>
          </div>
        </div>
        
        {/* Flexibility Promise banner */}
        <div className="bg-secondary mt-12 p-8 rounded-2xl">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div>
              <h3 className="text-2xl font-bold mb-2 text-secondary-foreground">Flexibility Promise</h3>
              <p className="text-secondary-foreground">
                Your money is safe with us and the TTC Promise. Book today and enjoy the benefits of flexible travel dates and money guarantee.
              </p>
            </div>
            <ContikiButton 
              variant="outline" 
              className="mt-6 md:mt-0 border-secondary-foreground text-secondary-foreground hover:bg-secondary-foreground hover:text-secondary"
              icon={<ArrowRight size={16} />}
              iconPosition="right"
            >
              FIND OUT MORE
            </ContikiButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FlexDepositBar;

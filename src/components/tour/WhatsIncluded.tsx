
import React from 'react';
import { Check, X } from 'lucide-react';

interface WhatsIncludedProps {
  included: string[];
  excluded?: string[];
}

const WhatsIncluded: React.FC<WhatsIncludedProps> = ({ 
  included, 
  excluded = [
    'Flights to/from destination',
    'Airport transfers',
    'Optional activities',
    'Travel insurance',
    'Visa fees'
  ] 
}) => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">What's Included</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
            {/* What's Included */}
            <div>
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <span className="bg-[#CCFF00] p-1 rounded-full">
                  <Check className="w-4 h-4 text-black" />
                </span>
                Included in this trip
              </h3>
              
              <ul className="space-y-3">
                {included.map((item, index) => (
                  <li key={`included-${index}`} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* What's Not Included */}
            <div>
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <span className="bg-gray-200 p-1 rounded-full">
                  <X className="w-4 h-4 text-gray-600" />
                </span>
                Not included in this trip
              </h3>
              
              <ul className="space-y-3">
                {excluded.map((item, index) => (
                  <li key={`excluded-${index}`} className="flex items-start gap-3">
                    <X className="w-5 h-5 text-gray-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatsIncluded;

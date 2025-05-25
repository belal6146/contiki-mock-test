
import React, { useState } from 'react';
import { Check } from 'lucide-react';

interface Variation {
  id: string;
  name: string;
  description: string;
  price: number;
  oldPrice?: number;
  isSelected?: boolean;
}

const VariationSelector = () => {
  const [selectedVariation, setSelectedVariation] = useState('plus');

  const variations: Variation[] = [
    {
      id: 'plus',
      name: 'PLUS',
      description: 'Upgrade to hotel rooms & share with just 1 other traveller.',
      price: 1751,
      oldPrice: 2335,
      isSelected: true
    },
    {
      id: 'standard',
      name: 'STANDARD',
      description: 'Stay in multi-share hotel rooms with up to 3 other travellers.',
      price: 1468,
      oldPrice: 1835
    },
    {
      id: 'pride',
      name: 'PRIDE',
      description: 'The Plus itinerary with extra activities handpicked for the LGBTQIA+ community operating in peak season.',
      price: 1758,
      oldPrice: 2315
    },
    {
      id: 'gap',
      name: 'GAP 18-22',
      description: 'Includes the Standard itinerary, exclusively for 18-22s (In Peak Season).',
      price: 1639,
      oldPrice: 2049
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container max-w-6xl mx-auto px-6">
        <h2 className="text-2xl font-bold text-black mb-8">Selected Variation</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {variations.map((variation) => (
            <div 
              key={variation.id}
              className={`relative border rounded-lg p-6 cursor-pointer transition-all ${
                selectedVariation === variation.id 
                  ? 'border-[#CCFF00] bg-white shadow-lg' 
                  : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
              }`}
              onClick={() => setSelectedVariation(variation.id)}
            >
              {/* Selected indicator */}
              {selectedVariation === variation.id && (
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-[#CCFF00] rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-black" />
                </div>
              )}
              
              {/* Variation name */}
              <h3 className="font-bold text-lg text-black mb-3 uppercase tracking-wide">
                {variation.name}
              </h3>
              
              {/* Description */}
              <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                {variation.description}
              </p>
              
              {/* Price */}
              <div className="mb-4">
                {variation.oldPrice && (
                  <div className="text-sm text-gray-400 line-through">
                    £{variation.oldPrice.toLocaleString()}
                  </div>
                )}
                <div className="flex items-baseline">
                  <span className="text-sm text-gray-500 mr-1">From</span>
                  <span className="text-xl font-bold text-black">
                    £{variation.price.toLocaleString()}
                  </span>
                </div>
              </div>
              
              {/* Add to compare button */}
              <button className="w-full border border-gray-300 rounded px-4 py-2 text-sm font-medium text-black hover:bg-gray-50 transition-colors">
                Add to compare
              </button>
            </div>
          ))}
        </div>
        
        {/* Show all versions link */}
        <div className="text-center">
          <button className="text-black font-medium underline hover:no-underline transition-all">
            SHOW ALL VERSIONS
          </button>
        </div>
      </div>
    </section>
  );
};

export default VariationSelector;

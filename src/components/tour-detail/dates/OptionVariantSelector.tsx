
import React from 'react';
import { formatCurrency } from '@/lib/utils';
import { Check } from 'lucide-react';

export interface OptionVariant {
  id: string;
  name: string;
  price: number;
  availability: 'available' | 'limited' | 'soldOut';
}

interface OptionVariantSelectorProps {
  variants: OptionVariant[];
  selectedVariantId: string | null;
  onVariantSelect: (variantId: string) => void;
}

const OptionVariantSelector: React.FC<OptionVariantSelectorProps> = ({
  variants,
  selectedVariantId,
  onVariantSelect
}) => {
  if (variants.length === 0) return null;
  
  return (
    <div className="mb-8">
      <h3 className="text-lg font-bold text-black mb-4">Choose Variation</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {variants.map((variant) => (
          <div 
            key={variant.id}
            className={`relative border rounded-lg p-4 cursor-pointer transition-all ${
              selectedVariantId === variant.id 
                ? 'border-black bg-white shadow-md' 
                : 'border-gray-200 hover:border-gray-300 bg-white hover:shadow-sm'
            }`}
            onClick={() => onVariantSelect(variant.id)}
          >
            {/* Radio button */}
            <div className="absolute top-4 right-4">
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                selectedVariantId === variant.id 
                  ? 'border-black bg-black' 
                  : 'border-gray-300 bg-white'
              }`}>
                {selectedVariantId === variant.id && (
                  <Check className="w-3 h-3 text-white" />
                )}
              </div>
            </div>
            
            {/* Content */}
            <div className="pr-8">
              <h4 className="font-bold text-black uppercase text-sm tracking-wide mb-1">
                {variant.name}
              </h4>
              <button className="text-sm text-blue-600 hover:text-blue-800 hover:underline mb-3">
                More info
              </button>
              <div className="font-bold text-lg text-black">
                {formatCurrency(variant.price)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OptionVariantSelector;


import React from 'react';
import { formatCurrency } from '@/lib/utils';
import { Info } from 'lucide-react';

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
    <div className="mb-8 font-montserrat">
      <h3 className="text-lg font-bold text-black mb-4 uppercase tracking-wide">Choose Variation</h3>
      <div className="space-y-3">
        {variants.map((variant) => (
          <div 
            key={variant.id}
            className={`border rounded-lg p-4 cursor-pointer transition-all flex items-center justify-between ${
              selectedVariantId === variant.id 
                ? 'border-[#CCFF00] bg-[#CCFF00]/10 shadow-sm' 
                : 'border-gray-200 hover:border-gray-300 bg-white hover:shadow-sm'
            }`}
            onClick={() => onVariantSelect(variant.id)}
          >
            <div className="flex items-center gap-3">
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                selectedVariantId === variant.id 
                  ? 'border-black bg-black' 
                  : 'border-gray-300 bg-white'
              }`}>
                {selectedVariantId === variant.id && (
                  <div className="w-2 h-2 rounded-full bg-white"></div>
                )}
              </div>
              <span className="font-bold text-black uppercase text-sm tracking-wide">
                {variant.name}
              </span>
            </div>
            <div className="text-right">
              <button className="text-sm text-blue-600 hover:text-blue-800 hover:underline mb-1 flex items-center font-medium">
                <Info size={12} className="mr-1" />
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

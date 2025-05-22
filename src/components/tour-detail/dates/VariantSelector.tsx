
import React from 'react';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

export interface VariantOption {
  id: string;
  name: string;
  price: number;
}

interface VariantSelectorProps {
  variants: VariantOption[];
  selectedVariantId: string;
  onSelectVariant: (variantId: string) => void;
}

const VariantSelector: React.FC<VariantSelectorProps> = ({ variants, selectedVariantId, onSelectVariant }) => {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-bold mb-3">Select Room Type</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {variants.map(variant => (
          <button
            key={variant.id}
            onClick={() => onSelectVariant(variant.id)}
            className={cn(
              "flex items-start justify-between border rounded-md p-4 text-left",
              selectedVariantId === variant.id
                ? "border-green-600 bg-green-50"
                : "border-gray-200 hover:border-gray-300"
            )}
          >
            <div>
              <div className="font-medium">{variant.name}</div>
              <div className="text-xl font-bold mt-2">£{variant.price}</div>
            </div>
            
            {selectedVariantId === variant.id && (
              <div className="bg-green-600 rounded-full p-1">
                <Check className="h-4 w-4 text-white" />
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default VariantSelector;

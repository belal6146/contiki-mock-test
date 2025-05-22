
import React from 'react';
import { cn } from '@/lib/utils';
import { Checkbox } from '@/components/ui/checkbox';

export interface TripType {
  id: string;
  label: string;
  variant: 'solid-light' | 'outline' | 'rainbow' | 'solid-primary';
}

interface TripTypeFilterProps {
  types: TripType[];
  selectedTypes: string[];
  onTypeToggle: (type: string) => void;
}

const TripTypeFilter: React.FC<TripTypeFilterProps> = ({ types, selectedTypes, onTypeToggle }) => {
  return (
    <div className="mb-8">
      <p className="text-sm font-medium mb-2">Trip Type</p>
      <div className="flex flex-wrap gap-2">
        {types.map((type) => (
          <label 
            key={type.id}
            htmlFor={`type-${type.id}`}
            className={cn(
              "flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium cursor-pointer transition-all",
              type.variant === 'solid-light' && "bg-gray-100 text-black",
              type.variant === 'outline' && "bg-white border border-gray-200",
              type.variant === 'rainbow' && "bg-white border-2 border-transparent",
              type.variant === 'solid-primary' && "bg-primary text-white",
              selectedTypes.includes(type.id) && "ring-2 ring-accent ring-offset-2"
            )}
            style={type.variant === 'rainbow' ? {
              background: `linear-gradient(white, white) padding-box, 
                          linear-gradient(to right, #FF5A5F, #FF9966, #FFCD38, #5CFF87, #5BBEFF, #CD5FFE) border-box`
            } : {}}
          >
            <Checkbox 
              id={`type-${type.id}`}
              checked={selectedTypes.includes(type.id)}
              onCheckedChange={() => onTypeToggle(type.id)}
              className="sr-only"
            />
            {type.label}
          </label>
        ))}
      </div>
    </div>
  );
};

export default TripTypeFilter;

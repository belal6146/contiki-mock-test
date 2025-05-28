import React from 'react';
import { Check } from 'lucide-react';

interface TripType {
  id: string;
  label: string;
  iconPath?: string;
}

interface TripTypeFilterProps {
  types: TripType[];
  selectedTypes: string[];
  onTypeToggle: (type: string) => void;
}

const TripTypeFilter: React.FC<TripTypeFilterProps> = ({ types, selectedTypes, onTypeToggle }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {types.map((type) => {
        const isSelected = selectedTypes.includes(type.id);
        
        // Apply styling based on selection state
        const buttonClass = `
          px-4 py-2 text-sm font-semibold uppercase rounded-full focus:outline-none focus:ring-2 focus:ring-secondary ${
            isSelected
              ? 'bg-secondary text-gray-900' // Selected styling
              : 'bg-lightBg text-gray-600 border border-gray-300 hover:bg-gray-200' // Unselected styling
          }
        `;
        
        return (
          <button
            key={type.id}
            className={buttonClass}
            onClick={() => onTypeToggle(type.id)}
          >
            {isSelected && (
              <Check className="mr-1 h-3.5 w-3.5" />
            )}
            <span>{type.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default TripTypeFilter;

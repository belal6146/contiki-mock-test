
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
      {types.map((type) => (
        <button
          key={type.id}
          className={`flex items-center px-3 py-1 rounded-full text-sm transition-colors ${
            selectedTypes.includes(type.id)
              ? 'bg-[rgb(204,255,0)] text-black font-semibold'
              : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
          }`}
          onClick={() => onTypeToggle(type.id)}
        >
          {selectedTypes.includes(type.id) && (
            <Check className="mr-1 h-3.5 w-3.5" />
          )}
          <span>{type.label}</span>
        </button>
      ))}
    </div>
  );
};

export default TripTypeFilter;

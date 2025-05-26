
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
        let buttonClass = "flex items-center px-3 py-1 rounded-full text-sm transition-colors font-medium";
        
        // Apply specific styling based on trip type to match original
        if (type.id === 'plus') {
          buttonClass += isSelected 
            ? " bg-[rgb(204,255,0)] text-black"
            : " bg-white border border-gray-300 text-gray-700 hover:bg-gray-50";
        } else if (type.id === 'standard') {
          buttonClass += isSelected 
            ? " bg-yellow-400 text-black"
            : " bg-white border border-gray-300 text-gray-700 hover:bg-gray-50";
        } else if (type.id === 'pride') {
          buttonClass += isSelected 
            ? " bg-gradient-to-r from-pink-500 to-purple-500 text-white"
            : " bg-white border border-gray-300 text-gray-700 hover:bg-gray-50";
        } else if (type.id === 'gap') {
          buttonClass += isSelected 
            ? " bg-blue-500 text-white"
            : " bg-white border border-gray-300 text-gray-700 hover:bg-gray-50";
        } else if (type.id === 'chill') {
          buttonClass += isSelected 
            ? " bg-orange-400 text-black"
            : " bg-white border border-gray-300 text-gray-700 hover:bg-gray-50";
        } else {
          buttonClass += isSelected
            ? " bg-[rgb(204,255,0)] text-black"
            : " bg-white border border-gray-300 text-gray-700 hover:bg-gray-50";
        }
        
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

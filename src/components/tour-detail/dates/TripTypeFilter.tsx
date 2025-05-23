
import React from 'react';

interface TripType {
  id: string;
  label: string;
  color: string;
}

interface TripTypeFilterProps {
  types: TripType[];
  selectedTypes: string[];
  onTypeToggle: (type: string) => void;
}

const TripTypeFilter: React.FC<TripTypeFilterProps> = ({ types, selectedTypes, onTypeToggle }) => {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      <span className="text-sm font-medium self-center mr-2">Trip Type:</span>
      {types.map(type => (
        <button
          key={type.id}
          className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
            selectedTypes.includes(type.id)
              ? `bg-${type.color} text-black border border-${type.color}`
              : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
          }`}
          style={{
            backgroundColor: selectedTypes.includes(type.id) ? type.color : 'white'
          }}
          onClick={() => onTypeToggle(type.id)}
        >
          {type.label}
        </button>
      ))}
    </div>
  );
};

export default TripTypeFilter;

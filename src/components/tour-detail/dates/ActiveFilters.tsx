
import React from 'react';

interface ActiveFiltersProps {
  selectedMonth: string;
  selectedTypes: string[];
  tripTypeLabels: Record<string, string>;
  onTypeToggle: (type: string) => void;
}

const ActiveFilters: React.FC<ActiveFiltersProps> = ({
  selectedMonth,
  selectedTypes,
  tripTypeLabels,
  onTypeToggle
}) => {
  return (
    <div className="flex flex-wrap items-center gap-2 mb-6">
      <span className="text-sm font-medium text-gray-700">Active filters:</span>
      <div className="bg-[rgb(204,255,0)] text-black px-3 py-1 rounded-full text-sm font-medium flex items-center">
        {selectedMonth}
        <button className="ml-2">
          <span className="sr-only">Remove filter</span>
          <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
      {selectedTypes.map(type => (
        <div key={type} className="bg-[rgb(204,255,0)] text-black px-3 py-1 rounded-full text-sm font-medium flex items-center">
          {tripTypeLabels[type]}
          <button className="ml-2" onClick={() => onTypeToggle(type)}>
            <span className="sr-only">Remove filter</span>
            <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      ))}
    </div>
  );
};

export default ActiveFilters;

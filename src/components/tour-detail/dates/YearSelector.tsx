import React from 'react';

interface YearSelectorProps {
  selectedYear: string;
  onYearChange: (year: string) => void;
}

const YearSelector: React.FC<YearSelectorProps> = ({ selectedYear, onYearChange }) => {
  return (
    <div className="flex justify-center mb-8">
      <div className="inline-flex bg-lightBg rounded-lg p-1">
        <button 
          className={`px-4 py-2 text-sm font-semibold uppercase rounded-md focus:outline-none focus:ring-2 focus:ring-secondary ${
            selectedYear === '2025' 
              ? 'bg-secondary text-gray-900'
              : 'text-gray-600'
          }`}
          onClick={() => onYearChange('2025')}
        >
          2025
        </button>
        <button 
          className={`px-4 py-2 text-sm font-semibold uppercase rounded-md focus:outline-none focus:ring-2 focus:ring-secondary ${
            selectedYear === '2026' 
              ? 'bg-secondary text-gray-900'
              : 'text-gray-600'
          }`}
          onClick={() => onYearChange('2026')}
        >
          2026
        </button>
      </div>
    </div>
  );
};

export default YearSelector;

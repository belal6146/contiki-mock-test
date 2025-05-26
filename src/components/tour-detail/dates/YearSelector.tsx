
import React from 'react';

interface YearSelectorProps {
  selectedYear: string;
  onYearChange: (year: string) => void;
}

const YearSelector: React.FC<YearSelectorProps> = ({ selectedYear, onYearChange }) => {
  return (
    <div className="flex justify-center mb-8">
      <div className="flex bg-gray-100 rounded-full p-1">
        <button 
          className={`px-8 py-2 rounded-full font-semibold transition-colors ${
            selectedYear === '2025' 
              ? 'bg-black text-white' 
              : 'bg-transparent text-gray-600 hover:bg-gray-200'
          }`}
          onClick={() => onYearChange('2025')}
        >
          2025
        </button>
        <button 
          className={`px-8 py-2 rounded-full font-semibold transition-colors ${
            selectedYear === '2026' 
              ? 'bg-black text-white' 
              : 'bg-transparent text-gray-600 hover:bg-gray-200'
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

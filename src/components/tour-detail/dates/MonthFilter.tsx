
import React from 'react';

interface MonthFilterProps {
  months: { id: string; label: string }[];
  selectedMonth: string;
  onMonthChange: (month: string) => void;
}

const MonthFilter: React.FC<MonthFilterProps> = ({ months, selectedMonth, onMonthChange }) => {
  return (
    <div className="flex items-center justify-center mb-8 overflow-x-auto">
      <div className="flex space-x-2">
        {months.map((month) => (
          <button
            key={month.id}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedMonth === month.id
                ? 'bg-[rgb(204,255,0)] text-black'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            onClick={() => onMonthChange(month.id)}
          >
            {month.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MonthFilter;

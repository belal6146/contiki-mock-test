
import React from 'react';

interface MonthFilterProps {
  months: { id: string; label: string; }[];
  selectedMonth: string;
  onMonthChange: (month: string) => void;
}

const MonthFilter: React.FC<MonthFilterProps> = ({ months, selectedMonth, onMonthChange }) => {
  return (
    <div className="mb-8 w-full overflow-x-auto">
      <div className="flex justify-center gap-2 min-w-max">
        {months.map(month => (
          <button
            key={month.id}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
              selectedMonth === month.id
                ? 'bg-[#CCFF00] text-black shadow-md'
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

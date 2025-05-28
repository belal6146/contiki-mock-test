import React from 'react';

interface MonthFilterProps {
  months: { id: string; label: string }[];
  selectedMonth: string;
  onMonthChange: (month: string) => void;
}

const MonthFilter: React.FC<MonthFilterProps> = ({ months, selectedMonth, onMonthChange }) => {
  return (
    <div className="flex items-center justify-center mb-8 overflow-x-auto">
      <ul className="flex flex-wrap gap-2">
        {months.map((month) => (
          <li key={month.id}>
            <button
              key={month.id}
              className={`
                px-3 py-1 text-xs font-medium uppercase rounded-full focus:outline-none focus:ring-2 focus:ring-secondary ${
                  selectedMonth === month.id
                    ? 'bg-secondary text-gray-900'
                    : 'bg-lightBg text-gray-600 hover:bg-gray-200'
                }`}
              onClick={() => onMonthChange(month.id)}
            >
              {month.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MonthFilter;


import React from 'react';
import { cn } from '@/lib/utils';

interface MonthOption {
  code: string;
  active: boolean;
}

interface MonthFilterProps {
  months: MonthOption[];
  selectedMonth: string;
  onMonthChange: (month: string) => void;
}

const MonthFilter: React.FC<MonthFilterProps> = ({ months, selectedMonth, onMonthChange }) => {
  return (
    <div className="mb-6">
      <p className="text-sm font-medium mb-2">Select Month</p>
      <div className="flex flex-wrap gap-2">
        {months.map((month) => (
          <button
            key={month.code}
            disabled={!month.active}
            onClick={() => month.active && onMonthChange(month.code)}
            className={cn(
              "h-10 px-4 py-2 rounded-full text-sm font-medium transition-colors tracking-wide",
              month.active && selectedMonth === month.code 
                ? "bg-accent text-black" 
                : month.active 
                  ? "bg-white border border-gray-200 hover:bg-gray-50" 
                  : "bg-gray-100 text-gray-300 cursor-not-allowed"
            )}
          >
            {month.code}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MonthFilter;

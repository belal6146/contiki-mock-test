
import React from 'react';
import { Grid, List } from 'lucide-react';
import { MonthFilter, TripTypeFilter, MONTHS, TRIP_TYPES } from './index';

interface FiltersSectionProps {
  selectedMonth: string;
  selectedTypes: string[];
  viewMode: 'grid' | 'list';
  onMonthChange: (month: string) => void;
  onTypeToggle: (type: string) => void;
  onViewModeChange: (mode: 'grid' | 'list') => void;
}

const FiltersSection: React.FC<FiltersSectionProps> = ({
  selectedMonth,
  selectedTypes,
  viewMode,
  onMonthChange,
  onTypeToggle,
  onViewModeChange
}) => {
  return (
    <>
      {/* Month Filter Pills */}
      <MonthFilter 
        months={MONTHS} 
        selectedMonth={selectedMonth}
        onMonthChange={onMonthChange}
      />

      {/* Trip Type Filters and View Toggle */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-700">Trip Type</span>
          <span className="text-gray-400">ⓘ</span>
          <TripTypeFilter 
            types={TRIP_TYPES}
            selectedTypes={selectedTypes}
            onTypeToggle={onTypeToggle}
          />
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-gray-700">View:</span>
          <div className="flex bg-gray-100 rounded-md overflow-hidden">
            <button 
              className={`p-2 flex items-center justify-center transition-colors ${
                viewMode === 'grid' 
                  ? 'bg-[rgb(204,255,0)] text-black' 
                  : 'bg-transparent text-gray-600 hover:bg-gray-200'
              }`}
              onClick={() => onViewModeChange('grid')}
            >
              <Grid size={18} />
            </button>
            <button 
              className={`p-2 flex items-center justify-center transition-colors ${
                viewMode === 'list' 
                  ? 'bg-[rgb(204,255,0)] text-black' 
                  : 'bg-transparent text-gray-600 hover:bg-gray-200'
              }`}
              onClick={() => onViewModeChange('list')}
            >
              <List size={18} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FiltersSection;

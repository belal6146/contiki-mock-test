
import React, { useEffect, useState } from 'react';
import { Trip } from '@/types/trip';
import { TooltipProvider } from '@/components/ui/tooltip';
import { 
  DepartureOption,
  TRIP_TYPES,
  generateDepartureOptions
} from './dates';
import { ConsentManagerProvider } from '@/context/ConsentManager';
import YearSelector from './dates/YearSelector';
import FiltersSection from './dates/FiltersSection';
import ActiveFilters from './dates/ActiveFilters';
import ResultsSummary from './dates/ResultsSummary';
import { mockBookingData } from './dates/mockData';

interface TourDatesTabProps {
  trip: Trip;
}

const TourDatesTab: React.FC<TourDatesTabProps> = ({ trip }) => {
  const [selectedMonth, setSelectedMonth] = useState<string>('MAY');
  const [selectedTypes, setSelectedTypes] = useState<string[]>(['plus']);
  const [openOptionId, setOpenOptionId] = useState<string | null>(null);
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({});
  const [selectedYear, setSelectedYear] = useState<string>('2025');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  // Generate departure options
  const options = generateDepartureOptions(trip);
  
  useEffect(() => {
    console.debug('[DatesPricing] mounted');
  }, []);
  
  const handleMonthChange = (month: string) => {
    setSelectedMonth(month);
    console.debug('[DatesPricing] filterChanged', { month, types: selectedTypes });
  };
  
  const handleTypeToggle = (type: string) => {
    setSelectedTypes(prev => {
      const newTypes = prev.includes(type) 
        ? prev.filter(t => t !== type) 
        : [...prev, type];
      
      console.debug('[DatesPricing] filterChanged', { month: selectedMonth, types: newTypes });
      return newTypes;
    });
  };
  
  const toggleOption = (id: string) => {
    setOpenOptionId(prev => prev === id ? null : id);
    console.debug('[DatesPricing] toggleOption', id);
    
    // Set default variant when opening
    if (openOptionId !== id) {
      const option = options.find(opt => opt.id === id);
      if (option && !selectedVariants[id]) {
        setSelectedVariants(prev => ({
          ...prev,
          [id]: option.variants[0].id
        }));
      }
    }
  };
  
  const selectVariant = (optionId: string, variantId: string) => {
    setSelectedVariants(prev => ({
      ...prev,
      [optionId]: variantId
    }));
    console.debug('[DatesPricing] variantSelected', { optionId, variant: variantId });
  };
  
  const handleBookByPhone = (optionId: string) => {
    console.debug('[DatesPricing] bookByPhone', { 
      optionId, 
      variant: selectedVariants[optionId] 
    });
  };
  
  const handleRequestInfo = (optionId: string) => {
    console.debug('[DatesPricing] requestInfo', { 
      optionId, 
      variant: selectedVariants[optionId] 
    });
  };
  
  // Create type label lookup for options display
  const tripTypeLabels: Record<string, string> = {};
  TRIP_TYPES.forEach(type => {
    tripTypeLabels[type.id] = type.label;
  });
  
  return (
    <ConsentManagerProvider>
      <TooltipProvider>
        <div className="bg-white">
          <div className="container py-8">
            <div className="max-w-5xl mx-auto">
              {/* Year Selection */}
              <YearSelector 
                selectedYear={selectedYear}
                onYearChange={setSelectedYear}
              />

              {/* Filters Section */}
              <FiltersSection
                selectedMonth={selectedMonth}
                selectedTypes={selectedTypes}
                viewMode={viewMode}
                onMonthChange={handleMonthChange}
                onTypeToggle={handleTypeToggle}
                onViewModeChange={setViewMode}
              />

              {/* Active Filters Display */}
              <ActiveFilters
                selectedMonth={selectedMonth}
                selectedTypes={selectedTypes}
                tripTypeLabels={tripTypeLabels}
                onTypeToggle={handleTypeToggle}
              />

              {/* Results Summary */}
              <ResultsSummary optionsCount={options.length} />

              {/* Departure Options */}
              <div className="space-y-0 mb-10">
                {options.map((option) => (
                  <DepartureOption
                    key={option.id}
                    option={option}
                    isOpen={openOptionId === option.id}
                    selectedVariant={selectedVariants[option.id] || null}
                    onToggle={toggleOption}
                    onVariantSelect={selectVariant}
                    onBookByPhone={handleBookByPhone}
                    onRequestInfo={handleRequestInfo}
                    tripTypeLabels={tripTypeLabels}
                    passengers={mockBookingData}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </TooltipProvider>
    </ConsentManagerProvider>
  );
};

export default TourDatesTab;

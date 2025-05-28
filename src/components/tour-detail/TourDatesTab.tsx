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

              {/* Load More Button */}
              <button className="mx-auto block px-8 py-3 border border-gray-300 rounded-full text-sm font-semibold uppercase text-gray-900 hover:bg-gray-100">
                Load More
              </button>
            </div>
          </div>
        </div>
        
        {/* Bottom Feature Banner */}
        <section className="bg-lightBg py-8">
          <div className="max-w-screen-xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex flex-col items-center space-y-2">
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-900"><circle cx="12" cy="12" r="10"/><path d="M16 8h-2a2 2 0 0 0-2 2v4a2 2 0 0 1-2 2h-2"/><path d="M7 17l1-1"/><path d="M17 7l-1 1"/></svg>
              </div>
              <p className="text-sm font-medium text-gray-900">Only £60 deposit to book</p>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-900"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
              </div>
              <p className="text-sm font-medium text-gray-900">Pay overtime, interest free</p>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-900"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>
              </div>
              <p className="text-sm font-medium text-gray-900">No booking fee, no change fee</p>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-900"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/></svg>
              </div>
              <p className="text-sm font-medium text-gray-900">FlexDeposit options</p>
            </div>
          </div>
        </section>
      </TooltipProvider>
    </ConsentManagerProvider>
  );
};

export default TourDatesTab;

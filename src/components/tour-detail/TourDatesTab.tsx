
"use client";

import React, { useEffect, useState } from 'react';
import { Trip } from '@/types/trip';
import { TooltipProvider } from '@/components/ui/tooltip';
import { 
  MonthFilter,
  TripTypeFilter,
  DepartureOption,
  MONTHS,
  TRIP_TYPES,
  getTripTypeLabel,
  generateDepartureOptions
} from './dates';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

interface TourDatesTabProps {
  trip: Trip;
}

const TourDatesTab: React.FC<TourDatesTabProps> = ({ trip }) => {
  const [selectedMonth, setSelectedMonth] = useState<string>('MAY');
  const [selectedTypes, setSelectedTypes] = useState<string[]>(['plus']);
  const [openOptionId, setOpenOptionId] = useState<string | null>(null);
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({});
  const [selectedYear, setSelectedYear] = useState<string>('2025');
  
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
    <TooltipProvider>
      <div className="bg-white">
        <div className="container py-8">
          <div className="flex justify-center mb-8">
            <ToggleGroup type="single" value={selectedYear} onValueChange={(value) => value && setSelectedYear(value)}>
              <ToggleGroupItem value="2025" className="bg-black text-white rounded-l-full px-6 py-2">
                2025
              </ToggleGroupItem>
              <ToggleGroupItem value="2026" className="bg-white text-black border border-gray-300 rounded-r-full px-6 py-2">
                2026
              </ToggleGroupItem>
            </ToggleGroup>
          </div>

          {/* Month Filter Pills */}
          <MonthFilter 
            months={MONTHS} 
            selectedMonth={selectedMonth}
            onMonthChange={handleMonthChange}
          />

          {/* Trip Type Filters */}
          <div className="flex items-start gap-6">
            <div className="flex-1">
              <TripTypeFilter 
                types={TRIP_TYPES}
                selectedTypes={selectedTypes}
                onTypeToggle={handleTypeToggle}
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">View:</span>
              <div className="flex border border-gray-200 rounded-md overflow-hidden">
                <button className="bg-black text-white p-2 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="9" y1="3" x2="9" y2="21"></line>
                    <line x1="15" y1="3" x2="15" y2="21"></line>
                    <line x1="3" y1="9" x2="21" y2="9"></line>
                    <line x1="3" y1="15" x2="21" y2="15"></line>
                  </svg>
                </button>
                <button className="bg-white p-2 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="8" y1="6" x2="21" y2="6"></line>
                    <line x1="8" y1="12" x2="21" y2="12"></line>
                    <line x1="8" y1="18" x2="21" y2="18"></line>
                    <line x1="3" y1="6" x2="3.01" y2="6"></line>
                    <line x1="3" y1="12" x2="3.01" y2="12"></line>
                    <line x1="3" y1="18" x2="3.01" y2="18"></line>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Departure Options */}
          <div className="space-y-4 mt-6">
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
              />
            ))}
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default TourDatesTab;


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

interface TourDatesTabProps {
  trip: Trip;
}

const TourDatesTab: React.FC<TourDatesTabProps> = ({ trip }) => {
  const [selectedMonth, setSelectedMonth] = useState<string>('MAY');
  const [selectedTypes, setSelectedTypes] = useState<string[]>(['plus']);
  const [openOptionId, setOpenOptionId] = useState<string | null>(null);
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({});
  
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
          <h2 className="text-2xl font-bold mb-6">Dates & Pricing</h2>
          <p className="text-gray-600 mb-8">Select your preferred departure date to see available options.</p>

          {/* Month Filter Pills */}
          <MonthFilter 
            months={MONTHS} 
            selectedMonth={selectedMonth}
            onMonthChange={handleMonthChange}
          />

          {/* Trip Type Filters */}
          <TripTypeFilter 
            types={TRIP_TYPES}
            selectedTypes={selectedTypes}
            onTypeToggle={handleTypeToggle}
          />

          {/* Departure Options */}
          <div className="space-y-4">
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

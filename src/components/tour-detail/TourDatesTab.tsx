
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
import { Grid, List } from 'lucide-react';
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
    <TooltipProvider>
      <div className="bg-white">
        <div className="container py-8">
          {/* Year Selection */}
          <div className="flex justify-center mb-8">
            <div className="bg-gray-100 rounded-full p-1">
              <ToggleGroup type="single" value={selectedYear} onValueChange={(value) => value && setSelectedYear(value)} className="gap-0">
                <ToggleGroupItem 
                  value="2025" 
                  className="bg-black text-white rounded-full px-8 py-2 font-semibold data-[state=on]:bg-black data-[state=on]:text-white"
                >
                  2025
                </ToggleGroupItem>
                <ToggleGroupItem 
                  value="2026" 
                  className="bg-transparent text-gray-600 rounded-full px-8 py-2 font-semibold data-[state=on]:bg-black data-[state=on]:text-white hover:bg-gray-200"
                >
                  2026
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
          </div>

          {/* Month Filter Pills */}
          <MonthFilter 
            months={MONTHS} 
            selectedMonth={selectedMonth}
            onMonthChange={handleMonthChange}
          />

          {/* Trip Type Filters and View Toggle */}
          <div className="flex items-center justify-between gap-6 mb-6">
            <div className="flex-1">
              <TripTypeFilter 
                types={TRIP_TYPES}
                selectedTypes={selectedTypes}
                onTypeToggle={handleTypeToggle}
              />
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-700">View:</span>
              <div className="flex bg-gray-100 rounded-md overflow-hidden">
                <button 
                  className={`p-2 flex items-center justify-center transition-colors ${
                    viewMode === 'grid' 
                      ? 'bg-black text-white' 
                      : 'bg-transparent text-gray-600 hover:bg-gray-200'
                  }`}
                  onClick={() => setViewMode('grid')}
                >
                  <Grid size={18} />
                </button>
                <button 
                  className={`p-2 flex items-center justify-center transition-colors ${
                    viewMode === 'list' 
                      ? 'bg-black text-white' 
                      : 'bg-transparent text-gray-600 hover:bg-gray-200'
                  }`}
                  onClick={() => setViewMode('list')}
                >
                  <List size={18} />
                </button>
              </div>
            </div>
          </div>

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

          {/* Load More Button */}
          <div className="flex justify-center mt-8">
            <button className="px-8 py-3 border-2 border-gray-300 rounded-full font-bold text-gray-700 hover:bg-gray-50 transition-colors">
              LOAD MORE
            </button>
          </div>
        </div>

        {/* FlexDeposit Banner */}
        <div className="py-16 bg-gray-50">
          <div className="container">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              <div className="flex items-center gap-4">
                <div className="bg-orange-500 rounded-full w-16 h-16 flex items-center justify-center shrink-0">
                  <span className="text-white text-2xl font-bold">£</span>
                </div>
                <div>
                  <p className="font-bold text-lg text-black">Only £60 deposit</p>
                  <p className="text-gray-600">to book</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="bg-orange-500 rounded-full w-16 h-16 flex items-center justify-center shrink-0">
                  <span className="text-white text-2xl font-bold">⏱</span>
                </div>
                <div>
                  <p className="font-bold text-lg text-black">Pay over time</p>
                  <p className="text-gray-600">interest free</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="bg-orange-500 rounded-full w-16 h-16 flex items-center justify-center shrink-0">
                  <span className="text-white text-2xl font-bold">✓</span>
                </div>
                <div>
                  <p className="font-bold text-lg text-black">No booking fee</p>
                  <p className="text-gray-600">no change fee</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="bg-orange-500 rounded-full w-16 h-16 flex items-center justify-center shrink-0">
                  <span className="text-white text-2xl font-bold">⚡</span>
                </div>
                <div>
                  <p className="font-bold text-lg text-black">FlexDeposit</p>
                  <p className="text-gray-600">options</p>
                </div>
              </div>
            </div>
            
            {/* Flexibility Promise banner */}
            <div className="bg-black text-white p-8 rounded-lg">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div>
                  <h3 className="text-3xl font-bold mb-3">Flexibility Promise</h3>
                  <p className="text-lg">
                    Your money is safe with us and the TTC Promise. Book today and enjoy the benefits of flexible travel dates and money guarantee.
                  </p>
                </div>
                <button 
                  className="mt-6 md:mt-0 border-2 border-white text-white hover:bg-white hover:text-black px-8 py-3 font-bold transition-all duration-200 ease-in-out rounded"
                >
                  FIND OUT MORE
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default TourDatesTab;

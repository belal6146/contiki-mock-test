
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
import { BookingPassenger } from '../tour/TravelersInfo';
import { ConsentManagerProvider } from '@/context/ConsentManager';

interface TourDatesTabProps {
  trip: Trip;
}

// Mock booking data - in a real app this would come from an API
const mockBookingData: BookingPassenger[] = [
  {
    id: 50123455,
    firstName: "Robert",
    lastName: "Smith",
    age: 39,
    gender: "Male",
    address: { 
      country: "United Kingdom",
      countryCode: "gb"
    },
    travelPassion: "Culinary experiences",
    numberOfTimesTravelledPreviously: 8,
    passengerId: 1
  },
  {
    id: 50123456,
    firstName: "Emily",
    lastName: "Johnson",
    age: 36,
    gender: "Female",
    address: { 
      country: "United Kingdom",
      countryCode: "gb"
    },
    travelPassion: "History and museums",
    numberOfTimesTravelledPreviously: 5,
    passengerId: 2
  }
];

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
              {/* Year Selection - updated to match Contiki style */}
              <div className="flex justify-center mb-8">
                <div className="flex bg-gray-100 rounded-full p-1">
                  <button 
                    className={`px-8 py-2 rounded-full font-semibold transition-colors ${
                      selectedYear === '2025' 
                        ? 'bg-black text-white' 
                        : 'bg-transparent text-gray-600 hover:bg-gray-200'
                    }`}
                    onClick={() => setSelectedYear('2025')}
                  >
                    2025
                  </button>
                  <button 
                    className={`px-8 py-2 rounded-full font-semibold transition-colors ${
                      selectedYear === '2026' 
                        ? 'bg-black text-white' 
                        : 'bg-transparent text-gray-600 hover:bg-gray-200'
                    }`}
                    onClick={() => setSelectedYear('2026')}
                  >
                    2026
                  </button>
                </div>
              </div>

              {/* Month Filter Pills - updated spacing */}
              <MonthFilter 
                months={MONTHS} 
                selectedMonth={selectedMonth}
                onMonthChange={handleMonthChange}
              />

              {/* Trip Type Filters and View Toggle */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-700">Trip Type</span>
                  <span className="text-gray-400">ⓘ</span>
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
                          ? 'bg-[rgb(204,255,0)] text-black' 
                          : 'bg-transparent text-gray-600 hover:bg-gray-200'
                      }`}
                      onClick={() => setViewMode('grid')}
                    >
                      <Grid size={18} />
                    </button>
                    <button 
                      className={`p-2 flex items-center justify-center transition-colors ${
                        viewMode === 'list' 
                          ? 'bg-[rgb(204,255,0)] text-black' 
                          : 'bg-transparent text-gray-600 hover:bg-gray-200'
                      }`}
                      onClick={() => setViewMode('list')}
                    >
                      <List size={18} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Active Filters Display */}
              <div className="flex flex-wrap items-center gap-2 mb-6">
                <span className="text-sm font-medium text-gray-700">Active filters:</span>
                <div className="bg-[rgb(204,255,0)] text-black px-3 py-1 rounded-full text-sm font-medium flex items-center">
                  {selectedMonth}
                  <button className="ml-2">
                    <span className="sr-only">Remove filter</span>
                    <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
                {selectedTypes.map(type => (
                  <div key={type} className="bg-[rgb(204,255,0)] text-black px-3 py-1 rounded-full text-sm font-medium flex items-center">
                    {tripTypeLabels[type]}
                    <button className="ml-2" onClick={() => handleTypeToggle(type)}>
                      <span className="sr-only">Remove filter</span>
                      <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>

              {/* Results Summary */}
              <div className="flex justify-between items-center mb-6">
                <p className="text-gray-600"><span className="font-medium">{options.length}</span> departure dates available</p>
                <div>
                  <select className="border-gray-300 rounded-md text-sm px-3 py-2 bg-white">
                    <option>Sort by date</option>
                    <option>Sort by price: low to high</option>
                    <option>Sort by price: high to low</option>
                  </select>
                </div>
              </div>

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

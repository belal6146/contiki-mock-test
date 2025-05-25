
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
import { Grid, List, Search, Calendar, Filter, Check } from 'lucide-react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { BookingPassenger } from '../tour/TravelersInfo';
import { ConsentManagerProvider } from '@/context/ConsentManager';
import { Input } from '@/components/ui/input';

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
    address: { country: "United Kingdom" },
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
    address: { country: "United Kingdom" },
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
  const [searchQuery, setSearchQuery] = useState<string>('');
  
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
          <div className="container py-10">
            <div className="max-w-5xl mx-auto">
              {/* Hero Banner for Dates & Pricing */}
              <div className="relative rounded-xl overflow-hidden mb-10">
                <img 
                  src="https://images.unsplash.com/photo-1550583724-b2692b85b150?q=80&w=2070&auto=format&fit=crop" 
                  alt="European Adventure" 
                  className="w-full h-56 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex items-center">
                  <div className="px-10">
                    <h2 className="text-white text-3xl font-bold mb-2">Dates & Pricing</h2>
                    <p className="text-white/90 max-w-md">Find your perfect departure date and the best prices for your next adventure.</p>
                  </div>
                </div>
              </div>

              {/* Search and Filter Bar */}
              <div className="bg-gray-50 p-5 rounded-lg mb-8 border border-gray-200">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input 
                      placeholder="Search by destination or trip name" 
                      className="pl-10 bg-white border-gray-300"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <div className="flex gap-2">
                    <button className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>Date</span>
                    </button>
                    <button className="inline-flex items-center px-4 py-2 bg-[rgb(204,255,0)] text-black rounded-md hover:bg-[rgb(184,230,0)] transition-colors">
                      <Filter className="h-4 w-4 mr-2" />
                      <span>Apply Filters</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Year Selection */}
              <div className="flex justify-center mb-10">
                <div className="bg-gray-100 rounded-full p-1">
                  <ToggleGroup type="single" value={selectedYear} onValueChange={(value) => value && setSelectedYear(value)} className="gap-0">
                    <ToggleGroupItem 
                      value="2025" 
                      className="bg-[rgb(204,255,0)] text-black rounded-full px-10 py-2.5 font-semibold data-[state=on]:bg-[rgb(204,255,0)] data-[state=on]:text-black"
                    >
                      2025
                    </ToggleGroupItem>
                    <ToggleGroupItem 
                      value="2026" 
                      className="bg-transparent text-gray-600 rounded-full px-10 py-2.5 font-semibold data-[state=on]:bg-[rgb(204,255,0)] data-[state=on]:text-black hover:bg-gray-200"
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
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
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

              {/* Selected Filters Display */}
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
                  <div key={type} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium flex items-center">
                    {tripTypeLabels[type]}
                    <button className="ml-2" onClick={() => handleTypeToggle(type)}>
                      <span className="sr-only">Remove filter</span>
                      <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                ))}
                <button className="text-sm text-[rgb(204,255,0)] font-medium hover:text-[rgb(184,230,0)]">Clear all</button>
              </div>

              {/* Results Summary */}
              <div className="flex justify-between items-center mb-6">
                <p className="text-gray-600"><span className="font-medium">{options.length}</span> departure dates available</p>
                <div>
                  <select className="border-gray-300 rounded-md text-sm px-2 py-1">
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

              {/* Load More Button */}
              <div className="flex justify-center mt-10">
                <button className="px-8 py-3 border-2 border-[rgb(204,255,0)] rounded-full font-bold text-black bg-[rgb(204,255,0)] hover:bg-[rgb(184,230,0)] transition-colors">
                  LOAD MORE DATES
                </button>
              </div>
            </div>
          </div>

          {/* FlexDeposit Banner */}
          <div className="py-20 bg-gray-50 mt-10">
            <div className="container">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                <div className="flex items-center gap-5">
                  <div className="bg-[rgb(204,255,0)] rounded-full w-16 h-16 flex items-center justify-center shrink-0">
                    <span className="text-black text-2xl font-bold">£</span>
                  </div>
                  <div>
                    <p className="font-bold text-lg text-black">Only £60 deposit</p>
                    <p className="text-gray-600">to secure your booking</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-5">
                  <div className="bg-[rgb(204,255,0)] rounded-full w-16 h-16 flex items-center justify-center shrink-0">
                    <span className="text-black text-2xl font-bold">⏱</span>
                  </div>
                  <div>
                    <p className="font-bold text-lg text-black">Pay over time</p>
                    <p className="text-gray-600">interest-free payments</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-5">
                  <div className="bg-[rgb(204,255,0)] rounded-full w-16 h-16 flex items-center justify-center shrink-0">
                    <span className="text-black text-2xl font-bold">✓</span>
                  </div>
                  <div>
                    <p className="font-bold text-lg text-black">No booking fees</p>
                    <p className="text-gray-600">no change fees</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-5">
                  <div className="bg-[rgb(204,255,0)] rounded-full w-16 h-16 flex items-center justify-center shrink-0">
                    <span className="text-black text-2xl font-bold">⚡</span>
                  </div>
                  <div>
                    <p className="font-bold text-lg text-black">FlexDeposit</p>
                    <p className="text-gray-600">change dates or trips</p>
                  </div>
                </div>
              </div>
              
              {/* Flexibility Promise banner */}
              <div className="bg-black text-white p-8 rounded-lg bg-[url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center">
                <div className="bg-black/60 rounded-lg p-8">
                  <div className="flex flex-col md:flex-row justify-between items-center">
                    <div>
                      <h3 className="text-3xl font-bold mb-3">Flexibility Promise</h3>
                      <p className="text-lg max-w-xl">
                        Your money is safe with us and the TTC Promise. Book today and enjoy the benefits of flexible travel dates and money-back guarantee.
                      </p>
                    </div>
                    <button 
                      className="mt-6 md:mt-0 bg-[rgb(204,255,0)] text-black px-8 py-3 font-bold transition-all duration-200 ease-in-out rounded hover:bg-[rgb(184,230,0)]"
                    >
                      FIND OUT MORE
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </TooltipProvider>
    </ConsentManagerProvider>
  );
};

export default TourDatesTab;

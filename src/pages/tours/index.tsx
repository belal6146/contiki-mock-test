
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTrips } from '@/hooks/useTrips';
import { debounce } from '@/lib/utils';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TripCard from '@/components/TripCard';
import { Input } from '@/components/ui/input';

const Tours = () => {
  const location = useLocation();
  
  // Parse query parameters
  const queryParams = new URLSearchParams(location.search);
  const initialDestination = queryParams.get('destination') || '';
  const initialDate = queryParams.get('date') || '';
  const initialTravelers = parseInt(queryParams.get('travelers') || '1', 10);
  
  // Set up filter state
  const [filters, setFilters] = useState({
    destination: initialDestination,
    date: initialDate,
    travelers: initialTravelers,
  });
  
  // Set up debounced filter update
  const debouncedFilterUpdate = debounce((newFilters: typeof filters) => {
    console.debug('[TripListing] filtersChanged', { filters: newFilters });
    setFilters(newFilters);
  }, 300);
  
  // Fetch trips based on filters
  const { trips, loading, error } = useTrips({
    destination: filters.destination || undefined,
    // Add additional filter params as needed
  });
  
  useEffect(() => {
    console.debug('[TripListing] mounted', { filters });
  }, []);
  
  const handleDestinationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFilters = { ...filters, destination: e.target.value };
    debouncedFilterUpdate(newFilters);
  };
  
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFilters = { ...filters, date: e.target.value };
    debouncedFilterUpdate(newFilters);
  };
  
  const handleTravelersChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFilters = { ...filters, travelers: parseInt(e.target.value, 10) };
    debouncedFilterUpdate(newFilters);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container py-8">
        <h1 className="heading-lg mb-6">Find Your Perfect Trip</h1>
        
        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="heading-md mb-4">Filter Trips</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="destination" className="block text-sm font-medium text-gray-700 mb-1">
                Destination
              </label>
              <Input
                id="destination"
                type="text"
                placeholder="Where to?"
                value={filters.destination}
                onChange={handleDestinationChange}
              />
            </div>
            
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                Date
              </label>
              <Input
                id="date"
                type="date"
                value={filters.date}
                onChange={handleDateChange}
              />
            </div>
            
            <div>
              <label htmlFor="travelers" className="block text-sm font-medium text-gray-700 mb-1">
                Travelers
              </label>
              <Input
                id="travelers"
                type="number"
                min="1"
                value={filters.travelers}
                onChange={handleTravelersChange}
              />
            </div>
          </div>
        </div>
        
        {/* Results */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        )}
        
        {error && (
          <div className="bg-red-50 p-4 rounded-md text-red-500 mb-6">
            Error loading trips: {error}
          </div>
        )}
        
        {!loading && !error && (
          <>
            <p className="mb-4 text-gray-600">{trips.length} trips found</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {trips.map((trip) => (
                <TripCard
                  key={trip.id}
                  id={trip.id}
                  title={trip.name}
                  region={trip.destination}
                  price={trip.price}
                />
              ))}
            </div>
            
            {trips.length === 0 && (
              <div className="text-center py-12">
                <p className="text-lg text-gray-600">No trips found matching your criteria.</p>
                <p className="mt-2">Try adjusting your filters.</p>
              </div>
            )}
          </>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Tours;

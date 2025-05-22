
import React, { useState, useEffect, lazy, Suspense } from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useTrips } from '@/hooks/useTrips';
import { debounce } from '@/lib/utils';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { trackPageView, trackEvent } from '@/lib/analytics';
import BackToTopButton from '@/components/BackToTopButton';
import HelpButton from '@/components/home/HelpButton';

// Lazy load the TripCard component
const TripCard = lazy(() => import('@/components/TripCard'));

const Tours = () => {
  const location = useLocation();
  
  // Parse query parameters
  const queryParams = new URLSearchParams(location.search);
  const initialDestination = queryParams.get('destination') || '';
  const initialYear = queryParams.get('year') || new Date().getFullYear().toString();
  const initialTravelers = parseInt(queryParams.get('travelers') || '1', 10);
  
  // Set up filter state
  const [filters, setFilters] = useState({
    destination: initialDestination,
    year: initialYear,
    travelers: initialTravelers,
  });
  
  const [currentPage, setCurrentPage] = useState(1);
  const tripsPerPage = 9;
  
  // Set up debounced filter update
  const debouncedFilterUpdate = debounce((newFilters: typeof filters) => {
    trackEvent('tours_filter_change', { filters: newFilters });
    setFilters(newFilters);
    setCurrentPage(1); // Reset page when filters change
  }, 300);
  
  // Fetch trips based on filters
  const { trips, loading, error } = useTrips({
    destination: filters.destination || undefined,
    // Add additional filter params as needed
  });
  
  useEffect(() => {
    trackPageView(window.location.pathname + location.search);
    console.debug('[TripListing] mounted');
  }, [location.pathname, location.search]);
  
  const handleDestinationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFilters = { ...filters, destination: e.target.value };
    debouncedFilterUpdate(newFilters);
    console.debug('[TripListing] filtersChanged', { filters: newFilters });
  };
  
  const handleYearChange = (year: string) => {
    const newFilters = { ...filters, year };
    debouncedFilterUpdate(newFilters);
    console.debug('[TripListing] filtersChanged', { filters: newFilters });
  };
  
  const handleTravelersChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const travelers = parseInt(e.target.value, 10);
    const newFilters = { ...filters, travelers: isNaN(travelers) ? 1 : travelers };
    debouncedFilterUpdate(newFilters);
    console.debug('[TripListing] filtersChanged', { filters: newFilters });
  };
  
  const handleLoadMore = () => {
    setCurrentPage(prev => prev + 1);
    console.debug('[TripListing] loadMore', { newPage: currentPage + 1 });
    trackEvent('load_more_trips', { page: currentPage + 1 });
  };
  
  // Calculate total number of trips to display
  const displayedTrips = trips.slice(0, currentPage * tripsPerPage);
  const hasMore = displayedTrips.length < trips.length;
  
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Helmet>
        <title>Find Your Perfect Trip | Contiki Tours</title>
        <meta name="description" content="Explore our range of trips for 18-35 year olds. Filter by destination, date, and number of travelers to find your perfect adventure." />
        <meta name="keywords" content="contiki tours, travel packages, young adult travel, group travel" />
        
        {/* Open Graph / Social Media */}
        <meta property="og:title" content="Find Your Perfect Trip | Contiki Tours" />
        <meta property="og:description" content="Explore our range of trips for 18-35 year olds. Filter by destination, date, and number of travelers to find your perfect adventure." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.contiki.com/tours-og-image.jpg" />
        <meta property="og:url" content="https://www.contiki.com/tours" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://www.contiki.com/tours" />
      </Helmet>
      
      <Header />
      
      {/* Filter Bar */}
      <div className="sticky top-16 z-30 bg-gray-100 shadow-sm">
        <div className="container py-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <label htmlFor="destination" className="block text-sm font-medium text-gray-700 mb-1">
                Destination
              </label>
              <Input
                id="destination"
                type="text"
                placeholder="Where to?"
                value={filters.destination}
                onChange={handleDestinationChange}
                className="w-full transition-all duration-150 ease-in-out focus:ring-accent"
                aria-label="Filter by destination"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Year
              </label>
              <div className="flex rounded-md overflow-hidden border border-gray-300">
                <button
                  className={`flex-1 py-2 px-4 ${filters.year === '2025' ? 'bg-[#CCFF00] text-black' : 'bg-white text-gray-700'}`}
                  onClick={() => handleYearChange('2025')}
                >
                  2025
                </button>
                <button
                  className={`flex-1 py-2 px-4 ${filters.year === '2026' ? 'bg-[#CCFF00] text-black' : 'bg-white text-gray-700'}`}
                  onClick={() => handleYearChange('2026')}
                >
                  2026
                </button>
              </div>
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
                className="w-full transition-all duration-150 ease-in-out focus:ring-accent"
                aria-label="Number of travelers"
              />
            </div>
          </div>
          
          <div className="mt-4 flex justify-end">
            <Button 
              className="bg-[#CCFF00] text-black hover:bg-[#CCFF00]/90"
              onClick={() => {
                console.debug('[TripListing] searchClicked', { filters });
                trackEvent('search_trips', { filters });
              }}
            >
              Search Trips
            </Button>
          </div>
        </div>
      </div>
      
      <main className="flex-grow container py-8">
        <h1 className="text-3xl font-bold mb-2">Find Your Perfect Trip</h1>
        <p className="text-gray-600 mb-6">Discover adventures crafted for 18-35s across the globe</p>
        
        {/* Results */}
        {loading && (
          <div className="flex justify-center items-center py-12" aria-live="polite" aria-busy="true">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#CCFF00]" role="status">
              <span className="sr-only">Loading trips...</span>
            </div>
          </div>
        )}
        
        {error && (
          <div className="bg-red-50 p-4 rounded-md text-red-500 mb-6" role="alert" aria-live="assertive">
            Error loading trips: {error}
          </div>
        )}
        
        {!loading && !error && (
          <>
            <p className="mb-4 text-gray-600" aria-live="polite">{trips.length} trips found</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Suspense fallback={<div className="col-span-full flex justify-center py-12"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#CCFF00]"></div></div>}>
                {displayedTrips.map((trip) => (
                  <TripCard
                    key={trip.id}
                    id={trip.id}
                    slug={trip.slug}
                    title={trip.name}
                    region={trip.destination}
                    price={trip.price}
                    oldPrice={trip.oldPrice}
                    duration={trip.duration}
                    countries={1}
                    image={trip.image}
                    isSpotlight={trip.rating >= 4.5}
                    discountPercentage={trip.discountPercentage}
                  />
                ))}
              </Suspense>
            </div>
            
            {trips.length === 0 && (
              <div className="text-center py-12" role="status" aria-live="polite">
                <p className="text-lg text-gray-600">No trips found matching your criteria.</p>
                <p className="mt-2">Try adjusting your filters.</p>
              </div>
            )}
            
            {/* Load More Button */}
            {hasMore && (
              <div className="flex justify-center mt-8">
                <Button 
                  variant="outline"
                  onClick={handleLoadMore}
                  className="px-6 py-2 border-2 border-black text-black hover:bg-black hover:text-white transition-colors"
                >
                  Load More Trips
                </Button>
              </div>
            )}
          </>
        )}
      </main>
      
      <Footer />
      <BackToTopButton />
      <HelpButton />
    </div>
  );
};

export default Tours;

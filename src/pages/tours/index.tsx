import React, { useState, useEffect, lazy, Suspense } from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useTrips } from '@/hooks/useTrips';
import { debounce } from '@/lib/utils';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Input } from '@/components/ui/input';
import { trackPageView, trackEvent } from '@/lib/analytics';

// Lazy load the TripCard component
const TripCard = lazy(() => import('@/components/TripCard'));

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
    trackEvent('tours_filter_change', { filters: newFilters });
    setFilters(newFilters);
  }, 300);
  
  // Fetch trips based on filters
  const { trips, loading, error } = useTrips({
    destination: filters.destination || undefined,
    // Add additional filter params as needed
  });
  
  useEffect(() => {
    trackPageView(window.location.pathname + location.search);
  }, [location.pathname, location.search]);
  
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
        
        {/* JSON-LD for Tour Listing */}
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "Contiki Tours",
            "description": "Explore our range of trips for 18-35 year olds",
            "url": "https://www.contiki.com/tours",
            "provider": {
              "@type": "Organization",
              "name": "Contiki",
              "url": "https://www.contiki.com"
            }
          }
        `}</script>
      </Helmet>
      
      <Header />
      
      <main className="flex-grow container py-8">
        <h1 className="heading-lg mb-6">Find Your Perfect Trip</h1>
        
        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8" aria-labelledby="filter-heading">
          <h2 id="filter-heading" className="heading-md mb-4">Filter Trips</h2>
          
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
                className="transition-all duration-150 ease-in-out focus:ring-accent"
                aria-label="Filter by destination"
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
                className="transition-all duration-150 ease-in-out focus:ring-accent"
                aria-label="Filter by date"
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
                className="transition-all duration-150 ease-in-out focus:ring-accent"
                aria-label="Number of travelers"
              />
            </div>
          </div>
        </div>
        
        {/* Results */}
        {loading && (
          <div className="flex justify-center items-center py-12" aria-live="polite" aria-busy="true">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" role="status">
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
              <Suspense fallback={<div className="col-span-full flex justify-center py-12"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div></div>}>
                {trips.map((trip) => (
                  <TripCard
                    key={trip.id}
                    id={trip.id}
                    title={trip.name}
                    region={trip.destination}
                    price={trip.price}
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
          </>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Tours;

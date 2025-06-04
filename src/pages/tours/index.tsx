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
    month: '',
    tripType: '',
  });
  
  const [currentPage, setCurrentPage] = useState(1);
  const tripsPerPage = 9;
  const [viewType, setViewType] = useState<'grid' | 'list'>('grid');
  
  // Set up debounced filter update
  const debouncedFilterUpdate = debounce((newFilters: typeof filters) => {
    trackEvent('tours_filter_change', { filters: newFilters });
    setFilters(newFilters);
    setCurrentPage(1);
  }, 300);
  
  // Fetch trips based on filters
  const { trips, loading, error } = useTrips({
    destination: filters.destination || undefined,
    year: filters.year || undefined,
    month: filters.month || undefined,
    tripType: filters.tripType || undefined,
  });
  
  useEffect(() => {
    trackPageView(window.location.pathname + location.search);
  }, [location.pathname, location.search]);
  
  const handleDestinationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFilters = { ...filters, destination: e.target.value };
    debouncedFilterUpdate(newFilters);
  };
  
  const handleYearChange = (year: string) => {
    const newFilters = { ...filters, year };
    debouncedFilterUpdate(newFilters);
  };

  const handleMonthChange = (month: string) => {
    const newFilters = { ...filters, month };
    debouncedFilterUpdate(newFilters);
  };

  const handleTripTypeChange = (tripType: string) => {
    const newFilters = { ...filters, tripType };
    debouncedFilterUpdate(newFilters);
  };
  
  const handleTravelersChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const travelers = parseInt(e.target.value, 10);
    const newFilters = { ...filters, travelers: isNaN(travelers) ? 1 : travelers };
    debouncedFilterUpdate(newFilters);
  };
  
  const handleLoadMore = () => {
    setCurrentPage(prev => prev + 1);
    trackEvent('load_more_trips', { page: currentPage + 1 });
  };
  
  const displayedTrips = trips.slice(0, currentPage * tripsPerPage);
  const hasMore = displayedTrips.length < trips.length;
  
  const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
  const tripTypes = ['PLUS', 'STANDARD', 'PRIDE', 'CAP 18-25', 'CHILL'];

  return (
    <div className="min-h-screen flex flex-col bg-white font-['Helvetica_Neue']">
      <Helmet>
        <title>Find Your Perfect Trip | Contiki Tours</title>
        <meta name="description" content="Explore our range of trips for 18-35 year olds. Filter by destination, date, and number of travelers to find your perfect adventure." />
        <meta name="keywords" content="contiki tours, travel packages, young adult travel, group travel" />
        <meta property="og:title" content="Find Your Perfect Trip | Contiki Tours" />
        <meta property="og:description" content="Explore our range of trips for 18-35 year olds. Filter by destination, date, and number of travelers to find your perfect adventure." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.contiki.com/tours-og-image.jpg" />
        <meta property="og:url" content="https://www.contiki.com/tours" />
        <link rel="canonical" href="https://www.contiki.com/tours" />
      </Helmet>
      
      <Header />

      {/* Breadcrumbs */}
      <div className="container mx-auto px-4 pt-6 pb-2">
        <nav className="text-[13px] text-gray-500" aria-label="Breadcrumb">
          <ol className="list-none p-0 inline-flex">
            <li className="flex items-center">
              <a href="/" className="hover:underline text-gray-500">Home</a>
              <svg className="mx-2 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </li>
            <li className="flex items-center">
              <span className="text-gray-700 font-bold">Tours</span>
            </li>
          </ol>
        </nav>
      </div>
      
      {/* Filter Bar */}
      <div className="sticky top-20 z-30 bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Destination Search */}
            <div className="md:col-span-2">
              <label htmlFor="destination" className="block text-[15px] font-extrabold text-gray-900 mb-3 uppercase tracking-[1px]">
                Where to?
              </label>
              <div className="relative">
                <Input
                  id="destination"
                  type="text"
                  placeholder="Search destinations"
                  value={filters.destination}
                  onChange={handleDestinationChange}
                  className="w-full h-14 text-[16px] font-medium transition-all duration-150 ease-in-out focus:ring-[#D8FD02] border-gray-300 pl-4 pr-10 rounded-full shadow-sm"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg className="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>
            
            {/* Year Selection */}
            <div>
              <label className="block text-[15px] font-extrabold text-gray-900 mb-3 uppercase tracking-[1px]">
                When?
              </label>
              <div className="flex rounded-full overflow-hidden border border-gray-300">
                <button
                  className={`flex-1 py-3 px-6 text-[16px] font-bold transition-all duration-200 rounded-l-full ${
                    filters.year === '2025' 
                      ? 'bg-[#D8FD02] text-black' 
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                  onClick={() => handleYearChange('2025')}
                >
                  2025
                </button>
                <button
                  className={`flex-1 py-3 px-6 text-[16px] font-bold transition-all duration-200 rounded-r-full ${
                    filters.year === '2026' 
                      ? 'bg-[#D8FD02] text-black' 
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                  onClick={() => handleYearChange('2026')}
                >
                  2026
                </button>
              </div>
            </div>
            
            {/* Travelers Input */}
            <div>
              <label htmlFor="travelers" className="block text-[15px] font-extrabold text-gray-900 mb-3 uppercase tracking-[1px]">
                Travelers
              </label>
              <div className="relative">
                <Input
                  id="travelers"
                  type="number"
                  min="1"
                  value={filters.travelers}
                  onChange={handleTravelersChange}
                  className="w-full h-14 text-[16px] font-medium transition-all duration-150 ease-in-out focus:ring-[#D8FD02] focus:border-[#D8FD02] border-gray-300 pl-4 pr-10 rounded-full shadow-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg className="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Month and Trip Type Filters */}
          <div className="flex flex-wrap items-center gap-8 mb-8">
            {/* Month Filters */}
            <div className="flex items-center gap-3">
              <span className="text-[15px] font-extrabold text-gray-900 uppercase tracking-[1px]">Month:</span>
              <div className="flex flex-wrap gap-2">
                {months.map(month => (
                  <button
                    key={month}
                    className={`px-4 py-2 text-[14px] font-bold rounded-full transition-colors duration-200 ${
                      filters.month === month 
                        ? 'bg-[#D8FD02] text-black' 
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                    onClick={() => handleMonthChange(filters.month === month ? '' : month)}
                  >
                    {month}
                  </button>
                ))}
              </div>
            </div>

            {/* Trip Type Filters */}
            <div className="flex items-center gap-3">
              <span className="text-[15px] font-extrabold text-gray-900 uppercase tracking-[1px]">Trip Type:</span>
              <div className="flex flex-wrap gap-2">
                {tripTypes.map(type => (
                  <button
                    key={type}
                    className={`px-4 py-2 text-[14px] font-bold rounded-full transition-colors duration-200 ${
                      filters.tripType === type 
                        ? 'bg-[#D8FD02] text-black' 
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                    onClick={() => handleTripTypeChange(filters.tripType === type ? '' : type)}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Active Filters, Sort By and View Toggle */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Active Filters */}
            <div className="flex items-center gap-3">
              <span className="text-[15px] font-extrabold text-gray-900 uppercase tracking-[1px]">Active filters:</span>
              <div className="flex flex-wrap gap-2">
                {filters.month && (
                  <span className="flex items-center gap-1 bg-gray-200 text-gray-700 text-[14px] font-bold px-4 py-2 rounded-full">
                    {filters.month}
                    <button 
                      className="ml-1 text-gray-500 hover:text-gray-700"
                      onClick={() => handleMonthChange('')}
                      aria-label={`Remove ${filters.month} filter`}
                    >
                      <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </span>
                )}
                {filters.tripType && (
                  <span className="flex items-center gap-1 bg-gray-200 text-gray-700 text-[14px] font-bold px-4 py-2 rounded-full">
                    {filters.tripType}
                    <button 
                      className="ml-1 text-gray-500 hover:text-gray-700"
                      onClick={() => handleTripTypeChange('')}
                      aria-label={`Remove ${filters.tripType} filter`}
                    >
                      <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </span>
                )}
              </div>
            </div>

            {/* Sort By and View Toggle */}
            <div className="flex items-center gap-8">
              {/* Sort By */}
              <div className="flex items-center gap-2">
                <span className="text-[15px] font-extrabold text-gray-900 uppercase tracking-[1px]">Sort by:</span>
                <select 
                  className="h-12 px-5 text-[16px] border border-gray-300 rounded-full focus:ring-[#D8FD02] focus:border-[#D8FD02] transition-all duration-150 ease-in-out"
                  onChange={(e) => {
                    trackEvent('sort_trips', { sort: e.target.value });
                  }}
                >
                  <option value="recommended">Recommended</option>
                  <option value="price_low">Price: Low to High</option>
                  <option value="price_high">Price: High to Low</option>
                  <option value="duration">Duration</option>
                  <option value="rating">Rating</option>
                </select>
              </div>

              {/* View Toggle */}
              <div className="flex items-center gap-2">
                <span className="text-[15px] font-extrabold text-gray-900 uppercase tracking-[1px]">View:</span>
                <div className="flex rounded-full overflow-hidden border border-gray-300">
                  <button 
                    className={`p-3 transition-colors duration-200 rounded-l-full ${
                      viewType === 'grid' 
                        ? 'bg-[#D8FD02] text-black' 
                        : 'bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                    onClick={() => setViewType('grid')}
                    aria-label="Switch to grid view"
                  >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                  </button>
                  <button 
                    className={`p-3 transition-colors duration-200 rounded-r-full ${
                      viewType === 'list' 
                        ? 'bg-[#D8FD02] text-black' 
                        : 'bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                    onClick={() => setViewType('list')}
                    aria-label="Switch to list view"
                  >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#D8FD02]"></div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Oops! Something went wrong</h2>
            <p className="text-gray-600 mb-6">We couldn't load the trips. Please try again later.</p>
            <button 
              onClick={() => window.location.reload()}
              className="bg-[#D8FD02] text-black font-bold px-6 py-3 rounded-full hover:bg-[#c4e602] transition-colors"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Trip Grid/List */}
        {!loading && !error && (
          <>
            <div className={`grid gap-8 ${viewType === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
              <Suspense fallback={
                <div className="col-span-full flex justify-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#D8FD02]"></div>
                </div>
              }>
                {displayedTrips.map((trip) => (
                  <TripCard
                    key={trip.id}
                    id={trip.id}
                    title={trip.name}
                    region={trip.destination}
                    price={trip.price}
                    oldPrice={trip.oldPrice}
                    duration={trip.duration}
                    countries={trip.countries}
                    image={trip.image}
                    isSpotlight={trip.rating >= 4.5}
                    discountPercentage={trip.discountPercentage}
                    slug={trip.slug}
                    viewType={viewType}
                  />
                ))}
              </Suspense>
            </div>

            {/* Load More Button */}
            {hasMore && (
              <div className="text-center mt-12">
                <button
                  onClick={handleLoadMore}
                  className="bg-[#D8FD02] text-black font-bold px-8 py-3 rounded-full hover:bg-[#c4e602] transition-colors"
                >
                  Load More Trips
                </button>
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

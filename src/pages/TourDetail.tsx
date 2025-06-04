import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTour } from '@/hooks/trips/useTour';
import { trackPageView, trackEvent } from '@/lib/analytics';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BackToTopButton from '@/components/BackToTopButton';
import { BookingProvider } from '@/context/BookingContext';
import TourDetailHead from '@/components/tour-detail/TourDetailHead';
import TourDetailSkeleton from '@/components/tour-detail/TourDetailSkeleton';
import TourNotFound from '@/components/tour-detail/TourNotFound';
import TourErrorState from '@/components/tour-detail/TourErrorState';
import SimpleTripTabs from '@/components/tour/SimpleTripTabs';
import PriceBar from '@/components/tour/PriceBar';
import ChatNowButton from '@/components/tour/ChatNowButton';
import { Skeleton } from '@/components/ui/skeleton';
import TourHeader from '@/components/tour-detail/TourHeader';
import TourTabContent from '@/components/tour-detail/TourTabContent';
import Breadcrumb from '@/components/Breadcrumb';
import { Share, Plus } from 'lucide-react';

const TourDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { tour, loading, error } = useTour(slug || '');
  const [activeTab, setActiveTab] = useState('trip');
  
  // State for the Dates and Pricing section
  const [selectedYear, setSelectedYear] = useState(2025);
  const [selectedMonth, setSelectedMonth] = useState(6); // Default to June
  const [selectedTripTypes, setSelectedTripTypes] = useState<string[]>([]);
  const [calendarView, setCalendarView] = useState<'list' | 'calendar'>('list');
  
  useEffect(() => {
    console.debug('[TourDetail] mounted', { slug });
    trackEvent('page_loaded', { page: 'TourDetail', slug });
    trackPageView(window.location.pathname);
  }, [slug]);
  
  const handleRetry = () => {
    window.location.reload();
    trackEvent('retry_clicked', { component: 'TourDetail', slug });
  };
  
  // If trip is not found (after loading is complete), render "Tour not found" message
  if (!loading && !tour) {
    return <TourNotFound />;
  }
  
  // Loading state with skeleton loaders
  if (loading) {
    return <TourDetailSkeleton />;
  }
  
  // Error state
  if (error) {
    return (
      <TourErrorState error={error} />
    );
  }

  // Ensure trip is defined before rendering
  if (!tour) {
    return <Skeleton className="h-screen w-full" />;
  }

  // Prepare tabs configuration
  const tabs = [
    { id: 'trip', label: 'THE TRIP' },
    { id: 'dates', label: 'DATES & PRICING' },
    { id: 'reviews', label: 'REVIEWS' }
  ];

  // Handlers for the Dates and Pricing selectors
  const handleYearChange = (year: number) => {
    setSelectedYear(year);
    console.log(`Year changed to: ${year}`);
  };

  const handleMonthChange = (month: number) => {
    setSelectedMonth(month);
    console.log(`Month changed to: ${month}`);
  };

  const handleTripTypeChange = (types: string[]) => {
    setSelectedTripTypes(types);
    console.log('Selected trip types:', types);
  };

  const handleViewChange = (view: 'list' | 'calendar') => {
    setCalendarView(view);
    console.log('Calendar view changed to:', view);
  };

  return (
    <BookingProvider>
      <div className="min-h-screen flex flex-col bg-white">
        <TourDetailHead trip={tour} slug={slug} />
        <Header />
        
        {/* Subheader: Breadcrumb and Share/Compare Buttons */}
        <div className="container max-w-5xl mx-auto pt-8 pb-2 flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <Breadcrumb title={tour.name} destination={tour.destination} />
            <div className="flex items-center gap-5">
              <button className="flex items-center gap-2 text-gray-700 hover:text-black text-sm font-bold transition-colors duration-150" aria-label="Share this tour">
                <Share size={16} />
                <span>Share</span>
              </button>
              <button className="flex items-center gap-2 text-gray-700 hover:text-black text-sm font-bold transition-colors duration-150" aria-label="Add to compare">
                <Plus size={16} />
                <span>Add To Compare</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Header Section: Tour Info and Price/Buttons */}
        <div className="container max-w-5xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-8 pt-2 pb-8 border-b border-gray-200">
          {/* Left: Title, Rating, Reviews */}
          <div className="flex-1 min-w-0">
            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight leading-tight text-black mb-2">{tour.name}</h1>
            <div className="flex items-center gap-2 mb-2">
              <span className="flex items-center">
                <span className="text-yellow-400 mr-1">★</span>
                <span className="font-bold text-lg text-black">{tour.rating}</span>
              </span>
              <span className="text-gray-600 text-base font-semibold">{tour.reviewCount} Reviews</span>
            </div>
          </div>
          {/* Right: Price and CTAs */}
          <div className="flex flex-col items-end min-w-[320px]">
            <div className="flex flex-col items-end">
              <span className="uppercase text-xs text-gray-500 font-bold mb-1">From</span>
              <span className="text-3xl md:text-4xl font-black text-black mb-1">${tour.price.toLocaleString()}</span>
              <span className="text-xs text-gray-500 mb-2">Find this price</span>
              <span className="text-xs text-gray-400 mb-4">Save your space with a deposit payment</span>
            </div>
            <div className="flex gap-3 w-full">
              <button className="border border-gray-400 text-black font-bold px-6 py-2 rounded-full uppercase tracking-wide text-sm hover:bg-gray-100 transition">Request More Info</button>
              <button className="bg-[#D8FD02] text-black font-bold px-6 py-2 rounded-full uppercase tracking-wide text-sm hover:bg-[#b8e600] transition">View Dates</button>
            </div>
          </div>
        </div>
        
        {/* TabNav */}
        <SimpleTripTabs 
          tabs={tabs} 
          activeTab={activeTab} 
          onChange={(tabId) => {
            setActiveTab(tabId);
            trackEvent('tab_changed', { component: 'TourDetail', tab: tabId });
          }}
        >
          <TourTabContent 
            activeTab={activeTab}
            tour={tour}
            onRetry={handleRetry}
          />
        </SimpleTripTabs>
        
        {/* ChatNow Button */}
        <ChatNowButton />
        
        {/* Mobile Booking Bar */}
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-2xl p-4 md:hidden">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide">From</p>
              <div className="flex items-baseline gap-2">
                {tour.oldPrice && (
                  <span className="text-sm line-through text-gray-400">£{tour.oldPrice}</span>
                )}
                <span className="text-2xl font-bold text-black">£{tour.price}</span>
              </div>
            </div>
            <button className="bg-[#CCFF00] text-black font-bold py-3 px-8 rounded-full hover:bg-[#b8e600] transition-colors uppercase tracking-wide text-sm">
              BOOK NOW
            </button>
          </div>
        </div>
        
        <Footer />
        <BackToTopButton />
      </div>
    </BookingProvider>
  );
};

export default TourDetail;

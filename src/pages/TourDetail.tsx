
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
import TabNav from '@/components/tour/TabNav';
import PriceBar from '@/components/tour/PriceBar';
import BookingBar from '@/components/BookingBar';
import ChatNowButton from '@/components/tour/ChatNowButton';
import { Skeleton } from '@/components/ui/skeleton';
import TourHeader from '@/components/tour-detail/TourHeader';
import TourTabContent from '@/components/tour-detail/TourTabContent';

const TourDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { tour, loading, error } = useTour(slug || '');
  const [activeTab, setActiveTab] = useState('trip');
  
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

  return (
    <BookingProvider>
      <div className="min-h-screen flex flex-col">
        <TourDetailHead trip={tour} slug={slug} />
        <Header />
        
        {/* Hero Banner */}
        <div className="relative h-[50vh] md:h-[60vh]">
          <div className="absolute inset-0 w-full h-full">
            <img 
              src={tour.images?.[0] || "https://www.contiki.com/media/vsqbfbwh/dubrovnik-croatia.jpg?center=0.5%2C0.5&format=webp&height=600&mode=crop&quality=80&width=1920"} 
              alt={tour.name} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/60"></div>
          </div>
          <div className="container relative z-10 h-full flex flex-col justify-end pb-8">
            <div className="text-white max-w-2xl">
              <h1 className="text-4xl md:text-6xl font-extrabold mb-4 uppercase text-shadow-lg">
                {tour.name}
              </h1>
              <p className="text-lg md:text-xl opacity-90">
                {tour.description && tour.description.slice(0, 120)}...
              </p>
            </div>
          </div>
        </div>
        
        {/* Tour Header with Breadcrumb and Rating */}
        <TourHeader tour={tour} slug={slug} />
        
        {/* Price Bar */}
        <PriceBar 
          oldPrice={tour.oldPrice} 
          newPrice={tour.price} 
          rating={tour.rating} 
          reviewCount={tour.reviewCount}
          className="sticky top-16 z-30 bg-white shadow-md"
        />
        
        {/* TabNav */}
        <TabNav 
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
        </TabNav>
        
        {/* ChatNow Button */}
        <ChatNowButton />
        
        {/* Booking Bar */}
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg py-3 px-4 md:hidden">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">From</p>
              <p className="text-xl font-bold text-[#FF6900]">${tour.price}</p>
            </div>
            <button className="bg-[#FF6900] text-white font-bold py-2 px-6 rounded-full hover:bg-[#FF6900]/90 transition-colors">
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


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
import TripDetailAccordion from '@/components/tour/TripDetailAccordion';

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
        
        {/* Tour Header with Breadcrumb and Rating */}
        <TourHeader tour={tour} slug={slug} />
        
        {/* Price Bar */}
        <PriceBar 
          oldPrice={tour.oldPrice} 
          newPrice={tour.price} 
          rating={tour.rating} 
          reviewCount={tour.reviewCount}
        />
        
        {/* TabNav */}
        <TabNav 
          tabs={tabs} 
          activeTab={activeTab} 
          onChange={(tabId) => setActiveTab(tabId)}
        >
          <TourTabContent 
            activeTab={activeTab}
            tour={tour}
            onRetry={handleRetry}
          />
        </TabNav>
        
        {/* Trip Detail Accordion with Travelers and Bus Seating */}
        <div className="container max-w-7xl py-8">
          <TripDetailAccordion />
        </div>
        
        {/* ChatNow Button */}
        <ChatNowButton />
        
        <Footer />
        <BackToTopButton />
      </div>
    </BookingProvider>
  );
};

export default TourDetail;

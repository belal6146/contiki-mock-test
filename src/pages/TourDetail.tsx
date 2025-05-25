
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
      <div className="min-h-screen flex flex-col bg-white">
        <TourDetailHead trip={tour} slug={slug} />
        <Header />
        
        {/* Hero Banner - Contiki Style */}
        <div className="relative h-[70vh] min-h-[500px] mt-20">
          <div className="absolute inset-0 w-full h-full">
            <img 
              src={tour.image || "https://www.contiki.com/media/vsqbfbwh/dubrovnik-croatia.jpg?center=0.5%2C0.5&format=webp&height=600&mode=crop&quality=80&width=1920"} 
              alt={tour.name} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/70"></div>
          </div>
          
          <div className="container relative z-10 h-full flex flex-col justify-end pb-16">
            <div className="text-white max-w-4xl">
              <div className="mb-4">
                <span className="bg-[#CCFF00] text-black px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wide">
                  TRENDING TRIP
                </span>
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 uppercase tracking-tight leading-none">
                {tour.name}
              </h1>
              <p className="text-lg md:text-xl opacity-95 leading-relaxed max-w-2xl">
                {tour.description && tour.description.slice(0, 150)}...
              </p>
              
              {/* Quick stats */}
              <div className="flex flex-wrap gap-6 mt-8 text-sm">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#CCFF00] rounded-full"></span>
                  <span>{tour.duration} days</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#CCFF00] rounded-full"></span>
                  <span>Ages 18-35</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#CCFF00] rounded-full"></span>
                  <span>From £{tour.price}</span>
                </div>
              </div>
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
            <button className="bg-[#CCFF00] text-black font-bold py-3 px-8 rounded-lg hover:bg-[#b8e600] transition-colors uppercase tracking-wide">
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

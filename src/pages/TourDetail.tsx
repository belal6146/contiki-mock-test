
import React, { useEffect, lazy, Suspense } from 'react';
import { useParams } from 'react-router-dom';
import { useTrips } from '@/hooks/useTrips';
import { useTour } from '@/hooks/useTour';
import { trackPageView, trackEvent } from '@/lib/analytics';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ErrorBoundary from '@/components/ErrorBoundary';
import BackToTopButton from '@/components/BackToTopButton';
import { BookingProvider } from '@/context/BookingContext';
import TourDetailHead from '@/components/tour-detail/TourDetailHead';
import TourDetailSkeleton from '@/components/tour-detail/TourDetailSkeleton';
import TourNotFound from '@/components/tour-detail/TourNotFound';
import TourErrorState from '@/components/tour-detail/TourErrorState';
import HeroImage from '@/components/tour/HeroImage';
import PriceBar from '@/components/tour/PriceBar';
import BookingBar from '@/components/BookingBar';
import Breadcrumb from '@/components/Breadcrumb';
import ErrorMessage from '@/components/ui/error-message';
import { Skeleton } from '@/components/ui/skeleton';
import ChatNowButton from '@/components/tour/ChatNowButton';

// Lazy load the heavyweight component
const TourDetailContent = lazy(() => import('@/components/tour-detail/TourDetailContent'));

const TourDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { tour, loading, error } = useTour(slug || '');
  const { trips } = useTrips({ limit: 3 });
  
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

  // Prepare details for DetailsGrid
  const tripDetails = [
    { label: 'Duration', value: `${tour.duration} days` },
    { label: 'Destination', value: tour.destination },
    { label: 'Group Size', value: '18-35 year olds' },
    { label: 'Trip Style', value: 'Adventure' }
  ];

  return (
    <BookingProvider>
      <div className="min-h-screen flex flex-col">
        <TourDetailHead trip={tour} slug={slug} />
        <Header />
        
        {/* Hero Image Section */}
        <HeroImage 
          imageUrl={tour.image} 
          title={tour.name} 
          subtitle={tour.destination}
        />
        
        {/* Price Bar */}
        <PriceBar 
          oldPrice={tour.oldPrice} 
          newPrice={tour.price} 
          rating={tour.rating} 
          reviewCount={tour.reviewCount}
        />
        
        {/* Booking Bar */}
        <BookingBar 
          price={tour.price} 
          slug={tour.slug} 
        />
        
        {/* Breadcrumb Navigation */}
        <Breadcrumb 
          title={tour.name} 
          destination={tour.destination} 
        />
        
        <ErrorBoundary fallback={
          <ErrorMessage 
            title="Something went wrong"
            message="We encountered an error while loading tour details."
            onRetry={handleRetry}
          />
        }>
          <Suspense fallback={<TourDetailSkeleton />}>
            <TourDetailContent 
              trip={tour}
              tripDetails={tripDetails}
              relatedTrips={trips}
            />
          </Suspense>
        </ErrorBoundary>
        
        {/* Chat Now Button */}
        <ChatNowButton />
        
        <Footer />
        <BackToTopButton />
      </div>
    </BookingProvider>
  );
};

export default TourDetail;

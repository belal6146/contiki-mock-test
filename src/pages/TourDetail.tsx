
import React, { useEffect, lazy, Suspense } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useTour, useTrips } from '@/hooks/useTrips';
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
import { Trip } from '@/types/trip';
import HeroImage from '@/components/tour/HeroImage';
import PriceBar from '@/components/tour/PriceBar';
import Breadcrumb from '@/components/Breadcrumb';
import ErrorMessage from '@/components/ui/error-message';
import { Skeleton } from '@/components/ui/skeleton';

// Lazy load the heavyweight component
const TourDetailContent = lazy(() => import('@/components/tour-detail/TourDetailContent'));

const TourDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { tour: trip, loading, error } = useTour(slug || '');
  const { trips } = useTrips({ limit: 3 });
  
  useEffect(() => {
    trackEvent('page_loaded', { page: 'TourDetail', slug });
    trackPageView(window.location.pathname);
  }, [slug]);
  
  const handleRetry = () => {
    window.location.reload();
    trackEvent('retry_clicked', { component: 'TourDetail', slug });
  };
  
  // If trip is not found (after loading is complete), render "Tour not found" message
  if (!loading && !trip) {
    return <TourNotFound />;
  }
  
  // Loading state with skeleton loaders
  if (loading) {
    return <TourDetailSkeleton />;
  }
  
  // Error state
  if (error) {
    return (
      <ErrorMessage
        title="Unable to load tour"
        message={error}
        onRetry={handleRetry}
      />
    );
  }

  // Ensure trip is defined before rendering
  if (!trip) {
    return <Skeleton className="h-screen w-full" />;
  }

  // Prepare details for DetailsGrid
  const tripDetails = [
    { label: 'Duration', value: `${trip.duration} days` },
    { label: 'Destination', value: trip.destination },
    { label: 'Group Size', value: '18-35 year olds' },
    { label: 'Trip Style', value: 'Adventure' }
  ];

  return (
    <BookingProvider>
      <div className="min-h-screen flex flex-col">
        <TourDetailHead trip={trip} slug={slug} />
        <Header />
        
        {/* Hero Image Section */}
        <HeroImage 
          imageUrl={trip.image} 
          title={trip.name} 
          subtitle={trip.destination}
        />
        
        {/* Price Bar */}
        <PriceBar 
          newPrice={trip.price} 
          rating={trip.rating} 
          reviewCount={trip.reviewCount}
        />
        
        {/* Breadcrumb Navigation */}
        <Breadcrumb 
          title={trip.name} 
          destination={trip.destination} 
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
              trip={trip}
              tripDetails={tripDetails}
              relatedTrips={trips}
            />
          </Suspense>
        </ErrorBoundary>
        
        <Footer />
        <BackToTopButton />
      </div>
    </BookingProvider>
  );
};

export default TourDetail;

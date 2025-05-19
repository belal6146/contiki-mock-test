
import React, { useEffect, lazy, Suspense } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useTour, useTrips } from '@/hooks/useTrips';
import { trackPageView } from '@/lib/analytics';
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

// Lazy load the heavyweight component
const TourDetailContent = lazy(() => import('@/components/tour-detail/TourDetailContent'));

const TourDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { tour: trip, loading, error } = useTour(slug || '');
  const { trips } = useTrips({ limit: 3 });
  
  useEffect(() => {
    console.debug('[TourDetail] slug:', slug);
    trackPageView(window.location.pathname);
    
    if (loading) {
      console.debug('[TourDetail] loading');
    }
  }, [slug, loading]);
  
  useEffect(() => {
    if (trip) {
      console.debug('[TourDetail] loaded');
    }
  }, [trip]);
  
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
    return <TourErrorState error={error} />;
  }

  // Prepare details for DetailsGrid
  const tripDetails = trip ? [
    { label: 'Duration', value: `${trip.duration} days` },
    { label: 'Destination', value: trip.destination },
    { label: 'Group Size', value: '18-35 year olds' },
    { label: 'Trip Style', value: 'Adventure' }
  ] : [];

  return (
    <BookingProvider>
      <div className="min-h-screen flex flex-col pb-20">
        <Helmet>
          <title>{trip?.name ? `${trip.name} | Contiki Tours` : 'Tour Detail | Contiki'}</title>
          <meta name="description" content={trip?.description ? trip.description.substring(0, 160) : 'Explore our amazing tours for 18-35 year olds'} />
          <meta property="og:title" content={trip?.name ? `${trip.name} | Contiki Tours` : 'Tour Detail | Contiki'} />
          <meta property="og:description" content={trip?.description ? trip.description.substring(0, 160) : 'Explore our amazing tours for 18-35 year olds'} />
          <meta property="og:type" content="website" />
          {trip?.image && <meta property="og:image" content={trip.image} />}
          <link rel="canonical" href={`https://www.contiki.com/tours/${slug}`} />
        </Helmet>
        
        <TourDetailHead trip={trip} slug={slug} />
        <Header />
        
        {trip && (
          <ErrorBoundary>
            <Suspense fallback={<TourDetailSkeleton />}>
              <TourDetailContent 
                trip={trip}
                tripDetails={tripDetails}
                relatedTrips={trips}
              />
            </Suspense>
          </ErrorBoundary>
        )}
        
        <Footer />
        <BackToTopButton />
      </div>
    </BookingProvider>
  );
};

export default TourDetail;


import React, { lazy, Suspense, useEffect } from 'react';
import { TabPanel } from '@/components/tour/TabNav';
import TabNav from '@/components/tour/TabNav';
import HeroImage from '@/components/tour/HeroImage';
import PriceBar from '@/components/tour/PriceBar';
import BasicDetailsGrid from '@/components/DetailsGrid';
import BreadcrumbNav from '@/components/Breadcrumb';
import BookingBar from '@/components/BookingBar';
import TourOverviewTab from './TourOverviewTab';
import ErrorBoundary from '@/components/ErrorBoundary';
import { Trip } from '@/types/trip';

// Lazy load heavy components
const TourDatesTab = lazy(() => import('./TourDatesTab'));
const TourReviewsTab = lazy(() => import('./TourReviewsTab'));

interface TourDetailContentProps {
  trip: Trip;
  tripDetails: any[];
  relatedTrips: Trip[];
}

const TourDetailContent: React.FC<TourDetailContentProps> = ({ 
  trip, 
  tripDetails,
  relatedTrips
}) => {
  useEffect(() => {
    console.debug('[TourDetailContent] mounted', { tripId: trip.id });
  }, [trip.id]);

  // Define tabs for TabNav
  const tabs = [
    { id: 'overview', label: 'The Trip' },
    { id: 'dates', label: 'Dates & Pricing' },
    { id: 'reviews', label: 'Reviews' },
  ];

  return (
    <>
      <ErrorBoundary>
        <BreadcrumbNav title={trip.name} destination={trip.destination} />
      </ErrorBoundary>
      
      <main className="flex-grow transition-all duration-150 ease-in-out" id="main-content">
        <ErrorBoundary>
          <HeroImage
            imageUrl={trip.image}
            title={trip.name}
            subtitle={trip.destination}
          />
        </ErrorBoundary>
        
        <ErrorBoundary>
          <PriceBar 
            oldPrice={trip.price * 1.2} // Adding 20% to create an "old price"
            newPrice={trip.price}
            rating={trip.rating}
            reviewCount={trip.reviewCount}
          />
        </ErrorBoundary>
        
        <ErrorBoundary>
          <div className="container py-6">
            <BasicDetailsGrid details={tripDetails} />
          </div>
        </ErrorBoundary>
        
        <ErrorBoundary>
          <TabNav tabs={tabs}>
            <TabPanel id="overview">
              <TourOverviewTab 
                trip={trip}
                highlights={trip.highlights || []}
                trips={relatedTrips}
                accommodation={trip.accommodation || {}}
                tripFAQs={trip.faqs?.filter(faq => faq.type === 'trip') || []}
                generalFAQs={trip.faqs?.filter(faq => faq.type === 'general') || []}
              />
            </TabPanel>
            
            <TabPanel id="dates">
              <Suspense fallback={
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                </div>
              }>
                <TourDatesTab trip={trip} />
              </Suspense>
            </TabPanel>
            
            <TabPanel id="reviews">
              <Suspense fallback={
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                </div>
              }>
                <TourReviewsTab />
              </Suspense>
            </TabPanel>
          </TabNav>
        </ErrorBoundary>
      </main>
      
      <BookingBar price={trip.price} slug={trip.slug} />
    </>
  );
};

export default TourDetailContent;


import React from 'react';
import { Trip } from '@/types/trip';
import TripHighlights from '@/components/tour/TripHighlights';
import DetailsGrid from '@/components/tour/DetailsGrid';
import DailyAccordion from '@/components/tour/DailyAccordion';
import RelatedTrips from '@/components/tour/RelatedTrips';
import FAQAccordion from '@/components/tour/FAQAccordion';
import WhereYouWillStay from '@/components/tour/WhereYouWillStay';
import FlexDepositBar from '@/components/tour/FlexDepositBar';
import TabNav, { TabPanel } from '@/components/tour/TabNav';
import TourDatesTab from '@/components/tour-detail/TourDatesTab';
import TourReviewsTab from '@/components/tour-detail/TourReviewsTab';
import { Skeleton } from '@/components/ui/skeleton';
import ErrorBoundary from '@/components/ErrorBoundary';
import ErrorMessage from '@/components/ui/error-message';
import { trackEvent } from '@/lib/analytics';

interface TourDetailContentProps {
  trip: Trip;
  tripDetails: Array<{ label: string; value: string }>;
  relatedTrips: Trip[];
}

const TourDetailContent: React.FC<TourDetailContentProps> = ({ 
  trip, 
  tripDetails,
  relatedTrips
}) => {
  React.useEffect(() => {
    trackEvent('tour_detail_content_loaded', { 
      id: trip.id, 
      name: trip.name,
      destination: trip.destination
    });
  }, [trip]);

  // Guard against undefined data
  if (!trip) {
    return <Skeleton className="h-[600px] w-full" />;
  }
  
  // Default empty array for itinerary if it doesn't exist on trip
  const itinerary = trip.itinerary || [];
  
  // Create properly structured highlight objects from the string array
  const formattedHighlights = trip.highlights?.map((highlight, index) => ({
    id: `highlight-${index}`,
    title: highlight,
    description: highlight,
    image: '/placeholder.svg',
    type: 'Featured'
  })) || [];
  
  // Create proper Accommodation object with all required properties
  const mockAccommodation = {
    name: 'Comfortable Hotels',
    location: 'Various locations',
    image: '/placeholder.svg',
    nightsCount: 5
  };
  
  const mockFAQs = [
    { 
      question: 'What is included in the trip price?', 
      answer: 'The trip price includes accommodations, transportation, certain meals, and guided tours as specified in the itinerary.' 
    },
    { 
      question: 'What should I pack for this trip?', 
      answer: 'We recommend packing comfortable walking shoes, weather-appropriate clothing, and travel essentials.' 
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'dates-pricing', label: 'Dates & Pricing' },
    { id: 'reviews', label: 'Reviews' }
  ];

  const handleTabChange = (tabId: string) => {
    trackEvent('tour_tab_changed', { tabId });
  };

  const handleRetry = () => {
    window.location.reload();
    trackEvent('retry_clicked', { component: 'TourDetailContent' });
  };

  return (
    <main className="flex-1">
      {/* Price Bar and Flex Deposit Bar will be at the top */}
      <FlexDepositBar />
      
      {/* Tab Navigation and Content */}
      <TabNav tabs={tabs} onTabChange={handleTabChange}>
        <TabPanel id="overview">
          <div className="py-8 space-y-12">
            {/* Trip Highlights */}
            <ErrorBoundary fallback={
              <ErrorMessage
                title="Unable to load highlights"
                message="We encountered an error while loading trip highlights."
                onRetry={handleRetry}
              />
            }>
              <TripHighlights highlights={formattedHighlights} />
            </ErrorBoundary>
            
            {/* Trip Details Grid */}
            <ErrorBoundary fallback={
              <ErrorMessage
                title="Unable to load trip details"
                message="We encountered an error while loading trip details."
                onRetry={handleRetry}
              />
            }>
              <DetailsGrid highlights={trip.highlights || []} included={trip.included || []} />
            </ErrorBoundary>
            
            {/* Daily Itinerary */}
            <ErrorBoundary fallback={
              <ErrorMessage
                title="Unable to load itinerary"
                message="We encountered an error while loading trip itinerary."
                onRetry={handleRetry}
              />
            }>
              <section className="container mx-auto">
                <h2 className="text-2xl font-bold mb-6">Day by Day</h2>
                <DailyAccordion days={itinerary} />
              </section>
            </ErrorBoundary>
            
            {/* Where You'll Stay */}
            <ErrorBoundary fallback={
              <ErrorMessage
                title="Unable to load accommodation details"
                message="We encountered an error while loading accommodation information."
                onRetry={handleRetry}
              />
            }>
              <WhereYouWillStay accommodation={mockAccommodation} />
            </ErrorBoundary>
          </div>
        </TabPanel>
        
        <TabPanel id="dates-pricing">
          <ErrorBoundary fallback={
            <ErrorMessage
              title="Unable to load dates and pricing"
              message="We encountered an error while loading tour dates and pricing."
              onRetry={handleRetry}
            />
          }>
            <TourDatesTab trip={trip} />
          </ErrorBoundary>
        </TabPanel>
        
        <TabPanel id="reviews">
          <ErrorBoundary fallback={
            <ErrorMessage
              title="Unable to load reviews"
              message="We encountered an error while loading tour reviews."
              onRetry={handleRetry}
            />
          }>
            <TourReviewsTab />
          </ErrorBoundary>
        </TabPanel>
      </TabNav>
      
      {/* Related Trips */}
      <ErrorBoundary fallback={
        <ErrorMessage
          title="Unable to load related trips"
          message="We encountered an error while loading related trips."
          onRetry={handleRetry}
        />
      }>
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold mb-8">Related Trips</h2>
            {relatedTrips && relatedTrips.length > 0 ? (
              <RelatedTrips trips={relatedTrips} />
            ) : (
              <Skeleton className="h-80 w-full" />
            )}
          </div>
        </section>
      </ErrorBoundary>
      
      {/* FAQs */}
      <ErrorBoundary fallback={
        <ErrorMessage
          title="Unable to load FAQs"
          message="We encountered an error while loading frequently asked questions."
          onRetry={handleRetry}
        />
      }>
        <section className="py-12 container mx-auto">
          <h2 className="text-3xl font-bold mb-8">Frequently Asked Questions</h2>
          <FAQAccordion tripFAQs={mockFAQs} generalFAQs={mockFAQs} />
        </section>
      </ErrorBoundary>
    </main>
  );
};

export default TourDetailContent;

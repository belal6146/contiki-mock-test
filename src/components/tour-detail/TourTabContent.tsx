
import React from 'react';
import { Trip } from '@/types/trip';
import { useTrips } from '@/hooks/useTrips';
import ErrorBoundary from '@/components/ErrorBoundary';
import TourOverviewTab from './TourOverviewTab';
import ErrorMessage from '@/components/ui/error-message';
import TourDatesTab from '@/components/tour-detail/TourDatesTab';
import TourReviewsTab from '@/components/tour-detail/TourReviewsTab';
import FlexDepositBanner from '@/components/tour/FlexDepositBanner';
import { trackEvent } from '@/lib/analytics';
import TravelConfidenceBanner from './banners/TravelConfidenceBanner';
import YearSelectionBanner from './banners/YearSelectionBanner';
import FAQSection from './sections/FAQSection';
import ChatWithUsSection from './sections/ChatWithUsSection';
import { mockHighlights, mockAccommodation, mockGeneralFAQs, mockTripFAQs } from './data/mockData';

interface TourTabContentProps {
  activeTab: string;
  tour: Trip;
  onRetry: () => void;
}

const TourTabContent: React.FC<TourTabContentProps> = ({ activeTab, tour, onRetry }) => {
  const { trips } = useTrips({ limit: 3 });

  React.useEffect(() => {
    console.debug('[ResponsiveQA] TourTabContent', { 
      activeTab, 
      breakpoint: window.innerWidth <= 640 ? 'mobile' : 
                  window.innerWidth <= 1024 ? 'tablet' : 'desktop' 
    });
    
    // Track tab view
    trackEvent('tour_tab_viewed', { 
      tab: activeTab,
      tourId: tour.id,
      tourName: tour.name
    });
  }, [activeTab, tour.id, tour.name]);

  // Determine which content to show based on active tab
  const renderTabContent = () => {
    switch(activeTab) {
      case 'trip':
        return (
          <ErrorBoundary fallback={
            <ErrorMessage 
              title="Could not load trip content"
              message="We encountered an error while loading trip details."
              onRetry={onRetry}
            />
          }>
            <div className="animate-fade-in">
              <TourOverviewTab
                trip={tour}
                highlights={mockHighlights}
                trips={trips}
                accommodation={mockAccommodation}
                tripFAQs={mockTripFAQs}
                generalFAQs={mockGeneralFAQs}
              />
            </div>
          </ErrorBoundary>
        );
      case 'dates':
        return (
          <ErrorBoundary fallback={
            <ErrorMessage 
              title="Could not load dates content"
              message="We encountered an error while loading dates and pricing."
              onRetry={onRetry}
            />
          }>
            <div className="animate-fade-in">
              <TourDatesTab trip={tour} />
              <div className="mt-12">
                <FlexDepositBanner />
              </div>
            </div>
          </ErrorBoundary>
        );
      case 'reviews':
        return (
          <ErrorBoundary fallback={
            <ErrorMessage 
              title="Could not load reviews content"
              message="We encountered an error while loading reviews."
              onRetry={onRetry}
            />
          }>
            <div className="animate-fade-in">
              <TourReviewsTab tripId={tour.id} />
            </div>
          </ErrorBoundary>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white">
      <TravelConfidenceBanner />
      <YearSelectionBanner />
      
      {/* Tab-specific content */}
      <div className="container max-w-7xl mx-auto px-4 pb-16">
        {renderTabContent()}
      </div>
      
      <FAQSection tripFAQs={mockTripFAQs} generalFAQs={mockGeneralFAQs} />
      <ChatWithUsSection />
    </div>
  );
};

export default TourTabContent;

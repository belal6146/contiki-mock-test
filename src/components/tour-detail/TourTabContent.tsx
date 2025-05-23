
import React, { lazy, Suspense } from 'react';
import { Trip } from '@/types/trip';
import { useTrips } from '@/hooks/useTrips';
import ErrorBoundary from '@/components/ErrorBoundary';
import TourOverviewTab from './TourOverviewTab';
import ErrorMessage from '@/components/ui/error-message';
import TourDatesTab from '@/components/tour-detail/TourDatesTab';
import TourReviewsTab from '@/components/tour-detail/TourReviewsTab';
import FAQAccordion from '@/components/tour/FAQAccordion';
import FlexDepositBanner from '@/components/tour/FlexDepositBanner';
import WhatsIncluded from '@/components/tour/WhatsIncluded';
import TripTeam from '@/components/tour/TripTeam';
import TripInformation from '@/components/tour/TripInformation';
import TravelEssentials from '@/components/tour/TravelEssentials';
import PackingGuide from '@/components/tour/PackingGuide';
import BookingSidebar from '@/components/tour/BookingSidebar';

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
  }, [activeTab]);

  // Mock data for trip highlights
  const mockHighlights = [
    {
      id: '1',
      title: 'Visit Santorini',
      description: 'Explore the stunning white buildings and blue domes that make this island famous worldwide.',
      image: 'https://source.unsplash.com/random/800x600/?santorini',
      isIncluded: true,
      type: 'Cultural'
    },
    {
      id: '2',
      title: 'Ferry Ride between Islands',
      description: 'Enjoy the beautiful Aegean Sea views as you travel between the Greek islands.',
      image: 'https://source.unsplash.com/random/800x600/?ferry,greece',
      isIncluded: true,
      type: 'Adventure'
    },
    {
      id: '3',
      title: 'Explore Mykonos by Night',
      description: 'Experience the famous nightlife of Mykonos with its vibrant bars and restaurants.',
      image: 'https://source.unsplash.com/random/800x600/?mykonos,night',
      isIncluded: false,
      type: 'Nightlife'
    }
  ];

  // Mock data for accommodation
  const mockAccommodation = {
    name: 'Paradise Beach Resort',
    location: 'Mykonos, Greece',
    image: 'https://source.unsplash.com/random/800x600/?beach,resort,greece',
    nightsCount: 10
  };

  // Mock FAQ data that will be consistent across all tabs
  const mockGeneralFAQs = [
    {
      question: "What does a modular trip mean?",
      answer: "A modular trip means fellow travellers will join and leave at various locations. There'll be some goodbyes, sure, but there'll also be plenty of hellos with new like-minded travellers."
    },
    {
      question: "What is Contiki?",
      answer: "Contiki is a travel company that specializes in group tours for 18-35 year olds. We offer unforgettable experiences across the globe."
    },
    {
      question: "Why travel 18-35?",
      answer: "Our trips are designed specifically for young travelers looking for authentic experiences with like-minded people."
    },
    {
      question: "Will I be pressured to participate in any trip?",
      answer: "Never. All activities are optional, allowing you to customize your travel experience to your preferences."
    }
  ];

  // Trip-specific FAQs
  const mockTripFAQs = [
    {
      question: "Can I book online?",
      answer: "Yes, you can book your Contiki trip online through our website, or contact our travel experts by phone."
    },
    {
      question: "What's included?",
      answer: "Your trip includes accommodation, transportation, many meals, a professional Trip Manager, Local Guides, and all listed activities."
    }
  ];

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
              <div className="container mt-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Left column: Main content */}
                  <div className="lg:col-span-2">
                    <TourOverviewTab
                      trip={tour}
                      highlights={mockHighlights}
                      trips={trips}
                      accommodation={mockAccommodation}
                      tripFAQs={mockTripFAQs}
                      generalFAQs={mockGeneralFAQs}
                    />
                  </div>
                  
                  {/* Right column: Booking sidebar */}
                  <div className="lg:col-span-1">
                    <BookingSidebar
                      price={tour.price}
                      oldPrice={tour.oldPrice}
                      tourName={tour.name}
                      duration={tour.duration}
                      savings={tour.oldPrice ? tour.oldPrice - tour.price : 0}
                    />
                  </div>
                </div>
              </div>
              
              <WhatsIncluded included={tour.included || []} />
              <TripTeam teamMembers={[]} />
              <TripInformation 
                ageRange="18-35"
                groupSize="Average 30, Maximum 45"
                physicalRating={2}
                countries={1}
                tripType="Island Hopping"
                meals={{
                  breakfasts: 10,
                  lunches: 0,
                  dinners: 3
                }}
              />
              <TravelEssentials />
              <PackingGuide destination={tour.destination} />
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
            <div>
              <TourDatesTab trip={tour} />
              <FlexDepositBanner />
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
            <TourReviewsTab tripId={tour.id} />
          </ErrorBoundary>
        );
      default:
        return null;
    }
  };

  return (
    <>
      {/* Tab-specific content */}
      {renderTabContent()}
      
      {/* FAQ section - only show for trip tab */}
      {activeTab === 'trip' && (
        <>
          <div className="bg-white py-8 md:py-12 border-t border-gray-100">
            <div className="container max-w-7xl">
              <div className="mx-auto max-w-4xl">
                <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-10 text-center">Trip FAQs</h2>
              </div>
            </div>
          </div>
          <div className="bg-white">
            <div className="container max-w-7xl pb-8 md:pb-16">
              <div className="mx-auto">
                <FAQAccordion 
                  tripFAQs={mockTripFAQs} 
                  generalFAQs={mockGeneralFAQs} 
                />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default TourTabContent;

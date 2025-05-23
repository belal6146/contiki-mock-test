
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
import { trackEvent } from '@/lib/analytics';

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
    <>
      {/* Banner that appears on all tabs */}
      <div className="bg-[#F5F8FF] py-4 mb-8 border-b border-gray-200">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-[#FF6900] rounded-full p-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                </svg>
              </div>
              <div>
                <p className="font-semibold">Travel with Confidence</p>
                <p className="text-sm text-gray-600">Flexible booking policies & health measures</p>
              </div>
            </div>
            <button className="text-[#FF6900] font-semibold hover:underline">
              Learn More
            </button>
          </div>
        </div>
      </div>
      
      {/* Tab-specific content */}
      {renderTabContent()}
      
      {/* FAQ section - only show for trip tab */}
      {activeTab === 'trip' && (
        <>
          <div className="bg-white py-12 border-t border-gray-100">
            <div className="container max-w-7xl">
              <div className="mx-auto max-w-4xl">
                <h2 className="text-3xl font-bold mb-10 text-center">Frequently Asked Questions</h2>
              </div>
            </div>
          </div>
          <div className="bg-white pb-16">
            <div className="container max-w-7xl">
              <div className="mx-auto max-w-4xl">
                <FAQAccordion 
                  tripFAQs={mockTripFAQs} 
                  generalFAQs={mockGeneralFAQs} 
                />
              </div>
            </div>
          </div>
        </>
      )}
      
      {/* Chat with us section - show on all tabs */}
      <div className="bg-[#F7F7F7] py-12 border-t border-gray-200">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-2">Still have questions?</h2>
              <p className="text-gray-600">Our travel experts are here to help you plan your perfect trip.</p>
            </div>
            <div className="flex gap-4">
              <button className="bg-[#FF6900] text-white px-6 py-3 rounded-full hover:bg-[#E55F00] transition-colors font-semibold">
                Chat with Us
              </button>
              <button className="border border-gray-300 bg-white text-gray-800 px-6 py-3 rounded-full hover:bg-gray-50 transition-colors font-semibold">
                Call Us
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TourTabContent;

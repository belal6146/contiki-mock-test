
import React, { lazy, Suspense } from 'react';
import { Trip } from '@/types/trip';
import { useTrips } from '@/hooks/useTrips';
import ErrorBoundary from '@/components/ErrorBoundary';
import TripHighlights from '@/components/tour/TripHighlights';
import MapItinerary from '@/components/tour/MapItinerary';
import WhereYouWillStay from '@/components/tour/WhereYouWillStay';
import RelatedTrips from '@/components/tour/RelatedTrips';
import HeroImage from '@/components/tour/HeroImage';
import ErrorMessage from '@/components/ui/error-message';
import TourDatesTab from '@/components/tour-detail/TourDatesTab';
import TourReviewsTab from '@/components/tour-detail/TourReviewsTab';
import { ItineraryDay } from '@/components/tour/MapItinerary';
import FAQAccordion from '@/components/tour/FAQAccordion';

// Lazy load the heavyweight component
const TourDetailContent = lazy(() => import('@/components/tour-detail/TourDetailContent'));

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

  // Mock data for itinerary with proper coordinate tuples
  const mockItinerary: ItineraryDay[] = [
    {
      day: 1,
      title: 'Start Athens',
      description: 'Arrive in Athens and meet your fellow travelers.',
      coordinates: [23.7275, 37.9838] as [number, number]
    },
    {
      day: 2,
      title: 'Athens to Mykonos',
      description: 'Morning ferry to Mykonos. Afternoon free to explore.',
      from: 'Athens',
      to: 'Mykonos',
      coordinates: [25.3667, 37.4415] as [number, number]
    },
    {
      day: 3,
      title: 'Mykonos',
      description: 'Full day to enjoy the beaches and town of Mykonos.',
      coordinates: [25.3667, 37.4415] as [number, number]
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
      question: "What is Contiki?",
      answer: "Contiki is a travel company that specializes in group tours for 18-35 year olds. We offer unforgettable experiences across the globe."
    },
    {
      question: "Why pay 18-35?",
      answer: "Our trips are designed specifically for young travelers looking for authentic experiences with like-minded people."
    },
    {
      question: "Will I be pressured to participate on any trip?",
      answer: "Never. All activities are optional, allowing you to customize your travel experience to your preferences."
    },
    {
      question: "What destinations can I go to with Contiki?",
      answer: "We offer trips across Europe, Asia, North America, Latin America, Australia, New Zealand, and Africa."
    },
    {
      question: "How does it work?",
      answer: "Choose your trip, book with a deposit, meet your group and Trip Manager, then enjoy the adventure of a lifetime!"
    },
    {
      question: "Do I need a visa?",
      answer: "Visa requirements vary depending on your nationality and destination. We recommend checking with the relevant embassies or consulates."
    },
    {
      question: "Do you always travel by coach on a Contiki trip?",
      answer: "While many of our trips include coach travel, we also use trains, boats, and flights depending on the itinerary."
    },
    {
      question: "How many other travelers will be on each trip?",
      answer: "Group sizes vary by trip but typically range from 20-45 travelers, all between the ages of 18-35."
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
              {/* Hero Image */}
              <HeroImage 
                imageUrl={tour.image} 
                title={tour.name} 
                subtitle={tour.destination}
              />
              
              {/* Trip Highlights */}
              <TripHighlights highlights={mockHighlights} />
              
              {/* Map & Itinerary */}
              <MapItinerary itinerary={mockItinerary} />
              
              {/* Where You Will Stay */}
              <WhereYouWillStay accommodation={mockAccommodation} />
              
              {/* Other trips you might like */}
              <RelatedTrips trips={trips} />
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
            <TourDatesTab trip={tour} />
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
      
      {/* FAQ section - consistent across all tabs */}
      <div className="bg-white py-8 md:py-12 border-t border-gray-100">
        <div className="container max-w-7xl">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-10 text-center">Frequently Asked Questions</h2>
            <p className="text-gray-600 text-center mb-8 md:mb-12 max-w-2xl mx-auto">
              Everything you need to know about this trip and booking with Contiki.
            </p>
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
  );
};

export default TourTabContent;

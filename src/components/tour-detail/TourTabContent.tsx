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

// Lazy load the heavyweight component
const TourDetailContent = lazy(() => import('@/components/tour-detail/TourDetailContent'));

interface TourTabContentProps {
  activeTab: string;
  tour: Trip;
  onRetry: () => void;
}

const TourTabContent: React.FC<TourTabContentProps> = ({ activeTab, tour, onRetry }) => {
  const { trips } = useTrips({ limit: 3 });

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

  return (
    <>
      {activeTab === 'trip' && (
        <ErrorBoundary fallback={
          <ErrorMessage 
            title="Could not load trip content"
            message="We encountered an error while loading trip details."
            onRetry={onRetry}
          />
        }>
          <div>
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
      )}
      
      {activeTab === 'dates' && (
        <ErrorBoundary fallback={
          <ErrorMessage 
            title="Could not load dates content"
            message="We encountered an error while loading dates and pricing."
            onRetry={onRetry}
          />
        }>
          <TourDatesTab trip={tour} />
        </ErrorBoundary>
      )}
      
      {activeTab === 'reviews' && (
        <ErrorBoundary fallback={
          <ErrorMessage 
            title="Could not load reviews content"
            message="We encountered an error while loading reviews."
            onRetry={onRetry}
          />
        }>
          <TourReviewsTab tripId={tour.id} />
        </ErrorBoundary>
      )}
    </>
  );
};

export default TourTabContent;

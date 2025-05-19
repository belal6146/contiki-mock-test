
import React, { useEffect } from 'react';
import { TabPanel } from '@/components/tour/TabNav';
import TabNav from '@/components/tour/TabNav';
import HeroImage from '@/components/tour/HeroImage';
import PriceBar from '@/components/tour/PriceBar';
import BasicDetailsGrid from '@/components/DetailsGrid';
import BreadcrumbNav from '@/components/Breadcrumb';
import BookingBar from '@/components/BookingBar';
import TourOverviewTab from './TourOverviewTab';
import TourDatesTab from './TourDatesTab';
import TourReviewsTab from './TourReviewsTab';
import ErrorBoundary from '@/components/ErrorBoundary';
import { Trip } from '@/types/trip';

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
  // Mock data for the components
  const mockHighlights = [
    {
      id: "1",
      title: "Visit Fira",
      description: "Explore the city like a local and hit the winding lanes in this maze-like town to wander through Santorini's iconic white houses and blue-domed churches.",
      image: "/placeholder.svg",
      type: "Cultural"
    },
    {
      id: "2",
      title: "Ferry Ride from Santorini to Ios",
      description: "You'll travel the ferry from Santorini and roll with the massive blue Aegean waves. The turquoise-surrounded boarding allows for panoramic sea views.",
      image: "/placeholder.svg",
      type: "Included"
    },
    {
      id: "3",
      title: "Explore Mykonos by Night",
      description: "Feel that electric vibe and night buzz in the narrow alleyways and paths of Mykonos. Head to the famous windmills and coastlines for stunning sunset views.",
      image: "/placeholder.svg",
      type: "Additional"
    }
  ];

  const mockAccommodation = {
    name: "Paradise Beach (upgraded rooms)",
    location: "Mykonos, Greece",
    image: "/placeholder.svg",
    nightsCount: 10
  };

  const mockTripFAQs = [
    {
      question: "What does a modular trip mean?",
      answer: "A modular trip means fellow travelers will join and leave at various locations. There'll be some goodbyes, sure, but there'll also be plenty of hellos with new like-minded travelers."
    }
  ];

  const mockGeneralFAQs = [
    {
      question: "What is Contiki?",
      answer: "Contiki is a travel company specializing in group travel experiences for 18-35 year olds. We've been taking young travelers around the world for over 60 years, creating unforgettable memories and lifelong friendships."
    },
    {
      question: "Why only 18-35?",
      answer: "We focus on this age range to create travel experiences specifically designed for young adults. This helps ensure everyone on the trip is at a similar life stage, making it easier to connect and form friendships."
    },
    {
      question: "Will I be pressured to party/drink on my trip?",
      answer: "Absolutely not. While we do offer nightlife options on many trips, participation is always optional. Our trips include a variety of activities to suit different interests."
    },
    {
      question: "What destinations can I go to with Contiki?",
      answer: "Contiki offers trips across Europe, Asia, North America, Latin America, Australia, New Zealand, Africa, and the Middle East - over 350 trips across 6 continents!"
    }
  ];
  
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
      
      <main className="flex-grow">
        <ErrorBoundary>
          <HeroImage
            imageUrl={trip.image}
            title={trip.name}
            subtitle={trip.destination}
          />
        </ErrorBoundary>
        
        <ErrorBoundary>
          <PriceBar 
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
                highlights={mockHighlights}
                trips={relatedTrips}
                accommodation={mockAccommodation}
                tripFAQs={mockTripFAQs}
                generalFAQs={mockGeneralFAQs}
              />
            </TabPanel>
            
            <TabPanel id="dates">
              <TourDatesTab trip={trip} />
            </TabPanel>
            
            <TabPanel id="reviews">
              <TourReviewsTab />
            </TabPanel>
          </TabNav>
        </ErrorBoundary>
      </main>
      
      <BookingBar price={trip.price} slug={trip.slug} />
    </>
  );
};

export default TourDetailContent;

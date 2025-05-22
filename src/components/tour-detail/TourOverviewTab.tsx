
import React from 'react';
import TripHighlights from '@/components/tour/TripHighlights';
import MapItinerary from '@/components/tour/MapItinerary';
import DailyAccordion from '@/components/tour/DailyAccordion';
import WhereYouWillStay from '@/components/tour/WhereYouWillStay';
import FlexDepositBar from '@/components/tour/FlexDepositBar';
import RelatedTrips from '@/components/tour/RelatedTrips';
import FAQAccordion from '@/components/tour/FAQAccordion';
import { Trip } from '@/types/trip';

interface TourOverviewTabProps {
  trip: Trip;
  highlights: any[]; // Using any[] since we don't have the Highlight type defined globally
  trips: Trip[];
  accommodation: any; // Using any for the same reason
  tripFAQs: any[]; // Using any for the same reason
  generalFAQs: any[]; // Using any for the same reason
}

const TourOverviewTab: React.FC<TourOverviewTabProps> = ({
  trip,
  highlights = [],
  trips = [],
  accommodation = { hotels: [] },
  tripFAQs = [],
  generalFAQs = []
}) => {
  // If trip is undefined, provide fallback values
  const safeTrip = trip || {
    id: '',
    slug: '',
    name: 'Tour Information',
    description: 'Tour description not available',
    destination: 'Various Destinations',
    price: 0,
    duration: 0,
    image: '',
    rating: 0,
    reviewCount: 0,
    itinerary: [],
    variations: [],
    highlights: [],
    included: [],
  };

  return (
    <div className="mb-16 animate-fade-in">
      <h2 className="heading-md mb-8">Trip Overview</h2>
      <p className="text-lg text-gray-700 mb-12 container max-w-4xl">{safeTrip.description}</p>
      
      <div className="mb-16 transition-all duration-300 ease-in-out hover:translate-y-[-4px]">
        <TripHighlights highlights={highlights} arrowVariant="outline" />
      </div>
      
      <div className="mb-16 transition-all duration-300 ease-in-out">
        <MapItinerary itinerary={safeTrip.itinerary} />
      </div>
      
      <div className="mb-16">
        <DailyAccordion days={safeTrip.itinerary} />
      </div>
      
      <div className="mb-16 transition-all duration-300 ease-in-out hover:translate-y-[-4px]">
        <WhereYouWillStay accommodation={accommodation} />
      </div>
      
      <div className="mb-16">
        <FlexDepositBar />
      </div>
      
      <div className="mb-16 transition-all duration-300 ease-in-out">
        <RelatedTrips trips={trips} />
      </div>
      
      <div className="mb-16">
        <FAQAccordion tripFAQs={tripFAQs} generalFAQs={generalFAQs} />
      </div>
    </div>
  );
};

export default TourOverviewTab;

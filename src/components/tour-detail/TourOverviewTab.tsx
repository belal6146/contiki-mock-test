import React from 'react';
import TripHighlights from '@/components/tour/TripHighlights';
import MapItinerary from '@/components/tour/MapItinerary';
import DailyAccordion from '@/components/tour/DailyAccordion';
import WhereYouWillStay from '@/components/tour/WhereYouWillStay';
import FlexDepositBar from '@/components/tour/FlexDepositBar';
import RelatedTrips from '@/components/tour/RelatedTrips';
import FAQAccordion from '@/components/tour/FAQAccordion';
import { Trip } from '@/types/trips';

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
  highlights,
  trips,
  accommodation,
  tripFAQs,
  generalFAQs
}) => {
  return (
    <div>
      <h2 className="heading-md mb-6">Trip Overview</h2>
      <p className="text-lg text-gray-700 mb-8 container">{trip.description}</p>
      
      <TripHighlights highlights={highlights} arrowVariant="outline" />
      
      <MapItinerary itinerary={trip.itinerary} />
      
      <DailyAccordion days={trip.itinerary} />
      
      <WhereYouWillStay accommodation={accommodation} />
      
      <FlexDepositBar />
      
      <RelatedTrips trips={trips} />
      
      <FAQAccordion tripFAQs={tripFAQs} generalFAQs={generalFAQs} />
    </div>
  );
};

export default TourOverviewTab;

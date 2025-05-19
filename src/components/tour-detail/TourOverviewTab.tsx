
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
  highlights,
  trips,
  accommodation,
  tripFAQs,
  generalFAQs
}) => {
  return (
    <div className="mb-16">
      <h2 className="heading-md mb-8">Trip Overview</h2>
      <p className="text-lg text-gray-700 mb-12 container max-w-4xl">{trip.description}</p>
      
      <div className="mb-16">
        <TripHighlights highlights={highlights} arrowVariant="outline" />
      </div>
      
      <div className="mb-16">
        <MapItinerary itinerary={trip.itinerary} />
      </div>
      
      <div className="mb-16">
        <DailyAccordion days={trip.itinerary} />
      </div>
      
      <div className="mb-16">
        <WhereYouWillStay accommodation={accommodation} />
      </div>
      
      <div className="mb-16">
        <FlexDepositBar />
      </div>
      
      <div className="mb-16">
        <RelatedTrips trips={trips} />
      </div>
      
      <div className="mb-16">
        <FAQAccordion tripFAQs={tripFAQs} generalFAQs={generalFAQs} />
      </div>
    </div>
  );
};

export default TourOverviewTab;

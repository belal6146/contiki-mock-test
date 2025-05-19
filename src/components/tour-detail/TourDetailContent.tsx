
import React from 'react';
import { Trip } from '@/types/trip';
import TabNav from '@/components/tour/TabNav';
import TripHighlights from '@/components/tour/TripHighlights';
import DetailsGrid from '@/components/tour/DetailsGrid';
import DailyAccordion from '@/components/tour/DailyAccordion';
import RelatedTrips from '@/components/tour/RelatedTrips';
import FAQAccordion from '@/components/tour/FAQAccordion';
import WhereYouWillStay from '@/components/tour/WhereYouWillStay';
import FlexDepositBar from '@/components/tour/FlexDepositBar';

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
  // Default empty array for itinerary if it doesn't exist on trip
  const itinerary = trip.itinerary || [];
  
  // We'll check if these properties exist before passing them to components
  // If they don't exist, we'll pass empty arrays or null
  const highlights = trip.highlights || [];
  const accommodation = trip.accommodation || [];
  const faqs = trip.faqs || [];

  return (
    <main className="flex-1">
      {/* Price Bar and Flex Deposit Bar will be at the top */}
      <FlexDepositBar />
      
      {/* Tab Navigation and Content */}
      <TabNav 
        tabs={[
          { id: 'overview', label: 'Overview', content: (
            <div className="py-8 space-y-12">
              {/* Trip Highlights */}
              <TripHighlights highlights={highlights} />
              
              {/* Trip Details Grid */}
              <DetailsGrid details={tripDetails} />
              
              {/* Daily Itinerary */}
              <section className="container mx-auto">
                <h2 className="text-2xl font-bold mb-6">Day by Day</h2>
                <DailyAccordion itinerary={itinerary} />
              </section>
              
              {/* Where You'll Stay */}
              <WhereYouWillStay accommodation={accommodation} />
            </div>
          ) },
          { id: 'dates-pricing', label: 'Dates & Pricing', content: (
            <div className="py-8">
              <p className="text-xl">Dates and pricing content would go here</p>
            </div>
          ) },
          { id: 'reviews', label: 'Reviews', content: (
            <div className="py-8">
              <p className="text-xl">Reviews content would go here</p>
            </div>
          ) },
        ]}
      />
      
      {/* Related Trips */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8">Related Trips</h2>
          <RelatedTrips trips={relatedTrips} />
        </div>
      </section>
      
      {/* FAQs */}
      <section className="py-12 container mx-auto">
        <h2 className="text-3xl font-bold mb-8">Frequently Asked Questions</h2>
        <FAQAccordion faqs={faqs} />
      </section>
    </main>
  );
};

export default TourDetailContent;

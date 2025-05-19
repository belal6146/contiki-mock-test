
import React from 'react';
import { Trip } from '@/types/trip';
import TripHighlights from '@/components/tour/TripHighlights';
import DetailsGrid from '@/components/tour/DetailsGrid';
import DailyAccordion from '@/components/tour/DailyAccordion';
import RelatedTrips from '@/components/tour/RelatedTrips';
import FAQAccordion from '@/components/tour/FAQAccordion';
import WhereYouWillStay from '@/components/tour/WhereYouWillStay';
import FlexDepositBar from '@/components/tour/FlexDepositBar';
import TabNav, { TabPanel } from '@/components/tour/TabNav';
import TourDatesTab from '@/components/tour-detail/TourDatesTab';
import TourReviewsTab from '@/components/tour-detail/TourReviewsTab';

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
  
  // Create properly structured highlight objects from the string array
  const formattedHighlights = trip.highlights?.map((highlight, index) => ({
    id: `highlight-${index}`,
    title: highlight,
    description: highlight,
    image: '/placeholder.svg',
    type: 'Featured'
  })) || [];
  
  // Create proper Accommodation object with all required properties
  const mockAccommodation = {
    name: 'Comfortable Hotels',
    location: 'Various locations',
    image: '/placeholder.svg',
    nightsCount: 5
  };
  
  const mockFAQs = [
    { 
      question: 'What is included in the trip price?', 
      answer: 'The trip price includes accommodations, transportation, certain meals, and guided tours as specified in the itinerary.' 
    },
    { 
      question: 'What should I pack for this trip?', 
      answer: 'We recommend packing comfortable walking shoes, weather-appropriate clothing, and travel essentials.' 
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'dates-pricing', label: 'Dates & Pricing' },
    { id: 'reviews', label: 'Reviews' }
  ];

  return (
    <main className="flex-1">
      {/* Price Bar and Flex Deposit Bar will be at the top */}
      <FlexDepositBar />
      
      {/* Tab Navigation and Content */}
      <TabNav tabs={tabs}>
        <TabPanel id="overview">
          <div className="py-8 space-y-12">
            {/* Trip Highlights */}
            <TripHighlights highlights={formattedHighlights} />
            
            {/* Trip Details Grid */}
            <DetailsGrid highlights={trip.highlights || []} included={trip.included || []} />
            
            {/* Daily Itinerary */}
            <section className="container mx-auto">
              <h2 className="text-2xl font-bold mb-6">Day by Day</h2>
              <DailyAccordion days={itinerary} />
            </section>
            
            {/* Where You'll Stay */}
            <WhereYouWillStay accommodation={mockAccommodation} />
          </div>
        </TabPanel>
        
        <TabPanel id="dates-pricing">
          <TourDatesTab trip={trip} />
        </TabPanel>
        
        <TabPanel id="reviews">
          <TourReviewsTab />
        </TabPanel>
      </TabNav>
      
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
        <FAQAccordion tripFAQs={mockFAQs} generalFAQs={mockFAQs} />
      </section>
    </main>
  );
};

export default TourDetailContent;

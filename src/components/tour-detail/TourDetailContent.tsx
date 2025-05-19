
import React from 'react';
import { Trip } from '@/types/trip';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  
  // Define mock data for components that expect properties not in our Trip type
  // Create proper Accommodation object with all required properties
  const mockAccommodation = {
    name: 'Comfortable Hotels',
    location: 'Various locations',
    image: '/placeholder.svg',
    nightsCount: 5
  };
  
  // Create properly structured highlight objects from the string array
  const formattedHighlights = trip.highlights.map((highlight, index) => ({
    id: `highlight-${index}`,
    title: highlight,
    description: highlight,
    image: '/placeholder.svg',
    type: 'Featured'
  }));
  
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

  return (
    <main className="flex-1">
      {/* Price Bar and Flex Deposit Bar will be at the top */}
      <FlexDepositBar />
      
      {/* Tab Navigation and Content */}
      <div className="container mx-auto">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="mb-6 border-b border-gray-200 w-full flex justify-start">
            <TabsTrigger value="overview" className="px-4 py-2">Overview</TabsTrigger>
            <TabsTrigger value="dates-pricing" className="px-4 py-2">Dates & Pricing</TabsTrigger>
            <TabsTrigger value="reviews" className="px-4 py-2">Reviews</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="py-8 space-y-12">
            {/* Trip Highlights */}
            <TripHighlights highlights={formattedHighlights} />
            
            {/* Trip Details Grid */}
            <DetailsGrid highlights={trip.highlights} included={trip.included} />
            
            {/* Daily Itinerary */}
            <section className="container mx-auto">
              <h2 className="text-2xl font-bold mb-6">Day by Day</h2>
              <DailyAccordion days={itinerary} />
            </section>
            
            {/* Where You'll Stay */}
            <WhereYouWillStay accommodation={mockAccommodation} />
          </TabsContent>
          
          <TabsContent value="dates-pricing">
            <div className="py-8">
              <p className="text-xl">Dates and pricing content would go here</p>
            </div>
          </TabsContent>
          
          <TabsContent value="reviews">
            <div className="py-8">
              <p className="text-xl">Reviews content would go here</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
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

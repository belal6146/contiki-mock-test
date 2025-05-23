
import React, { useState } from 'react';
import TourOverviewTab from './TourOverviewTab';
import TourDatesTab from './TourDatesTab';
import TourReviewsTab from './TourReviewsTab';
import TabNav from '../tour/TabNav';
import { Trip } from '@/types/trip';

interface TourDetailContentProps {
  trip: Trip;
  tripDetails: { label: string; value: string }[];
  relatedTrips: Trip[];
}

const TourDetailContent: React.FC<TourDetailContentProps> = ({
  trip,
  tripDetails,
  relatedTrips,
}) => {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'dates', label: 'Dates & Prices' },
    { id: 'reviews', label: 'Reviews' }
  ];

  // Create mock data for the components that need it
  const mockHighlights = trip.highlights.map((highlight, index) => ({
    id: `highlight-${index}`,
    title: highlight,
    description: 'Experience this amazing highlight during your journey.',
    image: '/placeholder.svg',
    type: index % 2 === 0 ? 'Cultural' : 'Adventure'
  }));

  const mockAccommodation = {
    hotels: [
      {
        id: 'hotel-1',
        name: 'Luxury Mountain Resort',
        location: 'Swiss Alps',
        description: 'Stunning views and excellent amenities',
        image: '/placeholder.svg',
        rating: 4.5
      },
      {
        id: 'hotel-2',
        name: 'City Center Hotel',
        location: 'Paris',
        description: 'Right in the heart of the city',
        image: '/placeholder.svg',
        rating: 4.2
      }
    ]
  };

  const mockTripFAQs = [
    {
      id: 'faq-1',
      question: 'What should I pack?',
      answer: 'We recommend packing light clothes for daytime and something warmer for evenings.'
    },
    {
      id: 'faq-2',
      question: 'Is travel insurance required?',
      answer: 'Yes, we require all travelers to have comprehensive travel insurance for the duration of their trip.'
    }
  ];

  const mockGeneralFAQs = [
    {
      id: 'gen-faq-1',
      question: 'How do I book a trip?',
      answer: 'You can book online or call our customer service team.'
    },
    {
      id: 'gen-faq-2',
      question: 'What is your cancellation policy?',
      answer: 'Cancellation policies vary depending on the trip and how far in advance you cancel.'
    }
  ];

  const handleTabChange = (tabId: string) => {
    console.debug(`[TourDetailContent] Tab changed to: ${tabId}`);
    setActiveTab(tabId);
  };

  // Determine which content to show based on active tab
  const renderTabContent = () => {
    switch(activeTab) {
      case 'overview':
        return (
          <TourOverviewTab
            trip={trip}
            highlights={mockHighlights}
            trips={relatedTrips}
            accommodation={mockAccommodation}
            tripFAQs={mockTripFAQs}
            generalFAQs={mockGeneralFAQs}
          />
        );
      case 'dates':
        return <TourDatesTab trip={trip} />;
      case 'reviews':
        return <TourReviewsTab tripId={trip.id} />;
      default:
        return null;
    }
  };

  return (
    <div className="pb-16">
      <div className="container">
        <TabNav 
          tabs={tabs} 
          activeTab={activeTab}
          onChange={handleTabChange}
        >
          {renderTabContent()}
        </TabNav>
      </div>
    </div>
  );
};

export default TourDetailContent;

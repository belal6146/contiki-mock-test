
import React from 'react';
import Reviews from '@/components/tour/Reviews';

interface TourReviewsTabProps {
  tripId: string;
}

const TourReviewsTab: React.FC<TourReviewsTabProps> = ({ tripId }) => {
  return (
    <div className="mb-16 animate-fade-in">
      <div className="container py-8">
        <h2 className="heading-md mb-6">Traveler Reviews</h2>
        <p className="text-gray-600 mb-8">See what other travelers are saying about this trip.</p>
        <Reviews tripId={tripId} />
      </div>
    </div>
  );
};

export default TourReviewsTab;

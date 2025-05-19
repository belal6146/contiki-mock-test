
import React from 'react';
import Reviews from '@/components/tour/Reviews';

interface TourReviewsTabProps {
  tripId: string;
}

const TourReviewsTab: React.FC<TourReviewsTabProps> = ({ tripId }) => {
  return (
    <div>
      <h2 className="heading-md mb-6">Traveler Reviews</h2>
      <Reviews tripId={tripId} />
    </div>
  );
};

export default TourReviewsTab;


import React, { useEffect } from 'react';
import Reviews from '@/components/tour/Reviews';

interface TourReviewsTabProps {
  tripId: string;
}

const TourReviewsTab: React.FC<TourReviewsTabProps> = ({ tripId }) => {
  useEffect(() => {
    console.debug('[ResponsiveQA] TourReviewsTab', { 
      tripId, 
      breakpoint: window.innerWidth <= 640 ? 'mobile' : 
                 window.innerWidth <= 1024 ? 'tablet' : 'desktop'
    });
  }, [tripId]);

  return (
    <div className="mb-8 md:mb-16 animate-fade-in">
      <div className="container py-4 md:py-8">
        <h2 className="text-2xl md:text-3xl font-bold mb-3 md:mb-6">Traveler Reviews</h2>
        <p className="text-gray-600 mb-6 md:mb-8">See what other travelers are saying about this trip.</p>
        <Reviews tripId={tripId} />
      </div>
    </div>
  );
};

export default TourReviewsTab;

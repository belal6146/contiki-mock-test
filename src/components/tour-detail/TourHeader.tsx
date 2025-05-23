
import React from 'react';
import Breadcrumb from '@/components/Breadcrumb';
import TourRating from '@/components/tour-detail/TourRating';
import { Trip } from '@/types/trip';
import { cn } from '@/lib/utils';

interface TourHeaderProps {
  tour: Trip;
  slug?: string;
}

const TourHeader: React.FC<TourHeaderProps> = ({ tour, slug }) => {
  return (
    <div className="container pt-4">
      <Breadcrumb 
        title={tour.name} 
        destination={tour.destination} 
      />
      
      <div className="py-2">
        <TourRating rating={tour.rating} reviewCount={tour.reviewCount} />
        <h1 className="text-3xl md:text-4xl font-extrabold uppercase">{tour.name}</h1>
        <p className="text-gray-500 mt-1">Plus</p>
      </div>
    </div>
  );
};

export default TourHeader;

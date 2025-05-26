
import React from 'react';
import Breadcrumb from '@/components/Breadcrumb';
import TourRating from '@/components/tour-detail/TourRating';
import { Trip } from '@/types/trip';
import { Star } from 'lucide-react';

interface TourHeaderProps {
  tour: Trip;
  slug?: string;
}

const TourHeader: React.FC<TourHeaderProps> = ({ tour, slug }) => {
  return (
    <div className="container py-4">
      <Breadcrumb 
        title={tour.name} 
        destination={tour.destination} 
      />
      
      <div className="mt-3 mb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div className="flex items-center gap-3">
          {/* Star Rating */}
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`w-4 h-4 ${i < Math.floor(tour.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
              />
            ))}
            <span className="text-sm font-medium ml-1 text-gray-700">{tour.rating}</span>
          </div>
          
          {/* Reviews Link */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">
              <span className="font-medium">{tour.reviewCount}</span> Reviews
            </span>
            
            {/* Trip Spotlight Badge */}
            <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
              Trip Spotlight
            </span>
          </div>
        </div>
      </div>
      
      <div className="mb-2">
        <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tight leading-tight">{tour.name}</h1>
        <p className="text-gray-600 text-sm mt-1">Plus</p>
      </div>
    </div>
  );
};

export default TourHeader;

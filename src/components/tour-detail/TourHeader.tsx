
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
    <div className="container max-w-7xl mx-auto py-6 mt-20">
      <Breadcrumb 
        title={tour.name} 
        destination={tour.destination} 
      />
      
      <div className="mt-4 mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-4">
          {/* Star Rating */}
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`w-5 h-5 ${i < Math.floor(tour.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                />
              ))}
            </div>
            <span className="text-base font-bold ml-1 text-gray-900">{tour.rating}</span>
          </div>
          
          {/* Reviews Count */}
          <div className="flex items-center gap-3">
            <span className="text-base text-gray-700">
              <span className="font-semibold">{tour.reviewCount}</span> Reviews
            </span>
            
            {/* Trip Spotlight Badge */}
            <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold uppercase tracking-wide">
              Trip Spotlight
            </span>
          </div>
        </div>
      </div>
      
      <div className="mb-4">
        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight leading-tight text-gray-900">{tour.name}</h1>
        <p className="text-gray-600 text-base mt-2 font-medium">Plus</p>
      </div>
    </div>
  );
};

export default TourHeader;

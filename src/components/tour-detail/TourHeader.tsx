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
    <div className="container max-w-7xl mx-auto pt-12 pb-6 border-b border-gray-200">
      <Breadcrumb 
        title={tour.name} 
        destination={tour.destination} 
      />
      <div className="mt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="flex items-center gap-6">
          {/* Star Rating */}
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`w-6 h-6 ${i < Math.floor(tour.rating) ? 'text-[#FFEB3B] fill-[#FFEB3B]' : 'text-gray-300'}`} 
                />
              ))}
            </div>
            <span className="text-lg font-extrabold ml-2 text-black">{tour.rating}</span>
          </div>
          {/* Reviews Count */}
          <span className="text-base text-gray-700 font-semibold ml-4">
            <span className="font-bold">{tour.reviewCount}</span> Reviews
          </span>
          {/* Trip Spotlight Badge */}
          <span className="bg-[#FF0080] text-white px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wide ml-4">
            Trip Spotlight
          </span>
        </div>
      </div>
      <div className="mt-6 mb-2">
        <h1 className="text-5xl md:text-6xl font-black uppercase tracking-tight leading-tight text-black">{tour.name}</h1>
      </div>
    </div>
  );
};

export default TourHeader;

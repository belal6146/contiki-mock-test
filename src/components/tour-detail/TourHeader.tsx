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
      <div className="mt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex-1">
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight leading-tight text-black">{tour.name}</h1>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          <div className="flex items-center gap-1">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`w-4 h-4 ${i < Math.floor(tour.rating) ? 'text-[#FFEB3B] fill-[#FFEB3B]' : 'text-gray-300'}`} 
                />
              ))}
            </div>
            <span className="text-sm font-bold text-black">{tour.rating}</span>
          </div>
          <span className="text-sm text-gray-600">
            <span className="font-semibold">{tour.reviewCount}</span> Reviews
          </span>
          {tour.spotlight && (
            <span className="bg-[#FF0080] text-white px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide">
              Trip Spotlight
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default TourHeader;

import React from 'react';
import { Trip } from '@/types/trip';
import { Star } from 'lucide-react';

interface TourHeaderProps {
  tour: Trip;
  slug?: string;
}

const TourHeader: React.FC<TourHeaderProps> = ({ tour, slug }) => {
  return (
    <>
      {/* This component will now contain Rating, Reviews, and Variants */}
      <div className="flex flex-col items-start">
         {/* Rating and Reviews */}
        <div className="flex items-center gap-3 flex-shrink-0 mb-3">
          <div className="flex items-center gap-1">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`w-4 h-4 ${i < Math.floor(tour.rating) ? 'text-[#FFEB3B] fill-[#FFEB3B]' : 'text-gray-300 fill-gray-300'}`} 
                />
              ))}
            </div>
            <span className="text-sm font-bold text-black">{tour.rating}</span>
          </div>
          <span className="text-sm text-gray-600">
            <span className="font-semibold">{tour.reviewCount}</span> Reviews
          </span>
           {tour.spotlight && (
            <span className="ml-3 bg-[#FF0080] text-white px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide">
              Trip Spotlight
            </span>
          )}
        </div>

        {/* Variant Name (e.g., Standard) */}
        {/* Assuming tour object has a variantName property or similar */}
        {tour.variantName && (
           <p className="text-base text-gray-700 font-semibold">{tour.variantName}</p>
        )}

      </div>
    </>
  );
};

export default TourHeader;

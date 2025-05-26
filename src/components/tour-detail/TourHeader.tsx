
import React from 'react';
import Breadcrumb from '@/components/Breadcrumb';
import { Trip } from '@/types/trip';
import { Star } from 'lucide-react';

interface TourHeaderProps {
  tour: Trip;
  slug?: string;
}

const TourHeader: React.FC<TourHeaderProps> = ({ tour, slug }) => {
  return (
    <div className="bg-white border-b border-gray-200">
      <div className="container max-w-7xl mx-auto py-6">
        <Breadcrumb 
          title={tour.name} 
          destination={tour.destination} 
        />
        
        <div className="mt-4 mb-6 flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div className="flex-1">
            {/* Star Rating and Trip Spotlight */}
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-4 h-4 ${i < Math.floor(tour.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                    />
                  ))}
                </div>
                <span className="text-sm font-bold text-gray-900">{tour.rating}</span>
                <span className="text-sm text-gray-600">{tour.reviewCount} Reviews</span>
              </div>
              
              {/* Trip Spotlight Badge */}
              <span className="bg-red-500 text-white px-2 py-1 rounded text-xs font-bold uppercase tracking-wide">
                Trip Spotlight
              </span>
            </div>
            
            {/* Tour Title */}
            <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tight leading-tight text-gray-900 mb-2">
              {tour.name}
            </h1>
            <p className="text-gray-600 text-sm font-medium">Plus</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourHeader;

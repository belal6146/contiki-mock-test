
import React from 'react';

interface TourRatingProps {
  rating: number;
  reviewCount: number;
}

const TourRating: React.FC<TourRatingProps> = ({ rating, reviewCount }) => {
  return (
    <div className="flex items-center mb-2">
      {/* Star Rating Display */}
      <div className="flex items-center">
        {Array.from({ length: 5 }).map((_, i) => (
          <svg 
            key={i} 
            className={`w-5 h-5 ${i < Math.floor(rating) ? "text-yellow-400" : "text-gray-300"}`} 
            fill="currentColor" 
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
        <span className="ml-2 text-sm text-gray-600">{rating} ({reviewCount} reviews)</span>
      </div>
      
      {/* Trip Spotlight Badge */}
      {rating >= 4.5 && (
        <span className="ml-4 bg-[#FF3B5C] text-white text-xs font-bold px-2 py-1 rounded">
          Trip Spotlight
        </span>
      )}
    </div>
  );
};

export default TourRating;

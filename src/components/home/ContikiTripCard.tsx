
import React from 'react';
import { Star } from 'lucide-react';

interface ContikiTripCardProps {
  id: number;
  title: string;
  image: string;
  rating: number;
  days: number;
  places: number;
  countries: number;
  description: string;
  regularPrice: string;
  price: string;
  spotlight?: boolean;
}

const ContikiTripCard: React.FC<ContikiTripCardProps> = ({
  title,
  image,
  rating,
  days,
  places,
  countries,
  description,
  regularPrice,
  price,
  spotlight = false
}) => {
  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} className="h-3 w-3 fill-[#CCFF00] text-[#CCFF00]" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Star key="half" className="h-3 w-3 fill-[#CCFF00] text-[#CCFF00] opacity-50" />
      );
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <Star key={`empty-${i}`} className="h-3 w-3 text-gray-300" />
      );
    }

    return stars;
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden group hover:shadow-lg transition-shadow duration-300">
      {/* Image Section */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {spotlight && (
          <div className="absolute top-3 left-3 bg-[#FF0080] text-white text-xs font-bold px-2 py-1 rounded">
            Trip Spotlight
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-4">
        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          {renderStars(rating)}
          <span className="text-sm font-bold ml-1">{rating}</span>
        </div>

        {/* Title */}
        <h3 className="font-bold text-lg mb-2 text-gray-900">{title}</h3>

        {/* Trip Details */}
        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
          <div className="flex items-center gap-1">
            <span className="font-medium">{days}</span>
            <span>Days</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="font-medium">{places}</span>
            <span>Places</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="font-medium">{countries}</span>
            <span>Country</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-700 mb-4 line-clamp-3">{description}</p>

        {/* Add to Compare Button */}
        <button className="w-full border border-gray-300 text-gray-700 py-2 px-4 rounded mb-3 hover:bg-gray-50 transition-colors text-sm font-medium">
          🔄 Add to compare
        </button>

        {/* Pricing */}
        <div className="mb-3">
          <div className="text-xs text-gray-500 line-through">{regularPrice}</div>
          <div className="text-lg font-bold text-gray-900">From {price}</div>
        </div>

        {/* View Trip Button */}
        <button className="w-full bg-[#CCFF00] text-black py-2 px-4 rounded font-bold text-sm hover:bg-[#b8e600] transition-colors">
          VIEW TRIP
        </button>
      </div>
    </div>
  );
};

export default ContikiTripCard;

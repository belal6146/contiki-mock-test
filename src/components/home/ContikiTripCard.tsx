import React from 'react';
import { Star, Calendar, MapPin, Globe, PlusCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

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

const ContikiTripCard: React.FC<ContikiTripCardProps & { slug?: string }> = ({
  title,
  image,
  rating,
  days,
  places,
  countries,
  description,
  regularPrice,
  price,
  spotlight = false,
  id,
  slug
}) => {
  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} className="h-4 w-4 fill-[#FFEB3B] text-[#FFEB3B]" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Star key="half" className="h-4 w-4 fill-[#FFEB3B] text-[#FFEB3B] opacity-50" />
      );
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <Star key={`empty-${i}`} className="h-4 w-4 text-gray-300" />
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
      <div className="p-5">
        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          {renderStars(rating)}
          <span className="text-base font-bold ml-2 text-gray-900">{rating}</span>
        </div>

        {/* Title */}
        <h3 className="font-extrabold text-xl mb-2 text-black">{title}</h3>

        {/* Trip Details */}
        <div className="flex items-center gap-4 text-sm text-gray-700 mb-3">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4 mr-1 text-gray-700" />
            <span className="font-bold">{days}</span>
            <span>Days</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4 mr-1 text-gray-700" />
            <span className="font-bold">{places}</span>
            <span>Places</span>
          </div>
          <div className="flex items-center gap-1">
            <Globe className="w-4 h-4 mr-1 text-gray-700" />
            <span className="font-bold underline cursor-pointer">{countries} Country</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-800 mb-4 line-clamp-3">{description}</p>

        {/* Add to Compare Button */}
        <button className="w-full flex items-center justify-center border-2 border-black text-black py-2 px-4 rounded-full mb-3 bg-white hover:bg-gray-100 transition-colors text-base font-bold gap-2">
          <PlusCircle className="w-5 h-5 mr-1" /> Add to compare
        </button>

        {/* Pricing */}
        <div className="mb-3">
          <div className="text-base text-gray-500 line-through">{regularPrice}</div>
          <div className="text-xl font-extrabold text-black">From {price}</div>
        </div>

        {/* View Trip Button */}
        <Link
          to={slug ? `/tours/${slug}` : `/tours/${id}`}
          className="w-full block bg-[#CCFF00] text-black py-3 px-4 rounded-full font-extrabold text-base hover:bg-[#b8e600] transition-colors uppercase tracking-wide shadow-lg text-center mt-2"
        >
          VIEW TRIP
        </Link>
      </div>
    </div>
  );
};

export default ContikiTripCard;

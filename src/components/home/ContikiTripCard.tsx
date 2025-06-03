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
        <Star key={i} className="h-3.5 w-3.5 fill-contikiYellow text-contikiYellow" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Star key="half" className="h-3.5 w-3.5 fill-contikiYellow text-contikiYellow opacity-50" />
      );
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <Star key={`empty-${i}`} className="h-3.5 w-3.5 text-gray-300" />
      );
    }

    return stars;
  };

  return (
    <div className="bg-white rounded-[8px] overflow-hidden group hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] transition-all duration-300">
      {/* Image Section */}
      <div className="relative aspect-[2/1] overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
        />
        {spotlight && (
          <div className="absolute top-3 left-3 bg-contikiPink text-white text-[11px] font-bold px-2.5 py-1 rounded-[4px] tracking-[0.5px]">
            Trip Spotlight
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-4">
        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          {renderStars(rating)}
          <span className="text-[13px] font-semibold ml-2 text-gray-900">{rating}</span>
        </div>

        {/* Title */}
        <h3 className="font-extrabold text-[18px] leading-tight mb-3 text-black line-clamp-2">{title}</h3>

        {/* Trip Details */}
        <div className="flex items-center gap-4 text-[13px] text-gray-700 mb-4">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-gray-700" />
            <span className="font-bold">{days}</span>
            <span>Days</span>
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-gray-700" />
            <span className="font-bold">{places}</span>
            <span>Places</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Globe className="w-4 h-4 text-gray-700" />
            <span className="font-bold underline cursor-pointer">{countries} Countr{countries === 1 ? 'y' : 'ies'}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-[13px] text-gray-800 mb-4 line-clamp-3 leading-relaxed">{description}</p>

        {/* Add to Compare Button */}
        <button className="w-full flex items-center justify-center border border-black text-black py-2.5 px-4 rounded-full mb-3 bg-white hover:bg-gray-50 transition-colors text-[13px] font-semibold gap-1.5">
          <PlusCircle className="w-4 h-4" /> Add to compare
        </button>

        {/* Pricing */}
        <div className="mb-4">
          {regularPrice && <div className="text-[13px] text-gray-500 line-through">{regularPrice}</div>}
          <div className="text-[18px] font-extrabold text-black">From {price}</div>
        </div>

        {/* View Trip Button */}
        <Link
          to={slug ? `/tours/${slug}` : `/tours/${id}`}
          className="w-full block bg-secondary text-black py-3 px-4 rounded-full font-extrabold text-[13px] hover:bg-[#b8e600] transition-colors uppercase tracking-[0.5px] shadow-[0_2px_4px_rgba(0,0,0,0.1)] text-center"
        >
          VIEW TRIP
        </Link>
      </div>
    </div>
  );
};

export default ContikiTripCard;

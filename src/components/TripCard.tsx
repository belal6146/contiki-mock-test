
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { formatCurrency } from '@/lib/utils';
import { trackEvent } from '@/lib/analytics';

interface TripCardProps {
  id: string;
  title: string;
  region: string;
  price: number;
  oldPrice?: number;
  duration?: number;
  countries?: number;
  image?: string;
  isSpotlight?: boolean;
  discountPercentage?: number;
  slug?: string;
}

const TripCard = ({ 
  id, 
  title, 
  region, 
  price, 
  oldPrice, 
  duration, 
  countries, 
  image, 
  isSpotlight = false, 
  discountPercentage = 0,
  slug = ''
}: TripCardProps) => {
  useEffect(() => {
    console.debug('[TripCard] mounted', { id });
  }, [id]);

  const handleClick = () => {
    console.debug('[TripCard] clicked', { id, title, region });
    trackEvent('trip_card_click', { id, title, region });
  };

  // Use the provided image or get one from Unsplash based on the region
  const getCardImage = () => {
    if (image && !image.includes('placeholder')) {
      return image;
    }
    
    // Construct search term based on region
    const searchTerm = region.toLowerCase().replace(/\s+/g, ',');
    return `https://source.unsplash.com/random/600x400/?travel,${searchTerm}`;
  };

  // Use slug if available, otherwise use id
  const linkUrl = `/tours/${slug || id}`;

  return (
    <Link to={linkUrl} onClick={handleClick} className="block">
      <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
        {/* Card Image with optional badges */}
        <div className="relative">
          <img 
            src={getCardImage()} 
            alt={title} 
            className="w-full h-48 object-cover"
            loading="lazy"
          />
          
          {/* Discount Badge */}
          {discountPercentage > 0 && (
            <div className="absolute top-3 left-3 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded">
              {discountPercentage}% OFF
            </div>
          )}
          
          {/* Spotlight Badge */}
          {isSpotlight && (
            <div className="absolute top-3 right-3 bg-[#FF3B5C] text-white text-xs font-bold px-3 py-1 rounded">
              Trip Spotlight
            </div>
          )}
        </div>
        
        {/* Card Content */}
        <div className="p-4">
          <h3 className="font-montserrat font-bold text-lg mb-2 line-clamp-2">{title}</h3>
          
          {/* Trip Details: Duration, Countries */}
          {(duration || countries) && (
            <div className="text-sm text-gray-600 mb-4">
              {duration && `${duration} days`}
              {duration && countries && ' · '}
              {countries && `${countries} ${countries === 1 ? 'country' : 'countries'}`}
            </div>
          )}
          
          {/* Region */}
          <p className="font-montserrat text-gray-600 mb-3">{region}</p>
          
          {/* Price */}
          <div className="flex items-baseline">
            <span className="text-xs text-gray-500 mr-1">From </span>
            {oldPrice && (
              <span className="text-gray-400 line-through text-sm mr-2">
                {formatCurrency(oldPrice)}
              </span>
            )}
            <span className="font-montserrat font-bold text-lg">
              {formatCurrency(price)}
            </span>
          </div>
          
          {/* View Details Link */}
          <button className="mt-3 text-sm font-medium text-[#00BFFF]">
            View Details
          </button>
        </div>
      </div>
    </Link>
  );
};

export default TripCard;

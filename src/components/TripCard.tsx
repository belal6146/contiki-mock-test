
import React, { useEffect, useState } from 'react';
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
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    console.debug('[TripCard] mounted', { id });
  }, [id]);

  const handleClick = () => {
    console.debug('[TripCard] clicked', { id, title, region });
    trackEvent('trip_card_click', { id, title, region });
  };

  // Enhanced image selection with better travel photography
  const getCardImage = () => {
    if (image && !image.includes('placeholder')) {
      return image;
    }
    
    // Create more specific search terms based on region and title
    const searchTerms = [];
    
    // Add region-specific terms
    if (region.toLowerCase().includes('europe')) {
      searchTerms.push('europe', 'backpacking', 'cities');
    } else if (region.toLowerCase().includes('asia')) {
      searchTerms.push('asia', 'temple', 'culture');
    } else if (region.toLowerCase().includes('america')) {
      searchTerms.push('america', 'adventure', 'landscape');
    } else {
      searchTerms.push(region.toLowerCase().replace(/\s+/g, ''));
    }
    
    // Add travel-related terms
    searchTerms.push('travel', 'adventure', 'young');
    
    const searchQuery = searchTerms.join(',');
    return `https://source.unsplash.com/featured/600x400/?${searchQuery}&sig=${id}`;
  };

  const imageUrl = getCardImage();
  const linkUrl = `/tours/${slug || id}`;

  useEffect(() => {
    const img = new Image();
    img.src = imageUrl;
    img.onload = () => {
      setIsImageLoaded(true);
      console.debug('[TripCard] imageLoaded', { id });
    };
    img.onerror = () => {
      setIsImageLoaded(true);
    };
  }, [imageUrl, id]);

  return (
    <Link to={linkUrl} onClick={handleClick} className="block group">
      <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        {/* Card Image with enhanced loading */}
        <div className="relative h-48 overflow-hidden">
          <div 
            className={`w-full h-full bg-cover bg-center transition-all duration-700 transform group-hover:scale-110 ${
              isImageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ backgroundImage: `url(${imageUrl})` }}
          />
          
          {/* Loading placeholder */}
          {!isImageLoaded && (
            <div className="absolute inset-0 bg-gray-300 animate-pulse" />
          )}
          
          {/* Image overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          
          {/* Discount Badge */}
          {discountPercentage > 0 && (
            <div className="absolute top-3 left-3 bg-[#CCFF00] text-black text-xs font-bold px-3 py-1 rounded-full shadow-lg">
              {discountPercentage}% OFF
            </div>
          )}
          
          {/* Spotlight Badge */}
          {isSpotlight && (
            <div className="absolute top-3 right-3 bg-[#FF3B5C] text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
              Trip Spotlight
            </div>
          )}
        </div>
        
        {/* Card Content */}
        <div className="p-5">
          <h3 className="font-bold text-lg mb-3 line-clamp-2 text-gray-900 group-hover:text-[#FF6900] transition-colors duration-200">
            {title}
          </h3>
          
          {/* Trip Details */}
          {(duration || countries) && (
            <div className="text-sm text-gray-600 mb-3 flex items-center gap-2">
              {duration && (
                <span className="bg-gray-100 px-2 py-1 rounded text-xs font-medium">
                  {duration} days
                </span>
              )}
              {countries && (
                <span className="bg-gray-100 px-2 py-1 rounded text-xs font-medium">
                  {countries} {countries === 1 ? 'country' : 'countries'}
                </span>
              )}
            </div>
          )}
          
          {/* Region */}
          <p className="text-gray-600 mb-4 text-sm font-medium">{region}</p>
          
          {/* Price */}
          <div className="flex items-baseline mb-4">
            <span className="text-xs text-gray-500 mr-1">From </span>
            {oldPrice && (
              <span className="text-gray-400 line-through text-sm mr-2">
                {formatCurrency(oldPrice)}
              </span>
            )}
            <span className="font-bold text-xl text-[#FF6900]">
              {formatCurrency(price)}
            </span>
          </div>
          
          {/* View Details Button */}
          <button className="w-full bg-[#FF6900] text-white py-2 px-4 rounded-lg font-medium hover:bg-[#FF6900]/90 transition-all duration-200 transform group-hover:scale-105">
            View Details
          </button>
        </div>
      </div>
    </Link>
  );
};

export default TripCard;

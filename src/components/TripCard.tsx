
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
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    console.debug('[TripCard] mounted', { id });
  }, [id]);

  const handleClick = () => {
    console.debug('[TripCard] clicked', { id, title, region });
    trackEvent('trip_card_click', { id, title, region });
  };

  // Generate reliable Unsplash image based on region/title
  const getCardImage = () => {
    if (image && !image.includes('placeholder')) {
      return image;
    }
    
    // Use reliable Unsplash image URLs with specific IDs
    const imageMap: { [key: string]: string } = {
      'europe': 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      'asia': 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      'america': 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      'default': 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    };
    
    const regionKey = region.toLowerCase().includes('europe') ? 'europe' :
                     region.toLowerCase().includes('asia') ? 'asia' :
                     region.toLowerCase().includes('america') ? 'america' : 'default';
    
    return imageMap[regionKey];
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
      console.debug('[TripCard] image failed to load', { id, imageUrl });
      setImageError(true);
      setIsImageLoaded(true);
    };
  }, [imageUrl, id]);

  return (
    <Link to={linkUrl} onClick={handleClick} className="block group">
      <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        {/* Card Image with enhanced loading */}
        <div className="relative h-48 overflow-hidden bg-gray-200">
          {isImageLoaded && !imageError ? (
            <img 
              src={imageUrl}
              alt={`${title} tour in ${region}`}
              className="w-full h-full object-cover transition-all duration-700 transform group-hover:scale-110"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
              <span className="text-gray-600 text-sm">Loading...</span>
            </div>
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

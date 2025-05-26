import React, { useEffect, useState, memo } from 'react';
import { Link } from 'react-router-dom';
import { formatCurrency } from '@/lib/utils';
import { trackEvent } from '@/lib/analytics';
import { CardBase } from '@/components/ui/utilities';

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

const TripCard = memo<TripCardProps>(({ 
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
}) => {
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
      'europe': 'https://lovable-uploads.s3.amazonaws.com/european-horizon.jpg',
      'asia': 'https://lovable-uploads.s3.amazonaws.com/asian-adventure.jpg',
      'america': 'https://lovable-uploads.s3.amazonaws.com/american-dream.jpg',
      'default': 'https://lovable-uploads.s3.amazonaws.com/contiki-default.jpg'
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
    <article>
      <Link 
        to={linkUrl} 
        onClick={handleClick} 
        className="block group"
        aria-label={`View details for ${title} trip in ${region}`}
      >
        <CardBase variant="elevated" className="h-full">
          {/* Card Image with enhanced loading */}
          <header className="relative h-56 overflow-hidden bg-gray-100">
            {isImageLoaded && !imageError ? (
              <img 
                src={imageUrl}
                alt={`${title} tour destination in ${region}`}
                className="w-full h-full object-cover transition-all duration-700 transform group-hover:scale-110"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-600 flex items-center justify-center">
                <span className="text-gray-600 text-sm">Loading...</span>
              </div>
            )}
            
            {/* Image overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent" aria-hidden="true" />
            
            {/* Discount Badge */}
            {discountPercentage > 0 && (
              <div className="absolute top-4 left-4 bg-[#CCFF00] text-black text-sm font-extrabold px-4 py-2 rounded-full shadow-lg uppercase tracking-wider">
                {discountPercentage}% OFF
              </div>
            )}
            
            {/* Spotlight Badge */}
            {isSpotlight && (
              <div className="absolute top-4 right-4 bg-[#FF0080] text-white text-sm font-extrabold px-4 py-2 rounded-full shadow-lg uppercase tracking-wider">
                Trip Spotlight
              </div>
            )}
          </header>
          
          {/* Card Content */}
          <div className="p-6">
            <h3 className="font-extrabold text-xl mb-4 line-clamp-2 text-gray-900 group-hover:text-[#CCFF00] transition-colors duration-200 tracking-tight">
              {title}
            </h3>
            
            {/* Trip Details */}
            {(duration || countries) && (
              <div className="text-sm text-gray-600 mb-4 flex items-center gap-3" role="list">
                {duration && (
                  <span className="bg-gray-100 px-3 py-1.5 rounded-full text-sm font-bold" role="listitem">
                    {duration} Days
                  </span>
                )}
                {countries && (
                  <span className="bg-gray-100 px-3 py-1.5 rounded-full text-sm font-bold" role="listitem">
                    {countries} {countries === 1 ? 'Country' : 'Countries'}
                  </span>
                )}
              </div>
            )}
            
            {/* Region */}
            <p className="text-gray-700 mb-5 text-base font-bold">{region}</p>
            
            {/* Price */}
            <div className="flex items-baseline mb-6">
              <span className="text-sm text-gray-600 mr-2">From </span>
              {oldPrice && (
                <span className="text-gray-500 line-through text-base mr-3" aria-label={`Original price ${formatCurrency(oldPrice)}`}>
                  {formatCurrency(oldPrice)}
                </span>
              )}
              <span className="font-extrabold text-2xl text-gray-900" aria-label={`Current price ${formatCurrency(price)}`}>
                {formatCurrency(price)}
              </span>
            </div>
            
            {/* View Details Button */}
            <button className="w-full bg-[#CCFF00] text-black py-3 px-6 rounded-full font-extrabold text-base uppercase tracking-wider hover:bg-[#b8e600] transition-all duration-200 transform group-hover:scale-105 shadow-lg">
              View Details
            </button>
          </div>
        </CardBase>
      </Link>
    </article>
  );
});

TripCard.displayName = 'TripCard';

export default TripCard;

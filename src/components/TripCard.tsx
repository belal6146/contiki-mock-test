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
  viewType?: 'grid' | 'list';
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
  slug = '',
  viewType = 'grid'
}) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = image || '';
    img.onload = () => setIsImageLoaded(true);
    img.onerror = () => {
      setImageError(true);
      setIsImageLoaded(true);
    };
  }, [image]);

  const handleClick = () => {
    trackEvent('trip_card_click', { id, title, region });
  };

  const getCardImage = () => {
    if (image && !image.includes('placeholder')) {
      return image;
    }
    
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

  if (viewType === 'list') {
    return (
      <article className="group">
        <Link 
          to={linkUrl} 
          onClick={handleClick} 
          className="block"
        >
          <CardBase variant="elevated" className="flex bg-white border border-gray-200 hover:border-[#D8FD02] transition-all duration-300">
            {/* Card Image */}
            <div className="relative w-64 h-48 overflow-hidden bg-gray-100">
              {isImageLoaded && !imageError ? (
                <img 
                  src={imageUrl}
                  alt={`${title} tour destination in ${region}`}
                  className="w-full h-full object-cover transition-all duration-700 transform group-hover:scale-110"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-600 flex items-center justify-center">
                  <div className="animate-pulse flex flex-col items-center gap-2">
                    <svg className="h-8 w-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-gray-600 text-[13px]">Loading image...</span>
                  </div>
                </div>
              )}
              
              {/* Image overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true" />
              
              {/* Badges */}
              {discountPercentage > 0 && (
                <div className="absolute top-4 left-4 bg-[#D8FD02] text-black text-[13px] font-bold px-4 py-2 rounded-full shadow-[0_2px_4px_rgba(0,0,0,0.1)] uppercase tracking-[0.5px]">
                  {discountPercentage}% OFF
                </div>
              )}
              
              {isSpotlight && (
                <div className="absolute top-4 right-4 bg-[#FF0080] text-white text-[13px] font-bold px-4 py-2 rounded-full shadow-[0_2px_4px_rgba(0,0,0,0.1)] uppercase tracking-[0.5px]">
                  Trip Spotlight
                </div>
              )}
            </div>
            
            {/* Card Content */}
            <div className="flex-1 p-6 flex flex-col">
              <div className="flex-1">
                <h3 className="font-bold text-[18px] mb-4 line-clamp-2 text-gray-900 group-hover:text-[#D8FD02] transition-colors duration-200 tracking-tight">
                  {title}
                </h3>
                
                {/* Trip Details */}
                {(duration || countries) && (
                  <div className="text-[13px] text-gray-600 mb-4 flex items-center gap-3">
                    {duration && (
                      <span className="bg-gray-100 px-3 py-1.5 rounded-full text-[13px] font-bold group-hover:bg-gray-200 transition-colors duration-200">
                        {duration} Days
                      </span>
                    )}
                    {countries && (
                      <span className="bg-gray-100 px-3 py-1.5 rounded-full text-[13px] font-bold group-hover:bg-gray-200 transition-colors duration-200">
                        {countries} {countries === 1 ? 'Country' : 'Countries'}
                      </span>
                    )}
                  </div>
                )}
                
                {/* Region */}
                <p className="text-gray-700 mb-5 text-[15px] font-bold group-hover:text-gray-900 transition-colors duration-200">{region}</p>
              </div>
              
              {/* Price and Button */}
              <div className="flex items-center justify-between">
                <div className="flex items-baseline">
                  <span className="text-[13px] text-gray-600 mr-2">From </span>
                  {oldPrice && (
                    <span className="text-gray-500 line-through text-[15px] mr-3">
                      {formatCurrency(oldPrice)}
                    </span>
                  )}
                  <span className="font-bold text-[28px] text-gray-900">
                    {formatCurrency(price)}
                  </span>
                  <span className="text-[13px] text-gray-600 ml-2">per person</span>
                </div>
                
                <button className="bg-[#D8FD02] text-black py-3 px-6 rounded-full font-bold text-[15px] uppercase tracking-[0.5px] hover:bg-[#c4e602] transition-all duration-200 transform group-hover:scale-105 shadow-[0_2px_4px_rgba(0,0,0,0.1)] hover:shadow-[0_4px_8px_rgba(0,0,0,0.1)] flex items-center gap-2">
                  <span>View Details</span>
                  <svg className="h-5 w-5 transform group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </CardBase>
        </Link>
      </article>
    );
  }

  return (
    <article className="group">
      <Link 
        to={linkUrl} 
        onClick={handleClick} 
        className="block h-full"
      >
        <CardBase variant="elevated" className="h-full bg-white border border-gray-200 hover:border-[#D8FD02] transition-all duration-300">
          {/* Card Image */}
          <div className="relative h-64 overflow-hidden bg-gray-100">
            {isImageLoaded && !imageError ? (
              <img 
                src={imageUrl}
                alt={`${title} tour destination in ${region}`}
                className="w-full h-full object-cover transition-all duration-700 transform group-hover:scale-110"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-600 flex items-center justify-center">
                <div className="animate-pulse flex flex-col items-center gap-2">
                  <svg className="h-8 w-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-gray-600 text-[13px]">Loading image...</span>
                </div>
              </div>
            )}
            
            {/* Image overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true" />
            
            {/* Badges */}
            {discountPercentage > 0 && (
              <div className="absolute top-4 left-4 bg-[#D8FD02] text-black text-[13px] font-bold px-4 py-2 rounded-full shadow-[0_2px_4px_rgba(0,0,0,0.1)] uppercase tracking-[0.5px] transform group-hover:scale-105 transition-transform duration-200">
                {discountPercentage}% OFF
              </div>
            )}
            
            {isSpotlight && (
              <div className="absolute top-4 right-4 bg-[#FF0080] text-white text-[13px] font-bold px-4 py-2 rounded-full shadow-[0_2px_4px_rgba(0,0,0,0.1)] uppercase tracking-[0.5px] transform group-hover:scale-105 transition-transform duration-200">
                Trip Spotlight
              </div>
            )}
          </div>
          
          {/* Card Content */}
          <div className="p-6">
            <h3 className="font-bold text-[18px] mb-4 line-clamp-2 text-gray-900 group-hover:text-[#D8FD02] transition-colors duration-200 tracking-tight">
              {title}
            </h3>
            
            {/* Trip Details */}
            {(duration || countries) && (
              <div className="text-[13px] text-gray-600 mb-4 flex items-center gap-3">
                {duration && (
                  <span className="bg-gray-100 px-3 py-1.5 rounded-full text-[13px] font-bold group-hover:bg-gray-200 transition-colors duration-200">
                    {duration} Days
                  </span>
                )}
                {countries && (
                  <span className="bg-gray-100 px-3 py-1.5 rounded-full text-[13px] font-bold group-hover:bg-gray-200 transition-colors duration-200">
                    {countries} {countries === 1 ? 'Country' : 'Countries'}
                  </span>
                )}
              </div>
            )}
            
            {/* Region */}
            <p className="text-gray-700 mb-5 text-[15px] font-bold group-hover:text-gray-900 transition-colors duration-200">{region}</p>
            
            {/* Price */}
            <div className="flex items-baseline mb-6">
              <span className="text-[13px] text-gray-600 mr-2">From </span>
              {oldPrice && (
                <span className="text-gray-500 line-through text-[15px] mr-3">
                  {formatCurrency(oldPrice)}
                </span>
              )}
              <span className="font-bold text-[28px] text-gray-900">
                {formatCurrency(price)}
              </span>
              <span className="text-[13px] text-gray-600 ml-2">per person</span>
            </div>
            
            {/* View Details Button */}
            <button className="w-full bg-[#D8FD02] text-black py-3 px-6 rounded-full font-bold text-[15px] uppercase tracking-[0.5px] hover:bg-[#c4e602] transition-all duration-200 transform group-hover:scale-105 shadow-[0_2px_4px_rgba(0,0,0,0.1)] hover:shadow-[0_4px_8px_rgba(0,0,0,0.1)] flex items-center justify-center gap-2">
              <span>View Details</span>
              <svg className="h-5 w-5 transform group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </CardBase>
      </Link>
    </article>
  );
});

TripCard.displayName = 'TripCard';

export default TripCard;

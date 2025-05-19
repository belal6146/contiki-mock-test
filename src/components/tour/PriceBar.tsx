
import React, { useEffect } from 'react';
import { formatCurrency } from '@/lib/utils';
import { trackEvent } from '@/lib/analytics';

interface PriceBarProps {
  oldPrice?: number;
  newPrice: number;
  rating?: number;
  reviewCount?: number;
}

const PriceBar: React.FC<PriceBarProps> = ({ 
  oldPrice, 
  newPrice, 
  rating = 0, 
  reviewCount = 0 
}) => {
  useEffect(() => {
    console.debug('[PriceBar] mounted', { oldPrice, newPrice, rating, reviewCount });
  }, [oldPrice, newPrice, rating, reviewCount]);
  
  const handleViewDates = () => {
    console.debug('[PriceBar] viewDates clicked');
    trackEvent('view_dates_clicked', { price: newPrice });
    // Navigate to the dates section
    document.getElementById('dates')?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const handleRequestInfo = () => {
    console.debug('[PriceBar] requestInfo clicked');
    trackEvent('request_info_clicked', { price: newPrice });
  };
  
  return (
    <section className="sticky top-16 z-40 bg-white shadow-md" aria-label="Tour pricing information">
      <div className="container">
        <div className="py-4 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="mr-6">
              <p className="text-sm text-gray-500">From</p>
              <div className="flex items-end gap-2">
                {oldPrice && (
                  <p className="text-lg text-gray-400 line-through font-montserrat" aria-label={`Original price: ${formatCurrency(oldPrice)}`}>
                    {formatCurrency(oldPrice)}
                  </p>
                )}
                <p className="text-2xl font-bold text-primary font-montserrat" aria-label={`Current price: ${formatCurrency(newPrice)}`}>
                  {formatCurrency(newPrice)}
                </p>
              </div>
            </div>
            
            {(rating > 0 || reviewCount > 0) && (
              <div className="flex items-center">
                <div className="flex items-center mr-2" aria-label={`Rating: ${rating} out of 5 stars`}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg 
                      key={i}
                      xmlns="http://www.w3.org/2000/svg" 
                      width="16" 
                      height="16" 
                      viewBox="0 0 24 24" 
                      fill={(i < Math.floor(rating)) ? "currentColor" : "none"}
                      stroke="currentColor"
                      strokeWidth="2"
                      className={i < Math.floor(rating) ? "text-yellow-500" : "text-gray-300"}
                      aria-hidden="true"
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                    </svg>
                  ))}
                </div>
                <span className="text-gray-600 font-montserrat">
                  {rating > 0 ? `${rating} ` : ''}
                  {reviewCount > 0 ? `(${reviewCount} reviews)` : ''}
                </span>
              </div>
            )}
          </div>
          
          <div className="flex space-x-3">
            <button 
              className="btn-outline px-4 py-2 border-secondary text-secondary hover:bg-secondary hover:text-white font-montserrat focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary"
              onClick={handleRequestInfo}
              aria-label="Request more information"
            >
              REQUEST INFO
            </button>
            <button 
              className="btn-primary px-6 py-2 bg-[#CCFF00] text-black hover:bg-[#CCFF00]/90 font-montserrat focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent"
              onClick={handleViewDates}
              aria-label="View available dates"
            >
              VIEW DATES
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PriceBar;

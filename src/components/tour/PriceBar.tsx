
import React, { useEffect } from 'react';
import { formatCurrency } from '@/lib/utils';
import { trackEvent } from '@/lib/analytics';
import { Share, Plus } from 'lucide-react';

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
    const datesTab = document.querySelector('[data-tab="dates"]') as HTMLElement;
    if (datesTab) {
      datesTab.click();
    }
  };
  
  const handleRequestInfo = () => {
    console.debug('[PriceBar] requestInfo clicked');
    trackEvent('request_info_clicked', { price: newPrice });
  };
  
  return (
    <section className="sticky top-16 z-40 bg-white shadow-sm border-b border-gray-200" aria-label="Tour pricing information">
      <div className="container">
        <div className="py-4 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="mr-6">
              <p className="text-sm text-gray-500 mb-1">From</p>
              <div className="flex items-end gap-2">
                {oldPrice && (
                  <p className="text-lg text-gray-400 line-through font-medium" aria-label={`Original price: ${formatCurrency(oldPrice)}`}>
                    {formatCurrency(oldPrice)}
                  </p>
                )}
                <p className="text-2xl font-bold text-black" aria-label={`Current price: ${formatCurrency(newPrice)}`}>
                  {formatCurrency(newPrice)}
                </p>
              </div>
              <p className="text-sm text-gray-600">Save your space with a deposit payment</p>
            </div>
          </div>
          
          <div className="flex space-x-4 items-center">
            <button
              className="flex items-center gap-1 text-gray-700 hover:text-black"
              aria-label="Share this tour"
            >
              <Share size={18} />
              <span className="text-sm font-semibold">Share</span>
            </button>
            
            <button
              className="flex items-center gap-1 text-gray-700 hover:text-black"
              aria-label="Add to compare"
            >
              <Plus size={18} />
              <span className="text-sm font-semibold">Add To Compare</span>
            </button>

            <div className="border-l border-gray-300 h-6 mx-2"></div>
            
            <button 
              className="bg-white border border-gray-300 text-gray-800 px-5 py-2 font-semibold text-sm rounded hover:bg-gray-50"
              onClick={handleRequestInfo}
              aria-label="Request more information"
            >
              REQUEST MORE INFO
            </button>
            
            <button 
              className="bg-[rgb(204,255,0)] text-black px-5 py-2 font-semibold text-sm rounded hover:bg-[rgb(184,230,0)] transition-colors"
              onClick={handleViewDates}
              aria-label="View available dates"
              data-tab="dates"
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

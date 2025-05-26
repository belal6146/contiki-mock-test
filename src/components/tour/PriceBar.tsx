
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
  
  const handleShare = () => {
    console.debug('[PriceBar] share clicked');
    trackEvent('share_clicked', { price: newPrice });
  };
  
  const handleAddToCompare = () => {
    console.debug('[PriceBar] addToCompare clicked');
    trackEvent('add_to_compare_clicked', { price: newPrice });
  };
  
  return (
    <section className="bg-white border-b border-gray-200" aria-label="Tour pricing information">
      <div className="container max-w-7xl mx-auto">
        <div className="py-6 flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6">
          {/* Left side - Price info */}
          <div className="flex flex-col">
            <div className="mb-2">
              <span className="text-sm text-gray-600 font-medium">From</span>
            </div>
            <div className="flex items-baseline gap-3 mb-3">
              <span className="text-4xl font-black text-black" aria-label={`Current price: ${formatCurrency(newPrice)}`}>
                {formatCurrency(newPrice)}
              </span>
            </div>
            <p className="text-sm text-gray-600 hover:underline cursor-pointer">
              Save your space with a deposit payment
            </p>
          </div>
          
          {/* Right side - Action buttons */}
          <div className="flex items-center gap-3">
            {/* Share and Add to Compare buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleShare}
                className="flex items-center gap-2 text-gray-700 hover:text-black text-sm font-medium transition-colors duration-150 px-3 py-2 rounded-full border border-gray-300 hover:bg-gray-50"
                aria-label="Share this tour"
              >
                <Share size={16} />
                <span>Share</span>
              </button>
              
              <button
                onClick={handleAddToCompare}
                className="flex items-center gap-2 text-gray-700 hover:text-black text-sm font-medium transition-colors duration-150 px-3 py-2 rounded-full border border-gray-300 hover:bg-gray-50"
                aria-label="Add to compare"
              >
                <Plus size={16} />
                <span>Add To Compare</span>
              </button>
            </div>
            
            {/* Request More Info button */}
            <button 
              className="border border-gray-300 text-gray-800 px-6 py-3 font-semibold text-sm rounded-full hover:bg-gray-50 hover:border-gray-400 transition-all duration-150 uppercase tracking-wide"
              onClick={handleRequestInfo}
              aria-label="Request more information"
            >
              REQUEST MORE INFO
            </button>
            
            {/* View Dates button */}
            <button 
              className="bg-[#CCFF00] text-black px-8 py-3 font-bold text-sm rounded-full hover:bg-[#b8e600] transition-colors duration-150 uppercase tracking-wide shadow-sm"
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

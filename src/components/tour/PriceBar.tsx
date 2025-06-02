import React, { useEffect } from 'react';
import { formatCurrency } from '@/lib/utils';
import { trackEvent } from '@/lib/analytics';
// Share and Plus icons were moved to TourDetail.tsx
// import { Share, Plus } from 'lucide-react';

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
  
  // Share and Add to Compare handlers were moved to TourDetail.tsx
  // const handleShare = () => {
  //   console.debug('[PriceBar] share clicked');
  //   trackEvent('share_clicked', { price: newPrice });
  // };
  
  // const handleAddToCompare = () => {
  //   console.debug('[PriceBar] addToCompare clicked');
  //   trackEvent('add_to_compare_clicked', { price: newPrice });
  // };
  
  return (
    <>
      {/* The parent component (TourDetail) will provide the container and layout */}
      {/* Removed outer containers that were interfering with layout in TourDetail */}
      <div className="py-0 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 w-full">
        {/* Left side - Price info */}
        <div className="flex flex-col">
          <div className="mb-1">
            <span className="text-xs text-gray-700 font-semibold uppercase">From</span>
          </div>
          <div className="flex items-baseline gap-2 mb-1 leading-none">
            <span className="text-4xl font-black text-black">{formatCurrency(newPrice)}</span>
            {oldPrice && (
              <span className="text-base text-gray-500 line-through">{formatCurrency(oldPrice)}</span>
            )}
          </div>
          <p className="text-sm text-gray-600 hover:underline cursor-pointer">
            Find this price
          </p>
           <p className="text-sm text-gray-600 mt-1">
            Save your space with a deposit payment
          </p>
        </div>
        {/* Right side - Action buttons */}
        <div className="flex flex-col items-end gap-2 w-full lg:w-auto">
          {/* Request More Info button */}
          <button
            className="border border-gray-400 text-gray-700 px-8 py-3 font-bold text-sm rounded-full hover:bg-gray-500 hover:border-gray-500 transition-all duration-150 uppercase tracking-wide bg-white w-full text-center"
            onClick={handleRequestInfo}
            aria-label="Request more information"
          >
            REQUEST MORE INFO
          </button>
          {/* View Dates button */}
          <button
            className="bg-[#CCFF00] text-black px-8 py-3 font-bold text-sm rounded-full hover:bg-[#b8e600] transition-colors duration-150 uppercase tracking-wide w-full text-center"
            onClick={handleViewDates}
            aria-label="View available dates"
            data-tab="dates"
          >
            VIEW DATES
          </button>
        </div>
      </div>
    </>
  );
};

export default PriceBar;

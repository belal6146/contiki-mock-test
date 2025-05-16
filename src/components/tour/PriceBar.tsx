
import React from 'react';
import { formatCurrency } from '@/lib/utils';

interface PriceBarProps {
  price: number;
  rating: number;
  reviewCount: number;
}

const PriceBar: React.FC<PriceBarProps> = ({ price, rating, reviewCount }) => {
  return (
    <section className="sticky top-16 z-40 bg-white shadow-md">
      <div className="container">
        <div className="py-4 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="mr-6">
              <p className="text-sm text-gray-500">From</p>
              <p className="text-2xl font-bold text-primary">{formatCurrency(price)}</p>
            </div>
            
            <div className="flex items-center">
              <div className="flex items-center mr-2">
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
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                  </svg>
                ))}
              </div>
              <span className="text-gray-600">
                {rating} ({reviewCount} reviews)
              </span>
            </div>
          </div>
          
          <div className="flex space-x-3">
            <button className="btn-outline px-4 py-2">
              Save Trip
            </button>
            <button className="btn-primary px-6 py-2">
              Check Availability
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PriceBar;

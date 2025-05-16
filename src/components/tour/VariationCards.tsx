
import React from 'react';
import { formatCurrency, formatDate } from '@/lib/utils';

interface Variation {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  price: number;
  availability: 'available' | 'limited' | 'soldout';
}

interface VariationCardsProps {
  variations: Variation[];
}

const VariationCards: React.FC<VariationCardsProps> = ({ variations }) => {
  return (
    <section className="py-12">
      <div className="container">
        <h2 className="heading-md mb-8">Available Departures</h2>
        
        <div className="space-y-6">
          {variations.map((variation) => (
            <div 
              key={variation.id}
              className="border rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="grid grid-cols-1 md:grid-cols-4 bg-white">
                <div className="p-6 md:border-r border-gray-200">
                  <h3 className="font-bold text-lg mb-2">{variation.name}</h3>
                  <div className="text-sm text-gray-600">
                    <p>Start: {formatDate(variation.startDate)}</p>
                    <p>End: {formatDate(variation.endDate)}</p>
                  </div>
                </div>
                
                <div className="p-6 md:border-r border-gray-200 flex flex-col justify-center md:col-span-2">
                  <div className="flex items-center mb-2">
                    <span 
                      className={`inline-block w-3 h-3 rounded-full mr-2 ${
                        variation.availability === 'available' ? 'bg-green-500' :
                        variation.availability === 'limited' ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                    ></span>
                    <span 
                      className={`text-sm font-medium ${
                        variation.availability === 'available' ? 'text-green-600' :
                        variation.availability === 'limited' ? 'text-yellow-600' : 'text-red-600'
                      }`}
                    >
                      {variation.availability === 'available' ? 'Available' :
                        variation.availability === 'limited' ? 'Limited Spots' : 'Sold Out'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    {variation.availability !== 'soldout' 
                      ? 'Book now to secure your spot!' 
                      : 'Check other available dates or join the waitlist.'}
                  </p>
                </div>
                
                <div className="p-6 bg-gray-50 flex flex-col justify-center items-center md:items-end">
                  <div className="mb-3 text-center md:text-right">
                    <p className="text-sm text-gray-600">From</p>
                    <p className="text-xl font-bold text-primary">{formatCurrency(variation.price)}</p>
                  </div>
                  <button 
                    className={`px-6 py-2 rounded-md font-medium ${
                      variation.availability !== 'soldout'
                        ? 'btn-primary'
                        : 'bg-gray-300 text-gray-600 cursor-not-allowed'
                    }`}
                    disabled={variation.availability === 'soldout'}
                  >
                    {variation.availability !== 'soldout' ? 'Book Now' : 'Sold Out'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600 mb-4">Can't find a date that works for you?</p>
          <button className="btn-outline px-6 py-2">
            Contact Us for Custom Dates
          </button>
        </div>
      </div>
    </section>
  );
};

export default VariationCards;

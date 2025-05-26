
import React from 'react';
import { CheckCircle } from 'lucide-react';

const TourVariations: React.FC = () => {
  const variations = [
    {
      id: 'plus',
      name: 'PLUS',
      description: 'Upgrade to hotel rooms & share with just 1 other traveller.',
      price: '£1,761',
      oldPrice: '£2,335',
      isSelected: true,
      features: ['Hotel rooms', 'Share with 1 other']
    },
    {
      id: 'standard',
      name: 'STANDARD',
      description: 'Stay in multi-share hotel rooms with up to 3 other travellers.',
      price: '£1,468',
      oldPrice: '£1,835',
      isSelected: false,
      features: ['Multi-share rooms', 'Up to 3 others']
    },
    {
      id: 'pride',
      name: 'PRIDE',
      description: 'The Plus itinerary with extra activities handpicked for the LGBTQIA+ community, operating in peak season.',
      price: '£1,758',
      oldPrice: '£2,315',
      isSelected: false,
      features: ['LGBTQIA+ focused', 'Extra activities']
    },
    {
      id: 'gap',
      name: 'GAP 18-22',
      description: 'Includes the Standard itinerary, exclusively for 18-22s (in Peak Season).',
      price: '£1,639',
      oldPrice: '£2,049',
      isSelected: false,
      features: ['Ages 18-22 only', 'Peak season']
    }
  ];

  return (
    <div className="container py-12">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-black">SELECTED VARIATION</h2>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span>Change view</span>
          <div className="flex gap-1">
            <div className="w-4 h-4 border border-gray-400 bg-gray-100"></div>
            <div className="w-4 h-4 border border-gray-400 bg-[#CCFF00]"></div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {variations.map((variation) => (
          <div 
            key={variation.id}
            className={`relative border rounded-lg p-6 cursor-pointer transition-all h-auto ${
              variation.isSelected 
                ? 'border-[#CCFF00] bg-[#f6ffcc]' 
                : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
          >
            {/* Selected indicator */}
            {variation.isSelected && (
              <div className="absolute top-4 right-4 w-6 h-6 bg-[#CCFF00] rounded-full flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-black" />
              </div>
            )}
            
            {/* Variation name */}
            <h3 className="font-bold text-lg text-black mb-4 uppercase tracking-wide">
              {variation.name}
            </h3>
            
            {/* Description */}
            <p className="text-sm text-gray-700 mb-6 leading-relaxed min-h-[3rem]">
              {variation.description}
            </p>
            
            {/* Old price */}
            {variation.oldPrice && (
              <div className="text-sm text-gray-400 line-through mb-1">
                {variation.oldPrice}
              </div>
            )}
            
            {/* Current price */}
            <div className="flex items-baseline mb-6">
              <span className="text-sm text-gray-600 mr-2">From</span>
              <span className="text-2xl font-bold text-black">
                {variation.price}
              </span>
            </div>
            
            {/* Add to compare button */}
            <button className="w-full border border-gray-400 rounded-full px-4 py-2 text-sm font-medium text-black hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
              <div className="w-4 h-4 border border-gray-400 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
              </div>
              Add to compare
            </button>
          </div>
        ))}
      </div>
      
      {/* Show all versions link */}
      <div className="text-center">
        <button className="text-black font-medium flex items-center justify-center gap-2 mx-auto">
          <span className="text-xl">↓</span>
          <span className="underline hover:no-underline transition-all">SHOW ALL VERSIONS</span>
        </button>
      </div>
    </div>
  );
};

export default TourVariations;

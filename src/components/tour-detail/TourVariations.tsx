import React, { useState } from 'react';
import { CheckCircle, List, Grid } from 'lucide-react';

const TourVariations: React.FC = () => {
  const initialVariations = [
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

  const [selectedVariationId, setSelectedVariationId] = useState<string>(initialVariations.find(v => v.isSelected)?.id || initialVariations[0].id);

  const variations = initialVariations.map(v => ({
    ...v,
    isSelected: v.id === selectedVariationId
  }));

  const handleVariationSelect = (id: string) => {
    setSelectedVariationId(id);
  };

  return (
    <div className="container py-12">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-black text-black uppercase">SELECTED VARIATION</h2>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span className="font-semibold">Change view</span>
          <div className="flex gap-1 border border-gray-300 rounded-md overflow-hidden">
            {/* List view button */}
            <div className="w-6 h-6 flex items-center justify-center bg-gray-100 text-gray-600">
              <List size={16} />
            </div>
            {/* Grid view button */}
            <div className="w-6 h-6 flex items-center justify-center bg-[#CCFF00] text-black">
              <Grid size={16} />
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {variations.map((variation) => (
          <div 
            key={variation.id}
            className={`relative border rounded-lg p-6 cursor-pointer transition-all h-auto overflow-hidden ${
              variation.isSelected 
                ? 'border-black shadow-lg'
                : 'border-gray-200 bg-white text-black hover:border-gray-300 hover:shadow-sm'
            }`}
            onClick={() => handleVariationSelect(variation.id)}
          >
            {/* Top section with black background for selected variation */}
            <div className={`-m-6 mb-6 p-6 flex justify-between items-center ${variation.isSelected ? 'bg-black text-white' : 'bg-white text-black'}`}>
              {/* Variation name */}
              <h3 className={`font-bold text-lg uppercase tracking-wide ${variation.isSelected ? 'text-white' : 'text-black'}`}>
                {variation.name}
              </h3>
              {/* Selected indicator */}
              {variation.isSelected && (
                <div className="flex-shrink-0 w-6 h-6 bg-[#CCFF00] rounded-full flex items-center justify-center z-10">
                  <CheckCircle className="w-4 h-4 text-black" />
                </div>
              )}
            </div>
            
            {/* Description */}
            <p className={`text-sm mb-6 leading-relaxed min-h-[3rem] ${variation.isSelected ? 'text-gray-700' : 'text-gray-700'}`}>
              {variation.description}
            </p>
            
            {/* Old price */}
            {variation.oldPrice && (
              <div className={`text-sm line-through mb-1 ${variation.isSelected ? 'text-gray-500' : 'text-gray-400'}`}>
                {variation.oldPrice}
              </div>
            )}
            
            {/* Current price */}
            <div className="flex items-baseline mb-6">
              <span className={`text-sm mr-2 ${variation.isSelected ? 'text-gray-600' : 'text-gray-600'}`}>From</span>
              <span className={`text-2xl font-bold ${variation.isSelected ? 'text-black' : 'text-black'}`}>
                {variation.price}
              </span>
            </div>
            
            {/* Add to compare button */}
            <button className={`w-full border rounded-full px-4 py-2 text-sm font-medium transition-colors flex items-center justify-center gap-2 ${variation.isSelected ? 'border-gray-400 text-black hover:bg-gray-100' : 'border-gray-400 text-black hover:bg-gray-50'}`}>
              <div className={`w-4 h-4 border rounded-full flex items-center justify-center ${variation.isSelected ? 'border-gray-400' : 'border-gray-400'}`}>
                <div className={`w-2 h-2 rounded-full ${variation.isSelected ? 'bg-gray-400' : 'bg-gray-400'}`}></div>
              </div>
              Add to compare
            </button>
          </div>
        ))}
      </div>
      
      {/* Show all versions link */}
      <div className="text-center">
        <button className="text-black font-semibold flex items-center justify-center gap-2 mx-auto hover:underline">
          <span className="text-xl">↓</span>
          <span className="">SHOW ALL VERSIONS</span>
        </button>
      </div>
    </div>
  );
};

export default TourVariations;

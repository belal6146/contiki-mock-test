
import React from 'react';
import { CheckCircle } from 'lucide-react';

const TourVariations: React.FC = () => {
  const variations = [
    {
      id: 'plus',
      name: 'PLUS',
      description: 'Upgrade to hotel rooms & share with just 1 other traveller.',
      price: '£1,761',
      isSelected: true,
      features: ['Hotel rooms', 'Share with 1 other']
    },
    {
      id: 'standard',
      name: 'STANDARD',
      description: 'Stay in multi-share hotel rooms with up to 3 other travellers.',
      price: '£1,468',
      isSelected: false,
      features: ['Multi-share rooms', 'Up to 3 others']
    },
    {
      id: 'pride',
      name: 'PRIDE',
      description: 'The Plus itinerary with extra activities handpicked for the LGBTQIA+ community operating in peak season.',
      price: '£1,758',
      isSelected: false,
      features: ['LGBTQIA+ focused', 'Extra activities']
    },
    {
      id: 'gap',
      name: 'GAP 18-22',
      description: 'Includes the Standard itinerary, exclusively for 18-22s (in Peak Season).',
      price: '£1,639',
      isSelected: false,
      features: ['Ages 18-22 only', 'Peak season']
    }
  ];

  return (
    <div className="container py-12">
      <h2 className="text-2xl font-bold text-black mb-2">Selected Variation</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {variations.map((variation) => (
          <div 
            key={variation.id}
            className={`relative border-2 rounded-lg p-6 cursor-pointer transition-all ${
              variation.isSelected 
                ? 'border-lime-400 bg-lime-50' 
                : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
          >
            {variation.isSelected && (
              <div className="absolute -top-3 -right-3 bg-lime-400 text-black w-8 h-8 rounded-full flex items-center justify-center">
                <CheckCircle className="w-5 h-5" />
              </div>
            )}
            
            <div className="text-center">
              <h3 className="font-bold text-lg text-black mb-2">{variation.name}</h3>
              <p className="text-sm text-gray-600 mb-4 min-h-[3rem]">{variation.description}</p>
              
              <div className="mb-4">
                <div className="text-sm text-gray-500">From</div>
                <div className="text-xl font-bold text-black">{variation.price}</div>
              </div>
              
              <button className="w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded text-sm font-semibold hover:bg-gray-50">
                Add to compare
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="text-center mt-6">
        <button className="text-black font-semibold underline">
          SHOW ALL VERSIONS
        </button>
      </div>
    </div>
  );
};

export default TourVariations;

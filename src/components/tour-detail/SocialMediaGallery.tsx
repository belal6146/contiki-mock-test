
import React from 'react';
import { Instagram } from 'lucide-react';

const SocialMediaGallery: React.FC = () => {
  const images = [
    'https://source.unsplash.com/400x400/?santorini,greece',
    'https://source.unsplash.com/400x400/?mykonos,greece',
    'https://source.unsplash.com/400x400/?paros,greece',
    'https://source.unsplash.com/400x400/?ios,greece',
    'https://source.unsplash.com/400x400/?greek,islands',
    'https://source.unsplash.com/400x400/?aegean,sea',
    'https://source.unsplash.com/400x400/?athens,greece',
    'https://source.unsplash.com/400x400/?cyclades,islands',
    'https://source.unsplash.com/400x400/?greek,travel',
    'https://source.unsplash.com/400x400/?mediterranean,sunset'
  ];

  return (
    <div className="bg-white py-16">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-black mb-4">#GREEKHOPPING</h2>
          <p className="text-gray-600">Photos from our travellers</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {images.map((image, index) => (
            <div key={index} className="relative group cursor-pointer overflow-hidden rounded-lg aspect-square">
              <img 
                src={image} 
                alt={`Greek island hopping photo ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                <Instagram className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SocialMediaGallery;

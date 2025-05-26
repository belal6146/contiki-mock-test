import React, { useState, useEffect } from 'react';
import { Instagram, Heart, MessageCircle } from 'lucide-react';

const SocialMediaGallery: React.FC = () => {
  const [imagesLoaded, setImagesLoaded] = useState<Record<number, boolean>>({});

  // Enhanced image sources with specific travel destinations
  const images = [
    'https://source.unsplash.com/featured/400x400/?santorini,greece,travel',
    'https://source.unsplash.com/featured/400x400/?mykonos,greece,beach',
    'https://source.unsplash.com/featured/400x400/?paros,greece,island',
    'https://source.unsplash.com/featured/400x400/?ios,greece,sunset',
    'https://source.unsplash.com/featured/400x400/?greek,islands,boat',
    'https://source.unsplash.com/featured/400x400/?aegean,sea,travel',
    'https://source.unsplash.com/featured/400x400/?athens,greece,ancient',
    'https://source.unsplash.com/featured/400x400/?cyclades,islands,white',
    'https://source.unsplash.com/featured/400x400/?greek,travel,adventure',
    'https://source.unsplash.com/featured/400x400/?mediterranean,sunset,travel'
  ];

  const handleImageLoad = (index: number) => {
    setImagesLoaded(prev => ({ ...prev, [index]: true }));
    console.debug('[SocialMediaGallery] imageLoaded', { index });
  };

  useEffect(() => {
    console.debug('[SocialMediaGallery] mounted');
  }, []);

  return (
    <div className="bg-gradient-to-br from-gray-50 to-white py-20">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">#GREEKHOPPING</h2>
          <p className="text-xl text-gray-600 mb-8">Photos from our travellers</p>
          <div className="flex items-center justify-center gap-4 text-gray-500">
            <div className="flex items-center gap-2">
              <Instagram className="w-5 h-5" />
              <span className="text-sm font-medium">Follow our adventures</span>
            </div>
            <div className="w-px h-4 bg-gray-300"></div>
            <span className="text-sm">10.2k posts</span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6">
          {images.map((image, index) => {
            const isLoaded = imagesLoaded[index];
            
            return (
              <div 
                key={index} 
                className="relative group cursor-pointer overflow-hidden rounded-xl aspect-square shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
              >
                <div 
                  className={`w-full h-full bg-cover bg-center transition-all duration-700 transform group-hover:scale-110 ${
                    isLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                  style={{ backgroundImage: `url(${image}&sig=${index})` }}
                  onLoad={() => handleImageLoad(index)}
                />
                
                {!isLoaded && (
                  <div className="absolute inset-0 bg-gray-300 animate-pulse" />
                )}
                
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                    <div className="flex flex-col items-center gap-3">
                      <Instagram className="w-8 h-8 text-white" />
                      <div className="flex items-center gap-4 text-white">
                        <div className="flex items-center gap-1">
                          <Heart className="w-4 h-4" />
                          <span className="text-sm font-medium">{Math.floor(Math.random() * 100) + 20}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageCircle className="w-4 h-4" />
                          <span className="text-sm font-medium">{Math.floor(Math.random() * 20) + 5}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Instagram badge */}
                <div className="absolute top-3 right-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-100">
                  <Instagram className="w-3 h-3" />
                </div>
              </div>
            );
          })}
        </div>
        
        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-white rounded-2xl p-8 shadow-xl max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Share Your Adventure</h3>
            <p className="text-gray-600 mb-6">
              Tag us in your photos using <span className="font-bold text-[#CCFF00]">#GREEKHOPPING</span> and get featured!
            </p>
            <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-full font-bold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 flex items-center gap-2 mx-auto">
              <Instagram className="w-5 h-5" />
              Follow @Contiki
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialMediaGallery;

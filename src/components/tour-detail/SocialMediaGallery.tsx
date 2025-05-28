import React, { useState, useEffect } from 'react';
import { Instagram, Heart, MessageCircle } from 'lucide-react';

const SocialMediaGallery: React.FC = () => {
  const [imagesLoaded, setImagesLoaded] = useState<Record<number, boolean>>({});

  // Enhanced image sources with specific travel destinations - Keeping for styling
  const images = [
    'https://www.contiki.com/media/uhxfozab/group-of-people-in-blue-lake-surrounded-by-mountains.jpg?center=0.5%2C0.5&format=webp&height=616&mode=crop&quality=80&width=720', // Using provided images
    'https://www.contiki.com/media/smpji2l0/group-of-young-people-riding-bikes-vietnam-road.jpg?center=0.6161542586835618%2C0.4987480082915613&format=webp&height=616&mode=crop&quality=80&width=720', // Using provided images
    'https://www.contiki.com/media/jfzlex0q/colosseum-destiantion-image.jpg?center=0.44179409763085564%2C0.5350877192982456&format=webp&height=600&mode=crop&quality=80&width=1920', // Using provided images
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
    <div className="bg-white py-12">
      <div className="container max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-black mb-2">#GREEKHOPPING</h2>
          <p className="text-gray-700 text-base">Photos from our travellers</p>
          {/* Removed extra header details not in blueprint */}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
          {images.map((image, index) => {
            const isLoaded = imagesLoaded[index];

            return (
              <div
                key={index}
                className="relative group cursor-pointer overflow-hidden rounded-lg aspect-square shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
              >
                <div
                  className={`w-full h-full bg-cover bg-center transition-all duration-700 transform group-hover:scale-110 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
                  style={{ backgroundImage: `url(${image}&sig=${index})` }}
                  onLoad={() => handleImageLoad(index)}
                />

                {!isLoaded && (
                  <div className="absolute inset-0 bg-gray-300 animate-pulse" />
                )}

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
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

                {/* Instagram badge */}
                <div className="absolute top-2 right-2 bg-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-100 shadow-md">
                  <Instagram className="w-4 h-4 text-black" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Removed CTA section not in blueprint */}

      </div>
    </div>
  );
};

export default SocialMediaGallery;

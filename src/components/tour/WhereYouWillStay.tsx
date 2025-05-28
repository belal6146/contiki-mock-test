import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, MapPin, Star, Wifi, Car, Coffee } from 'lucide-react';

interface Accommodation {
  name: string;
  location: string;
  image: string;
  nightsCount: number;
}

interface WhereYouWillStayProps {
  accommodation: Accommodation;
}

const WhereYouWillStay: React.FC<WhereYouWillStayProps> = ({ accommodation }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  
  const safeAccommodation = {
    name: accommodation?.name || 'Luxury Accommodation',
    location: accommodation?.location || 'Beautiful Location',
    image: accommodation?.image || '',
    nightsCount: accommodation?.nightsCount || 3
  };

  useEffect(() => {
    console.debug('[WhereYouWillStay] mounted', { accommodation: safeAccommodation });
  }, [safeAccommodation]);
  
  const getAccommodationImage = () => {
    if (safeAccommodation.image && !safeAccommodation.image.includes('placeholder')) {
      return safeAccommodation.image;
    }
    
    const locationTerms = safeAccommodation.location.toLowerCase().replace(/\s+/g, ',');
    const searchTerms = ['hotel', 'luxury', 'accommodation', 'travel', 'resort', locationTerms]
      .filter(Boolean)
      .join(',');
    
    return `https://source.unsplash.com/featured/900x600/?${searchTerms}`;
  };

  const imageUrl = getAccommodationImage();

  useEffect(() => {
    const img = new Image();
    img.src = imageUrl;
    img.onload = () => {
      setIsImageLoaded(true);
      console.debug('[WhereYouWillStay] imageLoaded');
    };
  }, [imageUrl]);
  
  return (
    <section className="py-12 bg-white">
      <div className="container max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-black text-black mb-4">Where You Will Stay</h2>
          <p className="text-gray-600 text-base max-w-2xl mx-auto">
            Learn more about the accommodation included on this trip
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Main accommodation card */}
          <div>
            <Card className="overflow-hidden rounded-xl shadow-md border border-gray-200">
              <div className="relative h-60 lg:h-80">
                <div
                  className={`w-full h-full bg-cover bg-center transition-all duration-700 transform group-hover:scale-105 ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}
                  style={{ backgroundImage: `url(${imageUrl})` }}
                />

                {!isImageLoaded && (
                  <div className="absolute inset-0 bg-gray-300 animate-pulse" />
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                {/* Floating rating badge - Adjusted styling to match blueprint */}
                {/* Note: Rating is not present in the 'Where You Will Stay' section blueprint, removing it for now */}
                {/*
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-gray-900 px-3 py-2 rounded-full flex items-center gap-1 shadow-lg">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-bold text-sm">4.8</span>
                </div>
                */}
              </div>

              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-black text-white px-3 py-1 text-xs font-bold rounded-full uppercase tracking-wide">
                    Special Stay
                  </span>
                  {/* Nights count badge - Adjusted styling to match blueprint */}
                  <div className="flex items-center gap-1 text-xs text-gray-700">
                    {/* Icon placeholder - Use actual icon if available */}
                    <span>🌙</span>
                    <span>{safeAccommodation.nightsCount} nights</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold mb-2 text-black">{safeAccommodation.name}</h3>

                <div className="flex items-center gap-2 mb-4 text-gray-700 text-sm">
                  <MapPin className="w-4 h-4 text-gray-600" />
                  <p>{safeAccommodation.location}</p>
                </div>

                {/* Amenities */}
                <div className="flex flex-wrap gap-4 mb-6 text-gray-700 text-sm">
                  <div className="flex items-center gap-2">
                    <Wifi className="w-4 h-4 text-gray-600" />
                    <span>Free WiFi</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Car className="w-4 h-4 text-gray-600" />
                    <span>Parking</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Coffee className="w-4 h-4 text-gray-600" />
                    <span>Breakfast</span>
                  </div>
                </div>

                <Button
                  variant="link"
                  className="text-black font-bold text-sm p-0 underline hover:no-underline"
                >
                  View Details
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Accommodation summary */}
          <div className="h-full">
            <Card className="flex flex-col items-center text-center p-6 h-full rounded-xl shadow-md border border-gray-200 bg-gray-100">
              <div className="bg-[#CCFF00] rounded-full w-20 h-20 flex items-center justify-center mb-6 shadow-sm">
                <span className="text-black text-3xl font-black">{safeAccommodation.nightsCount}</span>
              </div>

              <h3 className="text-xl font-bold mb-4 text-black">All Accommodation is Included</h3>

              <div className="space-y-2 text-gray-700 text-sm mb-6">
                <p className="flex items-center justify-center gap-2">
                  <span className="w-1.5 h-1.5 bg-black rounded-full"></span>
                  {safeAccommodation.nightsCount} nights in Hotels
                </p>
                <p className="flex items-center justify-center gap-2">
                  <span className="w-1.5 h-1.5 bg-black rounded-full"></span>
                  2 nights in Special Stay
                </p>
                {/* Assuming Breakfast is included based on the blueprint, adding it */}
                 <p className="flex items-center justify-center gap-2">
                  <span className="w-1.5 h-1.5 bg-black rounded-full"></span>
                  Breakfast included
                </p>
              </div>

              {/* Quote - Keeping existing style for now as not clearly visible in blueprint */}
              {/*
              <div className="mt-8 p-4 bg-white/50 rounded-lg">
                <p className="text-sm text-gray-600 italic">
                  "Carefully selected accommodations that enhance your travel experience"
                </p>
              </div>
              */}
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhereYouWillStay;

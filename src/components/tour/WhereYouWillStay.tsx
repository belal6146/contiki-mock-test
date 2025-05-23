
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
    <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Where You Will Stay</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Learn more about the carefully selected accommodation included on this trip
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main accommodation card */}
          <div className="lg:col-span-2">
            <Card className="overflow-hidden rounded-2xl shadow-xl h-full group hover:shadow-2xl transition-all duration-500">
              <div className="relative h-80">
                <div 
                  className={`w-full h-full bg-cover bg-center transition-all duration-700 transform group-hover:scale-105 ${
                    isImageLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                  style={{ backgroundImage: `url(${imageUrl})` }}
                />
                
                {!isImageLoaded && (
                  <div className="absolute inset-0 bg-gray-300 animate-pulse" />
                )}
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Floating rating badge */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-gray-900 px-3 py-2 rounded-full flex items-center gap-1 shadow-lg">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-bold text-sm">4.8</span>
                </div>
              </div>
              
              <CardContent className="p-8">
                <div className="flex items-center gap-2 mb-4">
                  <span className="bg-[#FF6900] text-white px-4 py-2 text-sm font-bold rounded-full uppercase tracking-wide">
                    Special Stay
                  </span>
                  <span className="bg-gray-100 text-gray-700 px-3 py-1 text-xs font-medium rounded-full">
                    {safeAccommodation.nightsCount} nights
                  </span>
                </div>
                
                <h3 className="text-3xl font-bold mb-3 text-gray-900">{safeAccommodation.name}</h3>
                
                <div className="flex items-center gap-2 mb-6">
                  <MapPin className="w-5 h-5 text-gray-400" />
                  <p className="text-gray-600 font-medium">{safeAccommodation.location}</p>
                </div>
                
                {/* Amenities */}
                <div className="flex flex-wrap gap-4 mb-6">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Wifi className="w-4 h-4" />
                    <span className="text-sm">Free WiFi</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Car className="w-4 h-4" />
                    <span className="text-sm">Parking</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Coffee className="w-4 h-4" />
                    <span className="text-sm">Breakfast</span>
                  </div>
                </div>
                
                <Button 
                  variant="outline" 
                  className="border-[#FF6900] text-[#FF6900] hover:bg-[#FF6900] hover:text-white font-medium flex items-center gap-2 transition-all duration-200"
                >
                  See More <ExternalLink size={16} />
                </Button>
              </CardContent>
            </Card>
          </div>
          
          {/* Accommodation summary */}
          <div className="h-full">
            <Card className="flex flex-col items-center justify-center text-center p-8 h-full rounded-2xl shadow-xl bg-gradient-to-br from-[#FF6900]/5 to-[#CCFF00]/5">
              <div className="bg-[#FF6900] rounded-full w-24 h-24 flex items-center justify-center mb-8 shadow-lg">
                <span className="text-white text-3xl font-bold">{safeAccommodation.nightsCount}</span>
              </div>
              
              <h3 className="text-2xl font-bold mb-6 text-gray-900">All Accommodation is Included</h3>
              
              <div className="space-y-3 text-gray-600">
                <p className="flex items-center justify-center gap-2">
                  <span className="w-2 h-2 bg-[#FF6900] rounded-full"></span>
                  {safeAccommodation.nightsCount} nights in Hotels
                </p>
                <p className="flex items-center justify-center gap-2">
                  <span className="w-2 h-2 bg-[#CCFF00] rounded-full"></span>
                  2 nights in Special Stay
                </p>
                <p className="flex items-center justify-center gap-2">
                  <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                  Breakfast included
                </p>
              </div>
              
              <div className="mt-8 p-4 bg-white/50 rounded-lg">
                <p className="text-sm text-gray-600 italic">
                  "Carefully selected accommodations that enhance your travel experience"
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhereYouWillStay;

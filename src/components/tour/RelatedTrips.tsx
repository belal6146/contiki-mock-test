
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Trip } from '@/types/trips';
import { Star } from 'lucide-react';

interface RelatedTripsProps {
  trips: Trip[];
}

const RelatedTrips: React.FC<RelatedTripsProps> = ({ trips }) => {
  useEffect(() => {
    console.debug('[RelatedTrips] mounted', { tripsCount: trips.length });
  }, [trips.length]);
  
  if (!trips || trips.length === 0) {
    return null;
  }

  // Mock related trips with proper structure
  const mockRelatedTrips = [
    {
      id: 'spotlight-greece',
      name: 'Spotlight on Greece',
      duration: '4 days',
      destination: 'Greece',
      price: 746,
      originalPrice: 999,
      discount: 25,
      image: 'https://source.unsplash.com/600x400/?meteora,greece',
      rating: 4.7,
      reviewCount: 1247,
      countries: 1
    },
    {
      id: 'london-athens',
      name: 'London to Athens with Greek Island Hopping',
      duration: '7 days',
      destination: 'Greece',
      price: 4659,
      originalPrice: 6212,
      discount: 25,
      image: 'https://source.unsplash.com/600x400/?greek,islands,boat',
      rating: 4.8,
      reviewCount: 892,
      countries: 6
    },
    {
      id: 'greek-explorer',
      name: 'Greek Explorer',
      duration: '11 days',
      destination: 'Greece',
      price: 2199,
      originalPrice: null,
      discount: null,
      image: 'https://source.unsplash.com/600x400/?meteora,monasteries',
      rating: 4.6,
      reviewCount: 567,
      countries: 1
    }
  ];
  
  return (
    <section className="py-16 bg-white">
      <div className="container">
        <h2 className="text-3xl font-bold text-black mb-2 text-center">Other trips you might like</h2>
        <p className="text-gray-600 mb-12 text-center">This trip comes in different shapes and sizes. For more options, check these itineraries.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {mockRelatedTrips.map((trip) => (
            <div key={trip.id} className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="relative">
                <img 
                  src={trip.image} 
                  alt={trip.name}
                  className="w-full h-48 object-cover"
                  loading="lazy"
                />
                
                {/* Discount badges */}
                <div className="absolute top-4 left-4 flex gap-2">
                  {trip.discount && (
                    <div className="bg-yellow-400 text-black px-2 py-1 text-xs font-bold rounded">
                      {trip.discount}% OFF
                    </div>
                  )}
                  <div className="bg-red-500 text-white px-2 py-1 text-xs font-bold rounded">
                    Up to 30% off
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="font-bold text-lg text-black mb-3 line-clamp-2">{trip.name}</h3>
                
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                  <span>{trip.duration}</span>
                  <span>•</span>
                  <span>{trip.countries} countr{trip.countries === 1 ? 'y' : 'ies'}</span>
                  
                  {/* Rating */}
                  <div className="flex items-center gap-1 ml-auto">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${
                            i < Math.floor(trip.rating) 
                              ? 'text-yellow-400 fill-yellow-400' 
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-gray-500">({trip.reviewCount})</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs text-gray-500">From</div>
                    <div className="flex items-center gap-2">
                      {trip.originalPrice && (
                        <span className="text-sm line-through text-gray-400">£{trip.originalPrice}</span>
                      )}
                      <span className="font-bold text-lg text-black">£{trip.price}</span>
                    </div>
                  </div>
                  
                  <Link
                    to={`/tours/${trip.id}`}
                    className="bg-black text-white px-6 py-2 rounded text-sm font-semibold hover:bg-gray-800 transition-colors"
                  >
                    View Trip
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RelatedTrips;

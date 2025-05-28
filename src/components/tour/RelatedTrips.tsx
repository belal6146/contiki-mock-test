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

  // Mock related trips with proper structure - Keeping mock data for styling
  const mockRelatedTrips = [
    {
      id: 'spotlight-greece',
      name: 'Spotlight on Greece',
      duration: '4 days',
      destination: 'Greece',
      price: 746,
      originalPrice: 999,
      discount: 25,
      image: 'https://www.contiki.com/media/uhxfozab/group-of-people-in-blue-lake-surrounded-by-mountains.jpg?center=0.5%2C0.5&format=webp&height=616&mode=crop&quality=80&width=720', // Using one of the provided images for consistency
      rating: 4.7,
      reviewCount: 1247,
      countries: 1,
      spotlight: true
    },
    {
      id: 'london-athens',
      name: 'London to Athens with Greek Island Hopping',
      duration: '7 days',
      destination: 'Greece',
      price: 4659,
      originalPrice: 6212,
      discount: 25,
      image: 'https://www.contiki.com/media/smpji2l0/group-of-young-people-riding-bikes-vietnam-road.jpg?center=0.6161542586835618%2C0.4987480082915613&format=webp&height=616&mode=crop&quality=80&width=720', // Using one of the provided images for consistency
      rating: 4.8,
      reviewCount: 892,
      countries: 6,
      spotlight: false
    },
    {
      id: 'greek-explorer',
      name: 'Greek Explorer',
      duration: '11 days',
      destination: 'Greece',
      price: 2199,
      originalPrice: null,
      discount: null,
      image: 'https://www.contiki.com/media/jfzlex0q/colosseum-destiantion-image.jpg?center=0.44179409763085564%2C0.5350877192982456&format=webp&height=600&mode=crop&quality=80&width=1920', // Using one of the provided images for consistency
      rating: 4.6,
      reviewCount: 567,
      countries: 1,
      spotlight: false
    }
  ];
  
  return (
    <section className="py-12 bg-gray-50">
      <div className="container max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-black text-black mb-4 text-center">Related Trips</h2>
        <p className="text-gray-600 mb-10 text-center text-base max-w-2xl mx-auto">This trip comes in different shapes and sizes. For more options, check these itineraries.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mockRelatedTrips.map((trip) => (
            <div key={trip.id} className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300 cursor-pointer">
              <Link to={`/tours/${trip.id}`}>
                <div className="relative">
                  <img
                    src={trip.image}
                    alt={trip.name}
                    className="w-full h-56 object-cover"
                    loading="lazy"
                  />

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1">
                    {trip.spotlight && (
                       <span className="bg-[#FF0080] text-white text-xs px-2 py-1 rounded-full font-bold uppercase tracking-wide leading-none">
                        Trip Spotlight
                      </span>
                    )}
                     {trip.discount && (
                      <span className="bg-[#CCFF00] text-black text-xs px-2 py-1 rounded-full font-bold uppercase tracking-wide leading-none">
                        {trip.discount}% OFF
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-4 space-y-3">
                  <h3 className="font-bold text-lg text-black line-clamp-2 leading-tight">{trip.name}</h3>

                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <span className="font-semibold">{trip.duration}</span>
                    <span>•</span>
                    <span className="font-semibold">{trip.countries} countr{trip.countries === 1 ? 'y' : 'ies'}</span>

                    {/* Rating */}
                    <div className="flex items-center gap-1 ml-auto">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${
                              i < Math.floor(trip.rating)
                                ? 'text-[#FFEB3B] fill-[#FFEB3B]'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-gray-500 font-medium">({trip.reviewCount})</span>
                    </div>
                  </div>

                  <div>
                    <div className="text-xs text-gray-600 font-semibold">From</div>
                    <div className="flex items-baseline gap-2">
                      {trip.originalPrice && (
                        <span className="text-sm line-through text-gray-500">£{trip.originalPrice}</span>
                      )}
                      <span className="font-bold text-xl text-black">£{trip.price}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RelatedTrips;


import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTrips } from '@/hooks/useTrips';
import { Skeleton } from '@/components/ui/skeleton';
import ErrorMessage from '@/components/ui/error-message';
import { trackEvent } from '@/lib/analytics';
import { Star, ChevronLeft, ChevronRight, Plus } from 'lucide-react';

const FeaturedTrips = () => {
  const { trips, loading, error } = useTrips({ featured: true, limit: 8 });
  
  useEffect(() => {
    console.debug('[FeaturedTrips] mounted');
    trackEvent('component_mounted', { name: 'FeaturedTrips' });
  }, []);

  const handleRetry = () => {
    window.location.reload();
    trackEvent('retry_clicked', { component: 'FeaturedTrips' });
  };

  // Mock data with 4 trips and proper images
  const mockTrips = [
    {
      id: '1',
      name: 'Greek Island Hopping',
      destination: 'Greece',
      price: 1807,
      oldPrice: 2335,
      duration: 11,
      countries: 1,
      places: 5,
      rating: 4.6,
      image: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      isSpotlight: true,
      description: 'The one that takes you through Mykonos, Paros, Santorini and Ios with comfy sleeps between island hops...'
    },
    {
      id: '2',
      name: 'Canada and the Rockies',
      destination: 'Canada',
      price: 2274,
      oldPrice: 2875,
      duration: 11,
      countries: 1,
      places: 7,
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      description: 'The one that surrounds you with the majestic landscape of the Canadian Rockies, from Vancouver to the Rocky...'
    },
    {
      id: '3',
      name: 'European Horizon',
      destination: 'Europe',
      price: 1060,
      oldPrice: 1325,
      duration: 10,
      countries: 7,
      places: 13,
      rating: 4.6,
      image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      hasPromoBanner: true
    },
    {
      id: '4',
      name: 'Croatian Island Hopping',
      destination: 'Croatia',
      price: 1292,
      oldPrice: 1599,
      duration: 8,
      countries: 1,
      places: 6,
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1555992336-03a23c7b20ee?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      description: 'The one that takes you island hopping through the stunning Croatian coastline...'
    }
  ];

  const displayTrips = trips.length > 0 ? trips : mockTrips;
  const [currentPage, setCurrentPage] = useState(0);

  const handlePrevious = () => {
    setCurrentPage(prev => (prev > 0 ? prev - 1 : 0));
  };

  const handleNext = () => {
    setCurrentPage(prev => {
      const maxPages = Math.ceil(displayTrips.length / 4) - 1;
      return prev < maxPages ? prev + 1 : prev;
    });
  };

  // Calculate visible trips based on current page
  const visibleTrips = displayTrips.slice(currentPage * 4, (currentPage * 4) + 4);

  if (loading) {
    return (
      <section className="py-20 bg-white" aria-labelledby="featured-trips-heading">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <button className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center opacity-50">
              <ChevronLeft className="w-6 h-6 text-gray-600" />
            </button>
            <h2 className="text-4xl font-bold text-black">Popular trips</h2>
            <button className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center opacity-50">
              <ChevronRight className="w-6 h-6 text-gray-600" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm overflow-hidden">
                <Skeleton className="h-64 w-full" />
                <div className="p-6">
                  <Skeleton className="h-6 w-3/4 mb-3" />
                  <Skeleton className="h-4 w-1/2 mb-3" />
                  <Skeleton className="h-4 w-1/4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
  
  if (error) {
    return (
      <section className="py-20 bg-white">
        <div className="container max-w-7xl mx-auto px-4">
          <ErrorMessage
            title="Unable to load popular trips"
            message={error}
            onRetry={handleRetry}
          />
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-white" aria-labelledby="featured-trips-heading">
      <div className="container max-w-7xl mx-auto px-4">
        {/* Header with navigation arrows */}
        <div className="flex items-center justify-between mb-12">
          <button 
            className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors disabled:opacity-50"
            onClick={handlePrevious}
            disabled={currentPage === 0}
            aria-label="Previous trips"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>
          
          <h2 id="featured-trips-heading" className="text-4xl font-bold text-black">
            Popular trips
          </h2>
          
          <button 
            className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors disabled:opacity-50"
            onClick={handleNext}
            disabled={currentPage >= Math.ceil(displayTrips.length / 4) - 1}
            aria-label="Next trips"
          >
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </button>
        </div>
        
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {visibleTrips.map((trip) => (
              <article key={trip.id} className="w-full bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow group">
                {/* Trip Image */}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={trip.image}
                    alt={`${trip.name} - ${trip.destination}`}
                    className="w-full h-full object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  
                  {/* Trip Spotlight Badge */}
                  {trip.isSpotlight && (
                    <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded shadow-lg">
                      Trip Spotlight
                    </div>
                  )}
                  
                  {/* Greece Promotional Banner */}
                  {trip.hasPromoBanner && (
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70 flex flex-col justify-end p-6">
                      <div className="text-white text-center">
                        <div className="text-xl font-bold mb-1">Get set for</div>
                        <div className="text-2xl font-bold mb-1">GREECE 🌴</div>
                        <div className="text-xs mb-3">Save extra when you book this month!</div>
                        <button className="bg-[#CCFF00] text-black font-bold px-4 py-1.5 rounded-full hover:bg-[#b8e600] transition-colors text-sm">
                          LET'S GO
                        </button>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Trip Content */}
                <div className="p-4">
                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-3 h-3 ${i < Math.floor(trip.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                      />
                    ))}
                    <span className="text-xs font-medium ml-1 text-gray-700">{trip.rating}</span>
                  </div>
                  
                  {/* Trip Name */}
                  <h3 className="font-bold text-lg mb-2 text-black line-clamp-2 leading-tight">
                    {trip.name}
                  </h3>
                  
                  {/* Trip Details */}
                  <div className="flex items-center gap-2 text-xs text-gray-600 mb-2">
                    <span className="flex items-center gap-1">
                      📅 {trip.duration} Days
                    </span>
                    <span className="flex items-center gap-1">
                      📍 {trip.places} Places
                    </span>
                    <span className="flex items-center gap-1">
                      🌍 {trip.countries} Countr{trip.countries === 1 ? 'y' : 'ies'}
                    </span>
                  </div>
                  
                  {/* Description */}
                  <p className="text-xs text-gray-600 mb-4 line-clamp-2 leading-relaxed">
                    {trip.description || `The one that takes you through the best of ${trip.destination}...`}
                  </p>
                  
                  {/* Add to Compare Button */}
                  <button className="flex items-center gap-2 text-xs text-black rounded-full border border-gray-300 px-3 py-1.5 hover:bg-gray-100 transition-colors mb-4 w-full justify-center font-medium">
                    <Plus className="w-3 h-3" />
                    Add to compare
                  </button>
                  
                  {/* Price Section */}
                  <div className="mb-3">
                    {trip.oldPrice && (
                      <span className="text-xs text-gray-400 line-through block">
                        £{trip.oldPrice.toLocaleString()}
                      </span>
                    )}
                    <div className="flex items-baseline">
                      <span className="text-xs text-gray-500 mr-1">From</span>
                      <span className="text-lg font-bold text-black">
                        £{trip.price.toLocaleString()}
                      </span>
                    </div>
                  </div>
                  
                  {/* View Trip Button */}
                  <Link to={`/tours/${trip.id}`}>
                    <button className="bg-[#CCFF00] text-black hover:bg-[#b8e600] font-bold px-4 py-2 rounded-full text-sm uppercase tracking-wide transition-colors w-full">
                      VIEW TRIP
                    </button>
                  </Link>
                </div>
              </article>
            ))}
          </div>
          
          {/* Navigation dots */}
          {Math.ceil(displayTrips.length / 4) > 1 && (
            <div className="flex justify-center mt-8 gap-2">
              {Array.from({ length: Math.ceil(displayTrips.length / 4) }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i)}
                  className={`w-2 h-2 rounded-full transition-colors ${i === currentPage ? 'bg-gray-800' : 'bg-gray-300'}`}
                  aria-label={`Go to page ${i + 1}`}
                />
              ))}
            </div>
          )}
          
          {/* View All Trips Button */}
          <div className="text-center mt-8">
            <Link to="/tours">
              <button className="bg-[#CCFF00] text-black hover:bg-[#b8e600] font-bold px-8 py-3 rounded-full text-base uppercase tracking-wide transition-colors">
                VIEW ALL TRIPS
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedTrips;


import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTrips } from '@/hooks/useTrips';
import { Skeleton } from '@/components/ui/skeleton';
import ErrorMessage from '@/components/ui/error-message';
import { trackEvent } from '@/lib/analytics';
import { Star, ChevronLeft, ChevronRight, Plus, Calendar, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

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

  // Mock data that matches the screenshot
  const mockTrips = [
    {
      id: '1',
      name: 'Greek Island Hopping',
      destination: 'Greece',
      price: 1751,
      oldPrice: 2335,
      duration: 11,
      countries: 1,
      places: 5,
      rating: 4.6,
      image: 'https://images.unsplash.com/photo-1571406252267-102c2b8eff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      isSpotlight: true,
      description: 'The one that takes you through Mykonos, Paros, Santorini and Ios with comfy sleeps between island hops, wit...'
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
      image: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
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
      image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
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
      image: 'https://images.unsplash.com/photo-1555992336-03a23c7b20ee?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
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

  return (
    <section className="py-16 bg-white" aria-labelledby="featured-trips-heading">
      <div className="container max-w-7xl mx-auto px-4">
        {/* Header with navigation arrows - centered with buttons on the sides */}
        <div className="flex items-center justify-center mb-8 relative">
          <h2 id="featured-trips-heading" className="text-3xl font-bold text-black">
            Popular trips
          </h2>
          <div className="absolute right-0 flex items-center gap-2">
            <button 
              className="w-12 h-12 border border-gray-200 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors disabled:opacity-50"
              onClick={handlePrevious}
              disabled={currentPage === 0}
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            <button 
              className="w-12 h-12 border border-gray-200 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors disabled:opacity-50"
              onClick={handleNext}
              disabled={currentPage >= Math.ceil(displayTrips.length / 4) - 1}
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
        
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <Skeleton className="h-48 w-full" />
                <div className="p-4">
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/2 mb-2" />
                  <Skeleton className="h-4 w-1/4" />
                </div>
              </div>
            ))}
          </div>
        )}
        
        {error && (
          <ErrorMessage
            title="Unable to load popular trips"
            message={error}
            onRetry={handleRetry}
          />
        )}
        
        {!loading && !error && (
          <div className="relative">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {visibleTrips.map((trip, index) => (
                <div key={trip.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow group">
                  {/* Trip Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={trip.image || `https://images.unsplash.com/photo-1571406252267-102c2b8eff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80`}
                      alt={trip.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                    
                    {/* Trip Spotlight Badge */}
                    {trip.isSpotlight && (
                      <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                        Trip Spotlight
                      </div>
                    )}
                    
                    {/* Add to Compare Button */}
                    <button className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors">
                      <Plus className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                  
                  {/* Trip Content */}
                  <div className="p-4">
                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-4 h-4 ${i < Math.floor(trip.rating || 4.6) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                        />
                      ))}
                      <span className="text-sm font-medium ml-1">{trip.rating || '4.6'}</span>
                    </div>
                    
                    {/* Trip Name */}
                    <h3 className="font-bold text-lg mb-2 text-black line-clamp-2">
                      {trip.name}
                    </h3>
                    
                    {/* Trip Details */}
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{trip.duration || 11} Days</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>{trip.places || 5} Places</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span>{trip.countries || 1} {trip.countries === 1 ? 'Country' : 'Countries'}</span>
                      </div>
                    </div>
                    
                    {/* Description */}
                    <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                      {trip.description || `The one that takes you through ${trip.destination} with comfy sleeps between island hops...`}
                    </p>
                    
                    {/* Add to Compare Button */}
                    <button className="flex items-center gap-2 text-sm text-black border border-gray-300 rounded-full px-4 py-2 hover:bg-gray-50 transition-colors mb-4 w-full justify-center">
                      <Plus className="w-4 h-4" />
                      Add to compare
                    </button>
                    
                    {/* Price and View Trip */}
                    <div className="flex items-center justify-between">
                      <div>
                        {trip.oldPrice && (
                          <span className="text-sm text-gray-400 line-through block">
                            £{trip.oldPrice.toLocaleString()}
                          </span>
                        )}
                        <div className="flex items-center">
                          <span className="text-sm text-gray-700 mr-1">From</span>
                          <span className="text-lg font-bold text-black">
                            £{trip.price.toLocaleString()}
                          </span>
                        </div>
                      </div>
                      <Button asChild className="bg-[#CCFF00] text-black hover:bg-[#CCFF00]/90 font-bold px-6 py-2 rounded-lg">
                        <Link to={`/tours/${trip.id}`}>VIEW TRIP</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Navigation dots */}
            <div className="flex justify-center mt-8 gap-2">
              {Array.from({ length: Math.ceil(displayTrips.length / 4) }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i)}
                  className={`w-3 h-3 rounded-full transition-colors ${i === currentPage ? 'bg-gray-900' : 'bg-gray-300'}`}
                  aria-label={`Go to page ${i + 1}`}
                />
              ))}
            </div>
            
            {/* View All Trips Button */}
            <div className="text-center mt-12">
              <Button 
                asChild
                className="bg-[#CCFF00] text-black hover:bg-[#CCFF00]/90 font-bold px-8 py-3 rounded-lg text-lg"
              >
                <Link to="/tours">VIEW ALL TRIPS</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedTrips;

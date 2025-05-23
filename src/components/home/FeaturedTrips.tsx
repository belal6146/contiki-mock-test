
import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { useTrips } from '@/hooks/useTrips';
import { Skeleton } from '@/components/ui/skeleton';
import ErrorMessage from '@/components/ui/error-message';
import { trackEvent } from '@/lib/analytics';
import { Star, ChevronLeft, ChevronRight, Plus, Calendar, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
// Import slick carousel CSS
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Lazy load the Slider component
const Slider = lazy(() => import("react-slick"));

const FeaturedTrips = () => {
  const { trips, loading, error } = useTrips({ featured: true, limit: 6 });
  
  useEffect(() => {
    console.debug('[FeaturedTrips] mounted');
    trackEvent('component_mounted', { name: 'FeaturedTrips' });
  }, []);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: false,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ],
    dotsClass: 'slick-dots custom-dots'
  };

  // Custom arrow components
  function CustomPrevArrow(props: any) {
    const { onClick } = props;
    return (
      <button
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
        onClick={onClick}
        aria-label="Previous trips"
      >
        <ChevronLeft className="w-5 h-5 text-gray-600" />
      </button>
    );
  }

  function CustomNextArrow(props: any) {
    const { onClick } = props;
    return (
      <button
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
        onClick={onClick}
        aria-label="Next trips"
      >
        <ChevronRight className="w-5 h-5 text-gray-600" />
      </button>
    );
  }

  const handleRetry = () => {
    window.location.reload();
    trackEvent('retry_clicked', { component: 'FeaturedTrips' });
  };

  // Mock data if no trips are loaded
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
      isSpotlight: true
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
      image: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
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
    }
  ];

  const displayTrips = trips.length > 0 ? trips : mockTrips;

  return (
    <>
      <section className="py-16 bg-white" aria-labelledby="featured-trips-heading">
        <div className="container max-w-7xl mx-auto px-4">
          {/* Header with navigation arrows - centered with buttons on the sides */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex-1 text-center">
              <h2 id="featured-trips-heading" className="text-3xl font-bold text-black">
                Popular trips
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <button className="w-12 h-12 border border-gray-200 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors">
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>
              <button className="w-12 h-12 border border-gray-200 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors">
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {displayTrips.slice(0, 4).map((trip) => (
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
                        The one that takes you through Mykonos, Paros, Santorini and Ios with comfy sleeps between island hops...
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
                <div className="w-3 h-3 rounded-full bg-gray-900"></div>
                <div className="w-3 h-3 rounded-full bg-gray-300"></div>
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

      {/* CSS styles as a separate style tag */}
      <style dangerouslySetInnerHTML={{
        __html: `
          .custom-dots {
            bottom: -40px;
          }
          .custom-dots li button:before {
            font-size: 12px;
            color: #666;
          }
          .custom-dots li.slick-active button:before {
            color: #CCFF00;
          }
        `
      }} />
    </>
  );
};

export default FeaturedTrips;

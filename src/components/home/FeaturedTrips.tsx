
import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { useTrips } from '@/hooks/useTrips';
import TripCard from '@/components/TripCard';
import { Skeleton } from '@/components/ui/skeleton';
import ErrorMessage from '@/components/ui/error-message';
import { trackEvent } from '@/lib/analytics';
import PrevArrow from '@/components/carousel/PrevArrow';
import NextArrow from '@/components/carousel/NextArrow';
// Import slick carousel CSS
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Lazy load the Slider component
const Slider = lazy(() => import("react-slick"));

// Map of trip IDs to descriptions for fallback
const tripDescriptions = {
  'trip-1': 'Experience the beautiful islands of Greece',
  'trip-2': 'Tour the ancient wonders of Italy',
  'trip-3': 'Discover the exotic beaches of Thailand',
};

const FeaturedTrips = () => {
  const { trips, loading, error } = useTrips({ featured: true, limit: 3 });
  
  useEffect(() => {
    console.debug('[FeaturedTrips] mounted');
    trackEvent('component_mounted', { name: 'FeaturedTrips' });
  }, []);
  
  useEffect(() => {
    if (trips.length > 0) {
      console.debug('[FeaturedTrips] data loaded', { count: trips.length });
      trackEvent('trips_loaded', { count: trips.length });
    }
  }, [trips]);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    prevArrow: <PrevArrow aria-label="View previous trips" />,
    nextArrow: <NextArrow aria-label="View next trips" />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: '40px',
        }
      }
    ],
    dotsClass: 'slick-dots custom-dots'
  };

  const handleRetry = () => {
    window.location.reload();
    trackEvent('retry_clicked', { component: 'FeaturedTrips' });
  };

  // This function can now rely directly on the trip's image property
  // We no longer need references to static image files that don't exist
  const getDescription = (tripId: string) => {
    return tripDescriptions[tripId] || 'Explore this amazing destination';
  };

  return (
    <section className="py-16 md:py-24 bg-bgLight" aria-labelledby="featured-trips-heading">
      <div className="container">
        <div className="text-center mb-12">
          <h2 id="featured-trips-heading" className="font-montserrat font-bold text-3xl md:text-4xl mb-4">Featured Trips</h2>
          <p className="font-montserrat text-lg text-gray-600 max-w-3xl mx-auto">
            Discover our most popular trips and start planning your next adventure today.
          </p>
        </div>
        
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex flex-col w-[300px] h-[400px] mx-auto">
                <Skeleton className="h-[250px] rounded-t-lg w-full" />
                <Skeleton className="h-8 mt-4 w-3/4" />
                <Skeleton className="h-6 mt-2 w-1/2" />
                <Skeleton className="h-6 mt-2 w-1/4" />
              </div>
            ))}
          </div>
        )}
        
        {error && (
          <ErrorMessage
            title="Unable to load featured trips"
            message={error}
            onRetry={handleRetry}
          />
        )}
        
        {!loading && !error && trips.length === 0 && (
          <div className="text-center py-10">
            <p className="text-gray-500">No featured trips available at the moment.</p>
          </div>
        )}
        
        {!loading && !error && trips.length > 0 && (
          <div className="featured-trips-slider overflow-hidden">
            <Suspense fallback={
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex flex-col w-[300px] h-[400px] mx-auto">
                    <Skeleton className="h-[250px] rounded-t-lg w-full" />
                    <Skeleton className="h-8 mt-4 w-3/4" />
                    <Skeleton className="h-6 mt-2 w-1/2" />
                    <Skeleton className="h-6 mt-2 w-1/4" />
                  </div>
                ))}
              </div>
            }>
              <Slider {...sliderSettings} className="slick-slider">
                {trips.map((trip) => (
                  <div key={trip.id} className="px-4">
                    <div className="group w-[300px] h-[400px] mx-auto bg-white rounded-lg shadow-md overflow-hidden transition-all duration-150 hover:shadow-lg">
                      <div className="h-[250px] overflow-hidden">
                        <img 
                          src={trip.image || `https://source.unsplash.com/random/300x250/?${trip.destination.toLowerCase().replace(' ', '')}`}
                          alt={`${trip.name} tour in ${trip.destination}`}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                          loading="lazy"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-montserrat font-medium text-lg truncate">{trip.name}</h3>
                        <p className="font-montserrat text-gray-600">{trip.destination}</p>
                        <p className="font-montserrat font-bold mt-2 bg-[#CCFF00]/30 inline-block px-2 py-1 rounded">
                          From ${trip.price.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            </Suspense>
          </div>
        )}
        
        <div className="text-center mt-12">
          <Link 
            to="/tours"
            className="btn-primary px-6 py-3 text-lg inline-block focus:outline-none focus:ring-2 focus:ring-accent transition-all duration-150 ease-in-out"
            aria-label="View all available trips"
            onClick={() => trackEvent('view_all_trips_clicked')}
          >
            View All Trips
          </Link>
        </div>
      </div>

      <style>
        {`
        .custom-dots {
          bottom: -40px;
        }
        .custom-dots li button:before {
          font-size: 12px;
        }
        .slick-prev,
        .slick-next {
          z-index: 10;
        }
        `}
      </style>
    </section>
  );
};

export default FeaturedTrips;

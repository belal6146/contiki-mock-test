import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { useTrips } from '@/hooks/useTrips';
import TripCard from '@/components/TripCard';
import { Skeleton } from '@/components/ui/skeleton';
import ErrorMessage from '@/components/ui/error-message';
import { trackEvent } from '@/lib/analytics';
// Import slick carousel CSS
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Custom arrow components instead of importing from carousel
const PrevArrow = (props: any) => {
  const { className, style, onClick } = props;
  return (
    <button
      className={`${className} absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full z-10 bg-white p-2 rounded-full shadow-md`}
      style={{ ...style }}
      onClick={onClick}
      aria-label="View previous trips"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </button>
  );
};

const NextArrow = (props: any) => {
  const { className, style, onClick } = props;
  return (
    <button
      className={`${className} absolute right-0 top-1/2 -translate-y-1/2 translate-x-full z-10 bg-white p-2 rounded-full shadow-md`}
      style={{ ...style }}
      onClick={onClick}
      aria-label="View next trips"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </button>
  );
};

// Lazy load the Slider component
const Slider = lazy(() => import("react-slick"));

const FeaturedTrips = () => {
  const { trips, loading, error } = useTrips({ featured: true, limit: 3 });
  
  useEffect(() => {
    trackEvent('component_mounted', { name: 'FeaturedTrips' });
  }, []);
  
  useEffect(() => {
    if (trips.length > 0) {
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
              <div key={i} className="flex flex-col">
                <Skeleton className="aspect-w-16 aspect-h-9 h-48 rounded-t-lg" />
                <Skeleton className="h-8 mt-4 w-3/4" />
                <Skeleton className="h-6 mt-2 w-1/2" />
                <Skeleton className="h-6 mt-2 w-1/4" />
                <Skeleton className="h-10 mt-4 w-1/3" />
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
                  <div key={i} className="flex flex-col">
                    <Skeleton className="aspect-w-16 aspect-h-9 h-48 rounded-t-lg" />
                    <Skeleton className="h-8 mt-4 w-3/4" />
                    <Skeleton className="h-6 mt-2 w-1/2" />
                    <Skeleton className="h-6 mt-2 w-1/4" />
                    <Skeleton className="h-10 mt-4 w-1/3" />
                  </div>
                ))}
              </div>
            }>
              <Slider {...sliderSettings} className="slick-slider">
                {trips.map((trip) => (
                  <div key={trip.id} className="px-4">
                    <div className="group transition-all duration-300 hover:scale-105">
                      <div className="aspect-w-16 aspect-h-9 overflow-hidden rounded-t-lg">
                        <img 
                          src={trip.image || '/placeholder.svg'} 
                          alt={`${trip.name} tour in ${trip.destination}`}
                          className="w-full h-full object-cover group-hover:shadow-lg transition-all"
                          loading="lazy"
                        />
                      </div>
                      <TripCard
                        id={trip.id}
                        title={trip.name}
                        region={trip.destination}
                        price={trip.price}
                      />
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

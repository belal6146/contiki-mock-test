
import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { useTrips } from '@/hooks/useTrips';
import TripCard from '@/components/TripCard';
import { 
  CarouselPrevious as PrevArrow,
  CarouselNext as NextArrow
} from '@/components/ui/carousel';
// Import slick carousel CSS
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Lazy load the Slider component
const Slider = lazy(() => import("react-slick"));

const FeaturedTrips = () => {
  const { trips, loading, error } = useTrips({ featured: true, limit: 3 });
  
  useEffect(() => {
    console.debug('[FeaturedTrips] mounted');
  }, []);
  
  useEffect(() => {
    if (trips.length > 0) {
      console.debug('[FeaturedTrips] fetched', { count: trips.length });
    }
    if (error) {
      console.debug('[FeaturedTrips] error', { error });
    }
  }, [trips, error]);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    prevArrow: <PrevArrow className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full z-10" aria-label="View previous trips" />,
    nextArrow: <NextArrow className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full z-10" aria-label="View next trips" />,
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
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary" aria-label="Loading trips"></div>
          </div>
        )}
        
        {error && (
          <div className="text-center py-10 bg-red-50 rounded-lg">
            <p className="text-red-500" role="alert">{error}</p>
            <button 
              className="mt-4 btn-primary px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent transition-all duration-150 ease-in-out"
              onClick={() => window.location.reload()}
              aria-label="Retry loading trips"
            >
              Retry
            </button>
          </div>
        )}
        
        {!loading && !error && trips.length === 0 && (
          <div className="text-center py-10">
            <p className="text-gray-500">No featured trips available at the moment.</p>
          </div>
        )}
        
        {!loading && !error && trips.length > 0 && (
          <div className="featured-trips-slider overflow-hidden">
            <Suspense fallback={
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary"></div>
              </div>
            }>
              <Slider {...sliderSettings} className="slick-slider">
                {trips.map((trip) => (
                  <div key={trip.id} className="px-4">
                    <div className="group transition-all duration-300 hover:scale-105">
                      <div className="aspect-w-16 aspect-h-9 overflow-hidden rounded-t-lg">
                        <img 
                          src={trip.image || '/placeholder.svg'} 
                          alt={`${trip.name} in ${trip.destination}`}
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

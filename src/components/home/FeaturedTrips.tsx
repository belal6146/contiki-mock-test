
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTrips } from '@/hooks/useTrips';
import TripCard from '@/components/TripCard';
import Slider from "react-slick";
import { ChevronLeft, ChevronRight } from 'lucide-react';
// Import slick carousel css
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const PrevArrow = (props: any) => {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white/80 rounded-full p-2 shadow-lg hover:bg-white/90 transition-all focus:outline-none focus:ring-2 focus:ring-accent"
      aria-label="Previous slide"
    >
      <ChevronLeft className="h-6 w-6" />
    </button>
  );
};

const NextArrow = (props: any) => {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white/80 rounded-full p-2 shadow-lg hover:bg-white/90 transition-all focus:outline-none focus:ring-2 focus:ring-accent"
      aria-label="Next slide"
    >
      <ChevronRight className="h-6 w-6" />
    </button>
  );
};

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
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
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
    <section className="py-16 md:py-24 bg-bgLight">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="font-montserrat font-bold text-3xl md:text-4xl mb-4">Featured Trips</h2>
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
              className="mt-4 btn-primary px-4 py-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
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
          <div className="featured-trips-slider">
            <Slider {...sliderSettings}>
              {trips.map((trip) => (
                <div key={trip.id} className="px-4">
                  <div className="group transition-all duration-300 hover:scale-105">
                    <div className="aspect-w-16 aspect-h-9 overflow-hidden rounded-t-lg">
                      <img 
                        src={trip.image || '/placeholder.svg'} 
                        alt={trip.name}
                        className="w-full h-full object-cover group-hover:shadow-lg transition-all"
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
          </div>
        )}
        
        <div className="text-center mt-12">
          <Link 
            to="/tours"
            className="btn-primary px-6 py-3 text-lg inline-block focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            aria-label="View all available trips"
          >
            View All Trips
          </Link>
        </div>
      </div>

      <style jsx>{`
        .custom-dots {
          bottom: -40px;
        }
        .custom-dots li button:before {
          font-size: 12px;
        }
        :global(.slick-prev),
        :global(.slick-next) {
          z-index: 10;
        }
      `}</style>
    </section>
  );
};

export default FeaturedTrips;

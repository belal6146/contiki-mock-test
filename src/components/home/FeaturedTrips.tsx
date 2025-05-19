
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTrips } from '@/hooks/useTrips';
import TripCard from '@/components/TripCard';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel';
import { Skeleton } from "@/components/ui/skeleton";

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
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent>
                {trips.map((trip) => (
                  <CarouselItem key={trip.id} className="md:basis-1/2 lg:basis-1/3">
                    <div className="p-4">
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
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="flex justify-center mt-6">
                <CarouselPrevious className="relative mr-2" />
                <CarouselNext className="relative" />
              </div>
            </Carousel>
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
    </section>
  );
};

export default FeaturedTrips;

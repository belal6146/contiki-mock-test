
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTrips } from '@/hooks/useTrips';
import TripCard from '@/components/TripCard';

const FeaturedTrips = () => {
  const { trips, loading, error } = useTrips({ featured: true, limit: 3 });
  
  useEffect(() => {
    console.debug('[FeaturedTrips] mounted');
  }, []);
  
  useEffect(() => {
    if (trips.length > 0) {
      console.debug('[FeaturedTrips] trips loaded', { count: trips.length });
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
          <>
            {/* Mobile: Horizontal Scroll */}
            <div className="md:hidden overflow-x-auto pb-4">
              <div className="flex space-x-4 w-max px-4">
                {trips.map((trip) => (
                  <div key={trip.id} className="w-[280px] flex-shrink-0">
                    <TripCard
                      id={trip.id}
                      title={trip.name}
                      region={trip.destination}
                      price={trip.price}
                    />
                  </div>
                ))}
              </div>
            </div>
            
            {/* Desktop: Grid */}
            <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {trips.map((trip) => (
                <TripCard
                  key={trip.id}
                  id={trip.id}
                  title={trip.name}
                  region={trip.destination}
                  price={trip.price}
                />
              ))}
            </div>
          </>
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

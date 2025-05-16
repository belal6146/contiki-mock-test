
import React from 'react';
import { Link } from 'react-router-dom';
import { useTrips } from '@/hooks/useTrips';
import { formatCurrency } from '@/lib/utils';

const FeaturedTrips = () => {
  const { trips, loading, error } = useTrips({ featured: true, limit: 3 });

  return (
    <section className="py-16 md:py-24 bg-bgLight">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="heading-lg mb-4">Featured Trips</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Discover our most popular trips and start planning your next adventure today.
          </p>
        </div>
        
        {loading && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary"></div>
          </div>
        )}
        
        {error && (
          <div className="text-center py-10 bg-red-50 rounded-lg">
            <p className="text-red-500">{error}</p>
            <button 
              className="mt-4 btn-primary px-4 py-2"
              onClick={() => window.location.reload()}
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {trips.map((trip) => (
              <div key={trip.id} className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform hover:translate-y-[-5px]">
                <div className="relative h-64">
                  <img 
                    src={trip.image} 
                    alt={trip.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-highlight text-primary px-3 py-1 rounded-full font-medium">
                    {trip.duration} days
                  </div>
                  <div className="absolute top-4 right-4 bg-white text-primary px-3 py-1 rounded-full font-medium">
                    {trip.destination}
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-primary">
                    {trip.name}
                  </h3>
                  
                  <div className="flex items-center mb-3">
                    <div className="flex items-center">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <svg 
                          key={i}
                          xmlns="http://www.w3.org/2000/svg" 
                          width="16" 
                          height="16" 
                          viewBox="0 0 24 24" 
                          fill={(i < Math.floor(trip.rating)) ? "currentColor" : "none"}
                          stroke="currentColor"
                          strokeWidth="2"
                          className={i < Math.floor(trip.rating) ? "text-yellow-500" : "text-gray-300"}
                        >
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                        </svg>
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-gray-600">
                      {trip.rating} ({trip.reviewCount} reviews)
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {trip.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">From</p>
                      <p className="text-xl font-bold text-primary">
                        {formatCurrency(trip.price)}
                      </p>
                    </div>
                    
                    <Link 
                      to={`/tours/${trip.slug}`}
                      className="btn-accent px-4 py-2"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        <div className="text-center mt-12">
          <Link 
            to="/tours"
            className="btn-primary px-6 py-3 text-lg"
          >
            View All Trips
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedTrips;

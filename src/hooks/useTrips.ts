
import { useState, useEffect } from 'react';
import { trackEvent, trackError } from '@/lib/analytics';
import { mockTrips } from '@/data/mockTrips';
import { filterTrips } from '@/utils/tripFilters';
import { Trip, UseTripsOptions } from '@/types/trips';

export const useTrips = (options: UseTripsOptions = {}) => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrips = async () => {
      setLoading(true);
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Filter trips based on options
        let filteredTrips = [...mockTrips];
        
        if (options.featured) {
          // Just return all for featured (in a real app, you'd have a featured flag)
          filteredTrips = mockTrips.slice(0, options.limit || 3);
        } else {
          filteredTrips = filterTrips(mockTrips, options);
        }
        
        setTrips(filteredTrips);
        setError(null);
        
        trackEvent('trips_fetched', { 
          count: filteredTrips.length,
          filters: { ...options }
        });
      } catch (err) {
        const errorMessage = 'Failed to fetch trips. Please try again later.';
        trackError('useTrips', err, options);
        setError(errorMessage);
        setTrips([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTrips();
  }, [
    options.featured,
    options.destination,
    options.minPrice,
    options.maxPrice,
    options.minDuration,
    options.maxDuration,
    options.limit
  ]);

  // Get a single trip by slug
  const getTripBySlug = (slug: string): Trip | undefined => {
    return mockTrips.find(trip => trip.slug === slug);
  };

  return { trips, loading, error, getTripBySlug };
};

export { Trip, UseTripsOptions };

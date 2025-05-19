
import { useState, useEffect } from 'react';
import { mockTrips } from '@/data/mockTrips';
import { trackEvent, trackError } from '@/lib/analytics';
import { Trip, TripFilter } from './types';

export const useTrips = (filters: TripFilter = {}) => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrips = async () => {
      setLoading(true);
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 300));
        
        // Apply filters to mock data
        let filteredTrips = [...mockTrips];
        
        // Apply specific filters
        if (filters.featured) {
          filteredTrips = filteredTrips.filter(trip => trip.rating >= 4.5);
        }
        
        if (filters.destination) {
          filteredTrips = filteredTrips.filter(trip => 
            trip.destination.toLowerCase().includes(filters.destination!.toLowerCase())
          );
        }
        
        if (filters.minPrice) {
          filteredTrips = filteredTrips.filter(trip => trip.price >= filters.minPrice!);
        }
        
        if (filters.maxPrice) {
          filteredTrips = filteredTrips.filter(trip => trip.price <= filters.maxPrice!);
        }
        
        if (filters.minDuration) {
          filteredTrips = filteredTrips.filter(trip => trip.duration >= filters.minDuration!);
        }
        
        if (filters.maxDuration) {
          filteredTrips = filteredTrips.filter(trip => trip.duration <= filters.maxDuration!);
        }
        
        // Apply limit if specified
        if (filters.limit && filters.limit > 0) {
          filteredTrips = filteredTrips.slice(0, filters.limit);
        }
        
        setTrips(filteredTrips);
        setError(null);
        
        // Track event
        trackEvent('trips_fetched', { 
          count: filteredTrips.length,
          filters: JSON.stringify(filters)
        });
      } catch (err) {
        const errorMessage = 'Failed to fetch trips. Please try again later.';
        trackError('useTrips', err, { filters });
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchTrips();
  }, [
    filters.featured, 
    filters.destination, 
    filters.minPrice, 
    filters.maxPrice, 
    filters.minDuration, 
    filters.maxDuration, 
    filters.limit
  ]);

  return { trips, loading, error };
};

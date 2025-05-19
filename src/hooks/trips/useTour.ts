
import { useState, useEffect } from 'react';
import { trackEvent, trackError } from '@/lib/analytics';
import { mockTrips } from '@/data/mockTrips';
import { Trip } from './types';

export const useTour = (slugOrId: string) => {
  const [tour, setTour] = useState<Trip | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTour = async () => {
      setLoading(true);
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 300));
        
        // Find tour by slug or ID
        const foundTour = mockTrips.find(trip => 
          trip.slug === slugOrId || trip.id === slugOrId
        );
        
        if (!foundTour) {
          setError('Tour not found');
          setTour(null);
        } else {
          setTour(foundTour);
          setError(null);
          trackEvent('tour_fetched', { 
            id: foundTour.id,
            slug: foundTour.slug,
            name: foundTour.name
          });
        }
      } catch (err) {
        const errorMessage = 'Failed to fetch tour details. Please try again later.';
        trackError('useTour', err, { slugOrId });
        setError(errorMessage);
        setTour(null);
      } finally {
        setLoading(false);
      }
    };

    if (slugOrId) {
      fetchTour();
    } else {
      setLoading(false);
      setError('No tour ID provided');
      setTour(null);
    }
  }, [slugOrId]);

  return { tour, loading, error };
};

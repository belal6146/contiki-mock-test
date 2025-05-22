
import { useState, useEffect } from 'react';
import { trackEvent, trackError } from '@/lib/analytics';
import { mockTrips } from '@/data/mockTrips';
import { Trip } from '@/types/trip';

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
        
        // Find tour by slug or ID - handle numeric IDs properly
        const foundTour = mockTrips.find(trip => 
          trip.slug === slugOrId || trip.id === slugOrId || trip.id === String(slugOrId)
        );
        
        if (!foundTour) {
          setError('Tour not found');
          setTour(null);
          console.debug('[useTour] Tour not found', { slugOrId });
        } else {
          setTour(foundTour);
          setError(null);
          console.debug('[useTour] Tour loaded successfully', { 
            id: foundTour.id, 
            slug: foundTour.slug,
            name: foundTour.name
          });
          trackEvent('tour_fetched', { 
            id: foundTour.id,
            slug: foundTour.slug,
            name: foundTour.name
          });
        }
      } catch (err) {
        const errorMessage = 'Failed to fetch tour details. Please try again later.';
        trackError('useTour', err, { slugOrId });
        console.error('[useTour] Error fetching tour', err);
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

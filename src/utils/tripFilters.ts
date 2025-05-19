
import { Trip, UseTripsOptions } from '@/types/trips';

export const filterTrips = (trips: Trip[], options: UseTripsOptions = {}): Trip[] => {
  let filteredTrips = [...trips];
  
  if (options.destination) {
    filteredTrips = filteredTrips.filter(trip => 
      trip.destination.toLowerCase() === options.destination?.toLowerCase()
    );
  }
  
  if (options.minPrice !== undefined) {
    filteredTrips = filteredTrips.filter(trip => trip.price >= (options.minPrice || 0));
  }
  
  if (options.maxPrice !== undefined) {
    filteredTrips = filteredTrips.filter(trip => trip.price <= (options.maxPrice || Infinity));
  }
  
  if (options.minDuration !== undefined) {
    filteredTrips = filteredTrips.filter(trip => trip.duration >= (options.minDuration || 0));
  }
  
  if (options.maxDuration !== undefined) {
    filteredTrips = filteredTrips.filter(trip => trip.duration <= (options.maxDuration || Infinity));
  }
  
  // Apply limit
  if (options.limit) {
    filteredTrips = filteredTrips.slice(0, options.limit);
  }
  
  return filteredTrips;
};

export const getTripBySlug = (trips: Trip[], slug: string): Trip | undefined => {
  return trips.find(trip => trip.slug === slug || trip.id === slug);
};

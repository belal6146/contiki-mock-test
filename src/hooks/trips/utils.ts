
import { Trip, TripCardProps } from './types';

export const transformToCard = (trip: Trip): TripCardProps => {
  return {
    id: trip.slug,
    title: trip.name,
    region: trip.destination,
    price: trip.price
  };
};

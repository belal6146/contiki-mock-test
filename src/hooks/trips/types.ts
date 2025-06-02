import { Trip as TripType } from '@/types/trips';
import { ComponentProps } from 'react';
import TripCard from '@/components/TripCard';

export type Trip = TripType;

export interface TripFilter {
  featured?: boolean;
  destination?: string;
  minPrice?: number;
  maxPrice?: number;
  minDuration?: number;
  maxDuration?: number;
  limit?: number;
  year?: string;
  month?: string;
  tripType?: string;
}

export interface TripCardProps extends ComponentProps<typeof TripCard> {
  id: string;
  title: string;
  region: string;
  price: number;
}

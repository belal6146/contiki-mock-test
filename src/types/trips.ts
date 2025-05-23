
// Define the Trip type and related interfaces
export interface Trip {
  id: string;
  slug: string;
  name: string;
  destination: string;
  duration: number;
  price: number;
  oldPrice?: number;
  image: string;
  rating: number;
  reviewCount: number;
  description: string;
  highlights: string[];
  included: string[];
  discountPercentage?: number; // Add this property
  itinerary: {
    day: number;
    title: string;
    description: string;
    meals: string[];
    accommodation: string;
  }[];
  variations: {
    id: string;
    name: string;
    startDate: string;
    endDate: string;
    price: number;
    availability: 'available' | 'limited' | 'soldout';
  }[];
}

export interface UseTripsOptions {
  featured?: boolean;
  destination?: string;
  minPrice?: number;
  maxPrice?: number;
  minDuration?: number;
  maxDuration?: number;
  limit?: number;
}

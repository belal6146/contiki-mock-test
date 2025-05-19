
export interface DayDetails {
  day: number;
  title: string;
  description: string;
  meals: string[];
  accommodation: string;
}

export interface Variation {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  price: number;
  availability: 'available' | 'limited' | 'soldout'; // Updated to use specific string literals
}

export interface Trip {
  id: string;
  slug: string;
  name: string;
  description: string;
  destination: string;
  price: number;
  duration: number;
  image: string;
  rating: number;
  reviewCount: number;
  itinerary: DayDetails[];
  variations: Variation[];
  highlights: string[]; // Changed from optional to required to match useTrips.ts
  included: string[]; // Changed from optional to required to match useTrips.ts
}

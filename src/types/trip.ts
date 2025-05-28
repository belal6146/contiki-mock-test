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
  availability: 'available' | 'limited' | 'soldout';
}

export interface Trip {
  id: string;
  slug: string;
  name: string;
  description: string;
  destination: string;
  price: number;
  oldPrice?: number;
  duration: number;
  image: string;
  rating: number;
  reviewCount: number;
  discountPercentage?: number;
  spotlight?: boolean;
  itinerary: DayDetails[];
  variations: Variation[];
  highlights: string[];
  included: string[];
}

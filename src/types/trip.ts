
export interface DayDetails {
  day: number;
  title: string;
  description: string;
  meals: string[];
  accommodation: string;
}

export interface Variation {
  id: string;
  startDate: string;
  endDate: string;
  price: number;
  availability: string;
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
}


import { useState, useEffect } from 'react';

// Define the Trip type
export interface Trip {
  id: string;
  slug: string;
  name: string;
  destination: string;
  duration: number;
  price: number;
  image: string;
  rating: number;
  reviewCount: number;
  description: string;
  highlights: string[];
  included: string[];
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

// Mock data for trips
const mockTrips: Trip[] = [
  {
    id: '1',
    slug: 'european-discovery',
    name: 'European Discovery',
    destination: 'Europe',
    duration: 14,
    price: 2899,
    image: '/placeholder.svg',
    rating: 4.8,
    reviewCount: 324,
    description: 'Discover the best of Europe in this two-week adventure through 7 countries. From the canals of Amsterdam to the hills of Rome, experience the diversity of European culture, history, and landscapes.',
    highlights: [
      'Visit 7 countries in 14 days',
      'Experience the romance of Paris',
      'Cruise through the canals of Amsterdam',
      'See the historic ruins of Rome',
      'Enjoy authentic cuisine across Europe'
    ],
    included: [
      '13 nights accommodation',
      '13 breakfasts, 5 dinners',
      'All transport between destinations',
      'Expert Trip Manager and Local Guides',
      'Entrance to select attractions'
    ],
    itinerary: [
      {
        day: 1,
        title: 'London to Paris',
        description: 'Meet your Trip Manager and fellow travelers in London before crossing the English Channel to Paris. Enjoy a welcome dinner in the City of Lights.',
        meals: ['Dinner'],
        accommodation: 'Hotel Ibis Paris'
      },
      {
        day: 2,
        title: 'Paris',
        description: 'Explore the iconic sights of Paris including the Eiffel Tower, Notre Dame Cathedral, and the Louvre. Optional Seine River cruise available.',
        meals: ['Breakfast'],
        accommodation: 'Hotel Ibis Paris'
      },
      // Additional days would be listed here
    ],
    variations: [
      {
        id: '1a',
        name: 'Summer Departure',
        startDate: '2023-06-15',
        endDate: '2023-06-29',
        price: 2899,
        availability: 'limited'
      },
      {
        id: '1b',
        name: 'Fall Departure',
        startDate: '2023-09-10',
        endDate: '2023-09-24',
        price: 2699,
        availability: 'available'
      },
      {
        id: '1c',
        name: 'Winter Departure',
        startDate: '2023-12-05',
        endDate: '2023-12-19',
        price: 2499,
        availability: 'available'
      }
    ]
  },
  {
    id: '2',
    slug: 'thai-island-hopper',
    name: 'Thai Island Hopper',
    destination: 'Asia',
    duration: 9,
    price: 1499,
    image: '/placeholder.svg',
    rating: 4.7,
    reviewCount: 256,
    description: 'Island hop your way through the best of Thailand\'s beaches and bays. From Phuket to Koh Phi Phi to Krabi, this trip is a beach lover\'s paradise.',
    highlights: [
      'Relax on world-famous Thai beaches',
      'Snorkel in crystal clear waters',
      'Experience vibrant nightlife',
      'Try authentic Thai cuisine',
      'Optional water sports and activities'
    ],
    included: [
      '8 nights accommodation',
      '8 breakfasts, 3 dinners',
      'All transport between islands',
      'Expert Trip Manager',
      'Snorkeling excursion'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrive in Phuket',
        description: 'Arrive in Phuket and meet your Trip Manager and fellow travelers. Get to know each other over a welcome dinner.',
        meals: ['Dinner'],
        accommodation: 'Patong Beach Resort'
      },
      {
        day: 2,
        title: 'Phuket',
        description: 'Free day to explore Phuket. Optional activities include visiting the Big Buddha, exploring old Phuket town, or relaxing on the beach.',
        meals: ['Breakfast'],
        accommodation: 'Patong Beach Resort'
      },
      // Additional days would be listed here
    ],
    variations: [
      {
        id: '2a',
        name: 'High Season Departure',
        startDate: '2023-01-15',
        endDate: '2023-01-24',
        price: 1699,
        availability: 'limited'
      },
      {
        id: '2b',
        name: 'Shoulder Season Departure',
        startDate: '2023-05-10',
        endDate: '2023-05-19',
        price: 1499,
        availability: 'available'
      },
      {
        id: '2c',
        name: 'Low Season Departure',
        startDate: '2023-09-05',
        endDate: '2023-09-14',
        price: 1299,
        availability: 'available'
      }
    ]
  },
  {
    id: '3',
    slug: 'costa-rica-adventure',
    name: 'Costa Rica Adventure',
    destination: 'Latin America',
    duration: 10,
    price: 1899,
    image: '/placeholder.svg',
    rating: 4.9,
    reviewCount: 189,
    description: 'Experience the natural wonders of Costa Rica from rainforests to volcanoes to beaches. This trip is perfect for adventure seekers and nature lovers.',
    highlights: [
      'Zipline through the rainforest canopy',
      'Hike around the Arenal Volcano',
      'Relax in natural hot springs',
      'Spot wildlife in Manuel Antonio National Park',
      'Learn about sustainable tourism practices'
    ],
    included: [
      '9 nights accommodation',
      '9 breakfasts, 3 lunches, 4 dinners',
      'All transport between destinations',
      'Expert Trip Manager and Local Guides',
      'Entrance to national parks'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrive in San Jose',
        description: 'Arrive in San Jose and meet your Trip Manager and fellow travelers. Enjoy a welcome dinner and orientation.',
        meals: ['Dinner'],
        accommodation: 'Hotel Presidente San Jose'
      },
      {
        day: 2,
        title: 'San Jose to Tortuguero',
        description: 'Travel to Tortuguero National Park. Enjoy a boat tour through the canals to spot wildlife like monkeys, sloths, and various birds.',
        meals: ['Breakfast', 'Lunch', 'Dinner'],
        accommodation: 'Turtle Beach Lodge'
      },
      // Additional days would be listed here
    ],
    variations: [
      {
        id: '3a',
        name: 'Dry Season Departure',
        startDate: '2023-02-10',
        endDate: '2023-02-20',
        price: 1999,
        availability: 'limited'
      },
      {
        id: '3b',
        name: 'Green Season Departure',
        startDate: '2023-06-15',
        endDate: '2023-06-25',
        price: 1799,
        availability: 'available'
      },
      {
        id: '3c',
        name: 'Fall Departure',
        startDate: '2023-11-05',
        endDate: '2023-11-15',
        price: 1899,
        availability: 'available'
      }
    ]
  }
];

export const useTrips = (options: UseTripsOptions = {}) => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrips = async () => {
      setLoading(true);
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Filter trips based on options
        let filteredTrips = [...mockTrips];
        
        if (options.featured) {
          // Just return all for featured (in a real app, you'd have a featured flag)
          filteredTrips = mockTrips.slice(0, options.limit || 3);
        }
        
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
        
        setTrips(filteredTrips);
        setError(null);
      } catch (err) {
        console.error('Error fetching trips:', err);
        setError('Failed to fetch trips. Please try again later.');
        setTrips([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTrips();
  }, [
    options.featured,
    options.destination,
    options.minPrice,
    options.maxPrice,
    options.minDuration,
    options.maxDuration,
    options.limit
  ]);

  // Get a single trip by slug
  const getTripBySlug = (slug: string): Trip | undefined => {
    return mockTrips.find(trip => trip.slug === slug);
  };

  return { trips, loading, error, getTripBySlug };
};


import { Trip } from '@/types/trips';

// Mock data for trips
export const mockTrips: Trip[] = [
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


export interface NavigationItem {
  label: string;
  to: string;
}

export const destinationItems: NavigationItem[] = [
  { label: 'Europe', to: '/destinations/europe' },
  { label: 'Asia', to: '/destinations/asia' },
  { label: 'Latin America', to: '/destinations/latin-america' },
  { label: 'USA & Canada', to: '/destinations/usa-canada' },
  { label: 'Australia & New Zealand', to: '/destinations/australia-new-zealand' },
  { label: 'Africa & Middle East', to: '/destinations/africa-middle-east' },
];

export const travelStyleItems: NavigationItem[] = [
  { label: 'Adventure', to: '/travel-styles/adventure' },
  { label: 'Sailing & Cruise', to: '/travel-styles/sailing-cruise' },
  { label: 'Camping', to: '/travel-styles/camping' },
  { label: 'Festivals', to: '/travel-styles/festivals' },
  { label: 'Winter & Ski', to: '/travel-styles/winter-ski' },
];

export const aboutItems: NavigationItem[] = [
  { label: 'About Us', to: '/about' },
  { label: 'Sustainability', to: '/about/sustainability' },
  { label: 'Travel FAQ', to: '/about/faq' },
  { label: 'Contact Us', to: '/contact' },
  { label: 'Careers', to: '/about/careers' },
];

export const inspiredItems: NavigationItem[] = [
  { label: 'Travel Articles', to: '/articles' },
  { label: 'Travel Guides', to: '/guides' },
  { label: 'Travel Podcast', to: '/podcast' },
  { label: 'Contiki Reviews', to: '/reviews' },
];

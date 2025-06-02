export interface NavigationItem {
  label: string; // The text displayed for the item
  to: string;    // The link destination URL
  description?: string; // Optional description (used in some dropdown layouts)
  image?: string; // Optional image URL (used in some dropdown layouts)
  children?: NavigationItem[]; // Optional nested items (for multi-level structures)
}

export interface PromoItem {
  type: 'image' | 'card'; // Type of promotional content
  imageUrl?: string; // Image URL for image type
  title?: string; // Title for card type
  subtitle?: string; // Subtitle for card type
  buttonText?: string; // Button text for card type
  buttonLink?: string; // Button link for card type
}

export interface DropdownContent {
  type?: 'list' | 'columns' | 'promoAndList' | string; // Layout type of the dropdown content
  sections?: {
    heading?: string; // Optional heading for a section within the dropdown
    items: NavigationItem[]; // Array of navigation items in this section
    promo?: PromoItem; // Optional promotional item for this section
  }[];
  items?: NavigationItem[]; // Array of navigation items if no sections are used
  promo?: PromoItem; // Optional top-level promotional item for the dropdown
}

export interface MainNavItem {
  name: string; // The display name in the main nav
  type: 'link' | 'dropdown'; // Whether it's a direct link or opens a dropdown
  href?: string; // The link destination (for type 'link')
  content?: DropdownContent; // The content of the dropdown (for type 'dropdown')
}

export const destinationItems: DropdownContent = {
  type: 'columns',
  sections: [
    {
      heading: 'Popular Destinations',
      items: [
        { label: 'Europe', to: '/destinations/europe', description: 'Explore the best of Europe', image: 'https://www.contiki.com/media/1vxqj0j1/europe.jpg' },
        { label: 'Asia', to: '/destinations/asia', description: 'Discover Asia\'s hidden gems', image: 'https://www.contiki.com/media/1vxqj0j1/asia.jpg' },
        { label: 'Australia & New Zealand', to: '/destinations/australia-new-zealand', description: 'Experience the land down under', image: 'https://www.contiki.com/media/1vxqj0j1/australia.jpg' }
      ]
    },
    {
      heading: 'By Region',
      items: [
        { label: 'North America', to: '/destinations/north-america', description: 'From coast to coast', image: 'https://www.contiki.com/media/1vxqj0j1/north-america.jpg' },
        { label: 'South America', to: '/destinations/south-america', description: 'Latin American adventures', image: 'https://www.contiki.com/media/1vxqj0j1/south-america.jpg' },
        { label: 'Africa', to: '/destinations/africa', description: 'Safari and beyond', image: 'https://www.contiki.com/media/1vxqj0j1/africa.jpg' }
      ]
    }
  ],
};

export const dealsItems: DropdownContent = {
  type: 'list',
  items: [
    { label: 'Early Bird Deals', to: '/deals/early-bird', description: 'Book early and save' },
    { label: 'Last Minute Deals', to: '/deals/last-minute', description: 'Grab a last-minute spot' },
    { label: 'Flash Sales', to: '/deals/flash-sales', description: 'Limited time offers' },
  ],
  promo: {
    type: 'card',
    title: 'Sign up for Deals',
    subtitle: 'Get exclusive offers in your inbox!',
    buttonText: 'Subscribe Now',
    buttonLink: '/newsletter'
  }
};

export const travelStyleItems: DropdownContent = {
  type: 'list',
  sections: [
    {
      heading: 'Styles',
      items: [
        { label: 'Sailing & Cruising', to: '/travel-styles/sailing-cruising' },
        { label: 'Road Trips', to: '/travel-styles/road-trips' },
        { label: 'City Breaks', to: '/travel-styles/city-breaks' },
        { label: 'Ski & Snow', to: '/travel-styles/ski-snow' },
        { label: 'Camping', to: '/travel-styles/camping' },
      ]
    },
    {
      heading: 'Other',
      items: [
        { label: 'Winter', to: '/travel-styles/winter' },
        { label: 'Summer', to: '/travel-styles/summer' },
      ]
    }
  ]
};

export const aboutItems: DropdownContent = {
  type: 'list',
  items: [
    { label: 'Our Story', to: '/about/our-story' },
    { label: 'Responsible Travel', to: '/about/responsible-travel' },
    { label: 'The Team', to: '/about/the-team' },
    { label: 'Careers', to: '/about/careers' },
    { label: 'FAQs', to: '/faqs' },
  ],
};

export const inspiredItems: DropdownContent = {
  type: 'list',
  items: [
    { label: 'Blog', to: '/blog' },
    { label: 'Travel Guides', to: '/travel-guides' },
    { label: 'Contiki TV', to: '/contiki-tv' },
    { label: 'Wallpapers', to: '/wallpapers' },
  ],
};

export const mainNavigationItems: MainNavItem[] = [
  {
    name: 'Destinations',
    type: 'dropdown',
    content: destinationItems,
  },
  {
    name: 'Travel Styles',
    type: 'dropdown',
    content: travelStyleItems,
  },
  {
    name: 'Deals',
    type: 'dropdown',
    content: dealsItems,
  },
  {
    name: 'About',
    type: 'dropdown',
    content: aboutItems,
  },
  {
    name: 'Inspired',
    type: 'dropdown',
    content: inspiredItems,
  },
];

console.log('[NavigationData] File loaded and data defined.', { mainNavigationItems, destinationItems, dealsItems, travelStyleItems, aboutItems, inspiredItems });

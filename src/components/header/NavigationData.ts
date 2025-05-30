export interface NavigationItem {
  label: string;
  to: string;
  children?: NavigationItem[]; // Added for nested links
}

// Define interface for promotional content within dropdowns
export interface PromoItem {
  type: 'image' | 'card'; // Type of promotional content
  imageUrl?: string; // Image URL for image type
  title?: string; // Title for card type
  subtitle?: string; // Subtitle for card type
  buttonText?: string; // Button text for card type
  buttonLink?: string; // Button link for card type
}

// Define interface for the structure of dropdown content
export interface DropdownContent {
  type: 'list' | 'columns' | 'promoAndList'; // Layout type
  sections?: { // For 'columns' and 'promoAndList' types
    heading?: string; // Optional heading for a section/column
    items?: NavigationItem[]; // List of links in this section
    promo?: PromoItem; // Promotional item for this section (used in promoAndList)
  }[];
  items?: NavigationItem[]; // For simple 'list' type
  promo?: PromoItem; // For simple 'promo' type (if a dropdown is just a promo)
}

export const destinationItems: DropdownContent = {
  type: 'columns', // Destinations use a column layout
  sections: [
    {
      heading: 'Europe',
      items: [
        { label: 'See All Europe', to: '/destinations/europe' },
        { label: 'Croatia', to: '/destinations/europe/croatia' },
        { label: 'Greece', to: '/destinations/europe/greece' },
        { label: 'Italy', to: '/destinations/europe/italy' },
        { label: 'Spain & Portugal', to: '/destinations/europe/spain-portugal' },
        { label: 'France', to: '/destinations/europe/france' },
        { label: 'Ireland', to: '/destinations/europe/ireland' },
        { label: 'UK & Scotland', to: '/destinations/europe/uk-scotland' },
        { label: 'Eastern Europe', to: '/destinations/europe/eastern-europe' },
        { label: 'Scandinavia', to: '/destinations/europe/scandinavia' },
      ]
    },
    {
      heading: 'Asia',
      items: [
        { label: 'See All Asia', to: '/destinations/asia' },
        { label: 'Borneo', to: '/destinations/asia/borneo' },
        { label: 'Cambodia', to: '/destinations/asia/cambodia' },
        { label: 'Japan', to: '/destinations/asia/japan' },
        { label: 'Laos', to: '/destinations/asia/laos' },
        { label: 'Malaysia', to: '/destinations/asia/malaysia' },
        { label: 'Singapore', to: '/destinations/asia/singapore' },
        { label: 'South Korea', to: '/destinations/asia/south-korea' },
        { label: 'Thailand', to: '/destinations/asia/thailand' },
        { label: 'Vietnam', to: '/destinations/asia/vietnam' },
      ]
    },
     {
       heading: 'Oceania',
       items: [
         { label: 'See All Oceania', to: '/destinations/oceania' },
         { label: 'Australia', to: '/destinations/australia' },
         { label: 'New Zealand', to: '/destinations/new-zealand' },
       ]
     },
      {
       heading: 'Latin America',
        items: [
         { label: 'See All Latin America', to: '/destinations/latin-america' },
         { label: 'Costa Rica', to: '/destinations/latin-america/costa-rica' },
         { label: 'Peru', to: '/destinations/latin-america/peru' },
         { label: 'Colombia', to: '/destinations/latin-america/colombia' },
         { label: 'Ecuador & Galapagos', to: '/destinations/latin-america/ecuador-galapagos' },
        ]
      },
       {
        heading: 'North America',
         items: [
          { label: 'See All North America', to: '/destinations/north-america' },
          { label: 'USA & Canada', to: '/destinations/usa-canada' },
         ]
       },
        {
         heading: 'Africa & Middle East',
          items: [
           { label: 'See All Africa & Middle East', to: '/destinations/africa-middle-east' },
           { label: 'Egypt', to: '/destinations/africa-middle-east/egypt' },
           { label: 'Morocco', to: '/destinations/africa-middle-east/morocco' },
          ]
        }
  ]
};

export const dealsItems: DropdownContent = {
   type: 'promoAndList',
   sections: [
     {
        items: [
          { label: 'Last Minute Deals', to: '/deals/last-minute' },
          { label: 'Ongoing Deals', to: '/deals/ongoing' },
          { label: 'Europe Last Minute Deals', to: '/deals/europe-last-minute' },
          { label: 'Asia Last Minute Deals', to: '/deals/asia-last-minute' },
          { label: 'See All Deals', to: '/deals' },
          { label: 'Sailing & Island Hopping Deals', to: '/deals/sailing-island-hopping' },
          { label: 'Student Travel Deals', to: '/deals/student' },
          { label: 'Teacher Travel Deals', to: '/deals/teacher' },
        ]
     },
     {
       promo: { // Using a placeholder image URL based on a screenshot
         type: 'image',
         imageUrl: 'https://www.contiki.com/media/qgvflb0p/deals-trip-spotlight.jpg?center=0.5%2C0.5&format=webp&height=400&mode=crop&quality=80&width=600'
       }
     }
   ]
};

export const travelStyleItems: DropdownContent = {
  type: 'list',
  items: [
    { label: 'Adventure Travel', to: '/travel-styles/adventure' },
    { label: 'Sailing & Cruise', to: '/travel-styles/sailing-cruise' },
    { label: 'Camping Tours', to: '/travel-styles/camping' },
    { label: 'Festivals & Events', to: '/travel-styles/festivals-events' },
    { label: 'Winter & Ski', to: '/travel-styles/winter-ski' },
    { label: 'Short Trips', to: '/travel-styles/short-trips' },
    { label: 'Longer Trips', to: '/travel-styles/longer-trips' },
  ]
};

export const aboutItems: DropdownContent = {
  type: 'list',
  items: [
    { label: 'About Us', to: '/about' },
    { label: 'Sustainability', to: '/about/sustainability' },
    { label: 'Travel FAQ', to: '/about/faq' },
    { label: 'Contact Us', to: '/contact' },
    { label: 'Careers', to: '/about/careers' },
    { label: 'Our Story', to: '/about/our-story' },
    { label: 'Contiki Crew', to: '/about/contiki-crew' },
  ]
};

export const inspiredItems: DropdownContent = {
  type: 'list',
  items: [
    { label: 'Travel Articles', to: '/articles' },
    { label: 'Travel Guides', to: '/guides' },
    { label: 'Travel Podcast', to: '/podcast' },
    { label: 'Contiki Reviews', to: '/reviews' },
    { label: 'Travel Videos', to: '/videos' },
    { label: 'Photo Gallery', to: '/gallery' },
  ]
};

import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ErrorBoundary from '@/components/ErrorBoundary';
import { trackPageView } from '@/lib/analytics';

const DestinationCard = ({ name, image, description }: { name: string; image: string; description: string }) => (
  <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
    <div className="h-48 bg-gray-300 relative">
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
      <h3 className="absolute bottom-4 left-4 text-white text-xl font-bold">{name}</h3>
    </div>
    <div className="p-4">
      <p className="text-gray-700">{description}</p>
      <button className="mt-3 text-accent font-medium flex items-center">
        Explore Destination
      </button>
    </div>
  </div>
);

const destinations = [
  {
    name: "Europe",
    image: "/placeholder.svg",
    description: "Discover ancient history and modern cultures across Europe's diverse countries."
  },
  {
    name: "Asia",
    image: "/placeholder.svg",
    description: "Experience vibrant cities and serene landscapes throughout Asia's fascinating regions."
  },
  {
    name: "North America",
    image: "/placeholder.svg",
    description: "Explore breathtaking natural wonders and iconic cities across North America."
  },
  {
    name: "South America",
    image: "/placeholder.svg",
    description: "Adventure through diverse ecosystems and rich cultural heritage in South America."
  },
  {
    name: "Africa",
    image: "/placeholder.svg",
    description: "Encounter amazing wildlife and spectacular landscapes across the African continent."
  },
  {
    name: "Oceania",
    image: "/placeholder.svg",
    description: "Discover paradise islands and unique wildlife in the South Pacific region."
  }
];

const Destinations = () => {
  useEffect(() => {
    trackPageView(window.location.pathname);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Explore Destinations | Contiki</title>
        <meta name="description" content="Discover amazing destinations around the world with Contiki. Find the perfect location for your next adventure." />
        <meta name="keywords" content="travel destinations, europe, asia, north america, south america, africa, oceania" />
        
        {/* Open Graph / Social Media */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Explore Destinations | Contiki" />
        <meta property="og:description" content="Discover amazing destinations around the world with Contiki. Find the perfect location for your next adventure." />
        <meta property="og:image" content="https://www.contiki.com/destinations-og-image.jpg" />
        <meta property="og:url" content="https://www.contiki.com/destinations" />
        
        {/* JSON-LD for Destinations */}
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "TravelAgency",
            "name": "Contiki",
            "url": "https://www.contiki.com/destinations",
            "description": "Explore destinations around the world with Contiki",
            "makesOffer": [
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "TouristDestination",
                  "name": "Europe"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "TouristDestination",
                  "name": "Asia"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "TouristDestination",
                  "name": "North America"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "TouristDestination",
                  "name": "South America"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "TouristDestination",
                  "name": "Africa"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "TouristDestination",
                  "name": "Oceania"
                }
              }
            ]
          }
        `}</script>
      </Helmet>
      
      <Header />
      
      <main className="flex-grow">
        <section className="bg-bgLight py-16" style={{ backgroundImage: `url('https://www.contiki.com/media/vsqbfbwh/dubrovnik-croatia.jpg?center=0.5%2C0.5&format=webp&height=600&mode=crop&quality=80&width=1920')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <div className="container mx-auto">
            <ErrorBoundary>
              <h1 className="heading-lg text-center mb-2 text-white drop-shadow">Explore Destinations</h1>
              <p className="text-center text-white drop-shadow mb-10 max-w-2xl mx-auto">
                Discover amazing places around the world with our curated selection of top destinations
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {destinations.map((destination, index) => (
                  <DestinationCard 
                    key={index}
                    name={destination.name}
                    image={destination.image}
                    description={destination.description}
                  />
                ))}
              </div>
            </ErrorBoundary>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Destinations;

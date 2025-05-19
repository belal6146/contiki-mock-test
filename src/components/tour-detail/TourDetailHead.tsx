
import React from 'react';
import { Helmet } from 'react-helmet';
import { Trip } from '@/types/trip';

interface TourDetailHeadProps {
  trip: Trip | null;
  slug: string | undefined;
}

const TourDetailHead: React.FC<TourDetailHeadProps> = ({ trip, slug }) => {
  const pageTitle = trip ? `${trip.name} | Contiki` : 'Tour Detail | Contiki';
  const pageDescription = trip ? trip.description.substring(0, 160) : 'Explore our amazing tours for 18-35 year olds';

  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      
      {/* Open Graph / Social Media */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      {trip && <meta property="og:image" content={trip.image} />}
      <meta property="og:url" content={`https://www.contiki.com/tours/${slug}`} />
      
      {/* JSON-LD for Tour */}
      {trip && (
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "TouristTrip",
            "name": "${trip.name}",
            "description": "${trip.description}",
            "touristType": ["Young Adults", "18-35"],
            "touchPoint": {
              "@type": "ContactPoint",
              "contactType": "Reservations",
              "telephone": "+44-20-7468-4335"
            },
            "itinerary": {
              "@type": "ItemList",
              "numberOfItems": ${trip.itinerary.length},
              "itemListElement": [
                ${trip.itinerary.map((day, index) => `{
                  "@type": "ListItem",
                  "position": ${index + 1},
                  "name": "${day.title}",
                  "description": "${day.description}"
                }`).join(',')}
              ]
            },
            "offers": {
              "@type": "Offer",
              "price": "${trip.price}",
              "priceCurrency": "USD"
            }
          }
        `}</script>
      )}
    </Helmet>
  );
};

export default TourDetailHead;

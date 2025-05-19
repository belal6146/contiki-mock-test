import React, { useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useTour, useTrips } from '@/hooks/useTrips';
import { trackPageView } from '@/lib/analytics';

import Header from '@/components/Header';
import HeroImage from '@/components/tour/HeroImage';
import PriceBar from '@/components/tour/PriceBar';
import TabNav, { TabPanel } from '@/components/tour/TabNav';
import BasicDetailsGrid from '@/components/DetailsGrid';
import TourDetailsGrid from '@/components/tour/DetailsGrid';
import VariationCards from '@/components/tour/VariationCards';
import Reviews from '@/components/tour/Reviews';
import Footer from '@/components/Footer';
import ErrorBoundary from '@/components/ErrorBoundary';
import BackToTopButton from '@/components/BackToTopButton';
import { BookingProvider } from '@/context/BookingContext';
import BookingFlow from '@/components/BookingFlow';
import BreadcrumbNav from '@/components/Breadcrumb';
import BookingBar from '@/components/BookingBar';
import { Skeleton } from '@/components/ui/skeleton';

// Import new components
import TripHighlights from '@/components/tour/TripHighlights';
import MapItinerary from '@/components/tour/MapItinerary';
import DailyAccordion from '@/components/tour/DailyAccordion';
import WhereYouWillStay from '@/components/tour/WhereYouWillStay';
import FlexDepositBar from '@/components/tour/FlexDepositBar';
import RelatedTrips from '@/components/tour/RelatedTrips';
import FAQAccordion from '@/components/tour/FAQAccordion';

const TourDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { tour: trip, loading, error } = useTour(slug || '');
  const { trips } = useTrips({ limit: 3 });
  
  useEffect(() => {
    console.debug('[TourDetail] slug:', slug);
    trackPageView(window.location.pathname);
    
    if (loading) {
      console.debug('[TourDetail] loading');
    }
  }, [slug, loading]);
  
  useEffect(() => {
    if (trip) {
      console.debug('[TourDetail] loaded');
    }
  }, [trip]);
  
  // If trip is not found (after loading is complete), render "Tour not found" message
  if (!loading && !trip) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-grow flex items-center justify-center p-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-primary mb-4">Tour Not Found</h1>
            <p className="text-gray-700 mb-8">The tour you're looking for doesn't exist or has been removed.</p>
            <a 
              href="/tours" 
              className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-md font-medium transition-colors"
            >
              Browse All Tours
            </a>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Loading state with skeleton loaders
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        
        {/* Hero image skeleton */}
        <div className="bg-gray-200 h-96 relative w-full animate-pulse" />
        
        {/* Breadcrumb skeleton */}
        <div className="container py-4">
          <div className="flex items-center gap-2">
            <Skeleton className="h-5 w-16" />
            <Skeleton className="h-5 w-5 rounded-full" />
            <Skeleton className="h-5 w-16" />
            <Skeleton className="h-5 w-5 rounded-full" />
            <Skeleton className="h-5 w-40" />
          </div>
        </div>
        
        {/* Price bar skeleton */}
        <div className="bg-gray-100 py-4">
          <div className="container">
            <div className="flex justify-between items-center">
              <Skeleton className="h-10 w-40" />
              <Skeleton className="h-8 w-48" />
            </div>
          </div>
        </div>
        
        {/* Details grid skeleton */}
        <div className="container py-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex flex-col">
                <Skeleton className="h-5 w-20 mb-1" />
                <Skeleton className="h-7 w-32" />
              </div>
            ))}
          </div>
        </div>
        
        {/* Tabs skeleton */}
        <div className="container py-6">
          <div className="flex space-x-4 mb-6">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-8 w-24" />
            ))}
          </div>
          <div className="space-y-6">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-64 w-full" />
          </div>
        </div>
        
        <div className="flex-grow" />
        <Footer />
      </div>
    );
  }
  
  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-grow flex items-center justify-center p-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-primary mb-4">Something went wrong</h2>
            <p className="text-gray-700 mb-8">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="btn-primary px-4 py-2"
            >
              Try again
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
  // Mock data for the new components
  const mockHighlights = [
    {
      id: "1",
      title: "Visit Fira",
      description: "Explore the city like a local and hit the winding lanes in this maze-like town to wander through Santorini's iconic white houses and blue-domed churches.",
      image: "/placeholder.svg",
      type: "Cultural"
    },
    {
      id: "2",
      title: "Ferry Ride from Santorini to Ios",
      description: "You'll travel the ferry from Santorini and roll with the massive blue Aegean waves. The turquoise-surrounded boarding allows for panoramic sea views.",
      image: "/placeholder.svg",
      type: "Included"
    },
    {
      id: "3",
      title: "Explore Mykonos by Night",
      description: "Feel that electric vibe and night buzz in the narrow alleyways and paths of Mykonos. Head to the famous windmills and coastlines for stunning sunset views.",
      image: "/placeholder.svg",
      type: "Additional"
    }
  ];

  const mockAccommodation = {
    name: "Paradise Beach (upgraded rooms)",
    location: "Mykonos, Greece",
    image: "/placeholder.svg",
    nightsCount: 10
  };

  const mockTripFAQs = [
    {
      question: "What does a modular trip mean?",
      answer: "A modular trip means fellow travelers will join and leave at various locations. There'll be some goodbyes, sure, but there'll also be plenty of hellos with new like-minded travelers."
    }
  ];

  const mockGeneralFAQs = [
    {
      question: "What is Contiki?",
      answer: "Contiki is a travel company specializing in group travel experiences for 18-35 year olds. We've been taking young travelers around the world for over 60 years, creating unforgettable memories and lifelong friendships."
    },
    {
      question: "Why only 18-35?",
      answer: "We focus on this age range to create travel experiences specifically designed for young adults. This helps ensure everyone on the trip is at a similar life stage, making it easier to connect and form friendships."
    },
    {
      question: "Will I be pressured to party/drink on my trip?",
      answer: "Absolutely not. While we do offer nightlife options on many trips, participation is always optional. Our trips include a variety of activities to suit different interests."
    },
    {
      question: "What destinations can I go to with Contiki?",
      answer: "Contiki offers trips across Europe, Asia, North America, Latin America, Australia, New Zealand, Africa, and the Middle East - over 350 trips across 6 continents!"
    }
  ];

  // SEO data
  const pageTitle = trip ? `${trip.name} | Contiki` : 'Tour Detail | Contiki';
  const pageDescription = trip ? trip.description.substring(0, 160) : 'Explore our amazing tours for 18-35 year olds';
  
  // Define tabs for TabNav
  const tabs = [
    { id: 'overview', label: 'The Trip' },
    { id: 'dates', label: 'Dates & Pricing' },
    { id: 'reviews', label: 'Reviews' },
  ];

  // Prepare details for DetailsGrid
  const tripDetails = trip ? [
    { label: 'Duration', value: `${trip.duration} days` },
    { label: 'Destination', value: trip.destination },
    { label: 'Group Size', value: '18-35 year olds' },
    { label: 'Trip Style', value: 'Adventure' }
  ] : [];

  return (
    <BookingProvider>
      <div className="min-h-screen flex flex-col pb-20">
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
      
        <Header />
        
        {trip && <BreadcrumbNav title={trip.name} destination={trip.destination} />}
        
        <main className="flex-grow">
          {trip && (
            <>
              <ErrorBoundary>
                <HeroImage
                  imageUrl={trip.image}
                  title={trip.name}
                  subtitle={trip.destination}
                />
              </ErrorBoundary>
              
              <ErrorBoundary>
                <PriceBar 
                  newPrice={trip.price}
                  rating={trip.rating}
                  reviewCount={trip.reviewCount}
                />
              </ErrorBoundary>
              
              <ErrorBoundary>
                <div className="container py-6">
                  <BasicDetailsGrid details={tripDetails} />
                </div>
              </ErrorBoundary>
              
              <ErrorBoundary>
                <TabNav tabs={tabs}>
                  <TabPanel id="overview">
                    <div>
                      <h2 className="heading-md mb-6">Trip Overview</h2>
                      <p className="text-lg text-gray-700 mb-8 container">{trip.description}</p>
                      
                      <TripHighlights highlights={mockHighlights} />
                      
                      <MapItinerary itinerary={trip.itinerary} />
                      
                      <DailyAccordion days={trip.itinerary} />
                      
                      <WhereYouWillStay accommodation={mockAccommodation} />
                      
                      <FlexDepositBar />
                      
                      <RelatedTrips trips={trips} />
                      
                      <FAQAccordion tripFAQs={mockTripFAQs} generalFAQs={mockGeneralFAQs} />
                    </div>
                  </TabPanel>
                  
                  <TabPanel id="dates">
                    <div>
                      <h2 className="heading-md mb-6 container">Available Dates & Pricing</h2>
                      
                      <div className="grid grid-cols-1 gap-6 container">
                        <VariationCards variations={trip.variations} />
                        
                        <div id="booking" className="mt-8">
                          <h3 className="text-xl font-bold mb-4">Book This Trip</h3>
                          <BookingFlow />
                        </div>
                      </div>
                    </div>
                  </TabPanel>
                  
                  <TabPanel id="reviews">
                    <div className="container">
                      <Reviews />
                    </div>
                  </TabPanel>
                </TabNav>
              </ErrorBoundary>
            </>
          )}
        </main>
        
        {trip && <BookingBar price={trip.price} slug={trip.slug} />}
        
        <Footer />
        <BackToTopButton />
      </div>
    </BookingProvider>
  );
};

export default TourDetail;

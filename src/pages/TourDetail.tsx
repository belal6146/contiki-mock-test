
import React, { useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useTour } from '@/hooks/useTrips';
import { trackPageView } from '@/lib/analytics';

import Header from '@/components/Header';
import HeroImage from '@/components/HeroImage';
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

const TourDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { tour: trip, loading, error } = useTour(slug || '');
  
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
  
  // SEO data
  const pageTitle = trip ? `${trip.name} | Contiki` : 'Tour Detail | Contiki';
  const pageDescription = trip ? trip.description.substring(0, 160) : 'Explore our amazing tours for 18-35 year olds';
  
  // Define tabs for TabNav
  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'itinerary', label: 'Itinerary' },
    { id: 'dates', label: 'Dates & Pricing' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'faq', label: 'FAQ' },
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
        
        {trip && <BreadcrumbNav title={trip.name} />}
        
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
                    <div className="max-w-4xl mx-auto">
                      <h2 className="heading-md mb-6">Trip Overview</h2>
                      <p className="text-lg text-gray-700 mb-8">{trip.description}</p>
                      
                      <TourDetailsGrid
                        highlights={trip.highlights}
                        included={trip.included}
                      />
                    </div>
                  </TabPanel>
                  
                  <TabPanel id="itinerary">
                    <div className="max-w-4xl mx-auto">
                      <h2 className="heading-md mb-6">Itinerary</h2>
                      
                      <div className="space-y-8">
                        {trip.itinerary.map((day) => (
                          <div key={day.day} className="border-l-4 border-accent pl-6 pb-6 relative">
                            <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-accent text-white flex items-center justify-center font-bold text-sm">
                              {day.day}
                            </div>
                            <h3 className="text-xl font-bold mb-2">{day.title}</h3>
                            <p className="mb-4 text-gray-700">{day.description}</p>
                            
                            <div className="flex items-center space-x-4">
                              <div className="bg-bgLight rounded-md px-3 py-1 text-sm">
                                <span className="font-medium">Meals:</span> {day.meals.join(', ') || 'Not included'}
                              </div>
                              <div className="bg-bgLight rounded-md px-3 py-1 text-sm">
                                <span className="font-medium">Stay:</span> {day.accommodation}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabPanel>
                  
                  <TabPanel id="dates">
                    <div>
                      <h2 className="heading-md mb-6">Available Dates & Pricing</h2>
                      
                      <div className="grid grid-cols-1 gap-6">
                        <VariationCards variations={trip.variations} />
                        
                        <div id="booking" className="mt-8">
                          <h3 className="text-xl font-bold mb-4">Book This Trip</h3>
                          <BookingFlow />
                        </div>
                      </div>
                    </div>
                  </TabPanel>
                  
                  <TabPanel id="reviews">
                    <Reviews />
                  </TabPanel>
                  
                  <TabPanel id="faq">
                    <div className="max-w-4xl mx-auto">
                      <h2 className="heading-md mb-6">Frequently Asked Questions</h2>
                      
                      <div className="space-y-6">
                        <div className="border-b pb-6">
                          <h3 className="text-lg font-bold mb-2">What's included in the tour price?</h3>
                          <p className="text-gray-700">
                            Your tour price includes accommodation, transportation, some meals, and the
                            guidance of our expert Trip Manager. For a detailed breakdown of what's included
                            in your specific tour, refer to the "What's Included" section above.
                          </p>
                        </div>
                        
                        <div className="border-b pb-6">
                          <h3 className="text-lg font-bold mb-2">What is the average group size?</h3>
                          <p className="text-gray-700">
                            The average group size varies depending on the tour and time of year,
                            but typically ranges from 25-45 travelers. Our trips are designed for
                            18-35 year olds who are looking to explore the world with like-minded individuals.
                          </p>
                        </div>
                        
                        <div className="border-b pb-6">
                          <h3 className="text-lg font-bold mb-2">Do I need travel insurance?</h3>
                          <p className="text-gray-700">
                            Yes, travel insurance is mandatory for all travelers on our trips. This ensures
                            you're protected in case of unforeseen circumstances such as trip cancellations,
                            medical emergencies, or lost luggage.
                          </p>
                        </div>
                        
                        <div className="border-b pb-6">
                          <h3 className="text-lg font-bold mb-2">What should I pack for this trip?</h3>
                          <p className="text-gray-700">
                            A detailed packing list will be provided in your pre-departure information.
                            Generally, pack according to the season and activities planned for your trip.
                            Don't forget essentials like comfortable walking shoes, weather-appropriate clothing,
                            adapter plugs, and any required travel documents.
                          </p>
                        </div>
                        
                        <div>
                          <h3 className="text-lg font-bold mb-2">Can I join a trip as a solo traveler?</h3>
                          <p className="text-gray-700">
                            Absolutely! About 60% of our travelers join our trips solo. It's a great way to
                            meet new people and make friends from around the world. You can choose to share a
                            room with someone of the same gender or pay a single supplement for your own room.
                          </p>
                        </div>
                      </div>
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

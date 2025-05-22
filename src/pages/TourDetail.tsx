import React, { useEffect, lazy, Suspense } from 'react';
import { useParams } from 'react-router-dom';
import { useTrips } from '@/hooks/useTrips';
import { useTour } from '@/hooks/trips/useTour';
import { trackPageView, trackEvent } from '@/lib/analytics';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ErrorBoundary from '@/components/ErrorBoundary';
import BackToTopButton from '@/components/BackToTopButton';
import { BookingProvider } from '@/context/BookingContext';
import TourDetailHead from '@/components/tour-detail/TourDetailHead';
import TourDetailSkeleton from '@/components/tour-detail/TourDetailSkeleton';
import TourNotFound from '@/components/tour-detail/TourNotFound';
import TourErrorState from '@/components/tour-detail/TourErrorState';
import TabNav from '@/components/tour/TabNav';
import HeroImage from '@/components/tour/HeroImage';
import PriceBar from '@/components/tour/PriceBar';
import TripHighlights from '@/components/tour/TripHighlights';
import MapItinerary from '@/components/tour/MapItinerary';
import { ItineraryDay } from '@/components/tour/MapItinerary';
import WhereYouWillStay from '@/components/tour/WhereYouWillStay';
import RelatedTrips from '@/components/tour/RelatedTrips';
import BookingBar from '@/components/BookingBar';
import Breadcrumb from '@/components/Breadcrumb';
import ChatNowButton from '@/components/tour/ChatNowButton';
import { Skeleton } from '@/components/ui/skeleton';
import ErrorMessage from '@/components/ui/error-message';
import TourDatesTab from '@/components/tour-detail/TourDatesTab';
import TourReviewsTab from '@/components/tour-detail/TourReviewsTab';

// Lazy load the heavyweight component
const TourDetailContent = lazy(() => import('@/components/tour-detail/TourDetailContent'));

const TourDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { tour, loading, error } = useTour(slug || '');
  const { trips } = useTrips({ limit: 3 });
  const [activeTab, setActiveTab] = React.useState('trip');
  
  useEffect(() => {
    console.debug('[TourDetail] mounted', { slug });
    trackEvent('page_loaded', { page: 'TourDetail', slug });
    trackPageView(window.location.pathname);
  }, [slug]);
  
  const handleRetry = () => {
    window.location.reload();
    trackEvent('retry_clicked', { component: 'TourDetail', slug });
  };
  
  // If trip is not found (after loading is complete), render "Tour not found" message
  if (!loading && !tour) {
    return <TourNotFound />;
  }
  
  // Loading state with skeleton loaders
  if (loading) {
    return <TourDetailSkeleton />;
  }
  
  // Error state
  if (error) {
    return (
      <TourErrorState error={error} />
    );
  }

  // Ensure trip is defined before rendering
  if (!tour) {
    return <Skeleton className="h-screen w-full" />;
  }

  // Mock data for trip highlights
  const mockHighlights = [
    {
      id: '1',
      title: 'Visit Santorini',
      description: 'Explore the stunning white buildings and blue domes that make this island famous worldwide.',
      image: 'https://source.unsplash.com/random/800x600/?santorini',
      isIncluded: true,
      type: 'Cultural'
    },
    {
      id: '2',
      title: 'Ferry Ride between Islands',
      description: 'Enjoy the beautiful Aegean Sea views as you travel between the Greek islands.',
      image: 'https://source.unsplash.com/random/800x600/?ferry,greece',
      isIncluded: true,
      type: 'Adventure'
    },
    {
      id: '3',
      title: 'Explore Mykonos by Night',
      description: 'Experience the famous nightlife of Mykonos with its vibrant bars and restaurants.',
      image: 'https://source.unsplash.com/random/800x600/?mykonos,night',
      isIncluded: false,
      type: 'Nightlife'
    }
  ];

  // Mock data for itinerary with proper coordinate tuples
  const mockItinerary: ItineraryDay[] = [
    {
      day: 1,
      title: 'Start Athens',
      description: 'Arrive in Athens and meet your fellow travelers.',
      coordinates: [23.7275, 37.9838] as [number, number]
    },
    {
      day: 2,
      title: 'Athens to Mykonos',
      description: 'Morning ferry to Mykonos. Afternoon free to explore.',
      from: 'Athens',
      to: 'Mykonos',
      coordinates: [25.3667, 37.4415] as [number, number]
    },
    {
      day: 3,
      title: 'Mykonos',
      description: 'Full day to enjoy the beaches and town of Mykonos.',
      coordinates: [25.3667, 37.4415] as [number, number]
    }
  ];

  // Mock data for accommodation
  const mockAccommodation = {
    name: 'Paradise Beach Resort',
    location: 'Mykonos, Greece',
    image: 'https://source.unsplash.com/random/800x600/?beach,resort,greece',
    nightsCount: 10
  };

  // Prepare tabs configuration
  const tabs = [
    { id: 'trip', label: 'THE TRIP' },
    { id: 'dates', label: 'DATES & PRICING' },
    { id: 'reviews', label: 'REVIEWS' }
  ];

  return (
    <BookingProvider>
      <div className="min-h-screen flex flex-col">
        <TourDetailHead trip={tour} slug={slug} />
        <Header />
        
        {/* Breadcrumb and Title */}
        <div className="container pt-4">
          <Breadcrumb 
            title={tour.name} 
            destination={tour.destination} 
          />
          
          <div className="py-2">
            <div className="flex items-center mb-2">
              {/* Star Rating Display */}
              <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg 
                    key={i} 
                    className={`w-5 h-5 ${i < Math.floor(tour.rating) ? "text-yellow-400" : "text-gray-300"}`} 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="ml-2 text-sm text-gray-600">{tour.rating} ({tour.reviewCount} reviews)</span>
              </div>
              
              {/* Trip Spotlight Badge */}
              {tour.rating >= 4.5 && (
                <span className="ml-4 bg-[#FF3B5C] text-white text-xs font-bold px-2 py-1 rounded">
                  Trip Spotlight
                </span>
              )}
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold">{tour.name}</h1>
            <p className="text-gray-500 mt-1">Plus</p>
          </div>
        </div>
        
        {/* Price Bar */}
        <PriceBar 
          oldPrice={tour.oldPrice} 
          newPrice={tour.price} 
          rating={tour.rating} 
          reviewCount={tour.reviewCount}
        />
        
        {/* TabNav */}
        <TabNav 
          tabs={tabs} 
          activeTab={activeTab} 
          onChange={(tabId) => setActiveTab(tabId)}
        >
          {activeTab === 'trip' && (
            <ErrorBoundary fallback={
              <ErrorMessage 
                title="Could not load trip content"
                message="We encountered an error while loading trip details."
                onRetry={handleRetry}
              />
            }>
              <div>
                {/* Hero Image */}
                <HeroImage 
                  imageUrl={tour.image} 
                  title={tour.name} 
                  subtitle={tour.destination}
                />
                
                {/* Trip Highlights */}
                <TripHighlights highlights={mockHighlights} />
                
                {/* Map & Itinerary */}
                <MapItinerary itinerary={mockItinerary} />
                
                {/* Where You Will Stay */}
                <WhereYouWillStay accommodation={mockAccommodation} />
                
                {/* Other trips you might like */}
                <RelatedTrips trips={trips} />
              </div>
            </ErrorBoundary>
          )}
          
          {activeTab === 'dates' && (
            <ErrorBoundary fallback={
              <ErrorMessage 
                title="Could not load dates content"
                message="We encountered an error while loading dates and pricing."
                onRetry={handleRetry}
              />
            }>
              <TourDatesTab trip={tour} />
            </ErrorBoundary>
          )}
          
          {activeTab === 'reviews' && (
            <ErrorBoundary fallback={
              <ErrorMessage 
                title="Could not load reviews content"
                message="We encountered an error while loading reviews."
                onRetry={handleRetry}
              />
            }>
              <TourReviewsTab tripId={tour.id} />
            </ErrorBoundary>
          )}
        </TabNav>
        
        {/* ChatNow Button */}
        <ChatNowButton />
        
        <Footer />
        <BackToTopButton />
      </div>
    </BookingProvider>
  );
};

export default TourDetail;

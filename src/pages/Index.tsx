
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '@/components/Header';
import Hero from '@/components/home/Hero';
import FeaturedTrips from '@/components/home/FeaturedTrips';
import Testimonials from '@/components/home/Testimonials';
import PayOverTime from '@/components/home/PayOverTime';
import BookWithConfidence from '@/components/home/BookWithConfidence';
import TopTripsPromo from '@/components/home/TopTripsPromo';
import TravelDestinationsGrid from '@/components/home/TravelDestinationsGrid';
import LogosCarousel from '@/components/home/LogosCarousel';
import AsSeenIn from '@/components/home/AsSeenIn';
import BackToTopButton from '@/components/BackToTopButton';
import HelpButton from '@/components/home/HelpButton';
import Footer from '@/components/Footer';
import ErrorBoundary from '@/components/ErrorBoundary';
import { trackPageView } from '@/lib/analytics';

const Index = () => {
  useEffect(() => {
    trackPageView(window.location.pathname);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Contiki - Travel for 18-35 year olds | Contiki</title>
        <meta name="description" content="Discover the best trips for 18-35 year olds. Travel with Contiki and experience a new way to travel with like-minded people." />
        <meta name="keywords" content="travel, young adults, trips, adventure, contiki" />
        
        {/* Open Graph / Social Media */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Contiki - Travel for 18-35 year olds" />
        <meta property="og:description" content="Discover the best trips for 18-35 year olds. Travel with Contiki and experience a new way to travel with like-minded people." />
        <meta property="og:image" content="https://www.contiki.com/og-image.jpg" />
        <meta property="og:url" content="https://www.contiki.com" />
        
        {/* JSON-LD for SEO */}
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "TravelAgency",
            "name": "Contiki",
            "url": "https://www.contiki.com",
            "logo": "https://www.contiki.com/logo.png",
            "description": "Travel for 18-35 year olds",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "80 Strand",
              "addressLocality": "London",
              "postalCode": "WC2R 0RL",
              "addressCountry": "UK"
            },
            "telephone": "+44-20-7468-4335",
            "sameAs": [
              "https://www.facebook.com/contiki",
              "https://www.instagram.com/contiki",
              "https://twitter.com/contiki"
            ]
          }
        `}</script>
      </Helmet>

      <Header />
      
      <main className="flex-grow" role="main" aria-label="Main content">
        <ErrorBoundary>
          <Hero />
        </ErrorBoundary>
        
        <ErrorBoundary>
          <section aria-labelledby="featured-trips-heading">
            <FeaturedTrips />
          </section>
        </ErrorBoundary>
        
        <ErrorBoundary>
          <section aria-labelledby="media-mentions-heading">
            <AsSeenIn />
          </section>
        </ErrorBoundary>
        
        <ErrorBoundary>
          <section aria-labelledby="testimonials-heading">
            <Testimonials />
          </section>
        </ErrorBoundary>
        
        <ErrorBoundary>
          <section aria-labelledby="payment-options-heading">
            <PayOverTime />
          </section>
        </ErrorBoundary>
        
        <ErrorBoundary>
          <section aria-labelledby="booking-confidence-heading">
            <BookWithConfidence />
          </section>
        </ErrorBoundary>
        
        <ErrorBoundary>
          <section aria-labelledby="top-trips-heading">
            <TopTripsPromo />
          </section>
        </ErrorBoundary>
        
        <ErrorBoundary>
          <section aria-labelledby="destinations-heading">
            <TravelDestinationsGrid />
          </section>
        </ErrorBoundary>
        
        <ErrorBoundary>
          <section aria-labelledby="partners-heading">
            <LogosCarousel />
          </section>
        </ErrorBoundary>
      </main>
      
      <Footer />
      <BackToTopButton />
      <HelpButton />
    </div>
  );
};

export default Index;

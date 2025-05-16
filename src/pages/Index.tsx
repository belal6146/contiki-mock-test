
import React from 'react';
import Header from '@/components/Header';
import Hero from '@/components/home/Hero';
import SearchBar from '@/components/home/SearchBar';
import FeaturedTrips from '@/components/home/FeaturedTrips';
import Testimonials from '@/components/home/Testimonials';
import Footer from '@/components/Footer';
import ErrorBoundary from '@/components/ErrorBoundary';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <ErrorBoundary>
          <Hero />
          <SearchBar />
        </ErrorBoundary>
        
        <ErrorBoundary>
          <FeaturedTrips />
        </ErrorBoundary>
        
        <ErrorBoundary>
          <Testimonials />
        </ErrorBoundary>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;

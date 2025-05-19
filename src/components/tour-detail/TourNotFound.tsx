
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const TourNotFound: React.FC = () => {
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
};

export default TourNotFound;

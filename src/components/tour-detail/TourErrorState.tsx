
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface TourErrorStateProps {
  error: string;
}

const TourErrorState: React.FC<TourErrorStateProps> = ({ error }) => {
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
};

export default TourErrorState;

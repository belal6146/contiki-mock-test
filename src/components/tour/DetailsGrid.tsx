import React, { useEffect } from 'react';

interface DetailsGridProps {
  highlights: string[];
  included: string[];
}

const TourDetailsGrid: React.FC<DetailsGridProps> = ({ highlights, included }) => {
  useEffect(() => {
    console.debug('[TourDetailsGrid] mounted', { count: highlights.length + included.length });
  }, [highlights.length, included.length]);

  return (
    <section className="py-12 bg-bgLight">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Highlights - REMOVING THIS SECTION */}
          {/*
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold text-primary mb-6">Trip Highlights</h3>
            <ul className="space-y-3">
              {highlights.map((highlight, index) => (
                <li key={index} className="flex items-start">
                  <div className="mr-3 mt-1 text-accent">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="18" 
                      height="18" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    >
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                  </div>
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
          */}
          
          {/* What's Included */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold text-primary mb-6">What's Included</h3>
            <ul className="space-y-3">
              {included.map((item, index) => (
                <li key={index} className="flex items-start">
                  <div className="mr-3 mt-1 text-accent">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="18" 
                      height="18" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TourDetailsGrid;

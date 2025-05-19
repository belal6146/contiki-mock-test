
import React, { useEffect } from 'react';

interface Accommodation {
  name: string;
  location: string;
  image: string;
  nightsCount: number;
}

interface WhereYouWillStayProps {
  accommodation: Accommodation;
}

const WhereYouWillStay: React.FC<WhereYouWillStayProps> = ({ accommodation }) => {
  useEffect(() => {
    console.debug('[Stay] mounted', { accommodation });
  }, [accommodation]);
  
  return (
    <section className="py-12">
      <div className="container">
        <h2 className="text-2xl font-medium text-primary mb-6">Where You Will Stay</h2>
        <p className="text-gray-600 mb-8">Learn more about the accommodation included on this trip</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main accommodation card */}
          <div className="col-span-2 bg-white rounded-lg overflow-hidden shadow">
            <div className="relative">
              <img 
                src={accommodation.image} 
                alt={accommodation.name}
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <div className="uppercase text-xs font-medium text-gray-500 mb-2">VIRTUAL TOUR</div>
                <h3 className="text-xl font-bold mb-2">{accommodation.name}</h3>
                <p className="text-gray-700 mb-2">{accommodation.location}</p>
                <div className="flex items-center mb-4">
                  <div className="bg-accent text-white text-xs px-2 py-1 rounded-full">
                    {accommodation.nightsCount} nights
                  </div>
                </div>
                <button className="text-secondary font-medium">See More</button>
              </div>
            </div>
          </div>
          
          {/* Accommodation summary */}
          <div className="bg-white rounded-lg overflow-hidden shadow p-6 flex flex-col items-center justify-center text-center">
            <div className="bg-accent rounded-full w-16 h-16 flex items-center justify-center mb-4">
              <span className="text-white text-xl font-bold">{accommodation.nightsCount}</span>
            </div>
            <h3 className="text-xl font-bold mb-4">All Accommodation is Included</h3>
            <p className="text-gray-600 text-sm">
              {accommodation.nightsCount} nights in Hotels, 2 nights in Special Stay
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhereYouWillStay;


import React from 'react';

const TravelConfidenceBanner: React.FC = () => {
  return (
    <div className="bg-[#F5F8FF] py-4 mb-8 border-b border-gray-200">
      <div className="container max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-[#CCFF00] rounded-full p-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-black">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
              </svg>
            </div>
            <div>
              <p className="font-semibold text-gray-900">Travel with Confidence</p>
              <p className="text-sm text-gray-600">Flexible booking policies & health measures</p>
            </div>
          </div>
          <button className="text-[#CCFF00] font-semibold hover:underline text-sm">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

export default TravelConfidenceBanner;

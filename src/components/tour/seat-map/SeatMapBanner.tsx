
import React from 'react';
import { Settings } from 'lucide-react';

const SeatMapBanner: React.FC = () => {
  return (
    <div className="bg-[rgb(204,255,0)] border border-[rgb(184,230,0)] rounded-lg p-4 mb-6 flex items-start">
      <div className="text-black mr-3 flex-shrink-0 mt-0.5">
        <Settings size={20} />
      </div>
      <div>
        <h3 className="text-black font-bold text-sm mb-1 uppercase tracking-wide">Traveler Connection</h3>
        <p className="text-sm text-black leading-relaxed">
          Hover over seats to see passenger details and connect with fellow travelers!
        </p>
      </div>
    </div>
  );
};

export default SeatMapBanner;

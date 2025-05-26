
import React from 'react';

const SeatLegend: React.FC = () => {
  return (
    <div className="mt-6">
      <h3 className="text-sm font-bold mb-4 uppercase tracking-wide text-black">Seat Legend</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="flex items-center">
          <div className="w-5 h-5 bg-white border-2 border-gray-300 rounded mr-3"></div>
          <span className="text-sm text-gray-700 font-medium">Available</span>
        </div>
        <div className="flex items-center">
          <div className="w-5 h-5 bg-blue-100 border-2 border-blue-200 rounded mr-3"></div>
          <span className="text-sm text-gray-700 font-medium">Occupied (Male)</span>
        </div>
        <div className="flex items-center">
          <div className="w-5 h-5 bg-pink-100 border-2 border-pink-200 rounded mr-3"></div>
          <span className="text-sm text-gray-700 font-medium">Occupied (Female)</span>
        </div>
        <div className="flex items-center">
          <div className="w-5 h-5 bg-[rgb(204,255,0)] border-2 border-[rgb(184,230,0)] rounded mr-3"></div>
          <span className="text-sm text-gray-700 font-medium">Selected</span>
        </div>
      </div>
    </div>
  );
};

export default SeatLegend;

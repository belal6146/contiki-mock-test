
import React from 'react';

const SeatMapLegend: React.FC = () => {
  return (
    <div className="mt-8 bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-bold mb-6 uppercase tracking-wide text-gray-800">Seat Legend</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-green-500 border-2 border-green-600 rounded-lg shadow-sm"></div>
          <span className="text-sm text-gray-700 font-medium">Available</span>
        </div>
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-100 border-2 border-blue-200 rounded-lg opacity-60"></div>
          <span className="text-sm text-gray-700 font-medium">Occupied (Male)</span>
        </div>
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-pink-100 border-2 border-pink-200 rounded-lg opacity-60"></div>
          <span className="text-sm text-gray-700 font-medium">Occupied (Female)</span>
        </div>
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-[#FF6900] border-2 border-[#e65100] rounded-lg shadow-lg"></div>
          <span className="text-sm text-gray-700 font-medium">Selected</span>
        </div>
      </div>
    </div>
  );
};

export default SeatMapLegend;

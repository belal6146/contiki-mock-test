
import React from 'react';

const YearSelectionBanner: React.FC = () => {
  return (
    <div className="bg-white py-4 mb-8 border-b border-gray-200">
      <div className="container max-w-7xl mx-auto">
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">I'm planning to travel in</span>
          <div className="flex gap-2">
            <button className="bg-black text-white px-4 py-2 rounded-full text-sm font-medium">
              2025
            </button>
            <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-200">
              2026
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YearSelectionBanner;

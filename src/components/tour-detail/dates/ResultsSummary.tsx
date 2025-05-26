
import React from 'react';

interface ResultsSummaryProps {
  optionsCount: number;
}

const ResultsSummary: React.FC<ResultsSummaryProps> = ({ optionsCount }) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <p className="text-gray-600"><span className="font-medium">{optionsCount}</span> departure dates available</p>
      <div>
        <select className="border-gray-300 rounded-md text-sm px-3 py-2 bg-white">
          <option>Sort by date</option>
          <option>Sort by price: low to high</option>
          <option>Sort by price: high to low</option>
        </select>
      </div>
    </div>
  );
};

export default ResultsSummary;

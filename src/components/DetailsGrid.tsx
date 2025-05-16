
import React, { useEffect } from 'react';

interface DetailItem {
  label: string;
  value: string | number;
}

interface DetailsGridProps {
  details: DetailItem[];
}

const DetailsGrid: React.FC<DetailsGridProps> = ({ details }) => {
  useEffect(() => {
    console.debug('[DetailsGrid] mounted', { count: details.length });
  }, [details.length]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 py-8">
      {details.map((detail, index) => (
        <div key={index} className="p-4 bg-bgLight rounded-lg shadow-sm">
          <p className="font-medium text-gray-700 mb-1">{detail.label}</p>
          <p className="font-normal text-gray-900">{detail.value}</p>
        </div>
      ))}
    </div>
  );
};

export default DetailsGrid;

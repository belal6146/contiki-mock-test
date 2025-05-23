
import React from 'react';

interface DayHighlightsProps {
  highlights: Array<{
    title: string;
    description: string;
    image: string;
    type: string;
  }>;
}

const DayHighlights: React.FC<DayHighlightsProps> = ({ highlights }) => {
  const getBadgeColor = (type: string) => {
    if (type.includes('Included')) return 'bg-red-500 text-white';
    if (type.includes('Optional')) return 'bg-blue-500 text-white';
    return 'bg-green-500 text-white';
  };

  return (
    <div className="space-y-4">
      <h3 className="font-bold text-lg">Day Highlights</h3>
      
      <div className="space-y-4">
        {highlights.map((highlight, index) => (
          <div key={index} className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-start gap-4">
              <div className="w-32 h-24 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                <img
                  src={highlight.image}
                  alt={highlight.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <div className={`${getBadgeColor(highlight.type)} text-xs px-2 py-1 rounded inline-block mb-2`}>
                  {highlight.type}
                </div>
                <h4 className="font-bold mb-2">{highlight.title}</h4>
                <p className="text-sm text-gray-600 mb-3">
                  {highlight.description}
                </p>
                <button className="text-sm font-medium text-black underline">
                  Read More
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DayHighlights;

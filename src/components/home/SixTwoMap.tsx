
import React, { useState } from 'react';

const SixTwoMap = () => {
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);

  const regions = [
    { id: 'north-america', name: 'North America', color: '#CCFF00' },
    { id: 'south-america', name: 'South America', color: '#CCFF00' },
    { id: 'europe', name: 'Europe', color: '#CCFF00' },
    { id: 'africa', name: 'Africa', color: '#CCFF00' },
    { id: 'asia', name: 'Asia', color: '#CCFF00' },
    { id: 'oceania', name: 'Oceania', color: '#CCFF00' }
  ];

  return (
    <section className="py-16 bg-black">
      <div className="container max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="inline-block mb-6">
            <span className="text-[#CCFF00] text-6xl font-bold">six-</span>
            <span className="text-[#CCFF00] text-6xl font-bold block">two</span>
          </div>
          
          <div className="bg-black rounded-lg p-8 mx-auto max-w-4xl">
            <h3 className="text-[#CCFF00] text-2xl font-bold mb-4">
              Think you've seen the world?
            </h3>
            <p className="text-white text-lg mb-8">
              Prove it - scratch it off here!
            </p>
            
            {/* Interactive World Map */}
            <div className="relative bg-black rounded-lg p-8 min-h-[300px] flex items-center justify-center">
              <svg 
                viewBox="0 0 1000 500" 
                className="w-full h-full max-w-4xl"
                style={{ filter: 'drop-shadow(0 0 10px rgba(204, 255, 0, 0.3))' }}
              >
                {/* Simplified world map outline */}
                {/* North America */}
                <path
                  d="M150 150 L250 140 L280 180 L320 200 L300 250 L250 280 L200 270 L160 220 Z"
                  fill={hoveredRegion === 'north-america' ? '#CCFF00' : '#4a5d23'}
                  stroke="#CCFF00"
                  strokeWidth="2"
                  className="cursor-pointer transition-colors duration-300"
                  onMouseEnter={() => setHoveredRegion('north-america')}
                  onMouseLeave={() => setHoveredRegion(null)}
                />
                
                {/* South America */}
                <path
                  d="M250 280 L290 300 L310 380 L280 450 L240 420 L220 350 Z"
                  fill={hoveredRegion === 'south-america' ? '#CCFF00' : '#4a5d23'}
                  stroke="#CCFF00"
                  strokeWidth="2"
                  className="cursor-pointer transition-colors duration-300"
                  onMouseEnter={() => setHoveredRegion('south-america')}
                  onMouseLeave={() => setHoveredRegion(null)}
                />
                
                {/* Europe */}
                <path
                  d="M450 140 L520 130 L550 170 L530 200 L480 190 L460 160 Z"
                  fill={hoveredRegion === 'europe' ? '#CCFF00' : '#4a5d23'}
                  stroke="#CCFF00"
                  strokeWidth="2"
                  className="cursor-pointer transition-colors duration-300"
                  onMouseEnter={() => setHoveredRegion('europe')}
                  onMouseLeave={() => setHoveredRegion(null)}
                />
                
                {/* Africa */}
                <path
                  d="M480 190 L550 200 L570 280 L560 360 L520 380 L480 350 L470 270 Z"
                  fill={hoveredRegion === 'africa' ? '#CCFF00' : '#4a5d23'}
                  stroke="#CCFF00"
                  strokeWidth="2"
                  className="cursor-pointer transition-colors duration-300"
                  onMouseEnter={() => setHoveredRegion('africa')}
                  onMouseLeave={() => setHoveredRegion(null)}
                />
                
                {/* Asia */}
                <path
                  d="M550 130 L750 120 L780 180 L770 250 L720 280 L650 270 L600 200 L580 160 Z"
                  fill={hoveredRegion === 'asia' ? '#CCFF00' : '#4a5d23'}
                  stroke="#CCFF00"
                  strokeWidth="2"
                  className="cursor-pointer transition-colors duration-300"
                  onMouseEnter={() => setHoveredRegion('asia')}
                  onMouseLeave={() => setHoveredRegion(null)}
                />
                
                {/* Oceania */}
                <path
                  d="M720 350 L780 340 L800 380 L770 400 L740 390 Z"
                  fill={hoveredRegion === 'oceania' ? '#CCFF00' : '#4a5d23'}
                  stroke="#CCFF00"
                  strokeWidth="2"
                  className="cursor-pointer transition-colors duration-300"
                  onMouseEnter={() => setHoveredRegion('oceania')}
                  onMouseLeave={() => setHoveredRegion(null)}
                />
              </svg>
              
              {hoveredRegion && (
                <div className="absolute top-4 left-4 bg-[#CCFF00] text-black px-3 py-1 rounded font-medium">
                  {regions.find(r => r.id === hoveredRegion)?.name}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SixTwoMap;

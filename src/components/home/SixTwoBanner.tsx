import React from 'react';

const SixTwoBanner = () => {
  return (
    <section className="bg-black text-white py-16 px-4">
      <div className="container max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          {/* Left side - Text content */}
          <div className="flex-1 pr-8">
            <img 
              src="https://www.contiki.com/media/2degaq2e/six-two-logo.svg?height=101&mode=max&width=123"
              alt="Six-Two Travel Magazine Logo"
              className="h-12 w-auto mb-4"
            />
            <div className="space-y-2">
              <h3 className="text-[#CCFF00] text-3xl font-bold">
                Think you've seen the world?
              </h3>
              <p className="text-white text-lg underline cursor-pointer hover:text-[#CCFF00] transition-colors">
                Prove it - scratch it off here!
              </p>
            </div>
          </div>
          
          {/* Right side - World map and Scratch It Off Banner */}
          <div className="flex-1 flex justify-end relative">
            <img 
              src="https://www.contiki.com/media/iqbbptm1/scratch-banner5.jpg?center=0.5%2C0.5&format=webp&height=616&mode=crop&quality=80&width=1440"
              alt="Scratch It Off Banner"
              className="absolute inset-0 w-full h-full object-cover z-0"
            />
            <div className="relative z-10">
              <svg 
                viewBox="0 0 800 400" 
                className="w-96 h-48"
                fill="none"
              >
                {/* World map silhouette in lime green */}
                <g fill="#CCFF00">
                  {/* North America */}
                  <path d="M50 80 L180 70 L200 120 L160 180 L80 170 Z" />
                  {/* South America */}
                  <path d="M120 200 L140 280 L110 350 L90 320 L100 250 Z" />
                  {/* Europe */}
                  <path d="M280 60 L320 70 L310 120 L290 110 Z" />
                  {/* Africa */}
                  <path d="M300 120 L340 130 L360 220 L320 280 L310 200 Z" />
                  {/* Asia */}
                  <path d="M350 50 L500 60 L520 140 L480 160 L400 120 Z" />
                  {/* Australia */}
                  <path d="M480 220 L540 230 L530 260 L490 250 Z" />
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SixTwoBanner;

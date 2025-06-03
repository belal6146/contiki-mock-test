import React from 'react';

const ScratchMap = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gray-100 rounded-lg overflow-hidden h-[400px]">
            <div className="relative w-full h-full">
              <img
                src="https://www.contiki.com/media/iqbbptm1/scratch-banner5.jpg?center=0.5%2C0.5&format=webp&mode=crop&width=1440&height=616&quality=80"
                alt="World Map"
                className="w-full h-full object-cover"
                style={{ minHeight: '400px' }}
              />
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <div className="text-center p-4">
                  <h2 className="text-4xl font-bold text-[#ccff00] mb-4">
                    Think you've seen the world?
                  </h2>
                  <p className="text-2xl font-bold text-white underline">
                    Prove it - scratch it off here!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScratchMap; 
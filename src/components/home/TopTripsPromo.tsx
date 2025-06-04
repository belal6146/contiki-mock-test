import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const TopTripsPromo = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    console.debug('[TopTripsPromo] mounted');
    const img1 = new Image();
    const img2 = new Image();
    
    img1.src = "https://www.contiki.com/media/uhxfozab/group-of-people-in-blue-lake-surrounded-by-mountains.jpg?center=0.5%2C0.5&format=webp&height=616&mode=crop&quality=80&width=720";
    img2.src = "https://www.contiki.com/media/smpji2l0/group-of-young-people-riding-bikes-vietnam-road.jpg?center=0.6161542586835618%2C0.4987480082915613&format=webp&height=616&mode=crop&quality=80&width=720";
    
    Promise.all([
      new Promise(resolve => { img1.onload = resolve; }),
      new Promise(resolve => { img2.onload = resolve; })
    ]).then(() => {
      setIsLoaded(true);
      console.debug('[TopTripsPromo] imageLoaded');
    });
  }, []);

  return (
    <section className="w-full py-16 bg-gray-50">
      <div className="container max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Card - Top Trips 2025 */}
          <div className="relative h-[400px] overflow-hidden rounded-lg shadow-lg group">
            <div
              className={`absolute inset-0 bg-cover bg-center transition-all duration-700 transform group-hover:scale-105 ${
                isLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              style={{ backgroundImage: "url('https://www.contiki.com/media/uhxfozab/group-of-people-in-blue-lake-surrounded-by-mountains.jpg?center=0.5%2C0.5&format=webp&height=616&mode=crop&quality=80&width=720')" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 text-white">
              <h3 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">Save on Top Trips for 2025</h3>
              <p className="text-xl mb-8 drop-shadow-md">Up to £222 off Ultimate Trips</p>
              <Button 
                variant="secondary" 
                className="bg-[#CCFF00] text-black hover:bg-[#CCFF00]/90 font-bold rounded-full px-8 py-3 transform transition-all duration-300 hover:scale-105 shadow-lg"
                asChild
              >
                <Link to="/tours?year=2025">BOOK FOR NEXT YEAR</Link>
              </Button>
            </div>
            {!isLoaded && (
              <div className="absolute inset-0 bg-gray-300 animate-pulse" />
            )}
          </div>
          
          {/* Right Card - Asia */}
          <div className="relative h-[400px] overflow-hidden rounded-lg shadow-lg group">
            <div
              className={`absolute inset-0 bg-cover bg-center transition-all duration-700 transform group-hover:scale-105 ${
                isLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              style={{ backgroundImage: "url('https://www.contiki.com/media/smpji2l0/group-of-young-people-riding-bikes-vietnam-road.jpg?center=0.6161542586835618%2C0.4987480082915613&format=webp&height=616&mode=crop&quality=80&width=720')" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 text-white">
              <h3 className="text-3xl md:text-4xl font-bold mb-4 drop-shadow-lg">A is for Asia</h3>
              <p className="text-xl mb-8 drop-shadow-md">And Y is for "yes please"</p>
              <Button 
                variant="secondary" 
                className="bg-[#CCFF00] text-black hover:bg-[#CCFF00]/90 font-bold rounded-full px-8 py-3 transform transition-all duration-300 hover:scale-105 shadow-lg"
                asChild
              >
                <Link to="/tours?region=asia">SHOW ME ASIA</Link>
              </Button>
            </div>
            {!isLoaded && (
              <div className="absolute inset-0 bg-gray-300 animate-pulse" />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopTripsPromo;


import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const TopTripsPromo = () => {
  useEffect(() => {
    console.debug('[TopTripsPromo] mounted');
  }, []);

  return (
    <section className="w-full py-16">
      <div className="container max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Card - Top Trips 2025 */}
          <div className="relative h-[400px] overflow-hidden rounded-lg">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: "url('https://source.unsplash.com/random/800x600/?mountains,lake')" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/30" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 text-white">
              <h3 className="text-3xl font-bold mb-2">Save on Top Trips for 2025</h3>
              <p className="text-xl mb-6">Up to £222 off Ultimate Trips</p>
              <Button 
                variant="secondary" 
                className="bg-white text-black hover:bg-white/90 font-medium rounded-full px-6"
                asChild
              >
                <Link to="/tours?year=2025">BOOK FOR NEXT YEAR</Link>
              </Button>
            </div>
          </div>
          
          {/* Right Card - Asia */}
          <div className="relative h-[400px] overflow-hidden rounded-lg">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: "url('https://source.unsplash.com/random/800x600/?asia,street')" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/30" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 text-white">
              <h3 className="text-3xl font-bold mb-2">A is for Asia</h3>
              <p className="text-xl mb-6">And Y is for "yes please"</p>
              <Button 
                variant="secondary" 
                className="bg-white text-black hover:bg-white/90 font-medium rounded-full px-6"
                asChild
              >
                <Link to="/tours?region=asia">SHOW ME ASIA</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopTripsPromo;

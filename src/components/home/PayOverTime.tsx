
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const PayOverTime = () => {
  useEffect(() => {
    console.debug('[PayOverTime] mounted');
  }, []);

  return (
    <>
      {/* Cyan Pay Over Time Section */}
      <section className="w-full bg-cyan-400 py-12">
        <div className="container max-w-6xl mx-auto">
          <div className="flex flex-col items-center justify-center text-center">
            <h2 className="text-3xl font-bold text-black mb-6">
              Pay over time, interest-free
            </h2>
            <Button
              variant="outline"
              className="bg-white text-black border-white hover:bg-gray-100 font-medium px-8 py-3 rounded-full"
              asChild
            >
              <Link to="/pay-monthly">LEARN MORE</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Purple Rating Banner */}
      <section className="w-full bg-purple-600 py-4">
        <div className="container max-w-6xl mx-auto">
          <div className="flex items-center justify-center text-center">
            <div className="flex items-center gap-2 text-white text-sm font-medium">
              <span>RATED 4.7 / 5</span>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400">★</span>
                ))}
              </div>
              <span>BASED ON 25,000+ VERIFIED REVIEWS | feefo**</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PayOverTime;

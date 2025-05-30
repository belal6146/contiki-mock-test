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
      <section className="w-full bg-[#00CCFF] py-16 md:py-20">
        <div className="container max-w-6xl mx-auto px-4 lg:px-8">
          <div className="flex flex-col items-center justify-center text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-8">
              Pay over time, interest-free
            </h2>
            <Button
              variant="outline"
              className="bg-white text-black border-white hover:bg-gray-100 font-bold px-10 py-4 rounded-full text-lg uppercase tracking-wide shadow-md"
              asChild
            >
              <Link to="/pay-monthly">LEARN MORE</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Purple Rating Banner */}
      <section className="w-full bg-[#6F2DA8] py-4 md:py-5">
        <div className="container max-w-6xl mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-center text-center">
            <div className="flex items-center gap-2 text-white text-sm font-semibold">
              <span>RATED 4.7 / 5</span>
              <div className="flex items-center gap-1 text-yellow-300">
                {[...Array(5)].map((_, i) => (
                  <span key={i}>★</span>
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

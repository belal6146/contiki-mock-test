
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const PayOverTime = () => {
  useEffect(() => {
    console.debug('[PayOverTime] mounted');
  }, []);

  return (
    <section className="w-full bg-[#00A8E8] py-8">
      <div className="container">
        <div className="flex flex-col items-center justify-center text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Pay over time, interest-free
          </h2>
          <Button
            variant="outline"
            className="bg-white text-[#00A8E8] border-white hover:bg-white/90 font-medium"
            asChild
          >
            <Link to="/pay-monthly">LEARN MORE</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PayOverTime;

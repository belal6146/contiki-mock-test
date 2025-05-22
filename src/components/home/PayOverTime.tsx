
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const PayOverTime = () => {
  useEffect(() => {
    console.debug('[PayOverTime] mounted');
  }, []);

  return (
    <section className="w-full bg-[#00BFFF] py-12">
      <div className="container max-w-6xl mx-auto">
        <div className="flex flex-col items-center justify-center text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Pay over time, interest-free
          </h2>
          <Button
            variant="outline"
            className="bg-white text-[#00BFFF] border-white hover:bg-white/90 font-medium px-8"
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

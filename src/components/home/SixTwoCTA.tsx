
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const SixTwoCTA = () => {
  useEffect(() => {
    console.debug('[SixTwoCTA] mounted');
  }, []);

  const handleClick = () => {
    console.debug('[SixTwoCTA] clicked');
  };

  return (
    <section className="bg-black py-8">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between p-4">
          <div className="mb-4 md:mb-0">
            <h2 className="text-white text-xl font-bold">six-two</h2>
          </div>
          
          <div className="text-center md:text-right">
            <h3 className="text-[#CCFF00] text-lg font-bold mb-1">
              Think you've seen the world?
            </h3>
            <Link 
              to="/sixtwo" 
              className="text-[#CCFF00] underline text-sm hover:text-white transition-colors"
              onClick={handleClick}
            >
              Prove it – scratch it off here!
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SixTwoCTA;

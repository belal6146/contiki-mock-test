
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
    <section className="bg-black py-12 relative bg-cover bg-center" style={{ backgroundImage: 'url("/assets/images/six-two-map.png")' }}>
      <div className="container max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h2 className="text-white text-3xl font-bold">six-two</h2>
          </div>
          
          <div className="text-center md:text-right">
            <h3 className="text-[#CCFF00] text-4xl font-bold mb-2">
              Think you've seen the world?
            </h3>
            <Link 
              to="/sixtwo" 
              className="text-[#CCFF00] underline text-lg hover:text-white transition-colors"
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

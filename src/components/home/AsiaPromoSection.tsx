import React from 'react';
import { Link } from 'react-router-dom'; // Import Link

const AsiaPromoSection = () => {
  return (
    <section className="relative h-full min-h-[450px] md:min-h-[500px] rounded-lg overflow-hidden group cursor-pointer shadow-lg">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
        style={{
          backgroundImage: `url('https://www.contiki.com/media/smpji2l0/group-of-young-people-riding-bikes-vietnam-road.jpg')`,
        }}
      ></div>
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

      <div className="relative z-10 h-full flex flex-col justify-end p-6 md:p-8 text-white">
        {/* Text Content */}
        <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-3">A is for Asia</h3>
        <p className="text-sm md:text-base mb-4 md:mb-6 opacity-95">And Y is for 'yes please'</p>

        {/* Button */}
        {/* Assuming the button links to an Asia destinations page */}
        <Link
          to="/destinations/asia"
          className="inline-block bg-[#CCFF00] hover:bg-[#b8e600] text-black font-bold py-3 px-6 rounded-full text-sm uppercase tracking-wide transition-colors duration-200 w-fit shadow-md"
        >
          Show Me Asia
        </Link>
      </div>
    </section>
  );
};

export default AsiaPromoSection; 
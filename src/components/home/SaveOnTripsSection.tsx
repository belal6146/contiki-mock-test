import React from 'react';
import { Link } from 'react-router-dom'; // Import Link

const SaveOnTripsSection = () => {
  return (
    <section className="relative h-full min-h-[450px] md:min-h-[500px] rounded-lg overflow-hidden group cursor-pointer shadow-lg">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
        style={{
          backgroundImage: `url('https://www.contiki.com/media/k1n1cn3v/hero-save-on-trips.jpg?center=0.5%2C0.5&mode=crop&width=1200&height=600&rnd=133568878354900000')`,
        }}
      ></div>
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

      <div className="relative z-10 h-full flex flex-col justify-end p-6 md:p-8 text-white">
        {/* Text Content */}
        <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-3">Save on Top Trips for 2026 🏆</h3>
        <p className="text-sm md:text-base mb-4 md:mb-6 opacity-95">Up to £622 off Ultimate Trips</p>

        {/* Button */}
        {/* Assuming the button links to a deals page */}
        <Link 
          to="/deals"
          className="inline-block bg-[#CCFF00] hover:bg-[#b8e600] text-black font-bold py-3 px-6 rounded-full text-sm uppercase tracking-wide transition-colors duration-200 w-fit shadow-md"
        >
          Book for Next Year
        </Link>
      </div>
    </section>
  );
};

export default SaveOnTripsSection; 
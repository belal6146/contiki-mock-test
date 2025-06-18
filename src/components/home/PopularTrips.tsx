import { useState } from "react";
import ContikiTripCard from "./ContikiTripCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from 'react-router-dom';

const PromotionCard = ({ title, subtitle, bgImage, buttonText, buttonLink }) => (
  <div className="bg-white rounded-xl overflow-hidden shadow-lg flex flex-col h-full group hover:shadow-2xl transition-all duration-300 cursor-pointer">
    <Link to={buttonLink}>
      <div className="relative h-72 w-full overflow-hidden">
        <img
          src={bgImage}
          alt={title}
          className="w-full h-full object-cover transition-all duration-700 transform group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 text-white">
          <h3 className="text-xl md:text-2xl font-bold mb-2 drop-shadow-lg">{title}</h3>
          <p className="text-sm md:text-base mb-4 drop-shadow-md">{subtitle}</p>
          <div className="bg-[#CCFF00] text-black font-bold rounded-full px-6 py-2 mt-4 inline-block text-sm uppercase tracking-wide transition-colors duration-200 shadow-md">
            {buttonText}
          </div>
        </div>
      </div>
    </Link>
  </div>
);

const PopularTrips = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  const trips = [
    {
      id: 1,
      title: "Greek Island Hopping",
      image: "https://www.contiki.com/media/uhxfozab/group-of-people-in-blue-lake-surrounded-by-mountains.jpg?center=0.5%2C0.5&format=webp&height=616&mode=crop&quality=80&width=720",
      rating: 4.6,
      days: 11,
      places: 5,
      countries: 1,
      description: "The one that takes you through Mykonos, Paros, Santorini and Ios with comfy sleeps between island hops.",
      regularPrice: "£2,225",
      price: "From £1,807",
      spotlight: true,
      link: "/trips/greek-island-hopping"
    },
    {
      id: 2,
      title: "Canada and the Rockies",
      image: "https://www.contiki.com/media/smpji2l0/group-of-young-people-riding-bikes-vietnam-road.jpg?center=0.6161542586835618%2C0.4987480082915613&format=webp&height=616&mode=crop&quality=80&width=720",
      rating: 4.7,
      days: 11,
      places: 7,
      countries: 1,
      description: "The one that surrounds you with the majestic landscape of the Canadian Rockies, from Vancouver to the Rock.",
      regularPrice: "£2,876",
      price: "From £2,274",
      link: "/trips/canada-and-the-rockies"
    },
    {
      id: 3,
      title: "European Horizon",
      image: "https://www.contiki.com/media/y5mczjrf/2997eurs2013-1-1.jpg?center=0.5%2C0.5&amp;format=webp&amp;mode=crop&amp;width=900&amp;height=450&amp;quality=80",
      rating: 4.6,
      days: 10,
      places: 13,
      countries: 7,
      description: "The one that fits in the best of Europe's icons for those short on time",
      regularPrice: "£1,325",
      price: "From £1,060",
      link: "/trips/european-horizon"
    },
    {
      id: 4,
      title: "Thailand Island Hopper East",
      image: "https://www.contiki.com/media/qcrx4j5p/thailand-island-hopper-east-contiki.jpg?center=0.5%2C0.5&mode=crop&width=720&height=616&rnd=133568878354900000",
      rating: 4.8,
      days: 9,
      places: 4,
      countries: 1,
      description: "Discover stunning islands, full moon parties, and vibrant culture on this Thailand adventure.",
      regularPrice: "£1,500",
      price: "From £1,250",
      link: "/trips/thailand-island-hopper-east"
    }
  ];

  const greecePromo = {
    title: "Get set for GREECE",
    subtitle: "Save extra when you book this month!",
    bgImage: "https://www.contiki.com/media/nbm4l7pr/greece-promo-banner.jpg?center=0.5%2C0.5&format=webp&height=600&mode=crop&quality=80&width=1200",
    buttonText: "LET'S GO",
    buttonLink: "/tours"
  };

  const handlePrev = () => {
    setActiveSlide((prev) => (prev === 0 ? 0 : prev - 1));
  };

  const handleNext = () => {
    setActiveSlide((prev) => (prev === Math.ceil(trips.length / 3) - 1 ? Math.ceil(trips.length / 3) - 1 : prev + 1));
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-center mb-12 relative">
          <h2 className="text-[32px] font-extrabold" style={{ color: 'rgb(41, 41, 41)', textTransform: 'none' }}>Popular Trips</h2>
          <div className="flex items-center gap-3 absolute right-0 top-1/2 transform -translate-y-1/2">
            <button 
              onClick={handlePrev}
              className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={activeSlide === 0}
            >
              <ChevronLeft className="w-5 h-5 text-gray-700" />
            </button>
            <button 
              onClick={handleNext}
              className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={activeSlide === Math.ceil(trips.length / 3) - 1}
            >
              <ChevronRight className="w-5 h-5 text-gray-700" />
            </button>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Render items based on active slide */}
          {trips.slice(activeSlide * 3, (activeSlide * 3) + 2).map((trip) => (
             <ContikiTripCard key={trip.id} {...trip} />
          ))}

          {/* Promotional Card */}
          <div className="relative rounded-[8px] overflow-hidden aspect-[3/4] group">
            <img 
              src="https://www.contiki.com/media/wv2mdkt5/gb_eu-europe_sale_embedded-card.jpg" 
              alt="Europe Sale Embedded Card" 
              className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
              <Link 
                to="/en-gb/activity/asia-with-contiki"
                className="inline-block bg-secondary text-black py-3 px-6 rounded-full font-extrabold text-[13px] hover:bg-[#b8e600] transition-colors uppercase tracking-[0.5px] shadow-[0_2px_4px_rgba(0,0,0,0.1)] text-center"
              >
                LET'S GO
              </Link>
            </div>
          </div>
          
          {trips.slice((activeSlide * 3) + 2, (activeSlide * 3) + 3).map((trip) => (
               <ContikiTripCard key={trip.id} {...trip} />
            ))}

        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-2 mt-8">
          {Array.from({ length: Math.ceil(trips.length / 3) }).map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveSlide(index)}
              className={`w-2.5 h-2.5 rounded-full transition-colors ${
                activeSlide === index ? 'bg-black' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link
            to="/tours"
            className="inline-block bg-black text-white py-3 px-8 rounded-full font-extrabold text-[13px] hover:bg-gray-900 transition-colors uppercase tracking-[0.5px] shadow-[0_2px_4px_rgba(0,0,0,0.1)]"
          >
            VIEW ALL TRIPS
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PopularTrips;

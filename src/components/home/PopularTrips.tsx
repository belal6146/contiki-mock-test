import { useState } from "react";
import ContikiTripCard from "./ContikiTripCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

const PromotionCard = ({ title, subtitle, bgImage, buttonText, buttonLink }) => (
  <div className="bg-white rounded-xl overflow-hidden shadow-lg flex flex-col h-full group hover:shadow-2xl transition-all duration-300">
    <div className="relative h-48 w-full overflow-hidden">
      <img 
        src={bgImage}
        alt={title}
        className="w-full h-full object-cover transition-all duration-700 transform group-hover:scale-110" 
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 text-white">
        <h3 className="text-2xl md:text-3xl font-bold mb-2 drop-shadow-lg">{title}</h3>
        <p className="text-base md:text-lg mb-4 drop-shadow-md">{subtitle}</p>
        <a
          href={buttonLink}
          className="bg-[#CCFF00] text-black font-bold rounded-full px-8 py-3 mt-2 hover:bg-[#b8e600] transition-colors shadow-lg"
        >
          {buttonText}
        </a>
      </div>
    </div>
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
      spotlight: true
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
      price: "From £2,274"
    },
    {
      id: 3,
      title: "European Horizon",
      image: "https://www.contiki.com/media/<media-id>/aerial-shot-of-albanian-beach.jpg?center=0.5%2C0.5&format=webp&height=616&mode=crop&quality=80&width=720",
      rating: 4.6,
      days: 10,
      places: 13,
      countries: 7,
      description: "The one that fits in the best of Europe's icons for those short on time",
      regularPrice: "£1,325",
      price: "From £1,060"
    },
    {
      id: 4,
      title: "Austrian Ski Adventure",
      image: "https://www.contiki.com/media/<media-id>/skiiers-on-slope-austria.jpg?center=0.5%2C0.5&format=webp&height=616&mode=crop&quality=80&width=720",
      rating: 4.5,
      days: 7,
      places: 3,
      countries: 1,
      description: "Hit the slopes in Austria for an epic ski and snowboard trip with amazing après-ski.",
      regularPrice: "£1,100",
      price: "From £950"
    },
    {
      id: 5,
      title: "French Château Experience",
      image: "https://www.contiki.com/media/<media-id>/contiki-travelers-run-club-chateau.jpg?center=0.5%2C0.5&format=webp&height=616&mode=crop&quality=80&width=720",
      rating: 4.9,
      days: 5,
      places: 2,
      countries: 1,
      description: "Stay in a stunning French Château and explore the surrounding countryside.",
      regularPrice: "£1,500",
      price: "From £1,300"
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
    setActiveSlide((prev) => (prev === 1 ? 1 : prev + 1));
  };

  return (
    <section className="py-12 md:py-16 px-4 md:px-8 max-w-7xl mx-auto bg-white">
      <div className="flex flex-col items-center mb-8">
        <h2 className="text-4xl md:text-5xl font-extrabold text-black tracking-tight text-center mb-2" style={{ letterSpacing: '0.04em' }}>Popular Trips</h2>
        <div className="w-16 h-1 bg-[#CCFF00] rounded-full mb-2"></div>
      </div>
      
      <div className="flex justify-between items-center mb-8">
        <div className="flex gap-2">
          <button 
            onClick={handlePrev}
            className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center focus:outline-none hover:bg-gray-50 transition-colors"
            disabled={activeSlide === 0}
            aria-label="Previous slide"
          >
            <ChevronLeft className={`h-5 w-5 ${activeSlide === 0 ? 'text-gray-300' : 'text-gray-700'}`} />
          </button>
          <button 
            onClick={handleNext}
            className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center focus:outline-none hover:bg-gray-50 transition-colors"
            disabled={activeSlide === 1}
            aria-label="Next slide"
          >
            <ChevronRight className={`h-5 w-5 ${activeSlide === 1 ? 'text-gray-300' : 'text-gray-700'}`} />
          </button>
        </div>
      </div>
      
      {/* Trip Cards Grid - Horizontal Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
        {activeSlide === 0 && (
          <>
            <ContikiTripCard {...trips[0]} />
            <ContikiTripCard {...trips[1]} />
            <div className="lg:col-span-1">
              <PromotionCard {...greecePromo} />
            </div>
            <ContikiTripCard {...trips[2]} />
          </>
        )}
        
        {activeSlide === 1 && (
          <div className="col-span-full flex justify-center items-center p-12">
            <p className="text-lg text-gray-500">More trips coming soon!</p>
          </div>
        )}
      </div>
      
      {/* Carousel Dots */}
      <div className="flex justify-center mb-8">
        <div className="flex gap-2">
          <button 
            onClick={() => setActiveSlide(0)} 
            className={`w-2 h-2 rounded-full transition-colors ${activeSlide === 0 ? 'bg-gray-800' : 'bg-gray-300'}`}
            aria-label="Go to slide 1"
          />
          <button 
            onClick={() => setActiveSlide(1)} 
            className={`w-2 h-2 rounded-full transition-colors ${activeSlide === 1 ? 'bg-gray-800' : 'bg-gray-300'}`}
            aria-label="Go to slide 2"
          />
        </div>
      </div>
      
      {/* View All Trips Button */}
      <div className="flex justify-center">
        <button className="bg-[#CCFF00] text-black font-extrabold py-4 px-12 rounded-full text-lg uppercase tracking-wider shadow-lg hover:bg-[#b8e600] transition-all duration-200">
          View All Trips
        </button>
      </div>
    </section>
  );
};

export default PopularTrips;

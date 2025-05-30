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
      image: "https://www.contiki.com/media/nbm4l7pr/greece-promo-banner.jpg?center=0.5%2C0.5&format=webp&height=600&mode=crop&quality=80&width=1200",
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
    setActiveSlide((prev) => (prev === 1 ? 1 : prev + 1));
  };

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex justify-between items-center mb-8 md:mb-12">
          <div className="flex flex-col items-center w-full">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 tracking-tight text-center mb-2">Popular Trips</h2>
            <div className="w-16 h-1 bg-[#CCFF00] rounded-full"></div>
          </div>
          <div className="flex space-x-4 flex-shrink-0">
            <button
              onClick={handlePrev}
              className="p-3 rounded-full border border-gray-300 hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center w-10 h-10"
              disabled={activeSlide === 0}
              aria-label="Previous slide"
            >
              <ChevronLeft className={`h-5 w-5 ${activeSlide === 0 ? 'text-gray-400' : 'text-gray-700'}`} />
            </button>
            <button
              onClick={handleNext}
              className="p-3 rounded-full border border-gray-300 hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center w-10 h-10"
              disabled={activeSlide === 1}
              aria-label="Next slide"
            >
              <ChevronRight className={`h-5 w-5 ${activeSlide === 1 ? 'text-gray-400' : 'text-gray-700'}`} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10 md:mb-12">
          {activeSlide === 0 && (
            <>
              <ContikiTripCard {...trips[0]} />
              <ContikiTripCard {...trips[1]} />
              <div className="md:col-span-2 lg:col-span-1">
                <PromotionCard {...greecePromo} />
              </div>
              <ContikiTripCard {...trips[2]} />
            </>
          )}

          {activeSlide === 1 && (
            <>
              <ContikiTripCard {...trips[3]} />
              <div className="md:col-span-3 lg:col-span-full flex justify-center items-center p-12">
                <p className="text-lg text-gray-500">More trips coming soon!</p>
              </div>
            </>
          )}
        </div>

        <div className="flex justify-center space-x-2 mt-8 md:mt-10">
          <button
            onClick={() => setActiveSlide(0)}
            className={`w-3 h-3 rounded-full transition-colors ${activeSlide === 0 ? 'bg-gray-800' : 'bg-gray-300'}`}
            aria-label="Go to slide 1"
          />
          <button
            onClick={() => setActiveSlide(1)}
            className={`w-3 h-3 rounded-full transition-colors ${activeSlide === 1 ? 'bg-gray-800' : 'bg-gray-300'}`}
            aria-label="Go to slide 2"
          />
        </div>

        <div className="flex justify-center mt-10 md:mt-12">
          <Link to="/trips">
            <button className="bg-[#CCFF00] text-black font-extrabold py-4 px-12 rounded-full text-lg uppercase tracking-wider shadow-lg hover:bg-[#b8e600] transition-all duration-200">
              View All Trips
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PopularTrips;

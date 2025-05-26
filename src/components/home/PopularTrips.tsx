
import { useState } from "react";
import ContikiTripCard from "./ContikiTripCard";
import PromotionCard from "./PromotionCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

const PopularTrips = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  const trips = [
    {
      id: 1,
      title: "Greek Island Hopping",
      image: "/lovable-uploads/e713b7c0-40aa-4ee2-a9d7-df2c791c2708.png",
      rating: 4.6,
      days: 11,
      places: 5,
      countries: 1,
      description: "The one that takes you through Mykonos, Paros, Santorini and Ios with comfy sleeps between island hops.",
      regularPrice: "£2,225",
      price: "£1,669",
      spotlight: true
    },
    {
      id: 2,
      title: "Canada and the Rockies",
      image: "/lovable-uploads/99c672c5-c363-4b07-bf54-fa34a6b5bd28.png",
      rating: 4.7,
      days: 11,
      places: 7,
      countries: 1,
      description: "The one that surrounds you with the majestic landscape of the Canadian Rockies, from Vancouver to the Rock.",
      regularPrice: "£2,876",
      price: "£2,274"
    },
    {
      id: 3,
      title: "European Horizon",
      image: "https://images.unsplash.com/photo-1493707553966-283afac8c358?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      rating: 4.6,
      days: 10,
      places: 13,
      countries: 7,
      description: "The one that fits in the best of Europe's icons for those short on time",
      regularPrice: "£1,325",
      price: "£1,060"
    }
  ];

  const handlePrev = () => {
    setActiveSlide((prev) => (prev === 0 ? 0 : prev - 1));
  };

  const handleNext = () => {
    setActiveSlide((prev) => (prev === 1 ? 1 : prev + 1));
  };

  return (
    <section className="py-12 md:py-16 px-4 md:px-8 max-w-7xl mx-auto bg-white">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Popular trips</h2>
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {activeSlide === 0 && (
          <>
            <ContikiTripCard {...trips[0]} />
            <ContikiTripCard {...trips[1]} />
            <div className="lg:col-span-1">
              <PromotionCard 
                title="Get set for GREECE 🌴"
                subtitle="Save extra when you book this month!"
                bgImage="/lovable-uploads/e713b7c0-40aa-4ee2-a9d7-df2c791c2708.png"
                buttonText="LET'S GO"
                buttonLink="/tours"
              />
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
        <button className="bg-[#CCFF00] text-black font-bold py-3 px-8 rounded hover:bg-[#b8e600] transition-colors uppercase tracking-wide">
          VIEW ALL TRIPS
        </button>
      </div>
    </section>
  );
};

export default PopularTrips;

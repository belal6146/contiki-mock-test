
import React, { useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Slider from "react-slick";
// Import slick carousel css
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface Highlight {
  id: string;
  title: string;
  description: string;
  image: string;
  type: string;
}

interface TripHighlightsProps {
  highlights: Highlight[];
}

const PrevArrow = (props: any) => {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white/80 rounded-full p-2 shadow-lg hover:bg-white/90 transition-all focus:outline-none focus:ring-2 focus:ring-accent"
      aria-label="Previous highlight"
    >
      <ChevronLeft className="h-6 w-6" />
    </button>
  );
};

const NextArrow = (props: any) => {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white/80 rounded-full p-2 shadow-lg hover:bg-white/90 transition-all focus:outline-none focus:ring-2 focus:ring-accent"
      aria-label="Next highlight"
    >
      <ChevronRight className="h-6 w-6" />
    </button>
  );
};

const TripHighlights: React.FC<TripHighlightsProps> = ({ highlights }) => {
  useEffect(() => {
    console.debug('[TripHighlights] mounted', { highlightsCount: highlights.length });
  }, [highlights.length]);
  
  if (!highlights || highlights.length === 0) {
    return null;
  }
  
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: '20px'
        }
      }
    ],
    afterChange: (current: number) => {
      console.debug('[TripHighlights] slide changed', { current });
    }
  };
  
  return (
    <section className="py-12">
      <div className="container">
        <h2 className="text-2xl font-medium text-primary mb-6">Trip Highlights</h2>
        <p className="text-gray-600 mb-8">The must-do experiences that you can cross off your bucket list</p>
        
        <div className="relative highlights-slider">
          <Slider {...sliderSettings}>
            {highlights.map((highlight) => (
              <div
                key={highlight.id}
                className="px-2"
              >
                <div className="group transition-all duration-300 hover:scale-105">
                  <div className="min-w-[280px] max-w-[280px] bg-white rounded-lg overflow-hidden shadow hover:shadow-lg">
                    <div className="relative aspect-w-16 aspect-h-9">
                      <img
                        src={highlight.image}
                        alt={highlight.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-3 left-3 bg-accent text-white text-xs font-medium px-2 py-1 rounded-md">
                        {highlight.type} Experience
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-lg mb-2">{highlight.title}</h3>
                      <p className="text-sm text-gray-700 line-clamp-3">{highlight.description}</p>
                      <button className="text-secondary font-medium text-sm mt-3">Read more</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>

      <style jsx>{`
        :global(.highlights-slider .slick-dots) {
          bottom: -30px;
        }
        :global(.highlights-slider .slick-dots li button:before) {
          font-size: 10px;
        }
      `}</style>
    </section>
  );
};

export default TripHighlights;

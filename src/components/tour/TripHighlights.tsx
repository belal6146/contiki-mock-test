
import React, { useEffect } from 'react';
import Slider from "react-slick";
import PrevArrow from '../carousel/PrevArrow';
import NextArrow from '../carousel/NextArrow';
// Import slick carousel CSS
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
  arrowVariant?: 'default' | 'outline' | 'circle' | 'minimal';
}

const TripHighlights: React.FC<TripHighlightsProps> = ({ 
  highlights,
  arrowVariant = 'default'
}) => {
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
    prevArrow: <PrevArrow variant={arrowVariant} />,
    nextArrow: <NextArrow variant={arrowVariant} />,
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
        
        <div className="relative highlights-slider overflow-hidden">
          <Slider {...sliderSettings} className="slick-slider">
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

      <style>
        {`
        .highlights-slider .slick-dots {
          bottom: -30px;
        }
        .highlights-slider .slick-dots li button:before {
          font-size: 10px;
        }
        `}
      </style>
    </section>
  );
};

export default TripHighlights;

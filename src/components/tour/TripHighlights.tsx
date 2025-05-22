
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
  isIncluded?: boolean;
  type: string;
}

interface TripHighlightsProps {
  highlights: Highlight[];
  arrowVariant?: "default" | "outline" | "circle" | "minimal"; // Fixed arrow variant type
}

const TripHighlights: React.FC<TripHighlightsProps> = ({ 
  highlights,
  arrowVariant = "default" // Default value with proper type
}) => {
  useEffect(() => {
    console.debug('[TripHighlights] mounted', { highlightsCount: highlights.length });
  }, [highlights.length]);
  
  // Get a dynamic image from Unsplash based on highlight type
  const getHighlightImage = (highlight: Highlight, index: number) => {
    if (highlight.image && !highlight.image.includes('placeholder')) {
      return highlight.image;
    }
    
    // Different image categories based on highlight type
    const type = highlight.type.toLowerCase();
    let searchTerm = 'travel';
    
    if (type.includes('cultural')) {
      searchTerm = 'cultural,travel,landmarks';
    } else if (type.includes('adventure')) {
      searchTerm = 'adventure,travel,outdoor';
    } else if (type.includes('food')) {
      searchTerm = 'food,cuisine,restaurant';
    } else if (type.includes('nature')) {
      searchTerm = 'nature,landscape,scenery';
    }
    
    // Add index to make each image unique
    return `https://source.unsplash.com/random/800x600/?${searchTerm}&sig=${index}`;
  };
  
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
      console.debug('[TripHighlights] slide changed', { current, highlight: highlights[current]?.title });
    }
  };
  
  return (
    <section className="py-12 bg-white">
      <div className="container">
        <h2 className="text-3xl font-bold mb-2">Trip Highlights</h2>
        <p className="text-gray-600 mb-8">The must-do experiences that you can cross off your bucket list</p>
        
        <div className="relative highlights-slider">
          <Slider {...sliderSettings}>
            {highlights.map((highlight, index) => (
              <div
                key={highlight.id}
                className="px-3"
              >
                <div className="group bg-white rounded-lg overflow-hidden shadow transition-all duration-300 hover:shadow-lg">
                  <div className="relative aspect-w-16 aspect-h-10">
                    <img
                      src={getHighlightImage(highlight, index)}
                      alt={highlight.title}
                      className="w-full h-64 object-cover"
                    />
                    {highlight.isIncluded && (
                      <div className="absolute top-3 left-3 bg-[#FF3B5C] text-white text-xs font-bold px-3 py-1 rounded">
                        Included Experience
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-xl mb-2">{highlight.title}</h3>
                    <p className="text-gray-700 mb-4 line-clamp-3">{highlight.description}</p>
                    <a href="#" className="text-[#00BFFF] font-medium">Read more</a>
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
        .highlights-slider .slick-slide {
          padding: 0 8px;
        }
        `}
      </style>
    </section>
  );
};

export default TripHighlights;

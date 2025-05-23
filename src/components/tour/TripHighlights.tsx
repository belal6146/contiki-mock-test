
import React, { useEffect, useState } from 'react';
import Slider from "react-slick";
import PrevArrow from '../carousel/PrevArrow';
import NextArrow from '../carousel/NextArrow';
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
  arrowVariant?: "default" | "outline" | "circle" | "minimal";
}

const TripHighlights: React.FC<TripHighlightsProps> = ({ 
  highlights,
  arrowVariant = "default"
}) => {
  const [imagesLoaded, setImagesLoaded] = useState<Record<string, boolean>>({});

  useEffect(() => {
    console.debug('[TripHighlights] mounted', { highlightsCount: highlights.length });
  }, [highlights.length]);
  
  const getHighlightImage = (highlight: Highlight, index: number) => {
    if (highlight.image && !highlight.image.includes('placeholder')) {
      return highlight.image;
    }
    
    const type = highlight.type.toLowerCase();
    const title = highlight.title.toLowerCase().replace(/\s+/g, ',');
    let searchTerms = [];
    
    if (type.includes('cultural')) {
      searchTerms = ['cultural', 'landmarks', 'architecture', 'heritage', title];
    } else if (type.includes('adventure')) {
      searchTerms = ['adventure', 'outdoor', 'extreme', 'activity', title];
    } else if (type.includes('food')) {
      searchTerms = ['food', 'cuisine', 'restaurant', 'local', title];
    } else if (type.includes('nature')) {
      searchTerms = ['nature', 'landscape', 'scenery', 'wilderness', title];
    } else {
      searchTerms = ['travel', 'destination', 'experience', title];
    }
    
    const searchQuery = searchTerms.filter(Boolean).join(',');
    return `https://source.unsplash.com/featured/800x600/?${searchQuery}&sig=${index}`;
  };

  const handleImageLoad = (highlightId: string) => {
    setImagesLoaded(prev => ({ ...prev, [highlightId]: true }));
    console.debug('[TripHighlights] imageLoaded', { highlightId });
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
    <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-gray-900">Trip Highlights</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            The must-do experiences that you can cross off your bucket list
          </p>
        </div>
        
        <div className="relative highlights-slider">
          <Slider {...sliderSettings}>
            {highlights.map((highlight, index) => {
              const imageUrl = getHighlightImage(highlight, index);
              const isLoaded = imagesLoaded[highlight.id];
              
              return (
                <div key={highlight.id} className="px-3">
                  <div className="group bg-white rounded-2xl overflow-hidden shadow-lg transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
                    <div className="relative h-64 overflow-hidden">
                      <div 
                        className={`w-full h-full bg-cover bg-center transition-all duration-700 transform group-hover:scale-110 ${
                          isLoaded ? 'opacity-100' : 'opacity-0'
                        }`}
                        style={{ backgroundImage: `url(${imageUrl})` }}
                        onLoad={() => handleImageLoad(highlight.id)}
                      />
                      
                      {!isLoaded && (
                        <div className="absolute inset-0 bg-gray-300 animate-pulse" />
                      )}
                      
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                      
                      {highlight.isIncluded && (
                        <div className="absolute top-4 left-4 bg-[#CCFF00] text-black text-xs font-bold px-3 py-2 rounded-full shadow-lg">
                          Included Experience
                        </div>
                      )}
                      
                      <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm text-white text-xs font-medium px-3 py-1 rounded-full">
                        {highlight.type}
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <h3 className="font-bold text-xl mb-3 text-gray-900 group-hover:text-[#FF6900] transition-colors duration-200">
                        {highlight.title}
                      </h3>
                      <p className="text-gray-700 mb-4 line-clamp-3 leading-relaxed">
                        {highlight.description}
                      </p>
                      <button className="text-[#FF6900] font-semibold text-sm hover:text-[#FF6900]/80 transition-colors duration-200 flex items-center gap-1">
                        Read more →
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </Slider>
        </div>
      </div>

      <style>
        {`
        .highlights-slider .slick-dots {
          bottom: -40px;
        }
        .highlights-slider .slick-dots li button:before {
          font-size: 12px;
          color: #FF6900;
        }
        .highlights-slider .slick-dots li.slick-active button:before {
          color: #FF6900;
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

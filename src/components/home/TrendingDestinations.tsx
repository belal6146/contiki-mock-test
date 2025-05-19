
import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Slider from 'react-slick';
// Import slick carousel CSS
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Sample trending destinations data
const destinations = [
  { id: 'japan', name: 'JAPAN', image: 'https://images.unsplash.com/photo-1492571350019-22de08371fd3' },
  { id: 'costa-rica', name: 'COSTA RICA', image: 'https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86' },
  { id: 'thailand', name: 'THAILAND', image: 'https://images.unsplash.com/photo-1528181304800-259b08848526' },
  { id: 'morocco', name: 'MOROCCO', image: 'https://images.unsplash.com/photo-1539020140153-e8c5525dd0f5' },
  { id: 'croatia', name: 'CROATIA', image: 'https://images.unsplash.com/photo-1596097635121-14b38eaed139' }, 
  { id: 'iceland', name: 'ICELAND', image: 'https://images.unsplash.com/photo-1500673922987-e212871fec22' }
];

const TrendingDestinations = () => {
  const sliderRef = useRef<Slider | null>(null);

  useEffect(() => {
    console.debug('[TrendingDestinations] mounted');
  }, []);

  const handlePrev = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
      console.debug('[TrendingDestinations] scroll', 'left');
    }
  };

  const handleNext = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
      console.debug('[TrendingDestinations] scroll', 'right');
    }
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 4,
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1.5,
          centerMode: true,
          centerPadding: '40px',
        }
      }
    ]
  };

  return (
    <section className="py-12">
      <div className="container">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-medium text-black">Trending destinations</h2>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-white shadow-md"
              onClick={handlePrev}
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-white shadow-md"
              onClick={handleNext}
              aria-label="Scroll right"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>
        </div>
        
        <div className="relative overflow-hidden">
          <Slider ref={sliderRef} {...settings} className="slick-slider">
            {destinations.map((destination) => (
              <div key={destination.id} className="px-2">
                <Link 
                  to={`/tours/${destination.id}`}
                  className="block w-full hover:opacity-90 transition-opacity"
                >
                  <div className="relative aspect-square rounded-lg overflow-hidden">
                    <img 
                      src={destination.image} 
                      alt={destination.name} 
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <p className="mt-2 text-center font-medium text-sm">
                    {destination.name}
                  </p>
                </Link>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default TrendingDestinations;


import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Slider from "react-slick";
import { Trip } from '@/hooks/useTrips';
import PrevArrow from '../carousel/PrevArrow';
import NextArrow from '../carousel/NextArrow';
// Import slick carousel CSS
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface RelatedTripsProps {
  trips: Trip[];
}

const RelatedTrips: React.FC<RelatedTripsProps> = ({ trips }) => {
  useEffect(() => {
    console.debug('[RelatedTrips] mounted', { tripsCount: trips.length });
  }, [trips.length]);
  
  if (!trips || trips.length === 0) {
    return null;
  }
  
  const settings = {
    dots: false,
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
    ]
  };
  
  return (
    <section className="py-12">
      <div className="container">
        <h2 className="text-2xl font-medium text-primary mb-6">Related Trips</h2>
        <p className="text-gray-600 mb-8">This trip comes in different shapes and sizes. For more options, check these itineraries.</p>
        
        <div className="relative overflow-hidden">
          <Slider {...settings} className="slick-slider">
            {trips.map((trip) => (
              <div
                key={trip.id}
                className="px-4"
              >
                <div className="min-w-[300px] max-w-[300px] flex-shrink-0 bg-white rounded-lg overflow-hidden shadow">
                  <div className="relative">
                    <img 
                      src={trip.image || '/placeholder.svg'} 
                      alt={trip.name}
                      className="w-full h-48 object-cover"
                    />
                    {trip.duration && (
                      <div className="absolute top-4 left-4 bg-accent text-white px-2 py-1 text-xs font-medium rounded">
                        {trip.duration} days
                      </div>
                    )}
                  </div>
                  
                  <div className="p-4">
                    <h3 className="font-bold text-lg mb-2 line-clamp-2">{trip.name}</h3>
                    <div className="flex items-center text-sm mb-4">
                      <span className="text-gray-600">{trip.destination}</span>
                    </div>
                    
                    {trip.rating && (
                      <div className="flex items-center mb-4">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.floor(trip.rating) ? "text-yellow-400" : "text-gray-300"
                              }`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <span className="text-gray-600 ml-2">{trip.rating}</span>
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xs text-gray-600">From</div>
                        <div className="font-bold text-lg">£{trip.price}</div>
                      </div>
                      
                      <Link
                        to={`/tours/${trip.slug}`}
                        className="bg-primary text-white px-4 py-2 rounded text-sm font-medium hover:bg-opacity-90 transition-colors"
                      >
                        View Trip
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default RelatedTrips;

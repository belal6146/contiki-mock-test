
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Slider from "react-slick";
import { Trip } from '@/types/trips';
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

  // Get a dynamic Unsplash image based on the trip's destination
  const getTripImage = (trip: Trip) => {
    if (trip.image && !trip.image.includes('placeholder')) {
      return trip.image;
    }
    
    // Replace spaces with commas and lowercase for better search results
    const searchTerm = trip.destination.toLowerCase().replace(/\s+/g, ',');
    return `https://source.unsplash.com/random/600x400/?travel,${searchTerm}`;
  };
  
  return (
    <section className="py-12">
      <div className="container">
        <h2 className="text-2xl font-medium text-primary mb-6">Other trips you might like</h2>
        <p className="text-gray-600 mb-8">This trip comes in different shapes and sizes. For more options, check these itineraries.</p>
        
        <div className="relative overflow-hidden">
          <Slider {...settings} className="slick-slider">
            {trips.map((trip) => (
              <div
                key={trip.id}
                className="px-4"
              >
                <div className="bg-white rounded-lg overflow-hidden shadow-md">
                  <div className="relative">
                    <img 
                      src={getTripImage(trip)} 
                      alt={trip.name}
                      className="w-full h-48 object-cover"
                      loading="lazy"
                    />
                    {trip.discountPercentage > 0 && (
                      <div className="absolute top-4 left-4 bg-yellow-500 text-white px-2 py-1 text-xs font-bold rounded">
                        {trip.discountPercentage}% OFF
                      </div>
                    )}
                  </div>
                  
                  <div className="p-4">
                    <h3 className="font-bold text-lg mb-2 line-clamp-2">{trip.name}</h3>
                    <div className="flex items-center text-sm mb-4">
                      <span className="text-gray-600">{trip.duration} days · {trip.destination}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xs text-gray-600">From</div>
                        <div className="font-bold text-lg">£{trip.price}</div>
                      </div>
                      
                      <Link
                        to={`/tours/${trip.id}`}
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


import React, { useState, useEffect } from 'react';
import Slider from "react-slick";
// Import slick carousel CSS
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Import testimonial images
import testimonial1Image from '/images/testimonial-sarah.jpg';
import testimonial2Image from '/images/testimonial-mike.jpg';
import testimonial3Image from '/images/testimonial-emily.jpg';

// Mock testimonial data
const testimonials = [
  {
    id: 1,
    text: "My Contiki trip was life-changing! I made friends from all over the world and experienced things I never thought I would. The trip manager was incredible and made the experience so much better.",
    author: "Sarah Johnson",
    location: "Australia",
    trip: "European Discovery",
    image: testimonial1Image
  },
  {
    id: 2,
    text: "I was hesitant to book a group tour, but it was the best decision I've ever made. I got to see amazing places without the stress of planning, and the group dynamic made it so much fun!",
    author: "Mike Reynolds",
    location: "United States",
    trip: "Thai Island Hopper",
    image: testimonial2Image
  },
  {
    id: 3,
    text: "From zip-lining in Costa Rica to snorkeling in the crystal clear waters, every day was an adventure. Our trip manager went above and beyond to make it special for everyone.",
    author: "Emily Chen",
    location: "Canada",
    trip: "Costa Rica Adventure",
    image: testimonial3Image
  }
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    console.debug('[Testimonials] mounted');
  }, []);
  
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    beforeChange: (_: any, next: number) => setActiveIndex(next),
    customPaging: (i: number) => (
      <button
        className={`w-3 h-3 rounded-full transition-colors ${
          i === activeIndex ? "bg-[#CCFF00]" : "bg-white/30 hover:bg-white/50"
        }`}
        aria-label={`Go to testimonial ${i + 1}`}
      />
    ),
    dotsClass: "slick-dots custom-dots"
  };

  return (
    <section className="py-16 md:py-24 bg-black text-white">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="heading-lg mb-4">What Our Travelers Say</h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Don't just take our word for it - hear from travelers who've experienced our trips firsthand.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto overflow-hidden">
          <Slider {...settings} className="slick-slider">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="px-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 shadow-xl">
                  <svg className="w-12 h-12 text-[#CCFF00] mb-6 opacity-80" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
                    <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                  </svg>
                  
                  <p className="text-lg md:text-xl italic mb-8">
                    "{testimonial.text}"
                  </p>
                  
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.author}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold">{testimonial.author}</h4>
                      <p className="text-sm text-white/70">
                        {testimonial.location} • {testimonial.trip}
                      </p>
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
        .custom-dots {
          bottom: -40px;
        }
        .custom-dots li button:before {
          display: none;
        }
        .slick-dots li {
          margin: 0 4px;
        }
        `}
      </style>
    </section>
  );
};

export default Testimonials;

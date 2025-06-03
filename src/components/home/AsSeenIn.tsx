import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const logos = [
  {
    name: 'Buzzfeed',
    imageUrl: 'https://www.contiki.com/media/p2vnwawk/contiki-logo-as-seen-in-white-bg-buzzfeed.jpg?center=0.5%2C0.5&format=webp&mode=crop&width=600&height=450&quality=80'
  },
  {
    name: 'Pink News',
    imageUrl: 'https://www.contiki.com/media/rrohm4pb/contiki-logo-as-seen-in-white-bg-pink-news.jpg?center=0.5%2C0.5&format=webp&mode=crop&width=600&height=450&quality=80'
  },
  {
    name: 'Conde Nast',
    imageUrl: 'https://www.contiki.com/media/otglhgnv/contiki-logo-as-seen-in-white-bg-conde-nast.jpg?center=0.5%2C0.5&format=webp&mode=crop&width=600&height=450&quality=80'
  },
  {
    name: 'Unilad',
    imageUrl: 'https://www.contiki.com/media/dzhhv4a5/contiki-logo-as-seen-in-white-bg-unilad.jpg?center=0.5%2C0.5&format=webp&mode=crop&width=600&height=450&quality=80'
  },
  {
    name: 'Cosmopolitan',
    imageUrl: 'https://www.contiki.com/media/jckphrp4/contiki-logo-as-seen-in-white-bg-cosmopolitan.jpg?center=0.5%2C0.5&format=webp&mode=crop&width=600&height=450&quality=80'
  },
  {
    name: 'Glamour',
    imageUrl: 'https://www.contiki.com/media/jzgppcph/contiki-logo-as-seen-in-white-bg-glamour.jpg?center=0.5%2C0.5&format=webp&mode=crop&width=600&height=450&quality=80'
  },
  {
    name: 'Refinery29',
    imageUrl: 'https://www.contiki.com/media/y05e5ega/contiki-logo-as-seen-in-white-bg-refinery29.jpg?center=0.5%2C0.5&format=webp&mode=crop&width=600&height=450&quality=80'
  }
];

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
    slidesToSlide: 1
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3,
    slidesToSlide: 1
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2,
    slidesToSlide: 1
  }
};

const AsSeenIn = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">As seen in 👀</h2>
        </div>
        
        <div className="max-w-6xl mx-auto">
          <Carousel
            responsive={responsive}
            infinite={true}
            autoPlay={true}
            autoPlaySpeed={3000}
            keyBoardControl={true}
            customTransition="all .5"
            transitionDuration={500}
            containerClass="carousel-container"
            removeArrowOnDeviceType={["tablet", "mobile"]}
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item-padding-40-px"
          >
            {logos.map((logo, index) => (
              <div key={index} className="px-2">
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                  <img
                    src={logo.imageUrl}
                    alt={logo.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default AsSeenIn;


import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const destinations = [
  {
    name: "Europe",
    image: "https://www.contiki.com/media/jfzlex0q/colosseum-destiantion-image.jpg?center=0.44179409763085564%2C0.5350877192982456&format=webp&height=600&mode=crop&quality=80&width=1920",
    link: "/tours?region=europe"
  },
  {
    name: "Asia",
    image: "https://www.contiki.com/media/smpji2l0/group-of-young-people-riding-bikes-vietnam-road.jpg?center=0.6161542586835618%2C0.4987480082915613&format=webp&height=616&mode=crop&quality=80&width=720",
    link: "/tours?region=asia"
  },
  {
    name: "USA & Canada",
    image: "https://images.unsplash.com/photo-1517935706615-2717063c2225?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    link: "/tours?region=north-america"
  },
  {
    name: "Australia",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    link: "/tours?region=australia"
  },
  {
    name: "Africa",
    image: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    link: "/tours?region=africa"
  },
  {
    name: "New Zealand",
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    link: "/tours?region=new-zealand"
  },
  {
    name: "Latin America",
    image: "https://images.unsplash.com/photo-1531065208531-4036c0dba3c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    link: "/tours?region=latin-america"
  },
  {
    name: "See all trips",
    image: "https://www.contiki.com/media/be2hvn55/find-your-adventure.jpg?center=0.5%2C0.5&format=webp&height=600&mode=crop&quality=80&width=1200",
    link: "/tours"
  }
];

const TravelDestinationsGrid = () => {
  useEffect(() => {
    console.debug('[TravelDestinationsGrid] mounted');
  }, []);

  return (
    <section className="w-full py-16 bg-white">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">Trending destinations</h2>
          <p className="text-lg text-gray-600">Trips for 18–35s across 6 continents.</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {destinations.map((destination, index) => (
            <Link 
              key={index} 
              to={destination.link}
              className="relative h-[160px] overflow-hidden rounded-lg group hover:scale-[1.02] transition-transform duration-300"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{ backgroundImage: `url(${destination.image})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-0 left-0 w-full p-4">
                <h3 className="text-white text-lg font-medium text-center">{destination.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TravelDestinationsGrid;

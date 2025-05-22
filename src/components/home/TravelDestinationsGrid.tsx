
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const destinations = [
  {
    name: "Europe",
    image: "https://source.unsplash.com/random/400x300/?europe",
    link: "/tours?region=europe"
  },
  {
    name: "Asia",
    image: "https://source.unsplash.com/random/400x300/?asia",
    link: "/tours?region=asia"
  },
  {
    name: "USA & Canada",
    image: "https://source.unsplash.com/random/400x300/?usa,canada",
    link: "/tours?region=north-america"
  },
  {
    name: "Australia",
    image: "https://source.unsplash.com/random/400x300/?australia",
    link: "/tours?region=australia"
  },
  {
    name: "Africa",
    image: "https://source.unsplash.com/random/400x300/?africa",
    link: "/tours?region=africa"
  },
  {
    name: "New Zealand",
    image: "https://source.unsplash.com/random/400x300/?new-zealand",
    link: "/tours?region=new-zealand"
  },
  {
    name: "Latin America",
    image: "https://source.unsplash.com/random/400x300/?latin-america",
    link: "/tours?region=latin-america"
  },
  {
    name: "See all trips",
    image: "https://source.unsplash.com/random/400x300/?world",
    link: "/tours"
  }
];

const TravelDestinationsGrid = () => {
  useEffect(() => {
    console.debug('[TravelDestinationsGrid] mounted');
  }, []);

  return (
    <section className="w-full py-8 bg-white">
      <div className="container">
        <div className="text-center mb-6">
          <h2 className="text-xl font-bold mb-1">Trending destinations</h2>
          <p className="text-sm text-gray-600">Trips for 18–35s across 6 continents.</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {destinations.map((destination, index) => (
            <Link 
              key={index} 
              to={destination.link}
              className="relative h-[120px] overflow-hidden rounded-md group hover:scale-[1.02] transition-transform duration-300"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{ backgroundImage: `url(${destination.image})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-0 left-0 w-full p-2">
                <h3 className="text-white text-sm font-medium text-center">{destination.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TravelDestinationsGrid;

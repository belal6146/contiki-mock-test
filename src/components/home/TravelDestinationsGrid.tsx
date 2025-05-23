
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const destinations = [
  {
    name: "Europe",
    image: "https://source.unsplash.com/random/400x300/?europe,eiffel",
    link: "/tours?region=europe"
  },
  {
    name: "Asia",
    image: "https://source.unsplash.com/random/400x300/?asia,taj-mahal",
    link: "/tours?region=asia"
  },
  {
    name: "USA & Canada",
    image: "https://source.unsplash.com/random/400x300/?canada,mountains",
    link: "/tours?region=north-america"
  },
  {
    name: "Australia",
    image: "https://source.unsplash.com/random/400x300/?australia,uluru",
    link: "/tours?region=australia"
  },
  {
    name: "Africa",
    image: "https://source.unsplash.com/random/400x300/?africa,safari",
    link: "/tours?region=africa"
  },
  {
    name: "New Zealand",
    image: "https://source.unsplash.com/random/400x300/?new-zealand,river",
    link: "/tours?region=new-zealand"
  },
  {
    name: "Latin America",
    image: "https://source.unsplash.com/random/400x300/?latin-america,mountains",
    link: "/tours?region=latin-america"
  },
  {
    name: "See all trips",
    image: "https://source.unsplash.com/random/400x300/?travel,beach",
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

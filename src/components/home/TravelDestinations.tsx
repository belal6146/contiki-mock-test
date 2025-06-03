import React from 'react';
import { Link } from 'react-router-dom';

const destinations = [
  {
    name: 'Europe',
    imageUrl: 'https://www.contiki.com/media/hwddpgoo/santorini-greece.jpg?center=0.5%2C0.5&format=webp&mode=crop&width=600&height=600&quality=80',
    link: '/en-gb/destinations/europe'
  },
  {
    name: 'Asia',
    imageUrl: 'https://www.contiki.com/media/0aqfpa3z/thailand-boats-blue-sea-cleark-sky.jpg?center=0.5429498776829141%2C0.4949910485235911&format=webp&mode=crop&width=600&height=600&quality=80',
    link: '/en-gb/destinations/asia'
  },
  {
    name: 'New Zealand',
    imageUrl: 'https://www.contiki.com/media/lydpfklj/bungee-jumping-of-bridge-new-zealand-074nwzd2014.jpg?center=0.595794648418738%2C0.47619724149666776&format=webp&mode=crop&width=600&height=600&quality=80',
    link: '/en-gb/destinations/new-zealand'
  },
  {
    name: 'USA & Canada',
    imageUrl: 'https://www.contiki.com/media/52rnops0/trio-of-travelers-sitting-near-lake-in-canada.jpg?center=0.5%2C0.5&format=webp&mode=crop&width=600&height=600&quality=80',
    link: '/en-gb/destinations/usa-canada'
  },
  {
    name: 'Africa & The Middle East',
    imageUrl: 'https://www.contiki.com/media/ybubztox/people-enjoying-a-safari-looking-at-elephants.jpg?center=0.6695362852875208%2C0.5037560438168477&format=webp&mode=crop&width=600&height=600&quality=80',
    link: '/en-gb/destinations/africa-the-middle-east'
  },
  {
    name: 'Latin America',
    imageUrl: 'https://www.contiki.com/media/g2mmyrhg/machu-picchu-peru.jpg?center=0.5%2C0.5&format=webp&mode=crop&width=600&height=600&quality=80',
    link: '/en-gb/destinations/latin-america'
  },
  {
    name: 'Australia',
    imageUrl: 'https://www.contiki.com/media/oqdj2e5r/australian-outback.jpg?center=0.5%2C0.5&format=webp&mode=crop&width=600&height=600&quality=80',
    link: '/en-gb/destinations/australia'
  },
  {
    name: 'See all trips',
    imageUrl: 'https://www.contiki.com/media/fzbeuyvx/iris-100.jpg?center=0.5%2C0.5&format=webp&mode=crop&width=600&height=600&quality=80',
    link: '/en-gb/search'
  }
];

const TravelDestinations = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Title Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Travel destinations</h2>
          <p className="text-gray-600 text-lg">Trips for 18-35s across 6 continents</p>
        </div>

        {/* Square Tiles Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto">
          {destinations.map((destination, index) => (
            <Link
              key={index}
              to={destination.link}
              className="group relative aspect-square overflow-hidden rounded-lg"
            >
              <div className="absolute inset-0">
                <img
                  src={destination.imageUrl}
                  alt={destination.name}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 w-full p-4">
                <p className="text-white text-lg font-medium text-center">{destination.name}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TravelDestinations; 
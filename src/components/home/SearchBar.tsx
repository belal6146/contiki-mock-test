import React, { useState } from 'react';
import { Search, MapPin, Calendar } from 'lucide-react';

const SearchBar = () => {
  const [destination, setDestination] = useState('');
  const [activity, setActivity] = useState('');
  const [date, setDate] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Search:', { destination, activity, date });
  };

  return (
    <div className="w-[90%] max-w-[1400px] mx-auto bg-white rounded-full shadow-lg p-4">
      <form onSubmit={handleSearch} className="flex flex-col md:flex-row items-center gap-4">
        {/* WHERE */}
        <div className="flex-1 w-full md:w-auto flex items-center px-6 py-3 md:border-r border-gray-200">
          <div className="relative flex items-center w-full">
            <MapPin className="absolute left-0 text-gray-600 w-5 h-5" />
            <input
              type="text"
              placeholder="Where do you want to go?"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full h-full pl-8 pr-2 bg-transparent focus:outline-none text-gray-800 placeholder-gray-500 text-base font-medium"
            />
          </div>
        </div>

        {/* WHAT */}
        <div className="flex-1 w-full md:w-auto flex items-center px-6 py-3 md:border-r border-gray-200">
          <div className="relative flex items-center w-full">
            <Search className="absolute left-0 text-gray-600 w-5 h-5" />
            <input
              type="text"
              placeholder="What do you want to see?"
              value={activity}
              onChange={(e) => setActivity(e.target.value)}
              className="w-full h-full pl-8 pr-2 bg-transparent focus:outline-none text-gray-800 placeholder-gray-500 text-base font-medium"
            />
          </div>
        </div>

        {/* WHEN */}
        <div className="flex-1 w-full md:w-auto flex items-center px-6 py-3">
          <div className="relative flex items-center w-full">
            <Calendar className="absolute left-0 text-gray-600 w-5 h-5" />
            <input
              type="text"
              placeholder="When do you want to go?"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full h-full pl-8 pr-2 bg-transparent focus:outline-none text-gray-800 placeholder-gray-500 text-base font-medium"
            />
          </div>
        </div>

        {/* Search Button */}
        <button
          type="submit"
          className="w-full md:w-auto bg-[#CCFF00] hover:bg-[#b8e600] text-black font-bold py-3 px-8 rounded-full transition-colors duration-200 uppercase tracking-wider text-sm whitespace-nowrap"
          aria-label="Search"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;

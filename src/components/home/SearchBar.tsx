
import React, { useState } from 'react';
import { Search, MapPin, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';

const SearchBar = () => {
  const [destination, setDestination] = useState('');
  const [activity, setActivity] = useState('');
  const [date, setDate] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Search:', { destination, activity, date });
  };

  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-full p-1.5 shadow-2xl max-w-6xl mx-auto">
      <form onSubmit={handleSearch} className="flex items-center gap-0 h-16">
        {/* WHERE */}
        <div className="flex-1 px-8 border-r border-gray-300">
          <div className="relative">
            <MapPin className="absolute left-0 top-1/2 transform -translate-y-1/2 text-gray-600 w-5 h-5" />
            <input
              type="text"
              placeholder="Where do you want to go?"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-72 h-10 pl-8 pr-2 py-4 border-2 border-gray-300 bg-transparent focus:outline-none text-gray-800 placeholder-gray-600 text-base font-medium rounded-full"
            />
          </div>
        </div>

        {/* WHAT */}
        <div className="flex-1 px-8 border-r border-gray-300">
          <div className="relative">
            <Search className="absolute left-0 top-1/2 transform -translate-y-1/2 text-gray-600 w-5 h-5" />
            <input
              type="text"
              placeholder="What do you want to see?"
              value={activity}
              onChange={(e) => setActivity(e.target.value)}
              className="w-full pl-8 pr-2 py-4 border-0 bg-transparent focus:outline-none text-gray-800 placeholder-gray-600 text-base font-medium"
            />
          </div>
        </div>

        {/* WHEN */}
        <div className="flex-1 px-8">
          <div className="relative">
            <Calendar className="absolute left-0 top-1/2 transform -translate-y-1/2 text-gray-600 w-5 h-5" />
            <input
              type="text"
              placeholder="When do you want to go?"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full pl-8 pr-2 py-4 border-0 bg-transparent focus:outline-none text-gray-800 placeholder-gray-600 text-base font-medium"
            />
          </div>
        </div>

        {/* Search Button */}
        <div className="flex-shrink-0 pl-2 pr-1">
          <button
            type="submit"
            className="p-3 bg-[#CCFF00] hover:bg-[#b8e600] text-black rounded-full transition-all duration-200 transform hover:scale-105 shadow-lg h-14 w-14 flex items-center justify-center"
          >
            <Search className="h-6 w-6" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;

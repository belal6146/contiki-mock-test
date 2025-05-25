
import React, { useState } from 'react';
import { Search, MapPin, Calendar, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [destination, setDestination] = useState('');
  const [month, setMonth] = useState('');
  const [travelers, setTravelers] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Search:', { searchTerm, destination, month, travelers });
  };

  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-full p-2 shadow-2xl max-w-4xl mx-auto">
      <form onSubmit={handleSearch} className="flex items-center gap-0 h-14">
        {/* WHERE */}
        <div className="flex-1 px-6 border-r border-gray-200">
          <div className="relative">
            <MapPin className="absolute left-0 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Where do you want to go?"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full pl-6 pr-2 py-2 border-0 bg-transparent focus:outline-none text-black placeholder-gray-500 text-sm font-medium"
            />
          </div>
        </div>

        {/* WHAT */}
        <div className="flex-1 px-6 border-r border-gray-200">
          <div className="relative">
            <Calendar className="absolute left-0 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="What do you want to see?"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-6 pr-2 py-2 border-0 bg-transparent focus:outline-none text-black placeholder-gray-500 text-sm font-medium"
            />
          </div>
        </div>

        {/* WHEN */}
        <div className="flex-1 px-6">
          <div className="relative">
            <Calendar className="absolute left-0 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="When do you want to go?"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="w-full pl-6 pr-2 py-2 border-0 bg-transparent focus:outline-none text-black placeholder-gray-500 text-sm font-medium"
            />
          </div>
        </div>

        {/* Search Button */}
        <div className="flex-shrink-0 pl-2">
          <Button
            type="submit"
            className="bg-[#CCFF00] hover:bg-[#b8e600] text-black font-bold px-8 py-3 rounded-full text-sm uppercase tracking-wider transition-all duration-200 transform hover:scale-105 shadow-lg h-12 flex items-center gap-2"
          >
            SEARCH
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;

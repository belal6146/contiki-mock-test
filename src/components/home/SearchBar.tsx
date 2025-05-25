
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
    <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-2xl max-w-4xl mx-auto">
      <form onSubmit={handleSearch} className="flex items-center gap-0 h-16">
        {/* WHERE */}
        <div className="flex-1 px-6 border-r border-gray-200">
          <label className="block text-xs font-bold text-gray-600 mb-1 uppercase tracking-wider">
            WHERE
          </label>
          <div className="relative">
            <MapPin className="absolute left-0 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Destination, country or region"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full pl-6 pr-2 py-1 border-0 bg-transparent focus:outline-none text-black placeholder-gray-500 text-sm"
            />
          </div>
        </div>

        {/* WHEN */}
        <div className="flex-1 px-6 border-r border-gray-200">
          <label className="block text-xs font-bold text-gray-600 mb-1 uppercase tracking-wider">
            WHEN
          </label>
          <div className="relative">
            <Calendar className="absolute left-0 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <select
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="w-full pl-6 pr-2 py-1 border-0 bg-transparent focus:outline-none text-black appearance-none text-sm cursor-pointer"
            >
              <option value="">Any month</option>
              <option value="jan">January 2024</option>
              <option value="feb">February 2024</option>
              <option value="mar">March 2024</option>
              <option value="apr">April 2024</option>
              <option value="may">May 2024</option>
              <option value="jun">June 2024</option>
              <option value="jul">July 2024</option>
              <option value="aug">August 2024</option>
              <option value="sep">September 2024</option>
              <option value="oct">October 2024</option>
              <option value="nov">November 2024</option>
              <option value="dec">December 2024</option>
            </select>
          </div>
        </div>

        {/* WHO */}
        <div className="flex-1 px-6">
          <label className="block text-xs font-bold text-gray-600 mb-1 uppercase tracking-wider">
            WHO
          </label>
          <div className="relative">
            <Users className="absolute left-0 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <select
              value={travelers}
              onChange={(e) => setTravelers(e.target.value)}
              className="w-full pl-6 pr-2 py-1 border-0 bg-transparent focus:outline-none text-black appearance-none text-sm cursor-pointer"
            >
              <option value="">Travelers</option>
              <option value="1">Just me</option>
              <option value="2">2 travelers</option>
              <option value="3">3 travelers</option>
              <option value="4">4+ travelers</option>
            </select>
          </div>
        </div>

        {/* Search Button */}
        <div className="flex-shrink-0 pl-4">
          <Button
            type="submit"
            className="bg-[#CCFF00] hover:bg-[#b8e600] text-black font-bold px-8 py-3 rounded-lg text-sm uppercase tracking-wider transition-all duration-200 transform hover:scale-105 shadow-lg h-12 flex items-center gap-2"
          >
            <Search className="w-4 h-4" />
            SEARCH TRIPS
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;


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
      <form onSubmit={handleSearch} className="space-y-4 lg:space-y-0 lg:flex lg:items-end lg:gap-4">
        {/* Where */}
        <div className="flex-1">
          <label className="block text-sm font-bold text-black mb-2 uppercase tracking-wide">
            Where
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Destination, country or region"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#CCFF00] focus:border-transparent text-black placeholder-gray-500"
            />
          </div>
        </div>

        {/* When */}
        <div className="flex-1">
          <label className="block text-sm font-bold text-black mb-2 uppercase tracking-wide">
            When
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#CCFF00] focus:border-transparent text-black appearance-none bg-white"
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

        {/* Who */}
        <div className="flex-1">
          <label className="block text-sm font-bold text-black mb-2 uppercase tracking-wide">
            Who
          </label>
          <div className="relative">
            <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select
              value={travelers}
              onChange={(e) => setTravelers(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#CCFF00] focus:border-transparent text-black appearance-none bg-white"
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
        <div className="lg:flex-shrink-0">
          <Button
            type="submit"
            className="w-full lg:w-auto bg-[#CCFF00] hover:bg-[#b8e600] text-black font-bold px-8 py-3 rounded-lg text-lg uppercase tracking-wide transition-all duration-200 transform hover:scale-105"
          >
            <Search className="w-5 h-5 mr-2" />
            SEARCH TRIPS
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;

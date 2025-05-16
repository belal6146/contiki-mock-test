
import React, { useState, FormEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const navigate = useNavigate();
  const [destination, setDestination] = useState<string>('');
  const [duration, setDuration] = useState<string>('');
  const [budget, setBudget] = useState<string>('');

  useEffect(() => {
    console.debug('[SearchBar] mounted');
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    console.debug('[SearchBar] submit', { destination, duration, budget });
    
    // Build query params
    const params = new URLSearchParams();
    if (destination) params.append('destination', destination);
    if (duration) params.append('duration', duration);
    if (budget) params.append('budget', budget);
    
    // Navigate to the search results page
    navigate(`/tours?${params.toString()}`);
  };

  return (
    <section className="bg-white py-8">
      <div className="container">
        <div className="max-w-5xl mx-auto -mt-24 relative z-20">
          <div className="bg-white rounded-lg shadow-xl p-6 md:p-8">
            <h2 className="text-2xl font-bold text-primary mb-6 text-center">Find Your Perfect Trip</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6 md:space-y-0 md:grid md:grid-cols-12 md:gap-4">
              <div className="md:col-span-4">
                <label htmlFor="destination" className="block text-sm font-medium text-gray-700 mb-1">
                  Where do you want to go?
                </label>
                <select
                  id="destination"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent"
                >
                  <option value="">All Destinations</option>
                  <option value="europe">Europe</option>
                  <option value="asia">Asia</option>
                  <option value="latin-america">Latin America</option>
                  <option value="australia">Australia & New Zealand</option>
                  <option value="north-america">USA & Canada</option>
                  <option value="africa">Africa & Middle East</option>
                </select>
              </div>
              
              <div className="md:col-span-3">
                <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1">
                  Trip Duration
                </label>
                <select
                  id="duration"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent"
                >
                  <option value="">Any Duration</option>
                  <option value="short">3-5 days</option>
                  <option value="medium">6-12 days</option>
                  <option value="long">13+ days</option>
                </select>
              </div>
              
              <div className="md:col-span-3">
                <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-1">
                  Budget Range
                </label>
                <select
                  id="budget"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent"
                >
                  <option value="">Any Budget</option>
                  <option value="economy">Under $1,500</option>
                  <option value="standard">$1,500 - $3,000</option>
                  <option value="premium">$3,000+</option>
                </select>
              </div>
              
              <div className="md:col-span-2 flex items-end">
                <button 
                  type="submit" 
                  className="w-full bg-accent hover:bg-accent/90 text-white font-medium py-3 px-4 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent"
                >
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchBar;

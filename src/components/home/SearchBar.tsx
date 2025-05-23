import React, { useState, FormEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Calendar, Users } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const SearchBar = () => {
  const navigate = useNavigate();
  const [destination, setDestination] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [travelers, setTravelers] = useState<string>('1');
  const [errors, setErrors] = useState<{
    destination?: boolean;
    date?: boolean;
    travelers?: boolean;
  }>({});

  useEffect(() => {
    console.debug('[SearchBar] mounted');
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    console.debug('[SearchBar] submit', { destination, date, travelers });
    
    // Build query params
    const params = new URLSearchParams();
    if (destination) params.append('destination', destination);
    if (date) params.append('date', date);
    if (travelers) params.append('travelers', travelers);
    
    // Navigate to the search results page
    navigate(`/tours?${params.toString()}`);
  };

  return (
    <section className="bg-white py-8">
      <div className="container">
        <div className="max-w-5xl mx-auto -mt-24 relative z-20">
          <div className="bg-white rounded-lg shadow-xl p-6 md:p-8">
            <h2 className="text-2xl font-bold text-primary mb-6 text-center font-montserrat">
              Find Your Perfect Trip
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6 md:space-y-0 md:grid md:grid-cols-12 md:gap-4">
              {/* Destination Input */}
              <div className="md:col-span-4">
                <label htmlFor="destination" className="block text-sm font-medium text-gray-700 mb-1 font-montserrat">
                  Where do you want to go?
                </label>
                <div className="relative">
                  <Input
                    id="destination"
                    type="text"
                    placeholder="Where to?"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className={cn(
                      "pl-10 w-full rounded-md",
                      "focus-visible:ring-accent focus-visible:ring-2",
                      errors.destination ? "border-red-500" : ""
                    )}
                    aria-invalid={errors.destination ? "true" : "false"}
                  />
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
              </div>
              
              {/* Date Input */}
              <div className="md:col-span-4">
                <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1 font-montserrat">
                  When are you traveling?
                </label>
                <div className="relative">
                  <Input
                    id="date"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className={cn(
                      "pl-10 w-full rounded-md",
                      "focus-visible:ring-accent focus-visible:ring-2",
                      errors.date ? "border-red-500" : ""
                    )}
                    aria-invalid={errors.date ? "true" : "false"}
                  />
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
              </div>
              
              {/* Travelers Input */}
              <div className="md:col-span-2">
                <label htmlFor="travelers" className="block text-sm font-medium text-gray-700 mb-1 font-montserrat">
                  Travelers
                </label>
                <div className="relative">
                  <Input
                    id="travelers"
                    type="number"
                    min="1"
                    value={travelers}
                    onChange={(e) => setTravelers(e.target.value)}
                    className={cn(
                      "pl-10 w-full rounded-md",
                      "focus-visible:ring-accent focus-visible:ring-2",
                      errors.travelers ? "border-red-500" : ""
                    )}
                    aria-invalid={errors.travelers ? "true" : "false"}
                  />
                  <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
              </div>
              
              {/* Search Button */}
              <div className="md:col-span-2 flex items-end">
                <Button 
                  type="submit" 
                  className="w-full bg-accent hover:bg-accent/90 text-primary font-medium py-4 px-4 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-accent"
                >
                  Search Trips
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchBar;

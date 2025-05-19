
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, MapPin, Search, Users } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

const Hero = () => {
  const navigate = useNavigate();
  const [destination, setDestination] = useState<string>("");
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [travelers, setTravelers] = useState<number>(1);

  useEffect(() => {
    console.debug('[Hero] mounted');
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.debug('[Hero] search', { destination, date, travelers });
    
    // Build query params
    const params = new URLSearchParams();
    if (destination) params.append('destination', destination);
    if (date) params.append('date', format(date, 'yyyy-MM-dd'));
    params.append('travelers', travelers.toString());
    
    // Navigate to the search results page
    navigate(`/tours?${params.toString()}`);
  };

  return (
    <section className="relative bg-primary h-screen md:h-screen h-[60vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center z-0"
        style={{ backgroundImage: "url('https://www.contiki.com/assets/1200x800/image/croatia/2022_croatia_isle_of_hvar_guapa_beach_club_party_contiki_group_sunset_07.jpg')" }}
        aria-hidden="true"
      />
      
      {/* Gradient Overlay - Stops at exactly 50% */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-transparent z-10"
        style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.8) 20%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0) 80%)' }}
        aria-hidden="true"
      />

      {/* Content Container */}
      <div className="container relative z-20 px-6 md:px-8 flex flex-col items-center justify-center">
        <div className="text-center mb-8">
          <h1 className="font-montserrat font-bold text-5xl md:text-7xl text-white leading-tight tracking-wide">
            ADVENTURE AWAITS
          </h1>
          <p className="font-montserrat font-normal text-lg md:text-2xl text-white mt-4">
            Discover the world with us
          </p>
        </div>

        {/* Search Form */}
        <form 
          onSubmit={handleSubmit}
          className="bg-white rounded-lg p-6 shadow-lg max-w-4xl w-full mx-auto"
          aria-label="Trip search form"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Destination */}
            <div className="space-y-2">
              <label htmlFor="destination" className="text-sm font-medium text-gray-700">
                Destination
              </label>
              <div className="relative">
                <Input
                  id="destination"
                  placeholder="Where to?"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full pl-10"
                  type="text"
                  aria-label="Enter destination"
                />
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
            </div>

            {/* Date */}
            <div className="space-y-2">
              <label htmlFor="date" className="text-sm font-medium text-gray-700">
                Date
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    id="date"
                    aria-label="Select travel date"
                    className={cn(
                      "w-full pl-10 text-left font-normal relative",
                      !date && "text-gray-400"
                    )}
                  >
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <span className="block truncate">
                      {date ? format(date, "PPP") : "Select date"}
                    </span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="center">
                  <CalendarComponent
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Travelers */}
            <div className="space-y-2">
              <label htmlFor="travelers" className="text-sm font-medium text-gray-700">
                Travelers
              </label>
              <div className="relative">
                <Input
                  id="travelers"
                  type="number"
                  min="1"
                  max="20"
                  value={travelers}
                  onChange={(e) => setTravelers(parseInt(e.target.value) || 1)}
                  className="w-full pl-10"
                  aria-label="Number of travelers"
                />
                <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
            </div>
          </div>

          {/* Search Button */}
          <div className="mt-6">
            <Button 
              type="submit" 
              className="w-full bg-accent text-primary hover:bg-accent/90 font-medium px-6 py-4 rounded-lg transition-colors duration-300"
              aria-label="Search trips"
            >
              Search Trips
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Hero;

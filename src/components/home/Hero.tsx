
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Users } from 'lucide-react';
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

  React.useEffect(() => {
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
    <section className="relative w-full bg-primary h-[500px] md:h-[600px] lg:h-[700px] flex items-center justify-center">
      {/* Background Image */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center z-0"
        style={{ backgroundImage: "url('https://www.contiki.com/assets/1200x800/image/croatia/2022_croatia_isle_of_hvar_guapa_beach_club_party_contiki_group_sunset_07.jpg')" }}
      />
      
      {/* Gradient Overlay */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-primary/80 to-transparent z-10"
      />

      {/* Content Container */}
      <div className="container relative z-20 px-4 md:px-8">
        <div className="text-center mb-8">
          <h1 className="font-montserrat font-bold text-4xl md:text-5xl lg:text-6xl text-white mb-4">
            ADVENTURE AWAITS
          </h1>
          <p className="font-montserrat font-normal text-lg md:text-xl lg:text-2xl text-white">
            Discover the world with us
          </p>
        </div>

        {/* Search Form */}
        <form 
          onSubmit={handleSubmit}
          className="bg-white rounded-lg p-4 md:p-6 shadow-lg max-w-3xl mx-auto"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Destination */}
            <div className="space-y-2">
              <label htmlFor="destination" className="text-sm font-medium text-primary">
                Destination
              </label>
              <Input
                id="destination"
                placeholder="Where to?"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full"
                type="text"
              />
            </div>

            {/* Date */}
            <div className="space-y-2">
              <label htmlFor="date" className="text-sm font-medium text-primary">
                Date
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full flex items-center justify-between text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    {date ? format(date, "PPP") : "Select date"}
                    <Calendar className="ml-auto h-4 w-4 opacity-50" />
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
              <label htmlFor="travelers" className="text-sm font-medium text-primary">
                Travelers
              </label>
              <div className="flex items-center">
                <Input
                  id="travelers"
                  type="number"
                  min="1"
                  max="20"
                  value={travelers}
                  onChange={(e) => setTravelers(parseInt(e.target.value) || 1)}
                  className="w-full"
                />
                <Users className="ml-2 h-5 w-5 text-muted-foreground" />
              </div>
            </div>
          </div>

          {/* Search Button */}
          <div className="mt-6">
            <Button 
              type="submit" 
              className="w-full bg-secondary hover:bg-secondary/90 text-white"
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

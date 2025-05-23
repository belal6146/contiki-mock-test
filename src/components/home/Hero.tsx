
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Search, Calendar, ChevronDown } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { trackEvent } from '@/lib/analytics';

const Hero = () => {
  const navigate = useNavigate();
  const [destination, setDestination] = useState<string>("");
  const [activity, setActivity] = useState<string>("");
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [isLoaded, setIsLoaded] = useState(false);

  // Use the uploaded hero image
  const heroImageUrl = "/lovable-uploads/cfabc9ea-e3e5-4e31-b5f1-bc5dc8c9e5ea.png";

  useEffect(() => {
    console.debug('[Hero] mounted');
    
    // Preload hero image
    const img = new Image();
    img.src = heroImageUrl;
    img.onload = () => {
      setIsLoaded(true);
      console.debug('[Hero] imageLoaded');
      trackEvent('hero_image_loaded', { status: 'success' });
    };
    img.onerror = () => {
      setIsLoaded(true);
      console.debug('[Hero] image failed to load');
      trackEvent('hero_image_loaded', { status: 'error' });
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.debug('[Hero] search', { destination, activity, date });
    trackEvent('search_submitted', { destination, activity, date: date ? format(date, 'yyyy-MM-dd') : undefined });
    
    // Build query params
    const params = new URLSearchParams();
    if (destination) params.append('destination', destination);
    if (activity) params.append('activity', activity);
    if (date) params.append('date', format(date, 'yyyy-MM-dd'));
    
    navigate(`/tours?${params.toString()}`);
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Hero Background Image */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center z-0"
        style={{ 
          backgroundImage: `url(${heroImageUrl})`,
        }}
        aria-hidden="true"
      />
      
      {/* Gradient Overlay */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/40 z-10"
        aria-hidden="true"
      />

      {/* Content Container */}
      <div className="container relative z-20 px-6 md:px-8 flex flex-col items-center justify-center">
        {/* Last Minute Deals Banner */}
        <div className={cn(
          "text-center mb-8 transform transition-all duration-700 ease-out",
          isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        )}>
          <div className="mb-6">
            <h1 className="font-black text-6xl md:text-8xl text-white leading-none tracking-tight drop-shadow-2xl mb-2">
              <span className="block">LAST MINUTE</span>
              <span className="block text-[#CCFF00] stroke-black" style={{ WebkitTextStroke: '2px black' }}>DEALS</span>
            </h1>
            <p className="font-semibold text-xl md:text-2xl text-white mt-4 drop-shadow-lg">
              Save BIG on trips departing soon
            </p>
          </div>
          
          {/* View Deals Button */}
          <Button 
            className="bg-[#CCFF00] text-black hover:bg-[#CCFF00]/90 font-bold px-8 py-4 rounded-lg text-lg mb-12 shadow-lg"
            onClick={() => navigate('/deals')}
          >
            VIEW DEALS
          </Button>
        </div>

        {/* Search Form */}
        <form 
          onSubmit={handleSubmit}
          className={cn(
            "bg-white/95 backdrop-blur-sm rounded-lg p-6 shadow-2xl max-w-6xl w-full mx-auto transition-all duration-1000 ease-out transform",
            isLoaded ? "translate-y-0 opacity-100 scale-100" : "translate-y-10 opacity-0 scale-95"
          )}
          aria-label="Trip search form"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Where do you want to go? */}
            <div className="space-y-2">
              <div className="relative">
                <Input
                  placeholder="Where do you want to go?"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full pl-10 h-12 border-b-2 border-red-500 border-t-0 border-l-0 border-r-0 rounded-none bg-transparent focus:border-red-500 focus:ring-0"
                  type="text"
                  aria-label="Enter destination"
                />
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
            </div>

            {/* What do you want to see? */}
            <div className="space-y-2">
              <Select value={activity} onValueChange={setActivity}>
                <SelectTrigger className="w-full h-12 border-b-2 border-red-500 border-t-0 border-l-0 border-r-0 rounded-none bg-transparent focus:border-red-500 focus:ring-0">
                  <SelectValue placeholder="What do you want to see?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="culture">Culture & History</SelectItem>
                  <SelectItem value="adventure">Adventure</SelectItem>
                  <SelectItem value="nightlife">Nightlife</SelectItem>
                  <SelectItem value="nature">Nature</SelectItem>
                  <SelectItem value="food">Food & Drink</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* When do you want to go? */}
            <div className="space-y-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    aria-label="Select travel date"
                    className={cn(
                      "w-full h-12 text-left font-normal relative border-b-2 border-red-500 border-t-0 border-l-0 border-r-0 rounded-none bg-transparent hover:bg-transparent focus:border-red-500 focus:ring-0",
                      !date && "text-gray-400"
                    )}
                  >
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <span className="block truncate pl-8">
                      {date ? format(date, "PPP") : "When do you want to go?"}
                    </span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="center">
                  <CalendarComponent
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                    className="p-3"
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Search Button */}
            <div className="flex items-end">
              <Button 
                type="submit" 
                className="w-full bg-[#CCFF00] text-black hover:bg-[#CCFF00]/90 font-bold px-6 py-3 rounded-lg h-12 transition-all duration-300"
                aria-label="Search trips"
              >
                SEARCH
              </Button>
            </div>
          </div>
        </form>
      </div>
      
      {/* Loading indicator */}
      {!isLoaded && (
        <div className="absolute inset-0 z-30 flex items-center justify-center bg-black">
          <div className="w-16 h-16 border-4 border-t-[#CCFF00] border-gray-700 rounded-full animate-spin"></div>
        </div>
      )}
    </section>
  );
};

export default Hero;

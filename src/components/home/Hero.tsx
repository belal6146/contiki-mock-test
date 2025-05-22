
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, MapPin, Search, Users, ChevronRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { trackEvent } from '@/lib/analytics';

// Use a more high-quality static image
const heroImageUrl = "https://source.unsplash.com/random/1920x1080/?croatia,beach,travel,adventure";

const Hero = () => {
  const navigate = useNavigate();
  const [destination, setDestination] = useState<string>("");
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [travelers, setTravelers] = useState<number>(1);
  const [isLoaded, setIsLoaded] = useState(false);
  const [parallaxOffset, setParallaxOffset] = useState(0);

  useEffect(() => {
    console.debug('[Hero] mounted');
    
    // Preload hero image
    const img = new Image();
    img.src = heroImageUrl;
    img.onload = () => {
      setIsLoaded(true);
      trackEvent('hero_image_loaded', { status: 'success' });
    };
    img.onerror = () => {
      setIsLoaded(true); // Still set loaded to true to show content
      trackEvent('hero_image_loaded', { status: 'error' });
    };
    
    // Parallax effect
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setParallaxOffset(scrollPosition * 0.2);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.debug('[Hero] search', { destination, date, travelers });
    trackEvent('search_submitted', { destination, date: date ? format(date, 'yyyy-MM-dd') : undefined, travelers });
    
    // Build query params
    const params = new URLSearchParams();
    if (destination) params.append('destination', destination);
    if (date) params.append('date', format(date, 'yyyy-MM-dd'));
    params.append('travelers', travelers.toString());
    
    // Navigate to the search results page
    navigate(`/tours?${params.toString()}`);
  };

  return (
    <section className="relative bg-primary h-screen md:h-[85vh] h-[70vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with parallax */}
      <div 
        className={cn(
          "absolute inset-0 w-full h-full bg-cover bg-center z-0 transition-all duration-1000",
          isLoaded ? "opacity-100" : "opacity-0"
        )}
        style={{ 
          backgroundImage: `url(${heroImageUrl})`,
          transform: `translateY(${parallaxOffset}px) scale(${1 + parallaxOffset * 0.0005})` 
        }}
        aria-hidden="true"
      />
      
      {/* Enhanced Gradient Overlay */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/60 to-transparent z-10"
        aria-hidden="true"
      />

      {/* Content Container */}
      <div className="container relative z-20 px-6 md:px-8 flex flex-col items-center justify-center">
        <div className={cn(
          "text-center mb-8 transform transition-all duration-700 ease-out",
          isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        )}>
          <h1 className="font-bold text-5xl md:text-7xl text-white leading-tight tracking-tight drop-shadow-lg mb-4">
            ADVENTURE <span className="text-[#CCFF00]">AWAITS</span>
          </h1>
          <p className="font-normal text-lg md:text-2xl text-white/90 mt-4 max-w-2xl mx-auto">
            Discover the world with like-minded 18-35 year olds
          </p>
          
          {/* New: Animated down indicator */}
          <div className="mt-8 animate-bounce">
            <ChevronRight className="h-8 w-8 text-white/50 rotate-90 mx-auto" />
          </div>
        </div>

        {/* Search Form with enhanced styling */}
        <form 
          onSubmit={handleSubmit}
          className={cn(
            "bg-white rounded-lg p-6 shadow-xl max-w-4xl w-full mx-auto transition-all duration-1000 ease-out transform",
            isLoaded ? "translate-y-0 opacity-100 scale-100" : "translate-y-10 opacity-0 scale-95"
          )}
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
                  className="w-full pl-10 transition-all duration-200 focus:ring-[#CCFF00] focus:border-[#CCFF00]"
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
                      "w-full pl-10 text-left font-normal relative transition-all duration-200",
                      !date && "text-gray-400",
                      "hover:bg-gray-50 focus:ring-[#CCFF00] focus:border-[#CCFF00]"
                    )}
                  >
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <span className="block truncate">
                      {date ? format(date, "PPP") : "Select date"}
                    </span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 border-[#CCFF00]/20" align="center">
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
                  className="w-full pl-10 transition-all duration-200 focus:ring-[#CCFF00] focus:border-[#CCFF00]"
                  aria-label="Number of travelers"
                />
                <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
            </div>
          </div>

          {/* Search Button with enhanced hover effect */}
          <div className="mt-6">
            <Button 
              type="submit" 
              className="w-full bg-accent text-primary hover:bg-accent/90 font-medium px-6 py-6 rounded-lg transition-all duration-300 transform hover:translate-y-[-2px] hover:shadow-lg"
              aria-label="Search trips"
            >
              <Search className="mr-2 h-5 w-5" />
              Search Trips
            </Button>
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


import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Phone, Menu, X, ChevronDown } from 'lucide-react';
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { trackEvent } from '@/lib/analytics';
import {
  destinationItems,
  travelStyleItems,
  aboutItems,
  inspiredItems
} from './header/NavigationData';
import Logo from './header/Logo';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    console.debug('[Header] mounted');
    
    // Handle body scroll lock when mobile menu is open
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    const newValue = !isMenuOpen;
    setIsMenuOpen(newValue);
    console.debug('[Header] mobile toggle', newValue);
  };

  const handleLinkClick = (label: string) => {
    console.debug('[Header] clicked', { label });
    trackEvent('navigation_click', { item: label, path: location.pathname });
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      {/* Top utility links - visible on desktop only */}
      <div className="hidden md:flex justify-end border-b border-gray-100 px-4">
        <div className="flex space-x-4 text-sm py-1">
          <Link to="/contact" className="text-gray-600 hover:text-black" onClick={() => handleLinkClick('Contact us')}>Contact us</Link>
          <Link to="/future-travel-credit" className="text-gray-600 hover:text-black" onClick={() => handleLinkClick('Future Travel Credit')}>Future Travel Credit</Link>
          <Link to="/subscribe" className="text-gray-600 hover:text-black" onClick={() => handleLinkClick('Subscribe to emails')}>Subscribe to emails</Link>
          <Link to="/login" className="text-gray-600 hover:text-black" onClick={() => handleLinkClick('Traveller log in')}>Traveller log in</Link>
          <Link to="/agent-login" className="text-gray-600 hover:text-black" onClick={() => handleLinkClick('Agent log in')}>Agent log in</Link>
        </div>
      </div>
      
      <div className="container max-w-7xl mx-auto">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0" onClick={() => handleLinkClick('Logo')} aria-label="Contiki Home">
            <svg width="150" height="28" viewBox="0 0 150 28" xmlns="http://www.w3.org/2000/svg" className="fill-black">
              <path d="M29.2347 6.35628C29.2347 6.35628 25.8889 0.00058321 15.0037 0.00058321C4.11846 0.00058321 0.772705 6.35628 0.772705 6.35628C0.772705 6.35628 -2.57329 12.7127 0.772705 19.069C4.11846 25.4252 15.0037 28 15.0037 28C15.0037 28 25.8889 25.4252 29.2347 19.069C32.5812 12.7127 29.2347 6.35628 29.2347 6.35628ZM15.0037 20.9863C11.2849 20.9863 8.27521 17.976 8.27521 14.2566C8.27521 10.5379 11.2849 7.5282 15.0037 7.5282C18.723 7.5282 21.7327 10.5379 21.7327 14.2566C21.7327 17.976 18.723 20.9863 15.0037 20.9863Z" />
              <path d="M49.8777 13.804C49.8777 18.9897 46.6846 21.5799 42.3593 21.5799C38.0339 21.5799 34.8408 18.9897 34.8408 13.804V5.06332H38.9292V13.804C38.9292 16.6272 40.1348 18.0989 42.3593 18.0989C44.5837 18.0989 45.7893 16.6272 45.7893 13.804V5.06332H49.8777V13.804Z" />
              <path d="M65.8468 15.1981H58.8967V21.2569H54.8083V5.06332H58.8967V11.716H65.8468V5.06332H69.9352V21.2569H65.8468V15.1981Z" />
              <path d="M77.5489 12.321H85.4946V15.802H77.5489V21.2569H73.4604V5.06332H86.3221V8.5443H77.5489V12.321Z" />
              <path d="M108.777 21.2553H103.557L103.327 20.3401C102.312 21.1042 100.732 21.5792 99.0981 21.5792C94.6246 21.5792 91.4961 19.0844 91.4961 13.9902C91.4961 8.89598 94.9476 5.67053 99.4211 5.67053C103.041 5.67053 106.245 7.42645 107.053 11.4606H102.734C102.249 10.0543 100.993 9.15152 99.4895 9.15152C97.2651 9.15152 95.9139 10.9704 95.9139 13.9902C95.9139 17.0099 97.2651 18.8982 99.6265 18.8982C101.062 18.8982 102.249 18.2001 102.688 17.0099H98.2844V13.9902H108.777V21.2553Z" />
              <path d="M134.124 21.2569H130.036V14.0584H123.086V21.2569H118.997V5.06332H123.086V10.5767H130.036V5.06332H134.124V21.2569Z" />
              <path d="M149.226 21.2569H138.409V5.06332H149.226V8.5443H142.498V11.2334H148.306V14.6464H142.498V17.7761H149.226V21.2569Z" />
            </svg>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center justify-center flex-1 mx-8">
            <ul className="flex space-x-2">
              <li>
                <DropdownMenu>
                  <DropdownMenuTrigger className="group focus:outline-none">
                    <div className="flex items-center uppercase text-sm font-medium tracking-wide hover:text-black text-black py-2 px-3 group-data-[state=open]:text-black relative">
                      DESTINATIONS
                      <ChevronDown className="h-4 w-4 ml-1" />
                      <span className="absolute -bottom-[1px] left-3 w-0 h-[2px] bg-[#CCFF00] transition-all duration-150 ease-in-out group-hover:w-[calc(100%-24px)] group-data-[state=open]:w-[calc(100%-24px)]"></span>
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-white shadow-lg rounded-md p-4 min-w-[220px]">
                    {destinationItems.map((item, index) => (
                      <DropdownMenuItem key={index} asChild className="p-0 focus:bg-gray-50">
                        <Link 
                          to={item.to} 
                          className="block w-full px-3 py-2 text-sm text-black hover:bg-gray-50"
                          onClick={() => handleLinkClick(item.label)}
                        >
                          {item.label}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </li>
              <li>
                <DropdownMenu>
                  <DropdownMenuTrigger className="group focus:outline-none">
                    <div className="flex items-center uppercase text-sm font-medium tracking-wide hover:text-black text-black py-2 px-3 group-data-[state=open]:text-black relative">
                      DEALS
                      <ChevronDown className="h-4 w-4 ml-1" />
                      <span className="absolute -bottom-[1px] left-3 w-0 h-[2px] bg-[#CCFF00] transition-all duration-150 ease-in-out group-hover:w-[calc(100%-24px)] group-data-[state=open]:w-[calc(100%-24px)]"></span>
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-white shadow-lg rounded-md p-4 min-w-[220px]">
                    <DropdownMenuItem asChild className="p-0 focus:bg-gray-50">
                      <Link 
                        to="/deals/current-deals" 
                        className="block w-full px-3 py-2 text-sm text-black hover:bg-gray-50"
                        onClick={() => handleLinkClick('Current Deals')}
                      >
                        Current Deals
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </li>
              <li>
                <DropdownMenu>
                  <DropdownMenuTrigger className="group focus:outline-none">
                    <div className="flex items-center uppercase text-sm font-medium tracking-wide hover:text-black text-black py-2 px-3 group-data-[state=open]:text-black relative">
                      TRAVEL STYLES
                      <ChevronDown className="h-4 w-4 ml-1" />
                      <span className="absolute -bottom-[1px] left-3 w-0 h-[2px] bg-[#CCFF00] transition-all duration-150 ease-in-out group-hover:w-[calc(100%-24px)] group-data-[state=open]:w-[calc(100%-24px)]"></span>
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-white shadow-lg rounded-md p-4 min-w-[220px]">
                    {travelStyleItems.map((item, index) => (
                      <DropdownMenuItem key={index} asChild className="p-0 focus:bg-gray-50">
                        <Link 
                          to={item.to} 
                          className="block w-full px-3 py-2 text-sm text-black hover:bg-gray-50"
                          onClick={() => handleLinkClick(item.label)}
                        >
                          {item.label}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </li>
              <li>
                <DropdownMenu>
                  <DropdownMenuTrigger className="group focus:outline-none">
                    <div className="flex items-center uppercase text-sm font-medium tracking-wide hover:text-black text-black py-2 px-3 group-data-[state=open]:text-black relative">
                      ABOUT CONTIKI
                      <ChevronDown className="h-4 w-4 ml-1" />
                      <span className="absolute -bottom-[1px] left-3 w-0 h-[2px] bg-[#CCFF00] transition-all duration-150 ease-in-out group-hover:w-[calc(100%-24px)] group-data-[state=open]:w-[calc(100%-24px)]"></span>
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-white shadow-lg rounded-md p-4 min-w-[220px]">
                    {aboutItems.map((item, index) => (
                      <DropdownMenuItem key={index} asChild className="p-0 focus:bg-gray-50">
                        <Link 
                          to={item.to} 
                          className="block w-full px-3 py-2 text-sm text-black hover:bg-gray-50"
                          onClick={() => handleLinkClick(item.label)}
                        >
                          {item.label}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </li>
              <li>
                <DropdownMenu>
                  <DropdownMenuTrigger className="group focus:outline-none">
                    <div className="flex items-center uppercase text-sm font-medium tracking-wide hover:text-black text-black py-2 px-3 group-data-[state=open]:text-black relative">
                      GET INSPIRED
                      <ChevronDown className="h-4 w-4 ml-1" />
                      <span className="absolute -bottom-[1px] left-3 w-0 h-[2px] bg-[#CCFF00] transition-all duration-150 ease-in-out group-hover:w-[calc(100%-24px)] group-data-[state=open]:w-[calc(100%-24px)]"></span>
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-white shadow-lg rounded-md p-4 min-w-[220px]">
                    {inspiredItems.map((item, index) => (
                      <DropdownMenuItem key={index} asChild className="p-0 focus:bg-gray-50">
                        <Link 
                          to={item.to} 
                          className="block w-full px-3 py-2 text-sm text-black hover:bg-gray-50"
                          onClick={() => handleLinkClick(item.label)}
                        >
                          {item.label}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </li>
            </ul>
          </nav>
          
          {/* Right side elements - search box, phone, etc. */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                <div className="bg-[#CCFF00] rounded-full p-1">
                  <Search className="h-4 w-4 text-black" />
                </div>
              </div>
              <Input 
                type="search" 
                placeholder="Aged 18-35? Find your adventure" 
                className="pr-12 text-sm w-64 h-10 border border-gray-300 rounded-full focus:ring-[#CCFF00] focus:border-[#CCFF00]"
              />
            </div>
            
            <a 
              href="tel:08082811120" 
              className="flex items-center px-4 py-2 bg-white rounded-full border border-gray-300 text-black font-medium text-sm hover:bg-gray-50 transition-colors duration-150"
              onClick={() => handleLinkClick('Phone')}
            >
              <Phone className="h-4 w-4 mr-2" />
              0808 281 1120
            </a>
            
            <DropdownMenu>
              <DropdownMenuTrigger className="p-2 rounded-full bg-[#CCFF00]">
                <div className="w-6 h-6 flex items-center justify-center">
                  <span className="block w-3 h-3 bg-black rounded-full"></span>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white shadow-lg rounded-md p-4 min-w-[220px]">
                <p className="text-sm font-medium">Chat with us</p>
                <p className="text-xs text-gray-500 mt-2">Our travel experts are here to help</p>
                <div className="mt-4">
                  <button 
                    className="w-full px-4 py-2 bg-[#CCFF00] rounded-full text-black font-medium text-sm"
                    onClick={() => handleLinkClick('Start Chat')}
                  >
                    Start Chat
                  </button>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-md text-black"
            onClick={toggleMenu}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile menu dropdown */}
      <div 
        className={cn(
          "md:hidden bg-white shadow-md transition-all duration-200 ease-in-out overflow-hidden", 
          isMenuOpen ? "max-h-[80vh] border-t" : "max-h-0"
        )}
        id="mobile-menu"
      >
        <div className="container max-w-7xl mx-auto py-4 px-4">
          <div className="flex flex-col space-y-4">
            {/* Mobile search bar */}
            <div className="relative">
              <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                <div className="bg-[#CCFF00] rounded-full p-1">
                  <Search className="h-4 w-4 text-black" />
                </div>
              </div>
              <Input 
                type="search" 
                placeholder="Aged 18-35? Find your adventure" 
                className="pr-12 text-sm h-10 border border-gray-300 rounded-full focus:ring-[#CCFF00] focus:border-[#CCFF00]"
              />
            </div>
            
            {/* Mobile navigation */}
            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <div className="flex items-center justify-between py-2 uppercase text-sm font-medium text-black tracking-wide" onClick={() => handleLinkClick('DESTINATIONS')}>
                  DESTINATIONS
                  <ChevronDown className="h-4 w-4" />
                </div>
                <div className="pl-4 space-y-3">
                  {destinationItems.map((item, index) => (
                    <Link 
                      key={index}
                      to={item.to} 
                      className="block py-2 text-sm text-black"
                      onClick={() => handleLinkClick(item.label)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between py-2 uppercase text-sm font-medium text-black tracking-wide" onClick={() => handleLinkClick('DEALS')}>
                  DEALS
                  <ChevronDown className="h-4 w-4" />
                </div>
                <div className="pl-4">
                  <Link 
                    to="/deals/current-deals" 
                    className="block py-2 text-sm text-black"
                    onClick={() => handleLinkClick('Current Deals')}
                  >
                    Current Deals
                  </Link>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between py-2 uppercase text-sm font-medium text-black tracking-wide" onClick={() => handleLinkClick('TRAVEL STYLES')}>
                  TRAVEL STYLES
                  <ChevronDown className="h-4 w-4" />
                </div>
                <div className="pl-4 space-y-3">
                  {travelStyleItems.map((item, index) => (
                    <Link 
                      key={index}
                      to={item.to} 
                      className="block py-2 text-sm text-black"
                      onClick={() => handleLinkClick(item.label)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between py-2 uppercase text-sm font-medium text-black tracking-wide" onClick={() => handleLinkClick('ABOUT CONTIKI')}>
                  ABOUT CONTIKI
                  <ChevronDown className="h-4 w-4" />
                </div>
                <div className="pl-4 space-y-3">
                  {aboutItems.map((item, index) => (
                    <Link 
                      key={index}
                      to={item.to} 
                      className="block py-2 text-sm text-black"
                      onClick={() => handleLinkClick(item.label)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between py-2 uppercase text-sm font-medium text-black tracking-wide" onClick={() => handleLinkClick('GET INSPIRED')}>
                  GET INSPIRED
                  <ChevronDown className="h-4 w-4" />
                </div>
                <div className="pl-4 space-y-3">
                  {inspiredItems.map((item, index) => (
                    <Link 
                      key={index}
                      to={item.to} 
                      className="block py-2 text-sm text-black"
                      onClick={() => handleLinkClick(item.label)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Mobile utility links */}
            <div className="space-y-2 pt-2 border-t border-gray-200">
              <Link to="/contact" className="block py-2 text-sm text-gray-600" onClick={() => handleLinkClick('Contact us')}>Contact us</Link>
              <Link to="/future-travel-credit" className="block py-2 text-sm text-gray-600" onClick={() => handleLinkClick('Future Travel Credit')}>Future Travel Credit</Link>
              <Link to="/subscribe" className="block py-2 text-sm text-gray-600" onClick={() => handleLinkClick('Subscribe to emails')}>Subscribe to emails</Link>
              <Link to="/login" className="block py-2 text-sm text-gray-600" onClick={() => handleLinkClick('Traveller log in')}>Traveller log in</Link>
              <Link to="/agent-login" className="block py-2 text-sm text-gray-600" onClick={() => handleLinkClick('Agent log in')}>Agent log in</Link>
            </div>
            
            {/* Mobile phone button */}
            <a 
              href="tel:08082811120" 
              className="flex items-center justify-center px-4 py-2 bg-white rounded-full border border-gray-300 text-black font-medium text-sm hover:bg-gray-50 transition-colors duration-150"
              onClick={() => handleLinkClick('Phone')}
            >
              <Phone className="h-4 w-4 mr-2" />
              0808 281 1120
            </a>
            
            {/* Mobile chat button */}
            <button 
              className="flex items-center justify-center px-4 py-2 bg-[#CCFF00] rounded-full text-black font-medium text-sm"
              onClick={() => handleLinkClick('Start Chat')}
            >
              Start Chat
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;


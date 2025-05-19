
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Menu, X, ChevronDown, Phone } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from '@/lib/utils';
import { Input } from "@/components/ui/input";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    console.debug('[Header] mounted');
  }, []);

  useEffect(() => {
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
    console.debug('[Header] mobileOpen toggled:', newValue);
  };

  const handleLinkClick = (label: string) => {
    console.debug('[Header] clicked', { label });
    trackEvent('navigation_click', { item: label, path: location.pathname });
    setIsMenuOpen(false);
  };

  const MenuLink = ({
    to,
    label,
    hasDropdown = false,
    children,
    isMobile = false,
  }: {
    to: string;
    label: string;
    hasDropdown?: boolean;
    children?: React.ReactNode;
    isMobile?: boolean;
  }) => {
    if (hasDropdown && !isMobile) {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger className="group focus:outline-none">
            <div className="flex items-center uppercase text-sm font-medium tracking-wide hover:text-black text-black py-2 px-3 group-data-[state=open]:text-black relative">
              {label}
              <ChevronDown className="h-4 w-4 ml-1" />
              <span className="absolute -bottom-[1px] left-3 w-0 h-[2px] bg-[#CCFF00] transition-all duration-150 ease-in-out group-hover:w-[calc(100%-24px)] group-data-[state=open]:w-[calc(100%-24px)]"></span>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-white shadow-lg rounded-md p-4 min-w-[220px]">
            {children}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }

    if (hasDropdown && isMobile) {
      return (
        <div className="space-y-2">
          <div className="flex items-center justify-between py-2 uppercase text-sm font-medium text-black tracking-wide">
            {label}
            <ChevronDown className="h-4 w-4" />
          </div>
          <div className="pl-4 space-y-3">
            {children}
          </div>
        </div>
      );
    }

    return (
      <Link 
        to={to} 
        className={`uppercase text-sm font-medium tracking-wide text-black py-2 ${isMobile ? '' : 'px-3'} hover:text-black relative group`}
        onClick={() => handleLinkClick(label)}
      >
        {label}
        {!isMobile && (
          <span className="absolute -bottom-[1px] left-3 w-0 h-[2px] bg-[#CCFF00] transition-all duration-150 ease-in-out group-hover:w-[calc(100%-24px)]"></span>
        )}
      </Link>
    );
  };

  const DropdownItems = ({ items, onClick }: { items: { label: string; to: string }[], onClick: (label: string) => void }) => {
    return (
      <>
        {items.map((item, index) => (
          <DropdownMenuItem key={index} asChild className="p-0 focus:bg-gray-50">
            <Link 
              to={item.to} 
              className="block w-full px-3 py-2 text-sm text-black hover:bg-gray-50"
              onClick={() => onClick(item.label)}
            >
              {item.label}
            </Link>
          </DropdownMenuItem>
        ))}
      </>
    );
  };

  const destinationItems = [
    { label: 'Europe', to: '/destinations/europe' },
    { label: 'Asia', to: '/destinations/asia' },
    { label: 'Latin America', to: '/destinations/latin-america' },
    { label: 'USA & Canada', to: '/destinations/usa-canada' },
    { label: 'Australia & New Zealand', to: '/destinations/australia-new-zealand' },
    { label: 'Africa & Middle East', to: '/destinations/africa-middle-east' },
  ];

  const travelStyleItems = [
    { label: 'Adventure', to: '/travel-styles/adventure' },
    { label: 'Sailing & Cruise', to: '/travel-styles/sailing-cruise' },
    { label: 'Camping', to: '/travel-styles/camping' },
    { label: 'Festivals', to: '/travel-styles/festivals' },
    { label: 'Winter & Ski', to: '/travel-styles/winter-ski' },
  ];

  const aboutItems = [
    { label: 'About Us', to: '/about' },
    { label: 'Sustainability', to: '/about/sustainability' },
    { label: 'Travel FAQ', to: '/about/faq' },
    { label: 'Contact Us', to: '/contact' },
    { label: 'Careers', to: '/about/careers' },
  ];

  const inspiredItems = [
    { label: 'Travel Articles', to: '/articles' },
    { label: 'Travel Guides', to: '/guides' },
    { label: 'Travel Podcast', to: '/podcast' },
    { label: 'Contiki Reviews', to: '/reviews' },
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
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
          
          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center justify-center flex-1 mx-8">
            <ul className="flex space-x-2">
              <li>
                <MenuLink to="/destinations" label="Destinations" hasDropdown>
                  <DropdownItems items={destinationItems} onClick={handleLinkClick} />
                </MenuLink>
              </li>
              <li>
                <MenuLink to="/deals" label="Deals" />
              </li>
              <li>
                <MenuLink to="/travel-styles" label="Travel Styles" hasDropdown>
                  <DropdownItems items={travelStyleItems} onClick={handleLinkClick} />
                </MenuLink>
              </li>
              <li>
                <MenuLink to="/about-contiki" label="About Contiki" hasDropdown>
                  <DropdownItems items={aboutItems} onClick={handleLinkClick} />
                </MenuLink>
              </li>
              <li>
                <MenuLink to="/get-inspired" label="Get Inspired" hasDropdown>
                  <DropdownItems items={inspiredItems} onClick={handleLinkClick} />
                </MenuLink>
              </li>
            </ul>
          </nav>
          
          {/* Right side elements - search box, phone, etc. */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <Input 
                type="search" 
                placeholder="Age 18–35? Find your adventure" 
                className="pl-10 text-sm w-64 h-10 border border-gray-300 rounded-full focus:ring-[#CCFF00] focus:border-[#CCFF00]"
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
          "md:hidden bg-white shadow-md transition-all duration-300 ease-in-out overflow-hidden", 
          isMenuOpen ? "max-h-[80vh] border-t" : "max-h-0"
        )}
        id="mobile-menu"
      >
        <div className="container max-w-7xl mx-auto py-4 px-4">
          <div className="flex flex-col space-y-4">
            {/* Mobile search bar */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <Input 
                type="search" 
                placeholder="Age 18–35? Find your adventure" 
                className="pl-10 text-sm h-10 border border-gray-300 rounded-full focus:ring-[#CCFF00] focus:border-[#CCFF00]"
              />
            </div>
            
            {/* Mobile navigation */}
            <div className="space-y-4 py-2">
              <MenuLink to="/destinations" label="Destinations" hasDropdown isMobile>
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
              </MenuLink>
              
              <MenuLink to="/deals" label="Deals" isMobile />
              
              <MenuLink to="/travel-styles" label="Travel Styles" hasDropdown isMobile>
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
              </MenuLink>
              
              <MenuLink to="/about-contiki" label="About Contiki" hasDropdown isMobile>
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
              </MenuLink>
              
              <MenuLink to="/get-inspired" label="Get Inspired" hasDropdown isMobile>
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
              </MenuLink>
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
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

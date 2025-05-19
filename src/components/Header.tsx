
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    console.debug('[Header] mounted, mobileOpen:', isMenuOpen, 'path:', location.pathname);
  }, [isMenuOpen, location.pathname]);

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

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center" onClick={() => handleLinkClick('Home')} aria-label="Contiki Home">
          <span className="font-bold text-2xl text-black">Contiki</span>
        </Link>
        
        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 rounded-md text-black"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        
        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center space-x-8" aria-label="Main navigation">
          <Link 
            to="/" 
            className={`font-medium ${location.pathname === '/' ? 'text-[#CCFF00]' : 'text-black'} hover:text-[#CCFF00] transition-colors`}
            onClick={() => handleLinkClick('Home')}
            aria-current={location.pathname === '/' ? 'page' : undefined}
          >
            Home
          </Link>
          <Link 
            to="/destinations" 
            className={`font-medium ${location.pathname.startsWith('/destinations') ? 'text-[#CCFF00]' : 'text-black'} hover:text-[#CCFF00] transition-colors`}
            onClick={() => handleLinkClick('Destinations')}
            aria-current={location.pathname.startsWith('/destinations') ? 'page' : undefined}
          >
            Destinations
          </Link>
          <Link 
            to="/tours" 
            className={`font-medium ${location.pathname.startsWith('/tours') ? 'text-[#CCFF00]' : 'text-black'} hover:text-[#CCFF00] transition-colors`}
            onClick={() => handleLinkClick('Tours')}
            aria-current={location.pathname.startsWith('/tours') ? 'page' : undefined}
          >
            Tours
          </Link>
          <Link 
            to="/about" 
            className={`font-medium ${location.pathname === '/about' ? 'text-[#CCFF00]' : 'text-black'} hover:text-[#CCFF00] transition-colors`}
            onClick={() => handleLinkClick('About Us')}
            aria-current={location.pathname === '/about' ? 'page' : undefined}
          >
            About Us
          </Link>
          <Link 
            to="/contact" 
            className={`font-medium ${location.pathname === '/contact' ? 'text-[#CCFF00]' : 'text-black'} hover:text-[#CCFF00] transition-colors`}
            onClick={() => handleLinkClick('Contact')}
            aria-current={location.pathname === '/contact' ? 'page' : undefined}
          >
            Contact
          </Link>
        </nav>
        
        {/* Desktop CTA */}
        <div className="hidden md:flex items-center space-x-4">
          <Link 
            to="/login" 
            className={`font-medium ${location.pathname === '/login' ? 'text-[#CCFF00]' : 'text-black'} hover:text-[#CCFF00] transition-colors`}
            onClick={() => handleLinkClick('Login')}
            aria-current={location.pathname === '/login' ? 'page' : undefined}
          >
            Login
          </Link>
          <Link 
            to="/book-now" 
            className="bg-[#CCFF00] text-black px-4 py-2 rounded hover:bg-[#CCFF00]/90 transition-colors"
            onClick={() => handleLinkClick('Book Now')}
          >
            Book Now
          </Link>
        </div>
      </div>
      
      {/* Mobile menu dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-md" id="mobile-menu">
          <div className="container mx-auto py-4 space-y-4">
            <Link 
              to="/" 
              className={`block font-medium ${location.pathname === '/' ? 'text-[#CCFF00]' : 'text-black'} hover:text-[#CCFF00]`}
              onClick={() => handleLinkClick('Home')}
              aria-current={location.pathname === '/' ? 'page' : undefined}
            >
              Home
            </Link>
            <Link 
              to="/destinations" 
              className={`block font-medium ${location.pathname.startsWith('/destinations') ? 'text-[#CCFF00]' : 'text-black'} hover:text-[#CCFF00]`}
              onClick={() => handleLinkClick('Destinations')}
              aria-current={location.pathname.startsWith('/destinations') ? 'page' : undefined}
            >
              Destinations
            </Link>
            <Link 
              to="/tours" 
              className={`block font-medium ${location.pathname.startsWith('/tours') ? 'text-[#CCFF00]' : 'text-black'} hover:text-[#CCFF00]`}
              onClick={() => handleLinkClick('Tours')}
              aria-current={location.pathname.startsWith('/tours') ? 'page' : undefined}
            >
              Tours
            </Link>
            <Link 
              to="/about" 
              className={`block font-medium ${location.pathname === '/about' ? 'text-[#CCFF00]' : 'text-black'} hover:text-[#CCFF00]`}
              onClick={() => handleLinkClick('About Us')}
              aria-current={location.pathname === '/about' ? 'page' : undefined}
            >
              About Us
            </Link>
            <Link 
              to="/contact" 
              className={`block font-medium ${location.pathname === '/contact' ? 'text-[#CCFF00]' : 'text-black'} hover:text-[#CCFF00]`}
              onClick={() => handleLinkClick('Contact')}
              aria-current={location.pathname === '/contact' ? 'page' : undefined}
            >
              Contact
            </Link>
            <div className="pt-4 mt-4 border-t border-gray-200 flex flex-col space-y-4">
              <Link 
                to="/login" 
                className={`font-medium ${location.pathname === '/login' ? 'text-[#CCFF00]' : 'text-black'} hover:text-[#CCFF00]`}
                onClick={() => handleLinkClick('Login')}
                aria-current={location.pathname === '/login' ? 'page' : undefined}
              >
                Login
              </Link>
              <Link 
                to="/book-now" 
                className="bg-[#CCFF00] text-black px-4 py-2 text-center rounded hover:bg-[#CCFF00]/90 transition-colors"
                onClick={() => handleLinkClick('Book Now')}
              >
                Book Now
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;

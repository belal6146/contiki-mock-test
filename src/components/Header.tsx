
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    console.debug('[Header] mounted, mobileOpen:', isMenuOpen);
  }, [isMenuOpen]);

  const toggleMenu = () => {
    const newValue = !isMenuOpen;
    setIsMenuOpen(newValue);
    console.debug('[Header] mobileOpen toggled:', newValue);
  };

  const handleLinkClick = (label: string) => {
    console.debug('[Header] clicked', { label });
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center" onClick={() => handleLinkClick('Home')}>
          <span className="font-bold text-2xl text-primary">Contiki</span>
        </Link>
        
        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 rounded-md text-primary"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        
        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link 
            to="/" 
            className="font-medium text-primary hover:text-accent transition-colors"
            onClick={() => handleLinkClick('Home')}
          >
            Home
          </Link>
          <Link 
            to="/destinations" 
            className="font-medium text-primary hover:text-accent transition-colors"
            onClick={() => handleLinkClick('Destinations')}
          >
            Destinations
          </Link>
          <Link 
            to="/tours" 
            className="font-medium text-primary hover:text-accent transition-colors"
            onClick={() => handleLinkClick('Tours')}
          >
            Tours
          </Link>
          <Link 
            to="/about" 
            className="font-medium text-primary hover:text-accent transition-colors"
            onClick={() => handleLinkClick('About Us')}
          >
            About Us
          </Link>
          <Link 
            to="/contact" 
            className="font-medium text-primary hover:text-accent transition-colors"
            onClick={() => handleLinkClick('Contact')}
          >
            Contact
          </Link>
        </nav>
        
        {/* Desktop CTA */}
        <div className="hidden md:flex items-center space-x-4">
          <Link 
            to="/login" 
            className="font-medium text-primary hover:text-accent transition-colors"
            onClick={() => handleLinkClick('Login')}
          >
            Login
          </Link>
          <Link 
            to="/book-now" 
            className="btn-primary px-4 py-2"
            onClick={() => handleLinkClick('Book Now')}
          >
            Book Now
          </Link>
        </div>
      </div>
      
      {/* Mobile menu dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-md">
          <div className="container mx-auto py-4 space-y-4">
            <Link 
              to="/" 
              className="block font-medium text-primary hover:text-accent"
              onClick={() => handleLinkClick('Home')}
            >
              Home
            </Link>
            <Link 
              to="/destinations" 
              className="block font-medium text-primary hover:text-accent"
              onClick={() => handleLinkClick('Destinations')}
            >
              Destinations
            </Link>
            <Link 
              to="/tours" 
              className="block font-medium text-primary hover:text-accent"
              onClick={() => handleLinkClick('Tours')}
            >
              Tours
            </Link>
            <Link 
              to="/about" 
              className="block font-medium text-primary hover:text-accent"
              onClick={() => handleLinkClick('About Us')}
            >
              About Us
            </Link>
            <Link 
              to="/contact" 
              className="block font-medium text-primary hover:text-accent"
              onClick={() => handleLinkClick('Contact')}
            >
              Contact
            </Link>
            <div className="pt-4 mt-4 border-t border-gray-200 flex flex-col space-y-4">
              <Link 
                to="/login" 
                className="font-medium text-primary hover:text-accent"
                onClick={() => handleLinkClick('Login')}
              >
                Login
              </Link>
              <Link 
                to="/book-now" 
                className="btn-primary px-4 py-2 text-center"
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

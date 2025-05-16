
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center">
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
          <Link to="/" className="font-medium text-primary hover:text-accent transition-colors">
            Home
          </Link>
          <Link to="/destinations" className="font-medium text-primary hover:text-accent transition-colors">
            Destinations
          </Link>
          <Link to="/tours" className="font-medium text-primary hover:text-accent transition-colors">
            Tours
          </Link>
          <Link to="/about" className="font-medium text-primary hover:text-accent transition-colors">
            About Us
          </Link>
          <Link to="/contact" className="font-medium text-primary hover:text-accent transition-colors">
            Contact
          </Link>
        </nav>
        
        {/* Desktop CTA */}
        <div className="hidden md:flex items-center space-x-4">
          <Link to="/login" className="font-medium text-primary hover:text-accent transition-colors">
            Login
          </Link>
          <Link to="/book-now" className="btn-primary px-4 py-2">
            Book Now
          </Link>
        </div>
      </div>
      
      {/* Mobile menu dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-md">
          <div className="container mx-auto py-4 space-y-4">
            <Link to="/" className="block font-medium text-primary hover:text-accent">
              Home
            </Link>
            <Link to="/destinations" className="block font-medium text-primary hover:text-accent">
              Destinations
            </Link>
            <Link to="/tours" className="block font-medium text-primary hover:text-accent">
              Tours
            </Link>
            <Link to="/about" className="block font-medium text-primary hover:text-accent">
              About Us
            </Link>
            <Link to="/contact" className="block font-medium text-primary hover:text-accent">
              Contact
            </Link>
            <div className="pt-4 mt-4 border-t border-gray-200 flex flex-col space-y-4">
              <Link to="/login" className="font-medium text-primary hover:text-accent">
                Login
              </Link>
              <Link to="/book-now" className="btn-primary px-4 py-2 text-center">
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

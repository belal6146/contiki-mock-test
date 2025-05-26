
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, User, Phone } from 'lucide-react';
import Logo from './header/Logo';
import DesktopNav from './header/DesktopNav';
import MobileMenu from './header/MobileMenu';
import {
  destinationItems,
  travelStyleItems,
  aboutItems,
  inspiredItems
} from './header/NavigationData';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLinkClick = (label: string) => {
    console.log('Navigation clicked:', label);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="bg-white border-b border-gray-300 fixed top-0 left-0 right-0 z-50 shadow-sm">
      <div className="container max-w-screen-xl mx-auto px-4 lg:px-8">
        {/* Top row with utility links */}
        <div className="hidden lg:flex items-center justify-end py-2 text-sm text-gray-600 border-b border-gray-300">
          <div className="flex items-center gap-6">
            <Link to="/contact" className="text-gray-600 hover:text-primary transition">Contact us</Link>
            <Link to="/future-travel-credit" className="text-gray-600 hover:text-primary transition">Future Travel Credit</Link>
            <Link to="/subscribe" className="text-gray-600 hover:text-primary transition">Subscribe to emails</Link>
            <Link to="/login" className="text-gray-600 hover:text-primary transition">Traveller log in</Link>
            <Link to="/agent-login" className="text-gray-600 hover:text-primary transition">Agent log in</Link>
          </div>
        </div>

        {/* Main header row */}
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="block">
              <Logo />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <DesktopNav onLinkClick={handleLinkClick} />

          {/* Mobile menu button */}
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden p-2 text-gray-800 hover:bg-gray-100 rounded-lg transition"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        destinationItems={destinationItems}
        travelStyleItems={travelStyleItems}
        aboutItems={aboutItems}
        inspiredItems={inspiredItems}
        onLinkClick={handleLinkClick}
      />
    </header>
  );
};

export default Header;

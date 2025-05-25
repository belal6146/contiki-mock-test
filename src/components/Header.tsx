
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
    <header className="bg-white border-b border-gray-100 fixed top-0 left-0 right-0 z-50 shadow-sm">
      <div className="container max-w-[1400px] mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="block">
              <Logo />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <DesktopNav onLinkClick={handleLinkClick} />

          {/* Right side actions */}
          <div className="flex items-center gap-4">
            {/* Account and Contact info - Top right */}
            <div className="hidden lg:flex items-center gap-6 text-sm text-gray-600">
              <Link to="/contact" className="hover:text-black transition-colors">Contact us</Link>
              <Link to="/future-travel-credit" className="hover:text-black transition-colors">Future Travel Credit</Link>
              <Link to="/subscribe" className="hover:text-black transition-colors">Subscribe to emails</Link>
              <Link to="/login" className="hover:text-black transition-colors">Traveller log in</Link>
              <Link to="/agent-login" className="hover:text-black transition-colors">Agent log in</Link>
            </div>

            {/* Account button */}
            <Link 
              to="/account" 
              className="hidden md:flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-black transition-colors"
            >
              <User className="w-4 h-4" />
              <span>My Account</span>
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
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

        {/* Second row with navigation and search */}
        <div className="hidden lg:flex items-center justify-between py-4 border-t border-gray-100">
          {/* Navigation Menu */}
          <nav className="flex items-center space-x-8">
            <Link to="/destinations" className="text-sm font-medium text-gray-900 hover:text-gray-700 transition-colors uppercase tracking-wide">
              DESTINATIONS
            </Link>
            <Link to="/deals" className="text-sm font-medium text-gray-900 hover:text-gray-700 transition-colors uppercase tracking-wide">
              DEALS
            </Link>
            <Link to="/travel-styles" className="text-sm font-medium text-gray-900 hover:text-gray-700 transition-colors uppercase tracking-wide">
              TRAVEL STYLES
            </Link>
            <Link to="/about-contiki" className="text-sm font-medium text-gray-900 hover:text-gray-700 transition-colors uppercase tracking-wide">
              ABOUT CONTIKI
            </Link>
            <Link to="/get-inspired" className="text-sm font-medium text-gray-900 hover:text-gray-700 transition-colors uppercase tracking-wide">
              GET INSPIRED
            </Link>
          </nav>

          {/* Search and Actions */}
          <div className="flex items-center gap-4">
            {/* Search Bar */}
            <div className="flex items-center bg-gray-50 rounded-full px-4 py-2 w-80">
              <input
                type="text"
                placeholder="Aged 18-35? Find your adventure"
                className="bg-transparent border-none outline-none flex-1 text-sm placeholder-gray-500"
              />
              <div className="bg-[#CCFF00] rounded-full p-2 ml-2">
                <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-center gap-2 text-sm font-medium">
              <Phone className="w-4 h-4" />
              <span>0808 281 1120</span>
            </div>

            {/* Chat */}
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-full text-sm font-medium hover:bg-gray-50 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              Chat
            </button>

            {/* Subscribe */}
            <Link 
              to="/subscribe" 
              className="px-6 py-2 bg-[#CCFF00] rounded-full text-black font-bold text-sm hover:bg-[#b8e600] transition-colors uppercase tracking-wide"
            >
              Subscribe
            </Link>
          </div>
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

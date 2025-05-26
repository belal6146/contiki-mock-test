
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Search, Phone, MessageCircle, ChevronDown } from 'lucide-react';
import Logo from './header/Logo';
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
    if (label === 'close') {
      setIsMobileMenuOpen(false);
    } else {
      setIsMobileMenuOpen(false);
    }
  };

  const navItems = [
    { label: 'DESTINATIONS', to: '/destinations', hasDropdown: true, items: destinationItems },
    { label: 'DEALS', to: '/deals', hasDropdown: true, items: [{ label: 'Current Deals', to: '/deals/current-deals' }] },
    { label: 'TRAVEL STYLES', to: '/travel-styles', hasDropdown: true, items: travelStyleItems },
    { label: 'ABOUT CONTIKI', to: '/about-contiki', hasDropdown: true, items: aboutItems },
    { label: 'GET INSPIRED', to: '/get-inspired', hasDropdown: true, items: inspiredItems }
  ];

  return (
    <header className="bg-white fixed top-0 left-0 right-0 z-40 shadow-sm">
      {/* Top Utility Bar */}
      <div className="py-2 border-b border-gray-200">
        <div className="max-w-screen-xl mx-auto px-4 lg:px-8 flex justify-end space-x-6">
          <Link 
            to="/contact" 
            className="text-xs font-medium text-gray-600 hover:underline hover:text-gray-800 transition-colors duration-150"
            onClick={() => handleLinkClick('Contact us')}
          >
            Contact us
          </Link>
          <Link 
            to="/future-travel-credit" 
            className="text-xs font-medium text-gray-600 hover:underline hover:text-gray-800 transition-colors duration-150"
            onClick={() => handleLinkClick('Future Travel Credit')}
          >
            Future Travel Credit
          </Link>
          <Link 
            to="/subscribe" 
            className="text-xs font-medium text-gray-600 hover:underline hover:text-gray-800 transition-colors duration-150"
            onClick={() => handleLinkClick('Subscribe to emails')}
          >
            Subscribe to emails
          </Link>
          <Link 
            to="/login" 
            className="text-xs font-medium text-gray-600 hover:underline hover:text-gray-800 transition-colors duration-150"
            onClick={() => handleLinkClick('Traveller log in')}
          >
            Traveller log in
          </Link>
          <Link 
            to="/agent-login" 
            className="text-xs font-medium text-gray-600 hover:underline hover:text-gray-800 transition-colors duration-150"
            onClick={() => handleLinkClick('Agent log in')}
          >
            Agent log in
          </Link>
        </div>
      </div>

      {/* Primary Nav Bar */}
      <div className="py-4">
        <div className="max-w-screen-xl mx-auto px-4 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <div className="mr-8">
            <Link to="/" className="block" onClick={() => handleLinkClick('Logo')}>
              <Logo />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <ul className="hidden lg:flex items-center space-x-12">
            {navItems.map((item, index) => (
              <li key={index}>
                <Link 
                  to={item.to}
                  className="text-sm uppercase font-semibold tracking-wide text-black hover:text-[#CCFF00] focus:outline-none focus:ring-2 focus:ring-[#CCFF00] transition-colors duration-150 flex items-center"
                  onClick={() => handleLinkClick(item.label)}
                >
                  {item.label}
                  {item.hasDropdown && <ChevronDown className="h-3 w-3 ml-1" />}
                </Link>
              </li>
            ))}
          </ul>

          {/* Search + Actions Group */}
          <div className="hidden lg:flex items-center">
            {/* Search */}
            <div className="flex items-center w-80 h-10 border-2 border-gray-300 rounded-full px-3">
              <input 
                type="text" 
                placeholder="Aged 18–35? Find your adventure"
                className="flex-grow text-sm text-gray-600 placeholder-gray-400 bg-transparent focus:outline-none"
              />
              <button 
                className="ml-2 p-2 bg-[#CCFF00] rounded-full hover:bg-[#b8e600] transition-colors duration-150"
                onClick={() => handleLinkClick('Search')}
                aria-label="Search"
              >
                <Search className="h-4 w-4 text-black" />
              </button>
            </div>

            {/* Phone Button */}
            <button 
              className="inline-flex items-center ml-4 px-4 py-2 border-2 border-gray-300 rounded-full text-sm font-medium text-gray-800 hover:bg-gray-100 transition-colors duration-150"
              onClick={() => handleLinkClick('Phone')}
            >
              <Phone className="h-4 w-4 mr-2" />
              0808 281 1120
            </button>

            {/* Chat Button */}
            <button 
              className="inline-flex items-center ml-4 px-4 py-2 border-2 border-gray-300 rounded-full text-sm font-medium text-gray-800 hover:bg-gray-100 transition-colors duration-150"
              onClick={() => handleLinkClick('Chat')}
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              Chat
              <ChevronDown className="h-3 w-3 ml-1" />
            </button>
          </div>

          {/* Mobile Hamburger Menu */}
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden p-2 text-gray-800 hover:bg-gray-100 rounded-lg transition-colors duration-150"
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

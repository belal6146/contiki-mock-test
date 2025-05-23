
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Phone, Menu, X, MessageCircle, ChevronDown } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';
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
  const [mobileOpen, setMobileOpen] = useState(false);
  
  useEffect(() => {
    console.debug('[Header] mounted');
    
    // Handle body scroll lock when mobile menu is open
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [mobileOpen]);

  const handleClick = (label: string) => {
    console.debug('[Header] clicked', { label });
    trackEvent('navigation_click', { item: label });
  };
  
  const toggleMobile = () => {
    setMobileOpen(o => {
      const newValue = !o;
      console.debug('[Header] mobileOpen', newValue);
      return newValue;
    });
  };

  return (
    <header className="fixed w-full z-50 bg-white shadow-sm">
      {/* Utility Navigation */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-2 flex justify-end space-x-6 text-xs">
          <Link
            to="/contact-us"
            className="hover:underline text-gray-600 font-normal transition-colors duration-150"
            onClick={() => handleClick('ContactUs')}
          >
            Contact us
          </Link>
          <Link
            to="/future-travel-credit"
            className="hover:underline text-gray-600 font-normal transition-colors duration-150"
            onClick={() => handleClick('FutureTravelCredit')}
          >
            Future Travel Credit
          </Link>
          <Link
            to="/subscribe"
            className="hover:underline text-gray-600 font-normal transition-colors duration-150"
            onClick={() => handleClick('SubscribeToEmails')}
          >
            Subscribe to emails
          </Link>
          <Link
            to="/login"
            className="hover:underline text-gray-600 font-normal transition-colors duration-150"
            onClick={() => handleClick('TravellerLogIn')}
          >
            Traveller log in
          </Link>
          <Link
            to="/agent-login"
            className="hover:underline text-gray-600 font-normal transition-colors duration-150"
            onClick={() => handleClick('AgentLogIn')}
          >
            Agent log in
          </Link>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="bg-white">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          {/* Left side with mobile burger and logo */}
          <div className="flex items-center">
            {/* Mobile Burger */}
            <button
              aria-label="Toggle menu"
              className="lg:hidden p-2 mr-4"
              onClick={toggleMobile}
            >
              {mobileOpen ? <X size={24} className="text-black" /> : <Menu size={24} className="text-black" />}
            </button>
            
            {/* Logo positioned at far left */}
            <Logo onClick={() => handleClick('Logo')} width="120px" />
          </div>
          
          {/* Desktop Navigation on the right */}
          <DesktopNav onLinkClick={handleClick} />
        </div>
        
        {/* Mobile Menu */}
        <MobileMenu
          isOpen={mobileOpen}
          destinationItems={destinationItems}
          travelStyleItems={travelStyleItems}
          aboutItems={aboutItems}
          inspiredItems={inspiredItems}
          onLinkClick={(label) => {
            handleClick(label);
            setMobileOpen(false);
          }}
        />
      </nav>
    </header>
  );
};

export default Header;

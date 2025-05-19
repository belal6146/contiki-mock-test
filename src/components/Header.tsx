
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Phone, Menu, X, MessageCircle, ChevronDown } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';
import Logo from './header/Logo';
import DesktopNav from './header/DesktopNav';

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

  const handleClick = (label: string) => () => {
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
    <header className="fixed w-full z-50">
      {/* Utility Navigation */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-1 flex justify-end space-x-6 text-sm">
          <Link
            to="/contact-us"
            className="hover:underline text-gray-600 font-medium"
            onClick={handleClick('ContactUs')}
          >
            Contact us
          </Link>
          <Link
            to="/future-travel-credit"
            className="hover:underline text-gray-600 font-medium"
            onClick={handleClick('FutureTravelCredit')}
          >
            Future Travel Credit
          </Link>
          <Link
            to="/subscribe"
            className="hover:underline text-gray-600 font-medium"
            onClick={handleClick('SubscribeToEmails')}
          >
            Subscribe to emails
          </Link>
          <Link
            to="/login"
            className="hover:underline text-gray-600 font-medium"
            onClick={handleClick('TravellerLogIn')}
          >
            Traveller log in
          </Link>
          <Link
            to="/agent-login"
            className="hover:underline text-gray-600 font-medium"
            onClick={handleClick('AgentLogIn')}
          >
            Agent log in
          </Link>
        </div>
      </div>

      {/* Main Navigation */}
      <nav id="navbar" className="navbar bg-white shadow-md">
        <div className="navbar-wrapper max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
          {/* Mobile Burger */}
          <button
            aria-label="Toggle menu"
            className="md:hidden icon-wrapper"
            onClick={toggleMobile}
            data-item-type="General Interaction"
            data-item-name="open-main-menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          
          {/* Logo */}
          <Logo onClick={handleClick('Logo')} />
          
          {/* Use the DesktopNav component for larger screens */}
          <DesktopNav onLinkClick={handleClick} />
        </div>
        
        {/* Mobile Slide-Down Menu */}
        {mobileOpen && (
          <div className="md:hidden bg-white shadow-lg">
            {['DESTINATIONS', 'DEALS', 'TRAVEL STYLES', 'ABOUT CONTIKI', 'GET INSPIRED'].map(label => (
              <button
                key={label}
                className="block w-full text-left px-4 py-3 text-base font-medium text-black hover:bg-gray-100"
                onClick={() => {
                  handleClick(`Mobile-${label}`)();
                  toggleMobile();
                }}
              >
                {label}
              </button>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;

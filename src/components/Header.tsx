
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Phone, Menu, X } from 'lucide-react';
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { trackEvent } from '@/lib/analytics';
import {
  destinationItems,
  travelStyleItems,
  aboutItems,
  inspiredItems
} from './header/NavigationData';
import Logo from './header/Logo';
import DesktopNav from './header/DesktopNav';
import MobileMenu from './header/MobileMenu';

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
    <nav id="navbar" className="navbar navbar__ch-active bg-white shadow-sm sticky top-0 z-50">
      <div className="navbar-wrapper flex flex-col">
        {/* Top utility links - visible on desktop only */}
        <div className="navbar_links hidden md:flex justify-end border-b border-gray-100 px-8">
          <div className="flex space-x-6 text-xs py-2">
            <Link to="/contact" className="text-gray-600 hover:text-black transition-all duration-150 ease-in-out" onClick={() => handleLinkClick('Contact us')}>Contact us</Link>
            <Link to="/future-travel-credit" className="text-gray-600 hover:text-black transition-all duration-150 ease-in-out" onClick={() => handleLinkClick('Future Travel Credit')}>Future Travel Credit</Link>
            <Link to="/subscribe" className="text-gray-600 hover:text-black transition-all duration-150 ease-in-out" onClick={() => handleLinkClick('Subscribe to emails')}>Subscribe to emails</Link>
            <Link to="/login" className="text-gray-600 hover:text-black transition-all duration-150 ease-in-out" onClick={() => handleLinkClick('Traveller log in')}>Traveller log in</Link>
            <Link to="/agent-login" className="text-gray-600 hover:text-black transition-all duration-150 ease-in-out" onClick={() => handleLinkClick('Agent log in')}>Agent log in</Link>
          </div>
        </div>
        
        <div className="navbar_menu flex items-center justify-between h-20 md:h-24 px-4 md:px-8 max-w-7xl mx-auto w-full">
          {/* Logo */}
          <div className="navbar_logo">
            <Logo onClick={() => handleLinkClick('Logo')} />
          </div>
          
          {/* Desktop Navigation */}
          <DesktopNav onLinkClick={handleLinkClick} />
          
          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-md text-black transition-all duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-accent"
            onClick={toggleMenu}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            data-item-name="open-main-menu"
            data-item-type="General Interaction"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile menu dropdown */}
      <MobileMenu 
        isOpen={isMenuOpen}
        destinationItems={destinationItems}
        travelStyleItems={travelStyleItems}
        aboutItems={aboutItems}
        inspiredItems={inspiredItems}
        onLinkClick={handleLinkClick}
      />
    </nav>
  );
};

export default Header;

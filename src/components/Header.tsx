
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
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

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container max-w-7xl mx-auto">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Logo onClick={() => handleLinkClick('Logo')} />
          
          {/* Desktop Navigation */}
          <DesktopNav onLinkClick={handleLinkClick} />
          
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
      <MobileMenu 
        isOpen={isMenuOpen}
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

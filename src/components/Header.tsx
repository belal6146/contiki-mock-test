
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, User, Phone } from 'lucide-react';
import Logo from './header/Logo';
import DesktopNav from './header/DesktopNav';
import MobileMenu from './header/MobileMenu';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-white border-b border-gray-100 fixed top-0 left-0 right-0 z-50 shadow-sm">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="block">
              <Logo />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:block flex-1 mx-8">
            <DesktopNav />
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-4">
            {/* Call us button - Desktop */}
            <div className="hidden md:flex items-center gap-2 text-sm">
              <Phone className="w-4 h-4" />
              <span className="font-medium">Call us: 020 7468 4335</span>
            </div>

            {/* Account button */}
            <Link 
              to="/account" 
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-black hover:bg-gray-50 rounded-lg transition-colors"
            >
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">My Account</span>
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden p-2 text-black hover:bg-gray-50 rounded-lg transition-colors"
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
      </div>

      {/* Mobile Menu */}
      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
      />
    </header>
  );
};

export default Header;

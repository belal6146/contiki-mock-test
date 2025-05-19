
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Phone, Menu, X, MessageCircle, ChevronDown } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

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
    <nav id="navbar" className="navbar bg-white shadow-md fixed w-full z-50">
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
        <Link to="/" className="navbar__logo" onClick={handleClick('Logo')}>
          <picture>
            <source media="(min-width: 768px)" srcSet="https://www.contiki.com/media/hvkhcawu/contiki-primary-logo-black.svg" />
            <source media="(max-width: 767px)" srcSet="https://www.contiki.com/media/hvkhcawu/contiki-primary-logo-black.svg" />
            <img src="https://www.contiki.com/media/hvkhcawu/contiki-primary-logo-black.svg" alt="Contiki" className="h-9" />
          </picture>
        </Link>
        
        {/* Desktop Menu */}
        <div className="navbar__menu hidden md:flex space-x-8">
          {['DESTINATIONS', 'DEALS', 'TRAVEL STYLES', 'ABOUT CONTIKI', 'GET INSPIRED'].map(label => (
            <div key={label} className="nav-item nav-item--default">
              <button
                className="nav-item__button text-sm font-medium text-black relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-[#cf0] after:transition-all after:duration-150 after:ease-in-out after:w-0 hover:after:w-full"
                onClick={handleClick(label)}
                data-item-type="General Interaction"
                data-item-name="main-menu-item"
              >
                {label}
              </button>
            </div>
          ))}
        </div>
        
        {/* Right Side */}
        <div className="navbar__aside flex items-center space-x-6">
          {/* Search */}
          <div className="search flex items-center">
            <form onSubmit={e => e.preventDefault()}>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Aged 18-35? Find your adventure"
                  aria-label="Search"
                  className="search-input text-base font-normal border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#cf0]"
                  onClick={handleClick('SearchField')}
                />
                <button
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-[#cf0] rounded-full p-1"
                  onClick={handleClick('SearchButton')}
                  data-item-type="Search"
                  data-item-name="header-search-button"
                >
                  <Search className="h-4 w-4 text-black" />
                </button>
              </div>
            </form>
          </div>
          
          {/* Phone */}
          <button
            className="text-lg font-medium text-black hidden md:flex items-center"
            onClick={handleClick('Phone')}
            data-item-type="Booking Interest"
            data-item-name="header-phone-number"
          >
            <Phone className="h-4 w-4 mr-2" />
            0808 281 1120
          </button>
          
          {/* Chat */}
          <div className="contact-us-dropdown hidden md:block">
            <button
              className="icon-wrapper flex items-center"
              onClick={handleClick('ChatNow')}
              data-item-type="Contact"
              data-item-name="header-chat-button"
            >
              <MessageCircle className="h-6 w-6 text-black" />
              <ChevronDown className="h-4 w-4 ml-1 text-black" />
            </button>
          </div>
        </div>
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
  );
};

export default Header;

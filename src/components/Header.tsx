import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Search, ChevronDown, Menu } from "lucide-react";
import MenuLink from "./header/MenuLink";
import DropdownItems from "./header/DropdownItems";
import MobileMenu from "./header/MobileMenu";
import ContactDropdown from "./header/ContactDropdown";
import Newsletter from "./header/Newsletter";
import styles from "./header/Header.module.css";
import {
  destinationItems,
  travelStyleItems,
  aboutItems,
  inspiredItems,
  dealsItems,
  DropdownContent
} from "./header/NavigationData";

const NAV_ITEMS = [
  { label: "DESTINATIONS", to: "/destinations", hasDropdown: true, dropdownContent: destinationItems },
  { label: "DEALS", to: "/deals", hasDropdown: true, dropdownContent: dealsItems },
  { label: "TRAVEL STYLES", to: "/travel-styles", hasDropdown: true, dropdownContent: travelStyleItems },
  { label: "ABOUT CONTIKI", to: "/about-contiki", hasDropdown: true, dropdownContent: aboutItems },
  { label: "GET INSPIRED", to: "/get-inspired", hasDropdown: true, dropdownContent: inspiredItems },
];

// Analytics tracking function
const trackEvent = (category: string, action: string, label?: string) => {
  // TODO: Implement actual analytics tracking
  console.log(`Analytics Event: ${category} - ${action}${label ? ` - ${label}` : ''}`);
};

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNewsletterOpen, setIsNewsletterOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const handleLinkClick = (label: string) => {
    trackEvent('Navigation', 'Click', label);
  };

  const handleNewsletterClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsNewsletterOpen(true);
    trackEvent('Newsletter', 'Open');
  };

  const handleLoginClick = (type: 'traveller' | 'agent') => {
    trackEvent('Authentication', 'Click', type);
    // TODO: Implement actual login functionality
  };

  const handleDropdownToggle = (label: string) => {
    setActiveDropdown(activeDropdown === label ? null : label);
    trackEvent('Navigation', 'Dropdown Toggle', label);
  };

  return (
    <header className={styles.header}>
      {/* Topbar */}
      <div id="topbar" className={styles.topbar} role="navigation" aria-label="Top navigation">
        <div className={styles.topbarWrapper}>
          <div className={styles.topbarRightSide}>
            <div className={styles.topbarLinks}>
              <Link 
                className={styles.topbarLink} 
                to="/contact" 
                onClick={() => handleLinkClick('Contact us')}
                aria-label="Contact us"
              >
                Contact us
              </Link>
              <Link 
                className={styles.topbarLink} 
                to="/future-travel-credit" 
                onClick={() => handleLinkClick('Future Travel Credit')}
                aria-label="Future Travel Credit"
              >
                Future Travel Credit
              </Link>
              <button 
                className={styles.topbarLink} 
                onClick={handleNewsletterClick}
                aria-label="Subscribe to emails"
              >
                Subscribe to emails
              </button>
              <a 
                className={styles.topbarLink} 
                href="https://my.contiki.com/login" 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={() => handleLoginClick('traveller')}
                aria-label="Traveller log in"
              >
                Traveller log in
              </a>
              <a 
                className={styles.topbarLink} 
                href="https://agents.ttc.com/login" 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={() => handleLoginClick('agent')}
                aria-label="Agent log in"
              >
                Agent log in
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className={styles.navbarWrapper}>
        <div className={styles.navbarLinks}>
          {/* Menu Button */}
          <button 
            className={styles.navbarMenuButton}
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu className={styles.navbarMenuIcon} />
          </button>

          {/* Logo */}
          <Link className={styles.navbarLogo} to="/" aria-label="Contiki Home">
            <img 
              src="https://www.contiki.com/media/hvkhcawu/contiki-primary-logo-black.svg" 
              alt="Contiki" 
              className={styles.navbarLogoImage}
            />
          </Link>

          {/* Main Menu */}
          <nav className={styles.navbarMenu} role="navigation" aria-label="Main navigation">
            {NAV_ITEMS.map((item) => (
              <div key={item.label} className={styles.navItem}>
                <button
                  className={styles.navItemContainer}
                  onClick={() => handleDropdownToggle(item.label)}
                  aria-expanded={activeDropdown === item.label}
                  aria-controls={`dropdown-${item.label}`}
                >
                  <div className={styles.navItemContentWrapper}>
                    <span className={styles.navItemButtonText}>{item.label}</span>
                    <ChevronDown 
                      className={`${styles.navItemArrow} ${
                        activeDropdown === item.label ? styles.navItemArrowActive : ''
                      }`}
                    />
                  </div>
                </button>
                {activeDropdown === item.label && item.hasDropdown && (
                  <div 
                    id={`dropdown-${item.label}`}
                    className={styles.dropdownContent}
                    role="menu"
                  >
                    <DropdownItems 
                      dropdownContent={item.dropdownContent} 
                      onClick={handleLinkClick}
                    />
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>

        {/* Navbar Aside */}
        <div className={styles.navbarAside}>
          {/* Search */}
          <div className={styles.search} role="search">
            <form onSubmit={(e) => e.preventDefault()}>
              <input 
                type="search" 
                placeholder="Aged 18-35? Find your adventure" 
                className={styles.searchInput} 
                aria-label="Search"
              />
              <button 
                type="submit" 
                className={styles.searchButton}
                aria-label="Search"
              >
                <Search className={styles.searchIcon} />
              </button>
            </form>
          </div>

          {/* Contact */}
          <ContactDropdown />
        </div>
      </div>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        navItems={NAV_ITEMS}
        onLinkClick={handleLinkClick}
      />

      {/* Newsletter Modal */}
      <Newsletter
        isOpen={isNewsletterOpen}
        onClose={() => setIsNewsletterOpen(false)}
      />
    </header>
  );
};

export default Header;

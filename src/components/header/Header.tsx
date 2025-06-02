import React, { useState, useEffect } from 'react';
// import Image from 'next/image'; // Remove Next.js Image import
// import Link from 'next/link'; // Remove Next.js Link import
import { Menu, X, ChevronDown, Search } from 'lucide-react';
import styles from './Header.module.css'; // Import CSS module
// import { mainNavigationItems as NavigationData, MainNavItem, DropdownContent } from './NavigationData'; // Commenting out problematic import
import MobileMenu from './MobileMenu';
import ContactDropdown from './ContactDropdown';
import Newsletter from './Newsletter'; // Import Newsletter component

interface HeaderProps {
  // Define props here if any
}

// Define analytics tracking function (placeholder)
const trackEvent = (category: string, action: string, label?: string) => {
  // TODO: Implement actual analytics tracking
  console.log(`[Analytics Event] ${category} - ${action}${label ? ` - ${label}` : ''}`);
};

// Define a local interface for placeholder navigation items (matching MobileMenu.tsx)
interface PlaceholderNavItem {
  name: string;
  type: 'link' | 'dropdown';
  href?: string;
  // Add other properties if needed for placeholders
}

const Header: React.FC<HeaderProps> = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isNewsletterVisible, setIsNewsletterVisible] = useState(false); // State for newsletter visibility

  // Log component mount
  useEffect(() => {
    console.log('[Header] Component mounted');
  }, []);

  const toggleMobileMenu = () => {
    console.log('[Header] Mobile menu toggled:', !isMobileMenuOpen);
    setIsMobileMenuOpen(!isMobileMenuOpen);
    trackEvent('Header', 'ToggleMobileMenu', !isMobileMenuOpen ? 'Open' : 'Close');
  };

  const handleDropdownToggle = (dropdownName: string) => {
    console.log('[Header] Dropdown toggled:', dropdownName);
    // Reverted trackEvent call to original format for simplicity
    trackEvent('Header', 'ToggleDropdown', dropdownName);
    setActiveDropdown(activeDropdown === dropdownName ? null : dropdownName);
  };

  const handleNewsletterToggle = () => {
    setIsNewsletterVisible(!isNewsletterVisible);
    console.log('[Header] Newsletter visibility toggled to:', !isNewsletterVisible);
    trackEvent('Header', 'ToggleNewsletter', !isNewsletterVisible ? 'Show' : 'Hide');
  };

  // Placeholder data for main navigation if NavigationData cannot be used
  const placeholderNavItems: PlaceholderNavItem[] = [
    { name: 'Destinations', type: 'dropdown' },
    { name: 'Travel Styles', type: 'dropdown' },
    { name: 'Deals', type: 'dropdown' },
    { name: 'About', type: 'dropdown' },
    { name: 'Inspired', type: 'dropdown' },
     { name: 'Blog', type: 'link', href: '/blog' },
     { name: 'Contact', type: 'link', href: '/contact' },
  ]; // Removed 'as const' and added explicit type

  return (
    <header className={styles.header}>
      {/* Top Bar - Integrating the provided HTML */}
      <div id="topbar" className="topbar" data-module-name="topbar" role="navigation" aria-label="Top navigation">
        <div className="topbar-wrapper">
          <div className="topbar__right-side">
            <div className="topbar__links">
              <a className="topbar__link text-link-s" data-item-type="Navigation" data-item-name="general-link" data-testid="genericText" target="_self" href="/en-gb/contact" title="Contact us">Contact us</a>
              <a className="topbar__link text-link-s" data-item-type="Navigation" data-item-name="general-link" data-testid="genericText" target="_self" href="/en-gb/resources/ftc" title="Future Travel Credit">Future Travel Credit</a>
              <a className="topbar__link text-link-s" data-item-type="Navigation" data-item-name="general-link" data-testid="genericText" target="_self" href="/en-gb/newsletter" title="Subscribe to emails">Subscribe to emails</a>
              <a className="topbar__link text-link-s" data-item-type="Navigation" data-item-name="general-link" data-testid="genericText" target="_blank" href="https://my.contiki.com/login" rel="noopener noreferrer" title="Traveller log in">Traveller log in</a>
              <a className="topbar__link text-link-s" data-item-type="Navigation" data-item-name="general-link" data-testid="genericText" target="_blank" href="https://agents.ttc.com/login" rel="noopener noreferrer" title="Agent log in">Agent log in</a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className={styles.mainNav} aria-label="Main navigation">
        <div className={styles.navContainer}>
          <div className={styles.navLeft}>
            {/* Logo */}
            {/* Using a simple div placeholder instead of Next.js Link/Image */}
             {/* Using a simple anchor tag for the logo link */} 
            <a href="/" className={styles.logoLink} aria-label="Contiki Homepage">
              {/* Using a simple div placeholder for the logo instead of Image */} 
              <div className={styles.logoPlaceholder}>Contiki Logo</div>
              {/* If using an image, replace the div with: <img src="/path/to/logo.svg" alt="Contiki Logo" className={styles.logoImage} /> */}
            </a>

            {/* Desktop Navigation Links - Using placeholder data and anchor tags */}
            <ul className={styles.navbarNav}>
              {placeholderNavItems.map((item) => (
                <li key={item.name} className={styles.navItem}>
                  {item.type === 'link' ? (
                     // Using simple anchor tags instead of Next.js Link
                    <a href={item.href || '#'} className={styles.navLink} onClick={() => trackEvent('Navigation', 'Click', item.name)}>
                      {item.name}
                    </a>
                  ) : (
                    <div
                      className={`${styles.navLink} ${styles.navDropdownToggle} ${activeDropdown === item.name ? styles.active : ''}`}
                      onClick={() => handleDropdownToggle(item.name)}
                      onMouseEnter={() => handleDropdownToggle(item.name)}
                      onMouseLeave={() => setActiveDropdown(null)}
                      aria-haspopup="true"
                      aria-expanded={activeDropdown === item.name}
                    >
                      {item.name} <ChevronDown size={16} className={styles.dropdownIcon} />
                      {/* Simplified dropdown placeholder if NavigationData not available */}
                      {activeDropdown === item.name && (
                        <div className={styles.dropdownMenu}>
                           <div className={styles.dropdownPlaceholder}>Dropdown Content for {item.name}</div>
                        </div>
                      )}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.navRight}>
            {/* Search Icon */}
            <button className={styles.searchButton} aria-label="Search">
              <Search size={20} />
            </button>

            {/* Contact Us Dropdown */}
            {/* Assuming ContactDropdown does not heavily rely on the full NavigationData structure */}
            <ContactDropdown />

            {/* Mobile Menu Button */}
            <button onClick={toggleMobileMenu} className={styles.mobileMenuButton} aria-label="Toggle Mobile Menu">
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {/* Pass placeholderNavItems to MobileMenu */}
      {/* MobileMenu component will also need to be adjusted to expect this simpler structure */}
      <MobileMenu isOpen={isMobileMenuOpen} onClose={toggleMobileMenu} navigationData={placeholderNavItems} />

      {/* Newsletter Component */}
      {/* Assuming Newsletter component does not heavily rely on the full NavigationData structure */}      
      {isNewsletterVisible && <Newsletter isOpen={isNewsletterVisible} onClose={handleNewsletterToggle} />}
    </header>
  );
};

export default Header; 
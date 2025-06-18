import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Search, ChevronDown, Menu, MessageSquare } from "lucide-react";
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
    setActiveDropdown(null);
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

  // Close dropdown when clicking outside (basic implementation)
  // You might need a more sophisticated solution depending on your needs
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return; // Basic check
      // Check if the click is outside any dropdown content or dropdown trigger
      const dropdownTriggers = document.querySelectorAll(`.${styles.navItemContainer}`);
      const dropdownContents = document.querySelectorAll(`.${styles.dropdownContent}`);

      let isClickInsideDropdown = false;
      dropdownTriggers.forEach(trigger => {
        if (trigger.contains(event.target as Node)) {
          isClickInsideDropdown = true;
        }
      });
      dropdownContents.forEach(content => {
         if (content.contains(event.target as Node)) {
          isClickInsideDropdown = true;
        }
      });

      if (!isClickInsideDropdown) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [styles.navItemContainer, styles.dropdownContent]);

  return (
    <header className={styles.header}>
      {/* Topbar */}
      <div className={styles.topbar} role="navigation" aria-label="Top navigation">
        <div className={styles.topbarWrapper}>
          <div className={styles.topbarLinks}>
            <Link
              className={styles.topbarLink}
              to="/en-gb/contact"
              onClick={() => handleLinkClick('Contact us')}
              title="Contact us"
            >
              Contact us
            </Link>
            <Link
              className={styles.topbarLink}
              to="/en-gb/resources/ftc"
              onClick={() => handleLinkClick('Future Travel Credit')}
              title="Future Travel Credit"
            >
              Future Travel Credit
            </Link>
            <button
              className={styles.topbarLink}
              onClick={handleNewsletterClick}
              title="Subscribe to emails"
            >
              Subscribe to emails
            </button>
            <a
              className={styles.topbarLink}
              href="https://my.contiki.com/login"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleLoginClick('traveller')}
              title="Traveller log in"
            >
              Traveller log in
            </a>
            <a
              className={styles.topbarLink}
              href="https://agents.ttc.com/login"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleLoginClick('agent')}
              title="Agent log in"
            >
              Agent log in
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className={styles.navbarWrapper}>
          {/* Logo */}
        <Link className={styles.navbarLogo} to="/" aria-label="Contiki Home">
            <picture className={styles.navbarLogoImage}>
              <source 
                srcSet="https://www.contiki.com/media/hvkhcawu/contiki-primary-logo-black.svg?center=0.5%2C0.5&amp;format=webp&amp;mode=crop&amp;width=400&amp;height=400&amp;quality=80" 
                media="(max-width: 768px) and (-webkit-min-device-pixel-ratio: 2)"
              />
              <source 
                srcSet="https://www.contiki.com/media/hvkhcawu/contiki-primary-logo-black.svg?center=0.5%2C0.5&amp;format=webp&amp;mode=crop&amp;width=200&amp;height=200&amp;quality=80" 
                media="(max-width: 768px)"
              />
              <source 
                srcSet="https://www.contiki.com/media/hvkhcawu/contiki-primary-logo-black.svg?center=0.5%2C0.5&amp;format=webp&amp;mode=crop&amp;width=1600&amp;height=400&amp;quality=80" 
                media="(-webkit-min-device-pixel-ratio: 2)"
              />
              <img 
                src="https://www.contiki.com/media/hvkhcawu/contiki-primary-logo-black.svg?center=0.5%2C0.5&amp;format=webp&amp;mode=crop&amp;width=800&amp;height=200&amp;quality=80" 
                data-src="https://www.contiki.com/media/hvkhcawu/contiki-primary-logo-black.svg?center=0.5%2C0.5&amp;format=webp&amp;mode=crop&amp;width=800&amp;height=200&amp;quality=80" 
                alt="image" 
                className={styles.navbarLogoImage}
                draggable="true"
              />
            </picture>
          </Link>

        <div className={styles.navbarLinks}>
          {/* Menu Button (for mobile) */}
          <button 
            className={styles.navbarMenuButton}
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu className={styles.navbarMenuIcon} />
          </button>

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

          {/* Search Bar and Contact Info */}
          <div className={styles.navbarRightSide}>
            {/* Search Bar */}
            <div className={styles.searchBar}>
              <input
                type="text"
                placeholder="Aged 18-35? Find your adventure."
                className={styles.searchInput}
              />
              <button className={`${styles.searchButton} ${styles.searchButtonCircular}`}>
                <Search className={styles.searchIcon} />
              </button>
            </div>

            {/* Contact Info */}
            <div className={styles.contactInfo}>
              <span className={styles.phoneNumber}>0808 281 1120</span>
              <div className={styles.contactIcons}>
                <MessageSquare className={styles.contactIcon} />
                <ChevronDown className={styles.contactIcon} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        navigationData={NAV_ITEMS.map(item => ({
          name: item.label,
          type: item.hasDropdown ? 'dropdown' : 'link', // Assuming dropdown if hasDropdown is true
          href: item.to,
        }))}
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

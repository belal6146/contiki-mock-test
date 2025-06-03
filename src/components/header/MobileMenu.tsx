import React from 'react';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';
import styles from './Header.module.css';

// Updated interface to match placeholderNavItems structure
interface MobileNavItem {
  name: string;
  type: 'link' | 'dropdown'; // Keep type for potential future use
  href?: string; // Use href consistent with anchor tags
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  // Updated prop name and type
  navigationData: MobileNavItem[];
  // onLinkClick: (label: string) => void; // Remove or adjust if not needed with simplified links
}

// Updated component to use navigationData prop
const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose, navigationData }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.mobileMenu}>
      <div className={styles.mobileMenuHeader}>
        <button className={styles.mobileMenuCloseButton} onClick={onClose}>
          <X className={styles.mobileMenuCloseIcon} />
        </button>
      </div>
      <nav className={styles.mobileMenuNav}>
        {/* Mapping over navigationData and using 'name' and 'href' */}
        {navigationData.map((item) => (
          <div key={item.name} className={styles.mobileMenuItem}>
            {/* Using anchor tags for simplicity */}
            <a
              href={item.href || '#'}
              className={styles.mobileMenuLink}
              onClick={() => {
                // onLinkClick(item.name); // Call if needed
                onClose(); // Close menu on link click
              }}
            >
              {item.name}
            </a>
          </div>
        ))}
      </nav>
      <div className={styles.mobileMenuFooter}>
        {/* Footer links - keep as is or adjust as needed */}
        <Link to="/contact" className={styles.mobileMenuFooterLink}>
          Contact Us
        </Link>
        <Link to="/login" className={styles.mobileMenuFooterLink}>
          Login
        </Link>
      </div>
    </div>
  );
};

export default MobileMenu;

import React from 'react';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';
import styles from './Header.module.css';

interface NavItem {
  label: string;
  to: string;
  hasDropdown: boolean;
  dropdownContent?: any;
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: NavItem[];
  onLinkClick: (label: string) => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose, navItems, onLinkClick }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.mobileMenu}>
      <div className={styles.mobileMenuHeader}>
        <button className={styles.mobileMenuCloseButton} onClick={onClose}>
          <X className={styles.mobileMenuCloseIcon} />
        </button>
      </div>
      <nav className={styles.mobileMenuNav}>
        {navItems.map((item) => (
          <div key={item.label} className={styles.mobileMenuItem}>
            <Link
              to={item.to}
              className={styles.mobileMenuLink}
              onClick={() => {
                onLinkClick(item.label);
                onClose();
              }}
            >
              {item.label}
            </Link>
          </div>
        ))}
      </nav>
      <div className={styles.mobileMenuFooter}>
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

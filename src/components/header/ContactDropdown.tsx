import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MessageCircle } from 'lucide-react';
import styles from './Header.module.css';

const ContactDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.contactDropdown}>
      <button
        className={styles.contactDropdownTrigger}
        onClick={toggleDropdown}
        aria-expanded={isOpen}
      >
        <MessageCircle className={styles.contactDropdownIcon} />
      </button>
      {isOpen && (
        <div className={styles.contactDropdownContent}>
          <div className={styles.contactDropdownSection}>
            <h3 className={styles.contactDropdownHeading}>Contact Us</h3>
            <div className={styles.contactDropdownItems}>
              <a href="tel:08082811120" className={styles.contactDropdownItem}>
                <Phone className={styles.contactDropdownItemIcon} />
                <span>0808 281 1120</span>
              </a>
              <a href="mailto:info@contiki.com" className={styles.contactDropdownItem}>
                <Mail className={styles.contactDropdownItemIcon} />
                <span>info@contiki.com</span>
              </a>
            </div>
          </div>
          <div className={styles.contactDropdownSection}>
            <h3 className={styles.contactDropdownHeading}>Quick Links</h3>
            <div className={styles.contactDropdownItems}>
              <Link to="/contact" className={styles.contactDropdownItem}>
                Contact Us
              </Link>
              <Link to="/faq" className={styles.contactDropdownItem}>
                FAQ
              </Link>
              <Link to="/support" className={styles.contactDropdownItem}>
                Support
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactDropdown; 
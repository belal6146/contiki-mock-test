import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';

interface DropdownItem {
  label: string;
  to: string;
  description?: string;
  image?: string;
}

interface DropdownSection {
  heading?: string;
  items: DropdownItem[];
}

interface DropdownContent {
  sections?: DropdownSection[];
  items?: DropdownItem[];
}

interface DropdownItemsProps {
  dropdownContent: DropdownContent;
  onClick?: (label: string) => void;
}

const DropdownItems: React.FC<DropdownItemsProps> = ({ dropdownContent, onClick }) => {
  return (
    <div className={styles.dropdownContent}>
      {dropdownContent.sections?.map((section, index) => (
        <div key={section.heading || `section-${index}`} className={styles.dropdownSection}>
          {section.heading && (
            <h3 className={styles.dropdownSectionHeading}>{section.heading}</h3>
          )}
          <div className={styles.dropdownItems}>
            {section.items.map((item, itemIndex) => (
              <Link
                key={item.label || `item-${itemIndex}`}
                to={item.to}
                className={styles.dropdownItem}
                onClick={() => onClick?.(item.label)}
              >
                {item.image && (
                  <div className={styles.dropdownItemImage}>
                    <img src={item.image} alt={item.label} />
                  </div>
                )}
                <div className={styles.dropdownItemContent}>
                  <span className={styles.dropdownItemLabel}>{item.label}</span>
                  {item.description && (
                    <p className={styles.dropdownItemDescription}>{item.description}</p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      ))}
      {dropdownContent.items?.map((item, index) => (
        <Link
          key={item.label || `item-${index}`}
          to={item.to}
          className={styles.dropdownItem}
          onClick={() => onClick?.(item.label)}
        >
          {item.image && (
            <div className={styles.dropdownItemImage}>
              <img src={item.image} alt={item.label} />
            </div>
          )}
          <div className={styles.dropdownItemContent}>
            <span className={styles.dropdownItemLabel}>{item.label}</span>
            {item.description && (
              <p className={styles.dropdownItemDescription}>{item.description}</p>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default DropdownItems;

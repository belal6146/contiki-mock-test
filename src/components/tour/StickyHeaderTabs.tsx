import React from 'react';
import styles from './StickyHeaderTabs.module.css';
import cn from 'classnames';

interface StickyHeaderTabsProps {
  tabs: {
    id: string;
    label: string;
  }[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

const StickyHeaderTabs: React.FC<StickyHeaderTabsProps> = ({ tabs, activeTab, onTabChange }) => {
  return (
    <div className={styles.stickyHeader__tabs}>
      {tabs.map((tab, index) => (
        <React.Fragment key={tab.id}>
          <div
            className={cn(
              styles.stickyHeader__tab,
              activeTab === tab.id && styles['stickyHeader__tab--active']
            )}
            data-testid={activeTab === tab.id ? "sticky-header-tab-active" : "sticky-header-tab"}
            onClick={() => onTabChange(tab.id)}
          >
            <p className={cn(
              styles.stickyHeader__tabText,
              styles['text-paragraph-s'],
              activeTab === tab.id && styles['stickyHeader__tabText--active']
            )}
            data-testid="genericText"
            >
              {tab.label}
            </p>
          </div>
          {index < tabs.length - 1 && (
            <span className={cn(styles.divider, styles['divider--vertical'])} data-testid="divider" style={{ height: '1em' }}></span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default StickyHeaderTabs; 
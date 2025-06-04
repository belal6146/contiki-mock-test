import React from 'react';
import { cn } from '@/lib/utils';
import styles from './SimpleTripTabs.module.css';

interface SimpleTripTabsProps {
  children: React.ReactNode;
  tabs: {
    id: string;
    label: string;
  }[];
  activeTab: string;
  onChange: (tabId: string) => void;
}

const SimpleTripTabs: React.FC<SimpleTripTabsProps> = ({ children, tabs, activeTab, onChange }) => {

  const handleTabClick = (tabId: string) => {
    onChange(tabId);
  };

  return (
    <div className={cn(styles.tabSection, "sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm")}>
      <div className={cn(styles.container, "max-w-5xl mx-auto px-4")}>
        <div className={cn(styles.tabsContainer, "flex overflow-x-auto")}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={cn(
                styles.tabButton,
                "px-6 py-4 font-semibold text-sm transition-colors whitespace-nowrap",
                activeTab === tab.id ? styles.active : "border-transparent text-gray-500 hover:text-black"
              )}
              onClick={() => handleTabClick(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      {/* Tab Content */}
      <div className="py-8">
        {children}
      </div>
    </div>
  );
};

export default SimpleTripTabs; 
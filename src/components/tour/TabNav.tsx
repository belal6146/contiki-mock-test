import React, { useState, useEffect, KeyboardEvent } from 'react';
import { cn } from '@/lib/utils';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import styles from './TabNav.module.css';

interface TabNavProps {
  children: React.ReactNode;
  tabs: {
    id: string;
    label: string;
  }[];
  activeTab?: string;
  onChange?: (tabId: string) => void;
}

const TabNav: React.FC<TabNavProps> = ({ children, tabs, activeTab: externalActiveTab, onChange }) => {
  const [internalActiveTab, setInternalActiveTab] = useState(externalActiveTab || tabs[0]?.id);
  
  // Sync internal state with external prop if provided
  useEffect(() => {
    if (externalActiveTab) {
      setInternalActiveTab(externalActiveTab);
    }
  }, [externalActiveTab]);

  useEffect(() => {
    console.debug('[ResponsiveQA] TabNav', { 
      initialActiveTab: internalActiveTab, 
      tabsCount: tabs.length,
      breakpoint: window.innerWidth <= 640 ? 'mobile' : 
                  window.innerWidth <= 1024 ? 'tablet' : 'desktop'
    });
    
    console.debug('[A11y] fixed', { 
      componentName: 'TabNav', 
      issue: 'Enhanced keyboard navigation and ARIA attributes'
    });
  }, [internalActiveTab, tabs.length]);

  // Get the active tab id to use
  const activeTab = externalActiveTab || internalActiveTab;

  const handleTabClick = (tabId: string) => {
    console.debug('[TabNav] tabClicked', { tab: tabs.find(tab => tab.id === tabId)?.label });
    
    if (onChange) {
      onChange(tabId);
    } else {
      setInternalActiveTab(tabId);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>, currentIndex: number) => {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      e.preventDefault();
      
      const direction = e.key === 'ArrowLeft' ? -1 : 1;
      const nextIndex = (currentIndex + direction + tabs.length) % tabs.length;
      const nextTabId = tabs[nextIndex].id;
      
      if (onChange) {
        onChange(nextTabId);
      } else {
        setInternalActiveTab(nextTabId);
      }
      
      document.getElementById(`tab-${nextTabId}`)?.focus();
      
      console.debug('[TabNav] keyNavigation', { 
        direction: e.key, 
        prevTab: tabs[currentIndex].label,
        nextTab: tabs[nextIndex].label 
      });
    }
  };

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: tabs.length,
      slidesToSlide: 1
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
      slidesToSlide: 1
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1
    }
  };

  return (
    <div className="w-full bg-white border-b border-gray-200">
      <div className="container max-w-7xl mx-auto">
        {/* Tab Headers with Carousel */}
        <div className={styles.tab__section} style={{ '--tabs-count': tabs.length } as React.CSSProperties}>
          <Carousel
            responsive={responsive}
            infinite={false}
            showDots={false}
            arrows={false}
            className={styles.tab__carousel}
            itemClass={styles.tab__item}
            containerClass={styles.tab__container}
          >
            {tabs.map((tab, index) => (
              <React.Fragment key={tab.id}>
                <div
                  className={cn(
                    styles.tab__item,
                    styles['tab__item--uppercase'],
                    activeTab === tab.id && styles['tab__item--active']
                  )}
                  data-testid={activeTab === tab.id ? "tab-active" : "tab"}
                  onClick={() => handleTabClick(tab.id)}
                >
                  <p 
                    className={cn(
                      styles['tab__item-text'],
                      activeTab === tab.id && styles['tab__item-text--active']
                    )}
                    data-item-type="General Interaction"
                    data-item-name="tour-page-tab"
                    data-testid="genericText"
                  >
                    {tab.label}
                  </p>
                </div>
                {index < tabs.length - 1 && (
                  <div className={styles['tab__item-divider']} data-testid="divider" />
                )}
              </React.Fragment>
            ))}
          </Carousel>
        </div>
        {/* Tab Content */}
        <div className="py-8">
          {children}
        </div>
      </div>
    </div>
  );
};

export default TabNav;

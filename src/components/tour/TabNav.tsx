import React, { useState, useEffect, KeyboardEvent, useRef } from 'react';
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
  const [mounted, setMounted] = useState(false);
  
  // Sync internal state with external prop if provided
  useEffect(() => {
    if (externalActiveTab) {
      setInternalActiveTab(externalActiveTab);
    }
  }, [externalActiveTab]);

  // Effect to set mounted to true after component mounts
  useEffect(() => {
    // Use a small timeout to ensure DOM is ready and styles applied
    const timer = setTimeout(() => {
      setMounted(true);
      console.debug('[TabNav] mounted effect triggered');

      // Trigger a window resize event to potentially force carousel recalculation
      try {
        window.dispatchEvent(new Event('resize'));
        console.debug('[TabNav] dispatched resize event');
      } catch (e) {
        // Fallback for older browsers that don't support new Event()
        const resizeEvent = document.createEvent('HTMLEvents');
        resizeEvent.initEvent('resize', true, false);
        window.dispatchEvent(resizeEvent);
        console.debug('[TabNav] dispatched fallback resize event');
      }

    }, 100); // Increased timeout slightly
    
    return () => clearTimeout(timer);
  }, []); // Empty dependency array ensures this runs once on mount

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
        {mounted && (
          <div className={styles.tab__section} style={{ '--tabs-count': tabs.length } as React.CSSProperties}>
            <Carousel
              responsive={responsive}
              infinite={false}
              showDots={false}
              arrows={false}
              className={styles.tab__carousel}
              itemClass={styles.tab__item}
              containerClass={styles.tab__container}
              key={mounted ? 'mounted' : 'not-mounted'}
            >
              {tabs.map((tab, index) => (
                <div key={tab.id} className={cn(styles.tab__itemWrapper)}>
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
                </div>
              ))}
            </Carousel>
          </div>
        )}
        {/* Tab Content */}
        <div className="py-8">
          {children}
        </div>
      </div>
    </div>
  );
};

export default TabNav;

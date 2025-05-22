
import React, { useState, useEffect, KeyboardEvent } from 'react';
import { cn } from '@/lib/utils';

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
    console.debug('[TabNav] mounted', { initialActiveTab: internalActiveTab, tabsCount: tabs.length });
  }, []);

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

  return (
    <section className="py-6 border-t border-gray-200" aria-labelledby="tabNav-title">
      <div className="container">
        {/* Hidden accessible title for screen readers */}
        <h2 id="tabNav-title" className="sr-only">Tour Information Tabs</h2>
        
        {/* Tab Navigation */}
        <div className="border-b border-gray-200 mb-8" role="tablist" aria-label="Tour details">
          <div className="flex overflow-x-auto hide-scrollbar">
            {tabs.map((tab, index) => (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className={cn(
                  "px-4 md:px-6 py-3 font-medium font-montserrat whitespace-nowrap text-sm md:text-base",
                  "focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2",
                  "relative transition-colors",
                  activeTab === tab.id
                    ? "text-primary"
                    : "text-gray-500 hover:text-primary"
                )}
                aria-selected={activeTab === tab.id}
                aria-controls={`tab-panel-${tab.id}`}
                id={`tab-${tab.id}`}
                role="tab"
                tabIndex={activeTab === tab.id ? 0 : -1}
                type="button"
              >
                {tab.label}
                <span 
                  className={cn(
                    "absolute bottom-0 left-0 w-full h-0.5 bg-[#CCFF00]",
                    "transition-transform duration-150 ease-in-out",
                    activeTab === tab.id ? "scale-x-100" : "scale-x-0"
                  )}
                  aria-hidden="true"
                />
              </button>
            ))}
          </div>
        </div>
        
        {/* Tab Content */}
        <div 
          className="min-h-[400px]" 
          role="tabpanel" 
          id={`tab-panel-${activeTab}`} 
          aria-labelledby={`tab-${activeTab}`}
          tabIndex={0}
        >
          {children}
        </div>
      </div>
    </section>
  );
};

export default TabNav;

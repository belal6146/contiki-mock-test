
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

  return (
    <section className="bg-white" aria-labelledby="tabNav-title">
      <div className="container">
        {/* Hidden accessible title for screen readers */}
        <h2 id="tabNav-title" className="sr-only">Tour Information Tabs</h2>
        
        {/* Tab Navigation */}
        <div className="border-b border-gray-200" role="tablist" aria-label="Tour details">
          <div className="flex overflow-x-auto hide-scrollbar">
            {tabs.map((tab, index) => (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className={cn(
                  "px-4 py-3 font-bold text-sm uppercase tracking-wider whitespace-nowrap",
                  "focus:outline-none focus:ring-0",
                  "relative transition-colors duration-150 border-b-2",
                  activeTab === tab.id
                    ? "text-black border-b-[#CCFF00]"
                    : "text-gray-500 hover:text-black border-b-transparent"
                )}
                aria-selected={activeTab === tab.id}
                aria-controls={`tab-panel-${tab.id}`}
                id={`tab-${tab.id}`}
                role="tab"
                tabIndex={activeTab === tab.id ? 0 : -1}
                type="button"
                data-tab={tab.id}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
        
        {/* Tab Content */}
        <div 
          className="min-h-[300px] md:min-h-[400px]" 
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

import React, { useState, useEffect, KeyboardEvent } from 'react';
import { cn } from '@/lib/utils';

interface TabNavProps {
  children: React.ReactNode;
  tabs: {
    id: string;
    label: string;
  }[];
}

const TabNav: React.FC<TabNavProps> = ({ children, tabs }) => {
  const [activeTab, setActiveTab] = useState(tabs[0]?.id);

  useEffect(() => {
    console.debug('[TabNav] mounted', { initialActiveTab: activeTab, tabsCount: tabs.length });
  }, []);

  // Filter and get the active tab's children
  const activeContent = React.Children.toArray(children).find(
    (child) => React.isValidElement(child) && child.props.id === activeTab
  );

  const handleTabClick = (tabId: string) => {
    console.debug('[TabNav] tabClicked', { tab: tabs.find(tab => tab.id === tabId)?.label });
    setActiveTab(tabId);
  };

  // Updated the type here to match the event from button elements
  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>, currentIndex: number) => {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      e.preventDefault();
      
      const direction = e.key === 'ArrowLeft' ? -1 : 1;
      const nextIndex = (currentIndex + direction + tabs.length) % tabs.length;
      const nextTabId = tabs[nextIndex].id;
      
      setActiveTab(nextTabId);
      document.getElementById(`tab-${nextTabId}`)?.focus();
      
      console.debug('[TabNav] keyNavigation', { 
        direction: e.key, 
        prevTab: tabs[currentIndex].label,
        nextTab: tabs[nextIndex].label 
      });
    }
  };

  return (
    <section className="py-8" aria-labelledby="tabNav-title">
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
                  "px-4 md:px-6 py-3 font-medium font-montserrat whitespace-nowrap text-sm md:text-base transition-colors relative",
                  activeTab === tab.id
                    ? "text-primary border-b-2 border-primary"
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
                {activeTab === tab.id && (
                  <span 
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-primary" 
                    aria-hidden="true"
                  />
                )}
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
          {activeContent}
        </div>
      </div>
    </section>
  );
};

// TabPanel component to wrap each tab's content
export const TabPanel: React.FC<{ id: string; children: React.ReactNode }> = ({ children, id }) => {
  return <div id={id}>{children}</div>;
};

export default TabNav;

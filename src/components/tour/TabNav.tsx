
import React, { useState, useEffect } from 'react';
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

  useEffect(() => {
    console.debug('[TabNav] tab changed', { activeTab, tabLabel: tabs.find(tab => tab.id === activeTab)?.label });
  }, [activeTab, tabs]);

  // Filter and get the active tab's children
  const activeContent = React.Children.toArray(children).find(
    (child) => React.isValidElement(child) && child.props.id === activeTab
  );

  const handleTabClick = (tabId: string) => {
    console.debug('[TabNav] tab clicked', { tabId, previousTab: activeTab });
    setActiveTab(tabId);
  };

  return (
    <section className="py-8" aria-labelledby="tabNav-title">
      <div className="container">
        {/* Hidden accessible title for screen readers */}
        <h2 id="tabNav-title" className="sr-only">Tour Information Tabs</h2>
        
        {/* Tab Navigation */}
        <div className="border-b border-gray-200 mb-8" role="tablist" aria-label="Tour details">
          <div className="flex overflow-x-auto hide-scrollbar">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={cn(
                  "px-4 md:px-6 py-3 font-medium whitespace-nowrap text-sm md:text-base transition-colors relative",
                  activeTab === tab.id
                    ? "text-primary border-b-2 border-primary"
                    : "text-gray-500 hover:text-primary"
                )}
                aria-selected={activeTab === tab.id}
                aria-controls={`tab-panel-${tab.id}`}
                id={`tab-${tab.id}`}
                role="tab"
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

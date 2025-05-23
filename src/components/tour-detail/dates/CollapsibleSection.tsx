
import React from 'react';
import { ChevronUp, ChevronDown, LucideIcon } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface CollapsibleSectionProps {
  title: string;
  icon: LucideIcon;
  isOpen: boolean;
  onToggle: (isOpen: boolean) => void;
  children: React.ReactNode;
}

const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({
  title,
  icon: Icon,
  isOpen,
  onToggle,
  children
}) => {
  return (
    <Collapsible open={isOpen} onOpenChange={onToggle}>
      <div className="border border-gray-200 rounded-lg overflow-hidden font-montserrat">
        <CollapsibleTrigger className="w-full px-6 py-4 bg-gray-50 hover:bg-gray-100 transition-colors">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Icon className="mr-3 h-5 w-5 text-black" />
              <span className="font-bold text-gray-900 uppercase tracking-wide">{title}</span>
            </div>
            {isOpen ? <ChevronUp className="h-5 w-5 text-gray-600" /> : <ChevronDown className="h-5 w-5 text-gray-600" />}
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent>
          {children}
        </CollapsibleContent>
      </div>
    </Collapsible>
  );
};

export default CollapsibleSection;

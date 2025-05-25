
import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Phone, MessageCircle } from 'lucide-react';
import { Input } from "@/components/ui/input";
import MenuLink from './MenuLink';
import DropdownItems from './DropdownItems';
import {
  destinationItems,
  travelStyleItems,
  aboutItems,
  inspiredItems
} from './NavigationData';

interface DesktopNavProps {
  onLinkClick: (label: string) => void;
}

const DesktopNav: React.FC<DesktopNavProps> = ({ onLinkClick }) => {
  return (
    <>
      {/* Desktop navigation - centered */}
      <nav className="hidden lg:flex items-center justify-center flex-1">
        <ul className="flex items-center space-x-8">
          <li>
            <MenuLink 
              to="/destinations" 
              label="DESTINATIONS" 
              hasDropdown 
              onClick={onLinkClick}
            >
              <DropdownItems items={destinationItems} onClick={onLinkClick} />
            </MenuLink>
          </li>
          <li>
            <MenuLink 
              to="/deals" 
              label="DEALS" 
              hasDropdown 
              onClick={onLinkClick}
            >
              <DropdownItems 
                items={[{ label: 'Current Deals', to: '/deals/current-deals' }]} 
                onClick={onLinkClick} 
              />
            </MenuLink>
          </li>
          <li>
            <MenuLink 
              to="/travel-styles" 
              label="TRAVEL STYLES" 
              hasDropdown 
              onClick={onLinkClick}
            >
              <DropdownItems items={travelStyleItems} onClick={onLinkClick} />
            </MenuLink>
          </li>
          <li>
            <MenuLink 
              to="/about-contiki" 
              label="ABOUT CONTIKI" 
              hasDropdown 
              onClick={onLinkClick}
            >
              <DropdownItems items={aboutItems} onClick={onLinkClick} />
            </MenuLink>
          </li>
          <li>
            <MenuLink 
              to="/get-inspired" 
              label="GET INSPIRED" 
              hasDropdown 
              onClick={onLinkClick}
            >
              <DropdownItems items={inspiredItems} onClick={onLinkClick} />
            </MenuLink>
          </li>
        </ul>
      </nav>
      
      {/* Right side elements */}
      <div className="hidden lg:flex items-center space-x-3">
        <div className="relative">
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none z-10">
            <div className="bg-[#CCFF00] rounded-full p-1.5">
              <Search className="h-4 w-4 text-black" />
            </div>
          </div>
          <Input 
            type="search" 
            placeholder="Aged 18-35? Find your adventure" 
            className="pr-12 text-sm w-64 h-9 border border-gray-300 rounded-full focus:ring-2 focus:ring-[#CCFF00] focus:border-[#CCFF00] transition-all duration-150 ease-in-out bg-white text-gray-600 placeholder-gray-500"
          />
        </div>
        
        <a 
          href="tel:08082811120" 
          className="flex items-center px-3 py-1.5 bg-white rounded-full border border-gray-300 text-black font-medium text-sm hover:bg-gray-50 transition-all duration-150 ease-in-out whitespace-nowrap"
          onClick={() => onLinkClick('Phone')}
        >
          <Phone className="h-4 w-4 mr-2" />
          0808 281 1120
        </a>
        
        <button 
          className="flex items-center px-3 py-1.5 bg-white rounded-full border border-gray-300 text-black font-medium text-sm hover:bg-gray-50 transition-all duration-150 ease-in-out"
          onClick={() => onLinkClick('Chat')}
        >
          <MessageCircle className="h-4 w-4 mr-2" />
          Chat
        </button>
      </div>
    </>
  );
};

export default DesktopNav;

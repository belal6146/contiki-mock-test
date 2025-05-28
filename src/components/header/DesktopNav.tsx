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
      {/* Desktop navigation */}
      <nav className="hidden lg:flex items-center justify-center flex-1">
        <ul className="flex items-center space-x-12 uppercase font-medium tracking-wide">
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
            <div className="bg-[#CCFF00] rounded-full p-2">
              <Search className="h-4 w-4 text-black" />
            </div>
          </div>
          <Input 
            type="search" 
            placeholder="Aged 18-35? Find your adventure" 
            className="pr-14 text-sm w-80 h-12 border border-gray-300 rounded-full focus:ring-2 focus:ring-[#CCFF00] focus:border-[#CCFF00] transition-all duration-150 bg-white text-gray-600 placeholder-gray-500"
          />
        </div>
        
        <a 
          href="tel:08082811120" 
          className="flex items-center px-6 py-3 bg-white rounded-full border border-gray-300 text-gray-900 font-semibold text-sm hover:text-secondary focus:outline-none focus:ring-2 focus:ring-secondary transition-all duration-150 whitespace-nowrap"
          onClick={() => onLinkClick('Phone')}
        >
          <Phone className="h-4 w-4 mr-2 text-gray-900 group-hover:text-secondary transition-colors" />
          0808 281 1120
        </a>
        
        <button 
          className="flex items-center px-6 py-3 bg-white rounded-full border border-gray-300 text-gray-900 font-semibold text-sm hover:text-secondary focus:outline-none focus:ring-2 focus:ring-secondary transition-all duration-150"
          onClick={() => onLinkClick('Chat')}
        >
          <MessageCircle className="h-4 w-4 mr-2 text-gray-900 group-hover:text-secondary transition-colors" />
          Chat
        </button>
      </div>
    </>
  );
};

export default DesktopNav;


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
        <ul className="flex items-center space-x-10">
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
      <div className="hidden lg:flex items-center space-x-4">
        <div className="relative">
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none z-10">
            <div className="bg-[#CCFF00] rounded-full p-2.5">
              <Search className="h-4 w-4 text-black" />
            </div>
          </div>
          <Input 
            type="search" 
            placeholder="Aged 18-35? Find your adventure" 
            className="pr-16 text-sm w-96 h-14 border border-gray-300 rounded-full focus:ring-2 focus:ring-[#CCFF00] focus:border-[#CCFF00] transition bg-white text-gray-600 placeholder-gray-600"
          />
        </div>
        
        <a 
          href="tel:08082811120" 
          className="flex items-center px-8 py-4 bg-white rounded-full border border-gray-300 text-black font-semibold text-sm hover:bg-gray-50 transition whitespace-nowrap"
          onClick={() => onLinkClick('Phone')}
        >
          <Phone className="h-4 w-4 mr-2" />
          0808 281 1120
        </a>
        
        <button 
          className="flex items-center px-8 py-4 bg-white rounded-full border border-gray-300 text-black font-semibold text-sm hover:bg-gray-50 transition"
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

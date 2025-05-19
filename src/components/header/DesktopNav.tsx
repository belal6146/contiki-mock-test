
import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Phone } from 'lucide-react';
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
      <nav className="hidden md:flex items-center justify-center flex-1 mx-8">
        <ul className="flex space-x-2">
          <li>
            <MenuLink 
              to="/destinations" 
              label="Destinations" 
              hasDropdown 
              onClick={onLinkClick}
            >
              <DropdownItems items={destinationItems} onClick={onLinkClick} />
            </MenuLink>
          </li>
          <li>
            <MenuLink to="/deals" label="Deals" onClick={onLinkClick} />
          </li>
          <li>
            <MenuLink 
              to="/travel-styles" 
              label="Travel Styles" 
              hasDropdown 
              onClick={onLinkClick}
            >
              <DropdownItems items={travelStyleItems} onClick={onLinkClick} />
            </MenuLink>
          </li>
          <li>
            <MenuLink 
              to="/about-contiki" 
              label="About Contiki" 
              hasDropdown 
              onClick={onLinkClick}
            >
              <DropdownItems items={aboutItems} onClick={onLinkClick} />
            </MenuLink>
          </li>
          <li>
            <MenuLink 
              to="/get-inspired" 
              label="Get Inspired" 
              hasDropdown 
              onClick={onLinkClick}
            >
              <DropdownItems items={inspiredItems} onClick={onLinkClick} />
            </MenuLink>
          </li>
        </ul>
      </nav>
      
      {/* Right side elements - search box, phone, etc. */}
      <div className="hidden md:flex items-center space-x-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <Input 
            type="search" 
            placeholder="Age 18–35? Find your adventure" 
            className="pl-10 text-sm w-64 h-10 border border-gray-300 rounded-full focus:ring-[#CCFF00] focus:border-[#CCFF00]"
          />
        </div>
        
        <a 
          href="tel:08082811120" 
          className="flex items-center px-4 py-2 bg-white rounded-full border border-gray-300 text-black font-medium text-sm hover:bg-gray-50 transition-colors duration-150"
          onClick={() => onLinkClick('Phone')}
        >
          <Phone className="h-4 w-4 mr-2" />
          0808 281 1120
        </a>
        
        <Link 
          to="/subscribe" 
          className="px-4 py-2 bg-[#CCFF00] rounded-full text-black font-medium text-sm hover:bg-[#CCFF00]/90 transition-colors duration-150"
          onClick={() => onLinkClick('Subscribe')}
        >
          Subscribe
        </Link>
      </div>
    </>
  );
};

export default DesktopNav;

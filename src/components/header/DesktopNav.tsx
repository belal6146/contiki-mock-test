
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
      <nav className="hidden lg:flex items-center justify-center flex-1 mx-8">
        <ul className="flex items-center">
          <li className="mr-6">
            <MenuLink 
              to="/destinations" 
              label="DESTINATIONS" 
              hasDropdown 
              onClick={onLinkClick}
            >
              <DropdownItems items={destinationItems} onClick={onLinkClick} />
            </MenuLink>
          </li>
          <li className="mr-6">
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
          <li className="mr-6">
            <MenuLink 
              to="/travel-styles" 
              label="TRAVEL STYLES" 
              hasDropdown 
              onClick={onLinkClick}
            >
              <DropdownItems items={travelStyleItems} onClick={onLinkClick} />
            </MenuLink>
          </li>
          <li className="mr-6">
            <MenuLink 
              to="/about-contiki" 
              label="ABOUT CONTIKI" 
              hasDropdown 
              onClick={onLinkClick}
            >
              <DropdownItems items={aboutItems} onClick={onLinkClick} />
            </MenuLink>
          </li>
          <li className="mr-6">
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
      
      {/* Right side elements - search box, phone, chat, etc. */}
      <div className="hidden lg:flex items-center space-x-4">
        <div className="relative">
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none z-10">
            <div className="bg-[#00CC66] rounded-full p-1.5">
              <Search className="h-4 w-4 text-white" />
            </div>
          </div>
          <Input 
            type="search" 
            placeholder="Aged 18-35? Find your adventure" 
            className="pr-12 text-sm w-80 h-10 border border-gray-300 rounded-full focus:ring-2 focus:ring-[#00CC66] focus:border-[#00CC66] transition-all duration-150 ease-in-out bg-white"
          />
        </div>
        
        <a 
          href="tel:08082811120" 
          className="flex items-center px-4 py-2 bg-white rounded-full border border-gray-300 text-black font-medium text-sm hover:bg-gray-50 transition-all duration-150 ease-in-out whitespace-nowrap"
          onClick={() => onLinkClick('Phone')}
        >
          <Phone className="h-4 w-4 mr-2" />
          0808 281 1120
        </a>
        
        <button 
          className="flex items-center px-4 py-2 bg-white rounded-full border border-gray-300 text-black font-medium text-sm hover:bg-gray-50 transition-all duration-150 ease-in-out"
          onClick={() => onLinkClick('Chat')}
        >
          <MessageCircle className="h-4 w-4 mr-2" />
          Chat
        </button>
        
        <Link 
          to="/subscribe" 
          className="px-4 py-2 bg-[#00CC66] rounded-full text-white font-medium text-sm hover:bg-[#00CC66]/90 transition-all duration-150 ease-in-out whitespace-nowrap"
          onClick={() => onLinkClick('Subscribe')}
        >
          Subscribe
        </Link>
      </div>
    </>
  );
};

export default DesktopNav;

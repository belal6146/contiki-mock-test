
import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Phone } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { cn } from '@/lib/utils';
import MenuLink from './MenuLink';
import { DropdownItem } from './DropdownItems';

interface MobileMenuProps {
  isOpen: boolean;
  destinationItems: DropdownItem[];
  travelStyleItems: DropdownItem[];
  aboutItems: DropdownItem[];
  inspiredItems: DropdownItem[];
  onLinkClick: (label: string) => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  destinationItems,
  travelStyleItems,
  aboutItems,
  inspiredItems,
  onLinkClick,
}) => {
  return (
    <div 
      className={cn(
        "md:hidden bg-white shadow-md transition-all duration-300 ease-in-out overflow-hidden", 
        isOpen ? "max-h-[80vh] border-t" : "max-h-0"
      )}
      id="mobile-menu"
    >
      <div className="container max-w-7xl mx-auto py-4 px-4">
        <div className="flex flex-col space-y-4">
          {/* Mobile search bar */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <Input 
              type="search" 
              placeholder="Age 18–35? Find your adventure" 
              className="pl-10 text-sm h-10 border border-gray-300 rounded-full focus:ring-[#CCFF00] focus:border-[#CCFF00]"
            />
          </div>
          
          {/* Mobile navigation */}
          <div className="space-y-4 py-2">
            <MenuLink to="/destinations" label="Destinations" hasDropdown isMobile onLinkClick={onLinkClick}>
              {destinationItems.map((item, index) => (
                <Link 
                  key={index}
                  to={item.to} 
                  className="block py-2 text-sm text-black"
                  onClick={() => onLinkClick(item.label)}
                >
                  {item.label}
                </Link>
              ))}
            </MenuLink>
            
            <MenuLink to="/deals" label="Deals" isMobile onLinkClick={onLinkClick} />
            
            <MenuLink to="/travel-styles" label="Travel Styles" hasDropdown isMobile onLinkClick={onLinkClick}>
              {travelStyleItems.map((item, index) => (
                <Link 
                  key={index}
                  to={item.to} 
                  className="block py-2 text-sm text-black"
                  onClick={() => onLinkClick(item.label)}
                >
                  {item.label}
                </Link>
              ))}
            </MenuLink>
            
            <MenuLink to="/about-contiki" label="About Contiki" hasDropdown isMobile onLinkClick={onLinkClick}>
              {aboutItems.map((item, index) => (
                <Link 
                  key={index}
                  to={item.to} 
                  className="block py-2 text-sm text-black"
                  onClick={() => onLinkClick(item.label)}
                >
                  {item.label}
                </Link>
              ))}
            </MenuLink>
            
            <MenuLink to="/get-inspired" label="Get Inspired" hasDropdown isMobile onLinkClick={onLinkClick}>
              {inspiredItems.map((item, index) => (
                <Link 
                  key={index}
                  to={item.to} 
                  className="block py-2 text-sm text-black"
                  onClick={() => onLinkClick(item.label)}
                >
                  {item.label}
                </Link>
              ))}
            </MenuLink>
          </div>
          
          {/* Mobile phone button */}
          <a 
            href="tel:08082811120" 
            className="flex items-center justify-center px-4 py-2 bg-white rounded-full border border-gray-300 text-black font-medium text-sm hover:bg-gray-50 transition-colors duration-150"
            onClick={() => onLinkClick('Phone')}
          >
            <Phone className="h-4 w-4 mr-2" />
            0808 281 1120
          </a>
          
          {/* Mobile subscribe button */}
          <Link 
            to="/subscribe" 
            className="flex items-center justify-center px-4 py-2 bg-[#CCFF00] rounded-full text-black font-medium text-sm hover:bg-[#CCFF00]/90 transition-colors duration-150"
            onClick={() => onLinkClick('Subscribe')}
          >
            Subscribe
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;

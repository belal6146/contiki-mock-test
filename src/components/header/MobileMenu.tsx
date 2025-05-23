
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
        "lg:hidden bg-white shadow-lg transition-all duration-300 ease-in-out overflow-hidden", 
        isOpen ? "max-h-screen border-t border-gray-100" : "max-h-0"
      )}
    >
      <div className="container max-w-7xl mx-auto py-6 px-4">
        <div className="flex flex-col space-y-6">
          {/* Mobile search bar */}
          <div className="relative">
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none z-10">
              <div className="bg-[#00CC66] rounded-full p-1.5">
                <Search className="h-4 w-4 text-white" />
              </div>
            </div>
            <Input 
              type="search" 
              placeholder="Aged 18-35? Find your adventure" 
              className="pr-12 text-sm h-10 border border-gray-300 rounded-full focus:ring-2 focus:ring-[#00CC66] focus:border-[#00CC66] transition-all duration-150 ease-in-out bg-white"
            />
          </div>
          
          {/* Mobile navigation */}
          <div className="space-y-1">
            <MenuLink to="/destinations" label="DESTINATIONS" hasDropdown isMobile onClick={onLinkClick}>
              {destinationItems.map((item, index) => (
                <Link 
                  key={index}
                  to={item.to} 
                  className="block py-2 text-sm text-gray-700 hover:text-[#00CC66] transition-all duration-150 ease-in-out"
                  onClick={() => onLinkClick(item.label)}
                >
                  {item.label}
                </Link>
              ))}
            </MenuLink>
            
            <MenuLink to="/deals" label="DEALS" hasDropdown isMobile onClick={onLinkClick}>
              <Link 
                to="/deals/current-deals" 
                className="block py-2 text-sm text-gray-700 hover:text-[#00CC66] transition-all duration-150 ease-in-out"
                onClick={() => onLinkClick('Current Deals')}
              >
                Current Deals
              </Link>
            </MenuLink>
            
            <MenuLink to="/travel-styles" label="TRAVEL STYLES" hasDropdown isMobile onClick={onLinkClick}>
              {travelStyleItems.map((item, index) => (
                <Link 
                  key={index}
                  to={item.to} 
                  className="block py-2 text-sm text-gray-700 hover:text-[#00CC66] transition-all duration-150 ease-in-out"
                  onClick={() => onLinkClick(item.label)}
                >
                  {item.label}
                </Link>
              ))}
            </MenuLink>
            
            <MenuLink to="/about-contiki" label="ABOUT CONTIKI" hasDropdown isMobile onClick={onLinkClick}>
              {aboutItems.map((item, index) => (
                <Link 
                  key={index}
                  to={item.to} 
                  className="block py-2 text-sm text-gray-700 hover:text-[#00CC66] transition-all duration-150 ease-in-out"
                  onClick={() => onLinkClick(item.label)}
                >
                  {item.label}
                </Link>
              ))}
            </MenuLink>
            
            <MenuLink to="/get-inspired" label="GET INSPIRED" hasDropdown isMobile onClick={onLinkClick}>
              {inspiredItems.map((item, index) => (
                <Link 
                  key={index}
                  to={item.to} 
                  className="block py-2 text-sm text-gray-700 hover:text-[#00CC66] transition-all duration-150 ease-in-out"
                  onClick={() => onLinkClick(item.label)}
                >
                  {item.label}
                </Link>
              ))}
            </MenuLink>
          </div>
          
          {/* Mobile utility links */}
          <div className="space-y-2 pt-4 border-t border-gray-200">
            <Link to="/contact-us" className="block py-2 text-sm text-gray-600 hover:text-[#00CC66] transition-all duration-150 ease-in-out" onClick={() => onLinkClick('Contact us')}>Contact us</Link>
            <Link to="/future-travel-credit" className="block py-2 text-sm text-gray-600 hover:text-[#00CC66] transition-all duration-150 ease-in-out" onClick={() => onLinkClick('Future Travel Credit')}>Future Travel Credit</Link>
            <Link to="/subscribe" className="block py-2 text-sm text-gray-600 hover:text-[#00CC66] transition-all duration-150 ease-in-out" onClick={() => onLinkClick('Subscribe to emails')}>Subscribe to emails</Link>
            <Link to="/login" className="block py-2 text-sm text-gray-600 hover:text-[#00CC66] transition-all duration-150 ease-in-out" onClick={() => onLinkClick('Traveller log in')}>Traveller log in</Link>
            <Link to="/agent-login" className="block py-2 text-sm text-gray-600 hover:text-[#00CC66] transition-all duration-150 ease-in-out" onClick={() => onLinkClick('Agent log in')}>Agent log in</Link>
          </div>
          
          {/* Mobile action buttons */}
          <div className="space-y-3 pt-4 border-t border-gray-200">
            <a 
              href="tel:08082811120" 
              className="flex items-center justify-center px-4 py-3 bg-white rounded-full border border-gray-300 text-black font-medium text-sm hover:bg-gray-50 transition-all duration-150 ease-in-out"
              onClick={() => onLinkClick('Phone')}
            >
              <Phone className="h-4 w-4 mr-2" />
              0808 281 1120
            </a>
            
            <Link 
              to="/subscribe" 
              className="flex items-center justify-center px-4 py-3 bg-[#00CC66] rounded-full text-white font-medium text-sm hover:bg-[#00CC66]/90 transition-all duration-150 ease-in-out"
              onClick={() => onLinkClick('Subscribe')}
            >
              Subscribe
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;

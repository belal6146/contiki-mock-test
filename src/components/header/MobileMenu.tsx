
import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Phone, X } from 'lucide-react';
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
        "lg:hidden fixed inset-0 z-50 bg-white transition-all duration-300 ease-in-out", 
        isOpen ? "opacity-100 visible" : "opacity-0 invisible"
      )}
    >
      {/* Full screen overlay */}
      <div className="h-full overflow-y-auto">
        {/* Header with close button */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="text-lg font-bold">Menu</div>
          <button 
            onClick={() => onLinkClick('close')}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          {/* Mobile navigation with proper spacing */}
          <div className="space-y-1">
            <MenuLink to="/destinations" label="DESTINATIONS" hasDropdown isMobile onClick={onLinkClick}>
              <div className="pl-4 space-y-3">
                {destinationItems.map((item, index) => (
                  <Link 
                    key={index}
                    to={item.to} 
                    className="block py-3 text-base text-gray-700 hover:text-black font-medium transition-all duration-150 ease-in-out border-b border-gray-100 last:border-b-0"
                    onClick={() => onLinkClick(item.label)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </MenuLink>
            
            <MenuLink to="/deals" label="DEALS" hasDropdown isMobile onClick={onLinkClick}>
              <div className="pl-4">
                <Link 
                  to="/deals/current-deals" 
                  className="block py-3 text-base text-gray-700 hover:text-black font-medium transition-all duration-150 ease-in-out"
                  onClick={() => onLinkClick('Current Deals')}
                >
                  Current Deals
                </Link>
              </div>
            </MenuLink>
            
            <MenuLink to="/travel-styles" label="TRAVEL STYLES" hasDropdown isMobile onClick={onLinkClick}>
              <div className="pl-4 space-y-3">
                {travelStyleItems.map((item, index) => (
                  <Link 
                    key={index}
                    to={item.to} 
                    className="block py-3 text-base text-gray-700 hover:text-black font-medium transition-all duration-150 ease-in-out border-b border-gray-100 last:border-b-0"
                    onClick={() => onLinkClick(item.label)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </MenuLink>
            
            <MenuLink to="/about-contiki" label="ABOUT CONTIKI" hasDropdown isMobile onClick={onLinkClick}>
              <div className="pl-4 space-y-3">
                {aboutItems.map((item, index) => (
                  <Link 
                    key={index}
                    to={item.to} 
                    className="block py-3 text-base text-gray-700 hover:text-black font-medium transition-all duration-150 ease-in-out border-b border-gray-100 last:border-b-0"
                    onClick={() => onLinkClick(item.label)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </MenuLink>
            
            <MenuLink to="/get-inspired" label="GET INSPIRED" hasDropdown isMobile onClick={onLinkClick}>
              <div className="pl-4 space-y-3">
                {inspiredItems.map((item, index) => (
                  <Link 
                    key={index}
                    to={item.to} 
                    className="block py-3 text-base text-gray-700 hover:text-black font-medium transition-all duration-150 ease-in-out border-b border-gray-100 last:border-b-0"
                    onClick={() => onLinkClick(item.label)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </MenuLink>
          </div>
          
          {/* Mobile utility links with proper spacing */}
          <div className="space-y-4 pt-8 border-t border-gray-200 mt-8">
            <Link to="/contact-us" className="block py-3 text-base text-gray-600 hover:text-black font-medium transition-all duration-150 ease-in-out" onClick={() => onLinkClick('Contact us')}>Contact us</Link>
            <Link to="/future-travel-credit" className="block py-3 text-base text-gray-600 hover:text-black font-medium transition-all duration-150 ease-in-out" onClick={() => onLinkClick('Future Travel Credit')}>Future Travel Credit</Link>
            <Link to="/subscribe" className="block py-3 text-base text-gray-600 hover:text-black font-medium transition-all duration-150 ease-in-out" onClick={() => onLinkClick('Subscribe to emails')}>Subscribe to emails</Link>
            <Link to="/login" className="block py-3 text-base text-gray-600 hover:text-black font-medium transition-all duration-150 ease-in-out" onClick={() => onLinkClick('Traveller log in')}>Traveller log in</Link>
            <Link to="/agent-login" className="block py-3 text-base text-gray-600 hover:text-black font-medium transition-all duration-150 ease-in-out" onClick={() => onLinkClick('Agent log in')}>Agent log in</Link>
          </div>
          
          {/* Mobile action buttons with proper styling */}
          <div className="space-y-4 pt-8 border-t border-gray-200 mt-8">
            <a 
              href="tel:08082811120" 
              className="flex items-center justify-center px-6 py-4 bg-white rounded-full border-2 border-gray-300 text-black font-bold text-base hover:bg-gray-50 transition-all duration-150 ease-in-out"
              onClick={() => onLinkClick('Phone')}
            >
              <Phone className="h-5 w-5 mr-3" />
              0808 281 1120
            </a>
            
            <Link 
              to="/subscribe" 
              className="flex items-center justify-center px-6 py-4 bg-[#CCFF00] rounded-full text-black font-bold text-base hover:bg-[#b8e600] transition-all duration-150 ease-in-out"
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

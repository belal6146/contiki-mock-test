
import React from 'react';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
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
  const navItems = [
    { label: 'DESTINATIONS', to: '/destinations', items: destinationItems },
    { label: 'DEALS', to: '/deals', items: [{ label: 'Current Deals', to: '/deals/current-deals' }] },
    { label: 'TRAVEL STYLES', to: '/travel-styles', items: travelStyleItems },
    { label: 'ABOUT CONTIKI', to: '/about-contiki', items: aboutItems },
    { label: 'GET INSPIRED', to: '/get-inspired', items: inspiredItems }
  ];

  return (
    <div 
      className={cn(
        "lg:hidden fixed inset-0 z-50 transition-all duration-300 ease-in-out", 
        isOpen ? "opacity-100 visible" : "opacity-0 invisible"
      )}
    >
      {/* Dark overlay */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={() => onLinkClick('close')}
      />
      
      {/* Menu panel */}
      <div className={cn(
        "absolute top-0 left-0 w-full h-full bg-white shadow-xl transition-transform duration-300 ease-in-out overflow-y-auto",
        isOpen ? "transform translate-x-0" : "transform -translate-x-full"
      )}>
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

        <div className="flex flex-col items-start space-y-6 py-8 px-6">
          {/* Navigation Links */}
          {navItems.map((item, index) => (
            <div key={index} className="w-full">
              <Link 
                to={item.to}
                className="text-sm uppercase font-semibold tracking-wide text-black hover:text-[#CCFF00] transition-colors duration-150 block py-2"
                onClick={() => onLinkClick(item.label)}
              >
                {item.label}
              </Link>
              {/* Dropdown items for mobile */}
              <div className="pl-4 mt-2 space-y-2">
                {item.items.map((subItem, subIndex) => (
                  <Link 
                    key={subIndex}
                    to={subItem.to} 
                    className="block py-2 text-sm text-gray-700 hover:text-black transition-colors duration-150"
                    onClick={() => onLinkClick(subItem.label)}
                  >
                    {subItem.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
          
          {/* Utility Links at Bottom */}
          <div className="w-full pt-8 mt-8 border-t border-gray-200 space-y-4">
            <Link to="/contact" className="block text-xs font-medium text-gray-600 hover:underline hover:text-gray-800 transition-colors duration-150" onClick={() => onLinkClick('Contact us')}>Contact us</Link>
            <Link to="/future-travel-credit" className="block text-xs font-medium text-gray-600 hover:underline hover:text-gray-800 transition-colors duration-150" onClick={() => onLinkClick('Future Travel Credit')}>Future Travel Credit</Link>
            <Link to="/subscribe" className="block text-xs font-medium text-gray-600 hover:underline hover:text-gray-800 transition-colors duration-150" onClick={() => onLinkClick('Subscribe to emails')}>Subscribe to emails</Link>
            <Link to="/login" className="block text-xs font-medium text-gray-600 hover:underline hover:text-gray-800 transition-colors duration-150" onClick={() => onLinkClick('Traveller log in')}>Traveller log in</Link>
            <Link to="/agent-login" className="block text-xs font-medium text-gray-600 hover:underline hover:text-gray-800 transition-colors duration-150" onClick={() => onLinkClick('Agent log in')}>Agent log in</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;

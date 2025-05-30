import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { DropdownContent } from './NavigationData'; // Import DropdownContent interface

interface MenuLinkProps {
  to: string;
  label: string;
  hasDropdown?: boolean;
  dropdownContent?: DropdownContent; // Changed from children to dropdownContent
  isMobile?: boolean;
  onClick: (label: string) => void;
}

const MenuLink: React.FC<MenuLinkProps> = ({
  to,
  label,
  hasDropdown = false,
  dropdownContent, // Changed from children
  isMobile = false,
  onClick,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  if (hasDropdown && !isMobile) {
    return (
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger className="group focus:outline-none font-montserrat h-full flex items-center" aria-haspopup="true">
          <div className="flex items-center text-sm font-bold uppercase tracking-wide hover:text-[#CCFF00] text-black relative transition-colors duration-150 ease-in-out h-full">
            {label}
            {/* Adjusted icon size and margin */}
            <ChevronDown className="h-4 w-4 ml-1 transition-transform duration-150 group-data-[state=open]:rotate-180" />
          </div>
        </DropdownMenuTrigger>
        {/* Refined DropdownMenuContent styling */}
        <DropdownMenuContent
          className="bg-white shadow-lg rounded-md p-4 md:p-6 min-w-[300px] md:min-w-[500px] transition-all duration-150 ease-in-out z-50 font-sans border border-gray-100"
          sideOffset={8} // Adjusted offset to be closer to the header
        >
          {/* Pass the new dropdownContent prop to DropdownItems */}
          {dropdownContent && <DropdownItems dropdownContent={dropdownContent} onClick={onClick} />}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  if (hasDropdown && isMobile) {
    return (
      <div className="space-y-2">
        {/* Adjusted text style and icon size for mobile */}
        <div className="flex items-center justify-between py-3 text-base font-semibold text-black tracking-tight transition-colors duration-150 ease-in-out font-montserrat">
          {label}
          <ChevronDown className="h-5 w-5" />
        </div>
         {/* For mobile, we might render nested links directly or differently. For now, keeping a placeholder. */}
         {/* This part needs further design based on mobile screenshots if available. */}
        <div className="pl-4 space-y-2 border-l border-gray-200">
          {/* {children} */}
           {dropdownContent?.sections?.map(section => (
             <div key={section.heading || 'list'}>
               {section.heading && <div className="text-sm font-bold mt-2 mb-1">{section.heading}</div>}
               {section.items?.map(item => (
                 <Link key={item.label} to={item.to} className="block py-1 text-sm text-gray-700 hover:text-black transition-colors">
                   {item.label}
                 </Link>
               ))}
             </div>
           ))}
            {dropdownContent?.items?.map(item => (
              <Link key={item.label} to={item.to} className="block py-1 text-sm text-gray-700 hover:text-black transition-colors">
                {item.label}
              </Link>
            ))}
        </div>
      </div>
    );
  }

  return (
    <Link
      to={to}
      className={`text-sm font-bold uppercase tracking-wide text-black ${isMobile ? 'py-3' : 'py-2'} hover:text-[#CCFF00] relative group transition-colors duration-150 ease-in-out`}
      onClick={() => onClick(label)}
    >
      {label}
    </Link>
  );
};

export default MenuLink; 
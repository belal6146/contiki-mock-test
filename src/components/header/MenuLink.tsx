
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";

interface MenuLinkProps {
  to: string;
  label: string;
  hasDropdown?: boolean;
  children?: React.ReactNode;
  isMobile?: boolean;
  onClick: (label: string) => void;
}

const MenuLink: React.FC<MenuLinkProps> = ({
  to,
  label,
  hasDropdown = false,
  children,
  isMobile = false,
  onClick,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  if (hasDropdown && !isMobile) {
    return (
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger className="group focus:outline-none font-montserrat" aria-haspopup="true">
          <div className="flex items-center text-sm font-semibold tracking-tight hover:text-[rgb(204,255,0)] text-black py-4 px-4 group-data-[state=open]:text-[rgb(204,255,0)] relative transition-all duration-150 ease-in-out">
            {label}
            <ChevronDown className="h-3 w-3 ml-1 transition-transform duration-150 group-data-[state=open]:rotate-180" />
            <span className="absolute -bottom-0 left-4 w-0 h-[2px] bg-[rgb(204,255,0)] transition-all duration-150 ease-in-out group-hover:w-[calc(100%-32px)] group-data-[state=open]:w-[calc(100%-32px)]"></span>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent 
          className="bg-white shadow-lg rounded-md p-4 min-w-[220px] transition-all duration-150 ease-in-out z-50 font-montserrat"
          sideOffset={8}
        >
          {children}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  if (hasDropdown && isMobile) {
    return (
      <div className="space-y-2">
        <div className="flex items-center justify-between py-3 text-sm font-semibold text-black tracking-tight transition-colors duration-150 ease-in-out font-montserrat">
          {label}
          <ChevronDown className="h-4 w-4" />
        </div>
        <div className="pl-4 space-y-2 border-l border-gray-200">
          {children}
        </div>
      </div>
    );
  }

  return (
    <Link 
      to={to} 
      className={`text-sm font-semibold tracking-tight text-black ${isMobile ? 'py-3' : 'py-4 px-4'} hover:text-[rgb(204,255,0)] relative group transition-colors duration-150 ease-in-out font-montserrat`}
      onClick={() => onClick(label)}
    >
      {label}
      {!isMobile && (
        <span className="absolute -bottom-0 left-4 w-0 h-[2px] bg-[rgb(204,255,0)] transition-all duration-150 ease-in-out group-hover:w-[calc(100%-32px)]"></span>
      )}
    </Link>
  );
};

export default MenuLink;

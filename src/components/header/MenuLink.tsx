
import React from 'react';
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
  if (hasDropdown && !isMobile) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger className="group focus:outline-none" aria-haspopup="true">
          <div className="flex items-center text-sm font-bold tracking-tight hover:text-[#007EA7] text-black py-3 px-4 group-data-[state=open]:text-[#007EA7] relative transition-all duration-150 ease-in-out">
            {label}
            <ChevronDown className="h-4 w-4 ml-1" />
            <span className="absolute -bottom-[1px] left-4 w-0 h-[3px] bg-[#CCFF00] transition-all duration-150 ease-in-out group-hover:w-[calc(100%-32px)] group-data-[state=open]:w-[calc(100%-32px)]"></span>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-white shadow-lg rounded-md p-4 min-w-[220px] transition-all duration-150 ease-in-out">
          {children}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  if (hasDropdown && isMobile) {
    return (
      <div className="space-y-2">
        <div className="flex items-center justify-between py-2 text-sm font-bold text-black tracking-tight transition-colors duration-150 ease-in-out">
          {label}
          <ChevronDown className="h-4 w-4" />
        </div>
        <div className="pl-4 space-y-3">
          {children}
        </div>
      </div>
    );
  }

  return (
    <Link 
      to={to} 
      className={`text-sm font-bold tracking-tight text-black py-3 ${isMobile ? '' : 'px-4'} hover:text-[#007EA7] relative group transition-colors duration-150 ease-in-out`}
      onClick={() => onClick(label)}
    >
      {label}
      {!isMobile && (
        <span className="absolute -bottom-[1px] left-4 w-0 h-[3px] bg-[#CCFF00] transition-all duration-150 ease-in-out group-hover:w-[calc(100%-32px)]"></span>
      )}
    </Link>
  );
};

export default MenuLink;

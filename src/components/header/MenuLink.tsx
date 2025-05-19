
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
          <div className="flex items-center text-sm font-medium tracking-tight hover:text-black text-black py-2 px-3 group-data-[state=open]:text-black relative">
            {label}
            <ChevronDown className="h-4 w-4 ml-1" />
            <span className="absolute -bottom-[1px] left-3 w-0 h-[2px] bg-[#CCFF00] transition-all duration-150 ease-in-out group-hover:w-[calc(100%-24px)] group-data-[state=open]:w-[calc(100%-24px)]"></span>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-white shadow-lg rounded-md p-4 min-w-[220px]">
          {children}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  if (hasDropdown && isMobile) {
    return (
      <div className="space-y-2">
        <div className="flex items-center justify-between py-2 text-sm font-medium text-black tracking-tight">
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
      className={`text-sm font-medium tracking-tight text-black py-2 ${isMobile ? '' : 'px-3'} hover:text-black relative group`}
      onClick={() => onClick(label)}
    >
      {label}
      {!isMobile && (
        <span className="absolute -bottom-[1px] left-3 w-0 h-[2px] bg-[#CCFF00] transition-all duration-150 ease-in-out group-hover:w-[calc(100%-24px)]"></span>
      )}
    </Link>
  );
};

export default MenuLink;

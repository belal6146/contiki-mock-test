
import React from 'react';
import { Link } from 'react-router-dom';
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

export interface DropdownItem {
  label: string;
  to: string;
}

interface DropdownItemsProps {
  items: DropdownItem[];
  onClick: (label: string) => void;
}

const DropdownItems: React.FC<DropdownItemsProps> = ({ items, onClick }) => {
  return (
    <div className="grid grid-cols-1 gap-1">
      {items.map((item, index) => (
        <DropdownMenuItem key={index} asChild className="p-0 focus:bg-gray-50 rounded-md">
          <Link 
            to={item.to} 
            className="block w-full px-4 py-3 text-sm text-gray-700 hover:text-black hover:bg-gray-50 transition-all duration-150 ease-in-out rounded-md font-montserrat"
            onClick={() => onClick(item.label)}
          >
            {item.label}
          </Link>
        </DropdownMenuItem>
      ))}
    </div>
  );
};

export default DropdownItems;

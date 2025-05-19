
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
    <>
      {items.map((item, index) => (
        <DropdownMenuItem key={index} asChild className="p-0 focus:bg-gray-50">
          <Link 
            to={item.to} 
            className="block w-full px-3 py-2 text-sm text-black hover:bg-gray-50"
            onClick={() => onClick(item.label)}
          >
            {item.label}
          </Link>
        </DropdownMenuItem>
      ))}
    </>
  );
};

export default DropdownItems;

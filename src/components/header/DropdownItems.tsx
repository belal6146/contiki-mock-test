import React from 'react';
import { Link } from 'react-router-dom';
// The DropdownMenuItem from shadcn/ui might add unwanted complexity or styling not in the screenshots.
// Replacing it with a simple div or li for more control over styling.
// import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

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
    // Adjusted container styling for the dropdown panel appearance
    <div className="absolute top-full left-0 mt-0 w-60 bg-white border border-gray-200 rounded-md shadow-lg py-2 z-50">
      <div className="grid grid-cols-1 gap-0">
        {items.map((item, index) => (
          // Using a simple div instead of DropdownMenuItem for more direct styling control
          // Adjusted Link styling for individual items
          <Link 
            key={index}
            to={item.to} 
            className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-[#CCFF00] hover:text-black transition-colors duration-150 font-medium"
            onClick={() => onClick(item.label)}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default DropdownItems;

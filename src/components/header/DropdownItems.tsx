import React from 'react';
import { Link } from 'react-router-dom';
import { DropdownContent, NavigationItem, PromoItem } from './NavigationData'; // Import necessary types
// The DropdownMenuItem from shadcn/ui might add unwanted complexity or styling not in the screenshots.
// Replacing it with a simple div or li for more control over styling.
// import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

export interface DropdownItemsProps {
  dropdownContent: DropdownContent;
  onClick: (label: string) => void;
}

const DropdownItems: React.FC<DropdownItemsProps> = ({ dropdownContent, onClick }) => {

  // Helper component to render a list of navigation items
  const renderItemList = (items: NavigationItem[]) => (
    <div className="space-y-1">
      {items.map((item, index) => (
        <Link
          key={item.label || `item-${index}`}
          to={item.to}
          className="block px-4 py-1 text-sm text-gray-700 hover:bg-[#CCFF00] hover:text-black transition-colors duration-150"
          onClick={() => onClick(item.label)}
        >
          {item.label}
        </Link>
      ))}
    </div>
  );

  // Helper component to render a promotional item (image or card)
  const renderPromoItem = (promo: PromoItem) => {
    if (promo.type === 'image' && promo.imageUrl) {
      return (
        <div className="flex justify-center items-center p-1">
          <img src={promo.imageUrl} alt="Promotional Image" className="max-w-full h-auto rounded-md" />
        </div>
      );
    } else if (promo.type === 'card' && promo.title && promo.buttonText && promo.buttonLink) {
        return (
          <div className="bg-white p-4 rounded-lg shadow-md flex flex-col justify-between h-full">
            <div>
              <h5 className="font-bold text-gray-900 mb-1 text-base">{promo.title}</h5>
              {promo.subtitle && <p className="text-gray-700 text-sm mb-3">{promo.subtitle}</p>}
            </div>
            <Link
              to={promo.buttonLink}
              className="inline-block bg-[#CCFF00] hover:bg-[#b8e600] text-black font-bold py-2 px-4 rounded-full text-sm uppercase tracking-wide transition-colors duration-200 w-fit"
              onClick={() => onClick(`Promo Card: ${promo.title}`)}
            >
              {promo.buttonText}
            </Link>
          </div>
        );
    }
    return null;
  };

  return (
    <div className="w-full">
      {dropdownContent.type === 'list' && dropdownContent.items && (
        <div className="py-2">
          {renderItemList(dropdownContent.items)}
        </div>
      )}

      {dropdownContent.type === 'columns' && dropdownContent.sections && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4">
          {dropdownContent.sections.map((section, index) => (
            <div key={section.heading || `section-${index}`}>
              {section.heading && (
                <h4 className="font-bold text-xs mb-3 text-gray-900 uppercase tracking-wider px-4">{section.heading}</h4>
              )}
              {section.items && renderItemList(section.items)}
            </div>
          ))}
           <div className="md:col-span-full lg:col-span-3 mt-6 px-4">
                <Link to="/destinations" className="inline-flex items-center text-sm font-bold text-black hover:text-[#CCFF00] transition-colors">
                    Browse All Destinations <span className="ml-1">→</span>
                </Link>
            </div>
        </div>
      )}

      {dropdownContent.type === 'promoAndList' && dropdownContent.sections && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
           {dropdownContent.sections.map((section, index) => (
             <div key={`section-${index}`}>
                {section.items && renderItemList(section.items)}
                {section.promo && renderPromoItem(section.promo)}
             </div>
           ))}
            <div className="md:col-span-2 mt-6 px-4">
                <Link to="/deals" className="inline-flex items-center text-sm font-bold text-black hover:text-[#CCFF00] transition-colors">
                    Browse All Deals <span className="ml-1">→</span>
                </Link>
            </div>
        </div>
      )}
    </div>
  );
};

export default DropdownItems;

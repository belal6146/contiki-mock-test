import React from "react";
import { Link } from "react-router-dom";
import { Search, MessageCircle, ChevronDown, Phone } from "lucide-react";
import MenuLink from "./header/MenuLink";
import DropdownItems from "./header/DropdownItems";
import {
  destinationItems,
  travelStyleItems,
  aboutItems,
  inspiredItems,
  dealsItems,
  DropdownContent
} from "./header/NavigationData";

const NAV_ITEMS = [
  { label: "DESTINATIONS", to: "/destinations", hasDropdown: true, dropdownContent: destinationItems as DropdownContent },
  { label: "DEALS", to: "/deals", hasDropdown: true, dropdownContent: dealsItems as DropdownContent },
  { label: "TRAVEL STYLES", to: "/travel-styles", hasDropdown: true, dropdownContent: travelStyleItems as DropdownContent },
  { label: "ABOUT CONTIKI", to: "/about-contiki", hasDropdown: true, dropdownContent: aboutItems as DropdownContent },
  { label: "GET INSPIRED", to: "/get-inspired", hasDropdown: true, dropdownContent: inspiredItems as DropdownContent },
];

const Header = () => (
  <header className="w-full sticky top-0 z-50 bg-white shadow-sm">
    {/* Top Utility Bar - Refined styling and spacing */}
    <div className="w-full bg-gray-100 text-[10px] text-right py-1.5 px-4 md:px-8">
      <div className="max-w-screen-xl mx-auto flex justify-end gap-4 md:gap-6 items-center">
        {/* Links - Adjusted text color, size, and hover */}
        <a href="#" className="text-gray-700 hover:text-black transition-colors duration-150">Contact us</a>
        <a href="#" className="text-gray-700 hover:text-black transition-colors duration-150">Future Travel Credit</a>
        <a href="#" className="text-gray-700 hover:text-black transition-colors duration-150">Subscribe to emails</a>
        {/* Login Links - Styled as bold text, adjusted size */}
        <a href="#" className="font-bold text-black text-[11px] hover:text-gray-700 transition-colors duration-150">Traveller log in</a>
        <a href="#" className="font-bold text-black text-[11px] hover:text-gray-700 transition-colors duration-150">Agent log in</a>
      </div>
    </div>

    {/* Main Navbar - Adjusted height and added border-b */}
    <nav className="w-full bg-white z-40 h-16 md:h-20 border-b border-gray-200">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between py-0 px-4 lg:px-8 h-full">
        {/* Logo - Adjusted height and margin */}
        <Link to="/" className="flex-shrink-0 mr-6 md:mr-10" aria-label="Contiki Home">
          <img src="https://www.contiki.com/media/hvkhcawu/contiki-primary-logo-black.svg?center=0.5%2C0.5&format=webp&height=200&mode=crop&quality=80&width=800" alt="Contiki" className="h-7 md:h-8 w-auto" />
        </Link>

        {/* Main Navigation with Dropdowns - Adjusted gap, alignment, and added flex-1 to push right elements */}
        <ul className="flex-1 hidden lg:flex justify-center items-center gap-6 md:gap-8 text-sm font-bold uppercase h-full">
          {NAV_ITEMS.map((item) => (
            <li key={item.label} className="relative group h-full flex items-center">
              <MenuLink
                to={item.to}
                label={item.label}
                hasDropdown={item.hasDropdown}
                dropdownContent={item.dropdownContent}
                onClick={() => {}}
              />
            </li>
          ))}
        </ul>

        {/* Search, Phone, Icons - Adjusted container gap and alignment */}
        <div className="flex items-center gap-4 md:gap-6 text-gray-800 flex-shrink-0">
          {/* Search Input on Header - Styled to match visual */}
          <div className="hidden md:flex items-center border border-gray-300 rounded-full pl-4 pr-2 py-1 bg-white text-sm h-10 w-64 md:w-auto min-w-[180px]">
            <input
              type="text"
              placeholder="Aged 18–35? Find your adventure"
              className="flex-grow text-gray-700 placeholder-gray-500 bg-transparent focus:outline-none h-full"
              style={{ minWidth: 160 }}
            />
            {/* Adjusted search button styling and placement */}
            <button
              type="submit"
              className="ml-2 p-1 bg-[#CCFF00] rounded-full hover:bg-[#b8e600] transition-colors duration-150 flex items-center justify-center w-7 h-7"
              aria-label="Search"
            >
              <Search className="h-4 w-4 text-black" />
            </button>
          </div>

          {/* Phone Number and Icon - Styled to match visual */}
          <div className="hidden lg:flex items-center gap-1 cursor-pointer text-sm font-bold hover:text-[#CCFF00] transition-colors duration-150">
             <Phone className="h-4 w-4" />
            <span>0808 281 1120</span>
          </div>

          {/* Chat Icon - Styled to match visual */}
           <div className="hidden md:flex items-center gap-1 cursor-pointer text-sm font-bold hover:text-[#CCFF00] transition-colors duration-150">
             <MessageCircle className="h-4 w-4" />
           </div>

           {/* Mobile Menu Button */}
           <div className="flex lg:hidden items-center">
              {/* Assuming a mobile menu icon/button component will be here */}
               <button className="p-2 border border-gray-300 rounded-md">
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6 text-gray-700">
                   <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                 </svg>
               </button>
           </div>

        </div>
      </div>
    </nav>
     {/* Placeholder for Mobile Menu component */}
  </header>
);

export default Header;

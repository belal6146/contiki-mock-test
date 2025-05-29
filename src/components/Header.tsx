import React from "react";
import { Link } from "react-router-dom";
import { Search, MessageCircle } from "lucide-react";
import MenuLink from "./header/MenuLink";
import DropdownItems from "./header/DropdownItems";
import {
  destinationItems,
  travelStyleItems,
  aboutItems,
  inspiredItems
} from "./header/NavigationData";

const NAV_ITEMS = [
  { label: "DESTINATIONS", to: "/destinations", dropdown: destinationItems },
  { label: "DEALS", to: "/deals", dropdown: [{ label: 'Current Deals', to: '/deals/current-deals' }] },
  { label: "TRAVEL STYLES", to: "/travel-styles", dropdown: travelStyleItems },
  { label: "ABOUT CONTIKI", to: "/about-contiki", dropdown: aboutItems },
  { label: "GET INSPIRED", to: "/get-inspired", dropdown: inspiredItems },
];

const Header = () => (
  <header className="w-full sticky top-0 z-50 bg-white shadow-md h-24">
    {/* Top Utility Bar */}
    <div className="w-full bg-white border-b border-gray-100 text-[10px] text-right py-1 px-4">
      <div className="max-w-screen-xl mx-auto flex justify-end gap-6">
        <a href="#" className="hover:underline text-gray-600">Contact us</a>
        <a href="#" className="hover:underline text-gray-600">Future Travel Credit</a>
        <a href="#" className="hover:underline text-gray-600">Subscribe to emails</a>
        <a href="#" className="hover:underline text-gray-600">Traveller log in</a>
        <a href="#" className="hover:underline text-gray-600">Agent log in</a>
      </div>
    </div>

    {/* Main Navbar */}
    <nav className="w-full bg-white z-40 h-16">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between py-0 px-4 lg:px-8 h-full">
        {/* Logo */}
        <Link to="/" className="flex-shrink-0 mr-10" aria-label="Contiki Home">
          <img src="https://www.contiki.com/media/hvkhcawu/contiki-primary-logo-black.svg?center=0.5%2C0.5&format=webp&height=200&mode=crop&quality=80&width=800" alt="Contiki" className="h-9 w-auto" />
        </Link>

        {/* Main Navigation with Dropdowns - Adjusted gap and ensured full height alignment */}
        <ul className="flex-1 flex justify-center items-center gap-10 text-sm font-bold uppercase h-full">
          {NAV_ITEMS.map((item) => (
            // Adjusted list item styling for alignment and padding within the navbar height
            <li key={item.label} className="relative group h-full flex items-center px-2">
              <MenuLink
                to={item.to}
                label={item.label}
                hasDropdown={!!item.dropdown}
                onClick={() => {}}
              >
                {item.dropdown && (
                  // The styling of the DropdownItems component itself will be refined separately
                  <DropdownItems items={item.dropdown} onClick={() => {}} />
                )}
              </MenuLink>
            </li>
          ))}
        </ul>

        {/* Search, Phone, Icons - Adjusted container gap and alignment */}
        <div className="flex items-center gap-6">
          {/* Search Input on Header - Adjusted styling */}
          <div className="flex items-center border border-gray-300 rounded-full pl-4 py-1 bg-white text-sm h-10">
            <input
              type="text"
              placeholder="Aged 18–35? Find your adventure"
              className="flex-grow text-gray-700 placeholder-gray-500 bg-transparent focus:outline-none h-full"
              style={{ minWidth: 160 }}
            />
            {/* Adjusted search button styling and placement */}
            <button
              type="submit"
              className="ml-2 p-1 bg-[#CCFF00] rounded-full hover:bg-[#b8e600] transition-colors duration-150 flex items-center justify-center w-8 h-8"
              aria-label="Search"
            >
              <Search className="h-4 w-4 text-black" />
            </button>
          </div>
          
          {/* Phone Number and Icon - Adjusted styling */}
          <div className="flex items-center gap-1 cursor-pointer text-sm font-bold text-black">
            <span>0808 281 1120</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          {/* Additional icons (like chat) would go here if needed */}
           {/* The screenshot also shows a chat icon, adding a placeholder similar to the phone number */}
          {/* You may need to link this to actual chat functionality */}
           <div className="flex items-center gap-1 cursor-pointer text-sm font-bold text-black">
             <MessageCircle className="h-4 w-4 text-black" />
           </div>
        </div>
      </div>
    </nav>
  </header>
);

export default Header;

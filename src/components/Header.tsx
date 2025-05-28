import React from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
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
  <header className="w-full sticky top-0 z-50 bg-white shadow-sm">
    {/* Top Utility Bar */}
    <div className="w-full bg-white border-b border-gray-100 text-[11px] text-right py-1.5 px-4">
      <div className="max-w-screen-xl mx-auto flex justify-end gap-6">
        <a href="#" className="hover:underline text-gray-600">Contact us</a>
        <a href="#" className="hover:underline text-gray-600">Future Travel Credit</a>
        <a href="#" className="hover:underline text-gray-600">Subscribe to emails</a>
        <a href="#" className="hover:underline text-gray-600">Traveller log in</a>
        <a href="#" className="hover:underline text-gray-600">Agent log in</a>
      </div>
    </div>

    {/* Main Navbar */}
    <nav className="w-full bg-white z-40">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between py-3 px-4 lg:px-8">
        {/* Logo */}
        <Link to="/" className="flex-shrink-0 mr-8" aria-label="Contiki Home">
          <img src="https://www.contiki.com/media/hvkhcawu/contiki-primary-logo-black.svg?center=0.5%2C0.5&format=webp&height=200&mode=crop&quality=80&width=800" alt="Contiki" className="h-6 w-auto" />
        </Link>

        {/* Main Navigation with Dropdowns */}
        <ul className="flex-1 flex justify-center items-center gap-6 text-sm font-bold uppercase">
          {NAV_ITEMS.map((item) => (
            <li key={item.label} className="relative group h-full flex items-center">
              <MenuLink
                to={item.to}
                label={item.label}
                hasDropdown={!!item.dropdown}
                onClick={() => {}}
              >
                {item.dropdown && (
                  <DropdownItems items={item.dropdown} onClick={() => {}} />
                )}
              </MenuLink>
            </li>
          ))}
        </ul>

        {/* Search, Phone, Account */}
        <div className="flex items-center gap-4">
          {/* Search Bar */}
          <div className="flex items-center border border-gray-300 rounded-full pr-1 pl-4 py-0.5 bg-white text-sm">
            <input
              type="text"
              placeholder="Aged 18–35? Find your adventure"
              className="flex-grow text-gray-700 placeholder-gray-500 bg-transparent focus:outline-none"
              style={{ minWidth: 160 }}
            />
            <button
              type="submit"
              className="ml-2 p-2 bg-[#CCFF00] rounded-full hover:bg-[#b8e600] transition-colors duration-150 flex items-center justify-center"
              aria-label="Search"
            >
              <Search className="h-4 w-4 text-black" />
            </button>
          </div>
          {/* Phone Number with dropdown icon */}
          <div className="flex items-center gap-1 cursor-pointer">
            <span className="font-bold text-black text-sm">0808 281 1120</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          {/* Cart/Account icons would go here if present in the original */}
        </div>
      </div>
    </nav>
  </header>
);

export default Header;

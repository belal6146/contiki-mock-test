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
  <header className="w-full z-50">
    {/* Top Utility Bar */}
    <div className="w-full bg-white border-b border-gray-100 text-xs text-right py-2 px-4">
      <div className="max-w-screen-xl mx-auto flex justify-end gap-6">
        <a href="#" className="hover:underline text-gray-600">Contact us</a>
        <a href="#" className="hover:underline text-gray-600">Future Travel Credit</a>
        <a href="#" className="hover:underline text-gray-600">Subscribe to emails</a>
        <a href="#" className="hover:underline text-gray-600">Traveller log in</a>
        <a href="#" className="hover:underline text-gray-600">Agent log in</a>
      </div>
    </div>

    {/* Main Navbar */}
    <nav className="w-full bg-white shadow-sm sticky top-0 z-40">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between py-4 px-4 lg:px-8">
        {/* Logo */}
        <Link to="/" className="flex-shrink-0 mr-8" aria-label="Contiki Home">
          <img src="/logo-contiki.svg" alt="Contiki" className="h-7 w-auto" />
        </Link>

        {/* Main Navigation with Dropdowns */}
        <ul className="flex-1 flex justify-center items-center gap-8">
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

        {/* Search, Phone, Cart */}
        <div className="flex items-center gap-4">
          {/* Search Bar */}
          <form className="flex items-center border-2 border-gray-200 rounded-full px-3 py-1 bg-white">
            <input
              type="text"
              placeholder="Aged 18–35? Find your adventure"
              className="flex-grow text-sm text-gray-700 placeholder-gray-400 bg-transparent focus:outline-none"
              style={{ minWidth: 180 }}
            />
            <button
              type="submit"
              className="ml-2 p-2 bg-[#CCFF00] rounded-full hover:bg-[#b8e600] transition-colors duration-150"
              aria-label="Search"
            >
              <Search className="h-5 w-5 text-black" />
            </button>
          </form>
          {/* Phone Number */}
          <span className="font-bold text-black text-sm ml-2">0808 281 1120</span>
          {/* Cart/Account icons can be added here */}
        </div>
      </div>
    </nav>
  </header>
);

export default Header;

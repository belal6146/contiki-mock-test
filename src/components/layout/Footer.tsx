import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 md:py-16">
      <div className="container mx-auto px-4">
        {/* Footer Links - Grid Layout - Adjusted gap and column responsiveness */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-12 mb-8 md:mb-12">
          {/* Column 1 */}
          <div>
            {/* Heading styling - Adjusted color, weight, and margin */}
            <h3 className="text-white font-bold mb-4 text-lg">About Contiki</h3>
            <ul>
              {/* Link styling - Adjusted text size and hover color */}
              <li><Link to="/about" className="text-sm hover:text-[#CCFF00]">About Us</Link></li>
              <li><Link to="/six-two" className="text-sm hover:text-[#CCFF00]">six-two: Our Travel Magazine</Link></li>
              <li><Link to="/reviews" className="text-sm hover:text-[#CCFF00]">Reviews</Link></li>
              <li><Link to="#" className="text-sm hover:text-[#CCFF00]">Personal Security</Link></li>
              <li><Link to="#" className="text-sm hover:text-[#CCFF00]">Code of Conduct</Link></li>
              <li><Link to="#" className="text-sm hover:text-[#CCFF00]">Travel Destinations</Link></li>
              <li><Link to="#" className="text-sm hover:text-[#CCFF00]">Newsletter</Link></li>
              <li><Link to="#" className="text-sm hover:text-[#CCFF00]">Our Awards</Link></li>
            </ul>
          </div>

          {/* Column 2 */}
          <div>
            {/* Heading styling - Adjusted color, weight, and margin */}
            <h3 className="text-white font-bold mb-4 text-lg">Help</h3>
            <ul>
               {/* Link styling - Adjusted text size and hover color */}
              <li><Link to="/faqs" className="text-sm hover:text-[#CCFF00]">FAQs</Link></li>
              <li><Link to="/contact" className="text-sm hover:text-[#CCFF00]">Contact Us</Link></li>
              <li><Link to="#" className="text-sm hover:text-[#CCFF00]">My Contiki</Link></li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
             {/* Heading styling - Adjusted color, weight, and margin */}
            <h3 className="text-white font-bold mb-4 text-lg">Resources</h3>
            <ul>
               {/* Link styling - Adjusted text size and hover color */}
              <li><Link to="#" className="text-sm hover:text-[#CCFF00]">Resources Hub</Link></li>
              <li><Link to="#" className="text-sm hover:text-[#CCFF00]">Custom Groups</Link></li>
              <li><Link to="#" className="text-sm hover:text-[#CCFF00]">Careers</Link></li>
              <li><Link to="#" className="text-sm hover:text-[#CCFF00]">Brochure</Link></li>
              <li><Link to="#" className="text-sm hover:text-[#CCFF00]">Affiliates Hub</Link></li>
              <li><Link to="#" className="text-sm hover:text-[#CCFF00]">Brand Partnerships</Link></li>
              <li><Link to="#" className="text-sm hover:text-[#CCFF00]">Travel Updates</Link></li>
              <li><Link to="#" className="text-sm hover:text-[#CCFF00]">Press Room</Link></li>
              <li><Link to="#" className="text-sm hover:text-[#CCFF00]">Contiki Shop</Link></li>
              <li><Link to="#" className="text-sm hover:text-[#CCFF00]">View All Trips</Link></li>
            </ul>
          </div>

          {/* Column 4 (Placeholder for other info/social) */}
          <div>
             {/* Heading styling - Adjusted color, weight, and margin */}
             <h3 className="text-white font-bold mb-4 text-lg">Follow Us</h3>
             {/* Placeholder for social media icons - Adjusted spacing */}
             <div className="flex space-x-4 text-gray-400">
                 {/* Icons will go here */}
             </div>
          </div>
        </div>

        {/* Bottom Section (Copyright, Legal Links) - Adjusted border color, padding, text size, and link spacing/color */}
        <div className="border-t border-gray-700 pt-8 text-center text-sm text-gray-400">
          <p>© Copyright 2024 Contiki. All Rights Reserved.</p>
          {/* Placeholder Legal Links - Adjusted spacing and hover color */}
          <div className="mt-4 space-x-4 text-xs">
             <Link to="#" className="hover:text-[#CCFF00]">Manage Cookies</Link>
             <Link to="#" className="hover:text-[#CCFF00]">Privacy & Cookie Policy</Link>
             <Link to="#" className="hover:text-[#CCFF00]">Booking Conditions</Link>
             <Link to="#" className="hover:text-[#CCFF00]">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 
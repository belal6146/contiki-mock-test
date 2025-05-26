import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Separator } from "@/components/ui/separator";
import { Facebook, Instagram, Youtube, Twitter } from 'lucide-react';

const Footer = () => {
  useEffect(() => {
    console.debug('[Footer] mounted');
  }, []);

  return (
    <footer className="bg-white text-gray-800 border-t border-gray-200">
      {/* Main Footer Content */}
      <div className="container mx-auto max-w-screen-xl py-16 px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          
          {/* About Contiki */}
          <div>
            <h3 className="font-extrabold text-lg mb-6 text-gray-900 uppercase tracking-wider">About Contiki</h3>
            <ul className="space-y-3 text-sm">
              <li><Link to="/about" className="text-gray-600 hover:text-[#CCFF00] transition-colors font-medium">About Us</Link></li>
              <li><Link to="/travel-magazine" className="text-gray-600 hover:text-[#CCFF00] transition-colors font-medium">We Are Our Travel Magazine</Link></li>
              <li><Link to="/reviews" className="text-gray-600 hover:text-[#CCFF00] transition-colors font-medium">Reviews</Link></li>
              <li><Link to="/security" className="text-gray-600 hover:text-[#CCFF00] transition-colors font-medium">Personal Security</Link></li>
              <li><Link to="/code-of-conduct" className="text-gray-600 hover:text-[#CCFF00] transition-colors font-medium">Code of Conduct</Link></li>
              <li><Link to="/destinations" className="text-gray-600 hover:text-[#CCFF00] transition-colors font-medium">Travel Destinations</Link></li>
              <li><Link to="/newsletter" className="text-gray-600 hover:text-[#CCFF00] transition-colors font-medium">Newsletter</Link></li>
              <li><Link to="/awards" className="text-gray-600 hover:text-[#CCFF00] transition-colors font-medium">Our Awards</Link></li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h3 className="font-extrabold text-lg mb-6 text-gray-900 uppercase tracking-wider">Help</h3>
            <ul className="space-y-3 text-sm">
              <li><Link to="/faq" className="text-gray-600 hover:text-[#CCFF00] transition-colors font-medium">FAQs</Link></li>
              <li><Link to="/contact" className="text-gray-600 hover:text-[#CCFF00] transition-colors font-medium">Contact Us</Link></li>
              <li><Link to="/my-contiki" className="text-gray-600 hover:text-[#CCFF00] transition-colors font-medium">My Contiki</Link></li>
              <li><Link to="/careers" className="text-gray-600 hover:text-[#CCFF00] transition-colors font-medium">Careers</Link></li>
              <li><Link to="/brochures" className="text-gray-600 hover:text-[#CCFF00] transition-colors font-medium">Brochures</Link></li>
              <li><Link to="/affiliate-hub" className="text-gray-600 hover:text-[#CCFF00] transition-colors font-medium">Affiliate Hub</Link></li>
              <li><Link to="/travel-updates" className="text-gray-600 hover:text-[#CCFF00] transition-colors font-medium">Travel Updates</Link></li>
              <li><Link to="/press-room" className="text-gray-600 hover:text-[#CCFF00] transition-colors font-medium">Press Room</Link></li>
              <li><Link to="/covid-blog" className="text-gray-600 hover:text-[#CCFF00] transition-colors font-medium">COVID Blog</Link></li>
              <li><Link to="/view-all" className="text-gray-600 hover:text-[#CCFF00] transition-colors font-medium">View All Tips</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-extrabold text-lg mb-6 text-gray-900 uppercase tracking-wider">Resources</h3>
            <ul className="space-y-3 text-sm">
              <li><Link to="/resource-hub" className="text-gray-600 hover:text-[#CCFF00] transition-colors font-medium">Resource Hub</Link></li>
              <li><Link to="/custom-groups" className="text-gray-600 hover:text-[#CCFF00] transition-colors font-medium">Custom Groups</Link></li>
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div className="lg:col-span-2">
            <h3 className="font-extrabold text-lg mb-6 text-gray-900 uppercase tracking-wider">WANT UP TO £125* OFF?</h3>
            <p className="text-base text-gray-800 mb-4 font-medium">
              Get bigger savings than the rest of time to pay in full when you use the code 
              <strong className="text-[#CCFF00]"> GOPACK</strong>. Sign up now for the best deals.
            </p>
            <p className="text-xs text-gray-600 mb-8">
              *Plus discounts applies to the European Adventure Plus trip with the departure date of the 22nd of June 2025 as of 04/10/2023.
            </p>
            
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input 
                  type="text" 
                  placeholder="First Name*" 
                  className="px-4 py-3 border-2 border-gray-200 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-[#CCFF00] focus:border-transparent"
                />
                <input 
                  type="text" 
                  placeholder="Last Name*" 
                  className="px-4 py-3 border-2 border-gray-200 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-[#CCFF00] focus:border-transparent"
                />
              </div>
              <input 
                type="email" 
                placeholder="Email*" 
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-[#CCFF00] focus:border-transparent"
              />
              
              <div className="flex items-start space-x-3">
                <input type="checkbox" id="privacy-policy" className="mt-1.5" />
                <label htmlFor="privacy-policy" className="text-sm text-gray-700">
                  By checking this box, you accept the Contiki Privacy Policy
                </label>
              </div>
              
              <button 
                type="submit" 
                className="w-full bg-[#CCFF00] text-black px-8 py-4 rounded-full font-extrabold text-base uppercase tracking-wider hover:bg-[#b8e600] transition-all duration-200 shadow-lg"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>

      <Separator className="bg-gray-200" />

      {/* Footer Bottom */}
      <div className="container mx-auto max-w-screen-xl py-8 px-4 lg:px-8">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-8 lg:space-y-0">
          
          {/* Company Logos */}
          <div className="flex items-center space-x-8">
            <div className="text-sm text-gray-800 font-bold">
              We're part of
            </div>
            <div className="flex items-center space-x-6">
              <div className="bg-white border-2 border-gray-200 p-3 rounded-lg">
                <span className="text-sm font-extrabold text-gray-900">TTC</span>
              </div>
              <div className="bg-white border-2 border-gray-200 p-3 rounded-lg">
                <span className="text-sm font-extrabold text-gray-900">ATOL</span>
              </div>
              <div className="bg-white border-2 border-gray-200 p-3 rounded-lg">
                <span className="text-sm font-extrabold text-gray-900">ABTA</span>
              </div>
              <div className="bg-white border-2 border-gray-200 p-3 rounded-lg">
                <span className="text-sm font-extrabold text-gray-900">IATA</span>
              </div>
              <div className="bg-white border-2 border-gray-200 p-3 rounded-lg">
                <span className="text-sm font-extrabold text-gray-900">USTOA</span>
              </div>
            </div>
          </div>

          {/* Social Media Links */}
          <div className="flex items-center space-x-6">
            <a href="https://facebook.com/contiki" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-[#CCFF00] rounded-full flex items-center justify-center hover:bg-[#b8e600] transition-colors shadow-lg">
              <Facebook className="w-5 h-5 text-black" />
            </a>
            <a href="https://instagram.com/contiki" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-[#CCFF00] rounded-full flex items-center justify-center hover:bg-[#b8e600] transition-colors shadow-lg">
              <Instagram className="w-5 h-5 text-black" />
            </a>
            <a href="https://twitter.com/contiki" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-[#CCFF00] rounded-full flex items-center justify-center hover:bg-[#b8e600] transition-colors shadow-lg">
              <Twitter className="w-5 h-5 text-black" />
            </a>
            <a href="https://youtube.com/contiki" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-[#CCFF00] rounded-full flex items-center justify-center hover:bg-[#b8e600] transition-colors shadow-lg">
              <Youtube className="w-5 h-5 text-black" />
            </a>
          </div>
        </div>

        <Separator className="bg-gray-200 my-8" />

        {/* Copyright and Legal */}
        <div className="text-sm text-gray-700 space-y-4">
          <p className="font-medium">
            Copyright ©{new Date().getFullYear()} Contiki. All Rights Reserved.
          </p>
          <p>
            All the products in this list are subject to: The laws of England. Offers subject to availability and terms and conditions. Please speak to one of our experienced travel advisors to find out which products this applies to. Prices include. And, trip departure dates are subject to final confirmation at time of booking. 
          </p>
          <div className="flex flex-wrap gap-6 pt-4">
            <Link to="/privacy-policy" className="hover:text-[#CCFF00] transition-colors font-medium">Privacy Policy</Link>
            <Link to="/cookie-policy" className="hover:text-[#CCFF00] transition-colors font-medium">Cookie Policy</Link>
            <Link to="/terms" className="hover:text-[#CCFF00] transition-colors font-medium">Terms & Conditions</Link>
            <Link to="/sitemap" className="hover:text-[#CCFF00] transition-colors font-medium">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

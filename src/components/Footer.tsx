
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Separator } from "@/components/ui/separator";
import { Facebook, Instagram, Youtube, Twitter } from 'lucide-react';

const Footer = () => {
  useEffect(() => {
    console.debug('[Footer] mounted');
  }, []);

  return (
    <footer className="bg-white text-black border-t border-gray-200">
      {/* Main Footer Content */}
      <div className="container mx-auto max-w-7xl py-12 px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* About Contiki */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-black">About Contiki</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="text-black hover:text-[#FF6900] transition-colors">About Us</Link></li>
              <li><Link to="/travel-magazine" className="text-black hover:text-[#FF6900] transition-colors">We Are Our Travel Magazine</Link></li>
              <li><Link to="/reviews" className="text-black hover:text-[#FF6900] transition-colors">Reviews</Link></li>
              <li><Link to="/security" className="text-black hover:text-[#FF6900] transition-colors">Personal Security</Link></li>
              <li><Link to="/code-of-conduct" className="text-black hover:text-[#FF6900] transition-colors">Code of Conduct</Link></li>
              <li><Link to="/destinations" className="text-black hover:text-[#FF6900] transition-colors">Travel Destinations</Link></li>
              <li><Link to="/newsletter" className="text-black hover:text-[#FF6900] transition-colors">Newsletter</Link></li>
              <li><Link to="/awards" className="text-black hover:text-[#FF6900] transition-colors">Our Awards</Link></li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-black">Help</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/faq" className="text-black hover:text-[#FF6900] transition-colors">FAQs</Link></li>
              <li><Link to="/contact" className="text-black hover:text-[#FF6900] transition-colors">Contact Us</Link></li>
              <li><Link to="/my-contiki" className="text-black hover:text-[#FF6900] transition-colors">My Contiki</Link></li>
              <li><Link to="/careers" className="text-black hover:text-[#FF6900] transition-colors">Careers</Link></li>
              <li><Link to="/brochures" className="text-black hover:text-[#FF6900] transition-colors">Brochures</Link></li>
              <li><Link to="/affiliate-hub" className="text-black hover:text-[#FF6900] transition-colors">Affiliate Hub</Link></li>
              <li><Link to="/travel-updates" className="text-black hover:text-[#FF6900] transition-colors">Travel Updates</Link></li>
              <li><Link to="/press-room" className="text-black hover:text-[#FF6900] transition-colors">Press Room</Link></li>
              <li><Link to="/covid-blog" className="text-black hover:text-[#FF6900] transition-colors">COVID Blog</Link></li>
              <li><Link to="/view-all" className="text-black hover:text-[#FF6900] transition-colors">View All Tips</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-black">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/resource-hub" className="text-black hover:text-[#FF6900] transition-colors">Resource Hub</Link></li>
              <li><Link to="/custom-groups" className="text-black hover:text-[#FF6900] transition-colors">Custom Groups</Link></li>
            </ul>
          </div>

          {/* Newsletter Signup - Moved to right side */}
          <div className="lg:col-span-2">
            <h3 className="font-bold text-lg mb-4 text-black">WANT UP TO £125* OFF?</h3>
            <p className="text-sm text-black mb-4">
              Get bigger savings than the rest of time to pay in full when you use the code 
              <strong> GOPACK</strong>. Sign up now for the best deals.
            </p>
            <p className="text-xs text-black mb-6">
              *Plus discounts applies to the European Adventure Plus trip with the departure date of the 22nd of June 2025 as of 04/10/2023.
            </p>
            
            <form className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <input 
                  type="text" 
                  placeholder="First Name*" 
                  className="px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6900] focus:border-transparent"
                />
                <input 
                  type="text" 
                  placeholder="Last Name*" 
                  className="px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6900] focus:border-transparent"
                />
              </div>
              <input 
                type="email" 
                placeholder="Email*" 
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6900] focus:border-transparent"
              />
              
              <div className="flex items-start space-x-2">
                <input type="checkbox" id="privacy-policy" className="mt-1" />
                <label htmlFor="privacy-policy" className="text-xs text-black">
                  By checking this box, you accept the Contiki Privacy Policy
                </label>
              </div>
              
              <button 
                type="submit" 
                className="bg-black text-white px-6 py-2 rounded font-medium hover:bg-gray-800 transition-colors uppercase tracking-wide text-sm"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>

      <Separator className="bg-gray-200" />

      {/* Footer Bottom */}
      <div className="container mx-auto max-w-7xl py-6 px-6">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-6 lg:space-y-0">
          
          {/* Company Logos - Left side */}
          <div className="flex items-center space-x-6">
            <div className="text-sm text-black">
              <strong>We're part of</strong>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-white border border-gray-300 p-2 rounded">
                <span className="text-xs font-bold text-black">TTC</span>
              </div>
              <div className="bg-white border border-gray-300 p-2 rounded">
                <span className="text-xs font-bold text-black">ATOL</span>
              </div>
              <div className="bg-white border border-gray-300 p-2 rounded">
                <span className="text-xs font-bold text-black">ABTA</span>
              </div>
              <div className="bg-white border border-gray-300 p-2 rounded">
                <span className="text-xs font-bold text-black">IATA</span>
              </div>
              <div className="bg-white border border-gray-300 p-2 rounded">
                <span className="text-xs font-bold text-black">USTOA</span>
              </div>
            </div>
          </div>

          {/* Social Media Links - Right side */}
          <div className="flex items-center space-x-4">
            <a href="https://facebook.com/contiki" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-black rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors">
              <Facebook className="w-4 h-4 text-white" />
            </a>
            <a href="https://instagram.com/contiki" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-black rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors">
              <Instagram className="w-4 h-4 text-white" />
            </a>
            <a href="https://twitter.com/contiki" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-black rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors">
              <Twitter className="w-4 h-4 text-white" />
            </a>
            <a href="https://youtube.com/contiki" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-black rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors">
              <Youtube className="w-4 h-4 text-white" />
            </a>
          </div>
        </div>

        <Separator className="bg-gray-200 my-6" />

        {/* Copyright and Legal */}
        <div className="text-xs text-black space-y-2">
          <p>
            Copyright ©{new Date().getFullYear()} Contiki. All Rights Reserved.
          </p>
          <p>
            All the products in this list are subject to: The laws of England. Offers subject to availability and terms and conditions. Please speak to one of our experienced travel advisors to find out which products this applies to. Prices include. And, trip departure dates are subject to final confirmation at time of booking. 
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <Link to="/privacy-policy" className="hover:text-[#FF6900] transition-colors underline">Privacy Policy</Link>
            <Link to="/cookie-policy" className="hover:text-[#FF6900] transition-colors underline">Cookie Policy</Link>
            <Link to="/terms" className="hover:text-[#FF6900] transition-colors underline">Terms & Conditions</Link>
            <Link to="/sitemap" className="hover:text-[#FF6900] transition-colors underline">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

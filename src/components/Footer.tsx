import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Separator } from "@/components/ui/separator";
import { Facebook, Instagram, Youtube, Twitter } from 'lucide-react';

const Footer = () => {
  useEffect(() => {
    console.debug('[Footer] mounted');
  }, []);

  return (
    <footer className="bg-[#F8F8F8] text-gray-800 border-t border-gray-200">
      {/* Main Footer Content - Adjusted padding and grid */}
      <div className="container mx-auto max-w-screen-xl py-16 md:py-20 px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 md:gap-12 lg:gap-16">

          {/* About Contiki */}
          <div>
            <h3 className="font-bold text-base mb-4 text-gray-900 uppercase tracking-wide">About Contiki</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="text-gray-700 hover:text-black transition-colors">About Us</Link></li>
              <li><Link to="/travel-magazine" className="text-gray-700 hover:text-black transition-colors">We Are Our Travel Magazine</Link></li>
              <li><Link to="/reviews" className="text-gray-700 hover:text-black transition-colors">Reviews</Link></li>
              <li><Link to="/security" className="text-gray-700 hover:text-black transition-colors">Personal Security</Link></li>
              <li><Link to="/code-of-conduct" className="text-gray-700 hover:text-black transition-colors">Code of Conduct</Link></li>
              <li><Link to="/destinations" className="text-gray-700 hover:text-black transition-colors">Travel Destinations</Link></li>
              <li><Link to="/newsletter" className="text-gray-700 hover:text-black transition-colors">Newsletter</Link></li>
              <li><Link to="/awards" className="text-gray-700 hover:text-black transition-colors">Our Awards</Link></li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h3 className="font-bold text-base mb-4 text-gray-900 uppercase tracking-wide">Help</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/faq" className="text-gray-700 hover:text-black transition-colors">FAQs</Link></li>
              <li><Link to="/contact" className="text-gray-700 hover:text-black transition-colors">Contact Us</Link></li>
              <li><Link to="/my-contiki" className="text-gray-700 hover:text-black transition-colors">My Contiki</Link></li>
              <li><Link to="/careers" className="text-gray-700 hover:text-black transition-colors">Careers</Link></li>
              <li><Link to="/brochures" className="text-gray-700 hover:text-black transition-colors">Brochures</Link></li>
              <li><Link to="/affiliate-hub" className="text-gray-700 hover:text-black transition-colors">Affiliate Hub</Link></li>
              <li><Link to="/travel-updates" className="text-gray-700 hover:text-black transition-colors">Travel Updates</Link></li>
              <li><Link to="/press-room" className="text-gray-700 hover:text-black transition-colors">Press Room</Link></li>
              <li><Link to="/covid-blog" className="text-gray-700 hover:text-black transition-colors">COVID Blog</Link></li>
              <li><Link to="/view-all" className="text-gray-700 hover:text-black transition-colors">View All Tips</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-bold text-base mb-4 text-gray-900 uppercase tracking-wide">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/resource-hub" className="text-gray-700 hover:text-black transition-colors">Resource Hub</Link></li>
              <li><Link to="/custom-groups" className="text-gray-700 hover:text-black transition-colors">Custom Groups</Link></li>
            </ul>
          </div>

          {/* Newsletter Signup - Adjusted column span and spacing */}
          <div className="md:col-span-3 lg:col-span-2">
            <h3 className="font-bold text-lg mb-6 text-gray-900">WANT UP TO £125* OFF?</h3>
            <p className="text-sm text-gray-800 mb-4">
              Get huge savings (and loads of time to pay in full) when you lock in 2025's big trip TODAY. Sign up now for the best deals.
            </p>
            <p className="text-[10px] text-gray-600 mb-6">
              *This discount applies to the European Adventurer Plus trip with the departure date of the 22nd of June 2025 as of 16/04/2025.
            </p>

            <form className="space-y-3">
              <input
                type="email"
                placeholder="Email*"
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-[#CCFF00] focus:border-[#CCFF00]"
              />
               <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="First Name*"
                  className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-[#CCFF00] focus:border-[#CCFF00]"
                />
                <input
                  type="text"
                  placeholder="Last Name*"
                  className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-[#CCFF00] focus:border-[#CCFF00]"
                />
              </div>

              <div className="flex items-start space-x-2">
                <input type="checkbox" id="privacy-policy" className="mt-1" />
                <label htmlFor="privacy-policy" className="text-xs text-gray-700">
                  By checking this box, you accept the Contiki Privacy Policy
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-[#CCFF00] text-black px-6 py-3 rounded-full font-bold text-sm uppercase tracking-wide hover:bg-[#b8e600] transition-all duration-200 shadow-md"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>

      <Separator className="bg-gray-200" />

      {/* Footer Bottom - Adjusted padding, spacing, and layout */}
      <div className="container mx-auto max-w-screen-xl py-6 px-4 lg:px-8 text-gray-700 text-xs">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">

          {/* Company Logos and Legal Links */}
          {/* Combined these into a single flex container for easier management */}
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
             {/* Company Logos */}
             <div className="flex items-center space-x-6">
               {/* Note: Logo URLs need to be verified if they are correct for the white versions seen in the footer */}
               <img src="https://www.contiki.com/media/z0kkjtoj/ttc-core-logo-white-rgb.svg?center=0.5%2C0.5&format=webp&height=100&mode=crop&quality=80&width=300" alt="The Travel Corporation" className="h-6 md:h-7" />
               <img src="https://www.contiki.com/media/4vvbzugm/abta-logo.svg?center=0.5%2C0.5&format=webp&height=100&mode=crop&quality=80&width=300" alt="ABTA" className="h-6 md:h-7" />
               <img src="https://www.contiki.com/media/scmo443v/atol-logo.svg?center=0.5%2C0.5&format=webp&height=100&mode=crop&quality=80&width=300" alt="ATOL" className="h-6 md:h-7" />
             </div>
             {/* Legal Links - Adjusted spacing and text style */}
             <div className="flex flex-wrap justify-center md:justify-start gap-x-4 gap-y-1 text-gray-700">
                <Link to="/privacy-policy" className="hover:text-black transition-colors">Privacy Policy</Link>
                <Link to="/cookie-policy" className="hover:text-black transition-colors">Cookie Policy</Link>
                <Link to="/terms" className="hover:text-black transition-colors">Terms & Conditions</Link>
                <Link to="/sitemap" className="hover:text-black transition-colors">Sitemap</Link>
             </div>
          </div>

          {/* Social Media Links - Adjusted size and spacing */}
          <div className="flex items-center space-x-3">
            <a href="https://facebook.com/contiki" target="_blank" rel="noopener noreferrer" className="w-7 h-7 bg-[#CCFF00] rounded-full flex items-center justify-center hover:bg-[#b8e600] transition-colors shadow-sm">
              <Facebook className="w-4 h-4 text-black" />
            </a>
            <a href="https://instagram.com/contiki" target="_blank" rel="noopener noreferrer" className="w-7 h-7 bg-[#CCFF00] rounded-full flex items-center justify-center hover:bg-[#b8e600] transition-colors shadow-sm">
              <Instagram className="w-4 h-4 text-black" />
            </a>
            <a href="https://twitter.com/contiki" target="_blank" rel="noopener noreferrer" className="w-7 h-7 bg-[#CCFF00] rounded-full flex items-center justify-center hover:bg-[#b8e600] transition-colors shadow-sm">
              <Twitter className="w-4 h-4 text-black" />
            </a>
            <a href="https://youtube.com/contiki" target="_blank" rel="noopener noreferrer" className="w-7 h-7 bg-[#CCFF00] rounded-full flex items-center justify-center hover:bg-[#b8e600] transition-colors shadow-sm">
              <Youtube className="w-4 h-4 text-black" />
            </a>
          </div>
        </div>

        <Separator className="bg-gray-200 my-6" />

        {/* Copyright and Legal Text - Adjusted text size and spacing */}
        <div className="text-[10px] text-gray-600 space-y-3">
          <p className="font-semibold">
            Copyright ©{new Date().getFullYear()} Contiki. All Rights Reserved.
          </p>
          <p>
            All the products in this list are subject to: The laws of England. Offers subject to availability and terms and conditions. Please speak to one of our experienced travel advisors to find out which products this applies to. Prices include. And, trip departure dates are subject to final confirmation at time of booking.
          </p>
           {/* Feefo and TreadRight logos - Adjusted size and spacing */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-2">
            <img src="https://www.contiki.com/media/voxkq3ue/feefo-lockup.png?height=126&mode=max&width=126" alt="Feefo Based on 20,000+ Verified Reviews" className="h-10" />
            <img src="https://www.contiki.com/media/opwmano4/treadright-1.svg?center=0.5%2C0.5&format=webp&height=100&mode=crop&quality=80&width=300" alt="The TreadRight Foundation" className="h-8" />
             {/* Removed other logos as they were not clearly visible or present in the main footer screenshot provided. Can add back if needed. */}
             {/*
            <img src="https://www.contiki.com/media/h2qob34a/unwto-2.svg?center=0.5%2C0.5&format=webp&height=100&mode=crop&quality=80&width=300" alt="UN World Tourism Organization" className="h-8" />
            <img src="https://www.contiki.com/media/gnpoqg4l/logo-wttc-white-small.svg?center=0.5%2C0.5&format=webp&height=100&mode=crop&quality=80&width=300" alt="World Travel & Tourism Council" className="h-8" />
            <img src="https://www.contiki.com/media/ijlcn43e/platinum-trusted-service-award-2025-whiteout-landscape-1.svg?center=0.5%2C0.5&format=webp&height=100&mode=crop&quality=80&width=300" alt="Platinum Trusted Service Award 2025" className="h-8" />
            <img src="https://www.contiki.com/media/n3mbd2t4/iaalogo.svg?center=0.5%2C0.5&format=webp&height=100&mode=crop&quality=80&width=300" alt="International Achievement Awards" className="h-8" />
            <img src="https://www.contiki.com/media/yqom0l0b/topp-logo.svg?center=0.5%2C0.5&format=webp&height=100&mode=crop&quality=80&width=300" alt="TOPP (Travel Opinion Platform)" className="h-8" />
             */}
          </div>
           {/* Legal Links - Adjusted spacing and text style */}
           {/* These links are now part of the combined flex container above for md and larger screens */}
           {/* Keeping a separate div for smaller screens if needed, but currently handled by flex-wrap in the parent */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;


import React from 'react';
import { Facebook, Instagram, Youtube } from 'lucide-react';

const SocialLinks: React.FC = () => {
  return (
    <div>
      <h4 className="font-medium mb-4">Connect with us</h4>
      <div className="flex space-x-4">
        <a href="https://facebook.com/contiki" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="bg-white hover:bg-[#CCFF00] text-black p-2 rounded-full transition-colors">
          <Facebook size={18} />
        </a>
        <a href="https://instagram.com/contiki" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="bg-white hover:bg-[#CCFF00] text-black p-2 rounded-full transition-colors">
          <Instagram size={18} />
        </a>
        <a href="https://youtube.com/user/contiki" target="_blank" rel="noopener noreferrer" aria-label="Youtube" className="bg-white hover:bg-[#CCFF00] text-black p-2 rounded-full transition-colors">
          <Youtube size={18} />
        </a>
        <a href="https://tiktok.com/@contiki" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="bg-white hover:bg-[#CCFF00] text-black p-2 rounded-full transition-colors">
          {/* Using a SVG for TikTok since it's not available in lucide-react */}
          <svg 
            width="18" 
            height="18" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M9 12a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"></path>
            <path d="M16 8v8"></path>
            <path d="M12 16v4"></path>
            <path d="M20 12V8h-4"></path>
            <path d="M16 5.95a4 4 0 0 0-4 0"></path>
          </svg>
        </a>
      </div>
    </div>
  );
};

export default SocialLinks;

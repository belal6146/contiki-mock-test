
import React from 'react';
import { Link } from 'react-router-dom';

interface FooterLinkItem {
  label: string;
  url: string;
}

interface FooterLinkGroupProps {
  title: string;
  links: FooterLinkItem[];
}

const FooterLinkGroup: React.FC<FooterLinkGroupProps> = ({ title, links }) => {
  return (
    <div>
      <h3 className="text-2xl font-bold mb-6">{title}</h3>
      <ul className="space-y-4">
        {links.map((link, index) => (
          <li key={index}>
            <Link 
              to={link.url} 
              className="text-white hover:text-[#CCFF00] transition-colors text-base"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FooterLinkGroup;

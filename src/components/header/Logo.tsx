
import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  onClick: () => void;
  width?: string;
}

const Logo: React.FC<LogoProps> = ({ onClick, width = 'auto' }) => {
  return (
    <Link to="/" className="flex-shrink-0" onClick={onClick} aria-label="Contiki Home">
      <img 
        src="https://www.contiki.com/media/hvkhcawu/contiki-primary-logo-black.svg?center=0.5%2C0.5&format=webp&height=200&mode=crop&quality=80&width=800" 
        alt="Contiki" 
        className="h-8 w-auto"
        style={{ width }}
        loading="eager"
      />
    </Link>
  );
};

export default Logo;

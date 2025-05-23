
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
        src="/lovable-uploads/507a4ada-ae21-4919-895b-a8ba10fce44d.png" 
        alt="Contiki" 
        className="h-8 w-auto"
        style={{ width }}
        loading="eager"
      />
    </Link>
  );
};

export default Logo;

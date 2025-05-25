
import React from 'react';

const Logo = () => {
  return (
    <div className="flex items-center">
      <img 
        src="https://www.contiki.com/media/hvkhcawu/contiki-primary-logo-black.svg?center=0.5%2C0.5&format=webp&height=200&mode=crop&quality=80&width=800"
        alt="Contiki"
        className="h-8 w-auto"
        loading="eager"
      />
    </div>
  );
};

export default Logo;


import React from 'react';

const Logo = React.memo(() => {
  return (
    <div className="flex items-center" role="img" aria-label="Contiki Logo">
      <img 
        src="https://www.contiki.com/media/hvkhcawu/contiki-primary-logo-black.svg?center=0.5%2C0.5&format=webp&mode=crop&width=800&height=200&quality=80"
        alt="Contiki Logo"
        className="h-6 w-auto"
      />
    </div>
  );
});

Logo.displayName = 'Logo';

export default Logo;


import React from 'react';

const Logo = React.memo(() => {
  return (
    <div className="flex items-center" role="img" aria-label="Contiki Logo">
      <img 
        src="https://www.contiki.com/media/hvkhcawu/contiki-primary-logo-black.svg?center=0.5%2C0.5&format=webp&height=200&mode=crop&quality=80&width=800"
        alt="Contiki - Travel for 18-35 year olds"
        className="h-6 w-auto"
        loading="eager"
      />
    </div>
  );
});

Logo.displayName = 'Logo';

export default Logo;

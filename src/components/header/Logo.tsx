
import React from 'react';

const Logo = React.memo(() => {
  return (
    <div className="flex items-center" role="img" aria-label="Contiki Logo">
      <img 
        src="/lovable-uploads/304774ea-2a34-4c18-981b-c7747ef66baf.png"
        alt="Contiki Logo"
        className="h-8 w-auto"
      />
    </div>
  );
});

Logo.displayName = 'Logo';

export default Logo;

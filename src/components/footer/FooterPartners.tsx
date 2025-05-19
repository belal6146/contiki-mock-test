
import React from 'react';

const FooterPartners: React.FC = () => {
  return (
    <div>
      <h4 className="font-medium text-lg mb-4">We're part of</h4>
      <div className="flex items-center space-x-6">
        <div className="bg-white p-3 rounded-md">
          <img src="https://www.contiki.com/assets/images/footer/ttc_logo.svg" alt="The Travel Corporation" className="h-8" />
        </div>
        <div className="bg-white p-3 rounded-md">
          <img src="https://www.contiki.com/assets/images/footer/abta_logo.svg" alt="ABTA" className="h-8" />
        </div>
        <div>
          <img src="https://www.contiki.com/assets/images/footer/tripadvisor.svg" alt="TripAdvisor" className="h-12" />
        </div>
      </div>
    </div>
  );
};

export default FooterPartners;

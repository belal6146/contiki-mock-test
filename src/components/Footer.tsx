
import React, { useEffect } from 'react';
import { Separator } from "@/components/ui/separator";

// Import smaller components
import FooterLinkGroup from './footer/FooterLinkGroup';
import NewsletterSignup from './footer/NewsletterSignup';
import SocialLinks from './footer/SocialLinks';
import FooterPartners from './footer/FooterPartners';
import PaymentOptions from './footer/PaymentOptions';
import CopyrightInfo from './footer/CopyrightInfo';

// Import footer data
import { companyLinks, destinationLinks, helpLinks, legalLinks } from './footer/FooterData';

const Footer = () => {
  useEffect(() => {
    console.debug('[Footer] mounted');
  }, []);

  return (
    <footer className="bg-black text-white pt-12 pb-8 font-montserrat">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12 px-4">
          <FooterLinkGroup title="Company" links={companyLinks} />
          <FooterLinkGroup title="Destinations" links={destinationLinks} />
          <FooterLinkGroup title="Help" links={helpLinks} />
          
          <div>
            <FooterLinkGroup title="Legal" links={legalLinks} />
            <div className="mt-8">
              <NewsletterSignup />
            </div>
            <div className="mt-8">
              <SocialLinks />
            </div>
          </div>
        </div>
        
        <div className="px-4">
          <Separator className="bg-white/20" />
        </div>
        
        <div className="px-4 pt-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
            <FooterPartners />
            <PaymentOptions />
          </div>
          
          <CopyrightInfo />
        </div>
      </div>
    </footer>
  );
};

export default Footer;

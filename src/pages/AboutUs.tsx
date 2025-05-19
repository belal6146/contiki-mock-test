
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { trackPageView } from '@/lib/analytics';

const AboutUs = () => {
  useEffect(() => {
    trackPageView(window.location.pathname);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>About Contiki | Travel for 18-35 Year Olds</title>
        <meta name="description" content="Learn about Contiki's 60-year history of providing unforgettable travel experiences for 18-35 year olds around the world." />
        <meta name="keywords" content="about contiki, contiki history, travel company, young adult travel" />
        
        {/* Open Graph / Social Media */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="About Contiki | Travel for 18-35 Year Olds" />
        <meta property="og:description" content="Learn about Contiki's 60-year history of providing unforgettable travel experiences for 18-35 year olds around the world." />
        <meta property="og:image" content="https://www.contiki.com/about-og-image.jpg" />
        <meta property="og:url" content="https://www.contiki.com/about" />
        
        {/* JSON-LD for About Us */}
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "AboutPage",
            "mainEntity": {
              "@type": "Organization",
              "name": "Contiki",
              "description": "Travel company for 18-35 year olds",
              "foundingDate": "1962",
              "founder": {
                "@type": "Person",
                "name": "John Anderson"
              },
              "url": "https://www.contiki.com",
              "logo": "https://www.contiki.com/logo.png",
              "sameAs": [
                "https://www.facebook.com/contiki",
                "https://www.instagram.com/contiki",
                "https://twitter.com/contiki"
              ]
            }
          }
        `}</script>
      </Helmet>
      
      <Header />
      
      <main className="flex-grow container mx-auto py-12">
        <h1 className="heading-lg mb-6">About Contiki</h1>
        
        <div className="prose max-w-none">
          <p className="text-lg mb-6">
            For over 60 years, Contiki has been the world leader in travel experiences for 18-35 year olds.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
            <div>
              <h2 className="text-2xl font-bold mb-4">Our Story</h2>
              <p>
                Contiki was founded in 1962 when a young New Zealander named John Anderson arrived in London with a dream to explore Europe. He bought a minibus, gathered some fellow adventurers, and set off on what would become the first Contiki trip.
              </p>
              <p className="mt-4">
                Today, we're the world's leading travel company for 18-35 year olds. We offer unforgettable experiences across 6 continents and over 50 countries, with a passionate team of Travel Experts and Trip Managers ready to share their love for travel.
              </p>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold mb-4">Our Values</h2>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="font-bold mr-2">❤️ Passion:</span> 
                  <span>We're passionate about creating life-changing travel experiences.</span>
                </li>
                <li className="flex items-start">
                  <span className="font-bold mr-2">🌍 Sustainability:</span> 
                  <span>We're committed to sustainable travel and making a positive impact.</span>
                </li>
                <li className="flex items-start">
                  <span className="font-bold mr-2">🤝 Community:</span> 
                  <span>We believe in the power of bringing people together.</span>
                </li>
                <li className="flex items-start">
                  <span className="font-bold mr-2">🔍 Discovery:</span> 
                  <span>We encourage exploration and authentic cultural experiences.</span>
                </li>
              </ul>
            </div>
          </div>
          
          <h2 className="text-2xl font-bold mb-4">Why Travel With Us?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-3">Expert Guides</h3>
              <p>Our Trip Managers are experienced travelers who know each destination inside and out.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-3">Like-minded Travelers</h3>
              <p>Connect with new friends from around the world who share your passion for adventure.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-3">Value for Money</h3>
              <p>Our trips include accommodation, transportation, and many activities at unbeatable prices.</p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AboutUs;

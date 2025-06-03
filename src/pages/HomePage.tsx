import React from 'react';
import TopBar from '../components/layout/TopBar';
import Hero from '../components/home/Hero';
import TravelDestinations from '../components/home/TravelDestinations';
import AsSeenIn from '../components/home/AsSeenIn';
import ScratchMap from '../components/home/ScratchMap';
import Footer from '../components/layout/Footer';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <Hero />
      <TravelDestinations />
      <AsSeenIn />
      <ScratchMap />
      <Footer />
    </div>
  );
};

export default HomePage; 
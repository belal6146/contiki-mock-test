
import React from 'react';

const CopyrightInfo: React.FC = () => {
  return (
    <div className="text-sm text-white/80">
      <p className="mb-4">
        Copyright © {new Date().getFullYear()} Contiki. All Rights Reserved. Contiki is part of The Travel Corporation family of companies.
      </p>
      <p>
        Travel is an exciting and important part of people's lives. It connects us to new places, experiences and people. When you book with Contiki, you're not just choosing a holiday, you're opening the door to new friendships, experiences, and perspectives that will stay with you for life. Our team is dedicated to ensuring your trip is hassle-free and unforgettable. With over 60 years of experience, we've mastered the art of social travel for 18-35 year olds.
      </p>
    </div>
  );
};

export default CopyrightInfo;

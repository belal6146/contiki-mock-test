
import React, { useState, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HelpButton = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    console.debug('[HelpButton] mounted');
  }, []);

  const handleClick = () => {
    console.debug('[HelpButton] clicked');
    // Here you would typically open a chat dialog or redirect to help
    window.open('/contact', '_blank');
  };

  return (
    <Button
      variant="secondary"
      size="icon"
      className="fixed bottom-4 right-4 z-50 rounded-full w-14 h-14 bg-[#CCFF00] text-black shadow-lg hover:bg-[#CCFF00]/90 hover:shadow-xl hover:scale-105 transition-all duration-300"
      onClick={handleClick}
      aria-label="Get help"
    >
      <MessageCircle className="w-6 h-6" />
    </Button>
  );
};

export default HelpButton;

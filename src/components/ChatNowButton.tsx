
import React, { useEffect } from 'react';
import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { trackEvent } from '@/lib/analytics';

const ChatNowButton = () => {
  useEffect(() => {
    console.debug('[ChatNowButton] mounted');
  }, []);

  const handleClick = () => {
    console.debug('[ChatNowButton] clicked');
    trackEvent('chat_now_clicked');
    // Open chat dialog or redirect
    window.open('/contact', '_blank');
  };

  return (
    <Button
      variant="secondary"
      size="icon"
      className="fixed bottom-6 right-6 z-50 rounded-full w-16 h-16 bg-[#CCFF00] text-black shadow-lg hover:bg-[#b8e600] hover:shadow-xl hover:scale-105 transition-all duration-300 border-2 border-black"
      onClick={handleClick}
      aria-label="Chat now"
    >
      <div className="flex flex-col items-center justify-center">
        <MessageCircle className="w-6 h-6 mb-1" />
        <span className="text-xs font-bold uppercase">Chat<br />Now</span>
      </div>
    </Button>
  );
};

export default ChatNowButton;

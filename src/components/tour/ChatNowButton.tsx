
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
      className="fixed bottom-4 right-4 z-50 rounded-full w-14 h-14 bg-[#FF6600] text-white shadow-lg hover:bg-[#e65c00] hover:shadow-xl hover:scale-105 transition-all duration-300"
      onClick={handleClick}
      aria-label="Chat now"
    >
      <MessageCircle className="w-6 h-6" />
    </Button>
  );
};

export default ChatNowButton;

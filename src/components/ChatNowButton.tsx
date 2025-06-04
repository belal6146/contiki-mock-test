import React, { useEffect } from 'react';
// Removed unused import: import { MessageCircle } from 'lucide-react';
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
      className="fixed bottom-6 right-6 z-50 rounded-full w-[67px] h-[67px] bg-transparent text-black shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 border-none p-0 overflow-hidden"
      onClick={handleClick}
      aria-label="Chat now"
    >
      <img
        src="https://eu2-cdn.inside-graph.com/custom/3-Contiki-Electric-Lime-Chat-Tab-AM.svg?1748104561464"
        alt="Live chat icon, click to open the live chat pane."
        className="w-full h-full object-contain pointer-events-none"
      />
    </Button>
  );
};

export default ChatNowButton;

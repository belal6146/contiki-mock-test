
import React, { useEffect, useState } from 'react';
import { MessageSquare } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

const ChatNowButton: React.FC = () => {
  const [visible, setVisible] = useState(false);
  
  useEffect(() => {
    // Show button after a delay
    const timer = setTimeout(() => {
      setVisible(true);
      console.debug('[ChatNowButton] mounted and visible');
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleChatClick = () => {
    console.debug('[ChatNowButton] clicked');
    trackEvent('chat_now_clicked', {});
    // In a real implementation, this would open a chat window
    window.alert('Chat functionality would open here');
  };
  
  if (!visible) return null;
  
  return (
    <button
      onClick={handleChatClick}
      className="fixed bottom-6 right-6 bg-[#CCFF00] text-black rounded-full shadow-lg p-4 z-50 flex items-center gap-2 hover:bg-[#CCFF00]/90 transition-all duration-150 font-montserrat font-medium"
      aria-label="Chat with us"
    >
      <MessageSquare className="h-5 w-5" />
      <span>Chat Now</span>
    </button>
  );
};

export default ChatNowButton;

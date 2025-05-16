
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowUp } from 'lucide-react';

const BackToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    
    window.addEventListener('scroll', toggleVisibility);
    
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);
  
  const scrollToTop = () => {
    console.debug('[BackToTop] clicked');
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  if (!isVisible) {
    return null;
  }
  
  return (
    <Button
      className="fixed bottom-8 right-8 rounded-full w-12 h-12 flex items-center justify-center shadow-lg"
      onClick={scrollToTop}
      aria-label="Back to top"
    >
      <ArrowUp className="w-6 h-6" />
    </Button>
  );
};

export default BackToTopButton;

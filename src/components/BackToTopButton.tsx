
import React, { useState, useEffect } from 'react';
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
      behavior: 'smooth',
    });
  };
  
  if (!isVisible) {
    return null;
  }
  
  return (
    <button
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-20 rounded-full w-12 h-12 flex items-center justify-center shadow-md bg-black text-white hover:bg-black/80 transition-all duration-300 ease-in-out"
      onClick={scrollToTop}
      aria-label="Back to top"
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  );
};

export default BackToTopButton;

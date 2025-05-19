
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
      // Add a longer duration for smoother scrolling
    });
  };
  
  if (!isVisible) {
    return null;
  }
  
  return (
    <button
      className="fixed bottom-8 right-8 rounded-full w-12 h-12 flex items-center justify-center shadow-lg bg-[#CCFF00] text-black hover:bg-[#CCFF00]/90 transition-all duration-500 ease-in-out hover:shadow-xl hover:transform hover:scale-105"
      onClick={scrollToTop}
      aria-label="Back to top"
    >
      <ArrowUp className="w-6 h-6" />
    </button>
  );
};

export default BackToTopButton;

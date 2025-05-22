
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
      className="fixed bottom-20 right-4 rounded-full w-10 h-10 flex items-center justify-center shadow-md bg-white text-black hover:bg-gray-100 transition-all duration-300 ease-in-out"
      onClick={scrollToTop}
      aria-label="Back to top"
    >
      <ArrowUp className="w-4 h-4" />
    </button>
  );
};

export default BackToTopButton;

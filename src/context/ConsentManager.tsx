
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { trackEvent } from '@/lib/analytics';

interface ConsentManagerContextType {
  hasConsented: boolean;
  setConsent: (value: boolean) => void;
  toggleConsent: () => void;
}

const ConsentManagerContext = createContext<ConsentManagerContextType | undefined>(undefined);

export const ConsentManagerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [hasConsented, setHasConsented] = useState<boolean>(false);
  
  const setConsent = (value: boolean) => {
    setHasConsented(value);
    trackEvent('privacy_consent_changed', { consented: value });
  };
  
  const toggleConsent = () => {
    const newValue = !hasConsented;
    setConsent(newValue);
  };
  
  return (
    <ConsentManagerContext.Provider value={{ hasConsented, setConsent, toggleConsent }}>
      {children}
    </ConsentManagerContext.Provider>
  );
};

export const useConsent = (): ConsentManagerContextType => {
  const context = useContext(ConsentManagerContext);
  if (context === undefined) {
    throw new Error('useConsent must be used within a ConsentManagerProvider');
  }
  return context;
};

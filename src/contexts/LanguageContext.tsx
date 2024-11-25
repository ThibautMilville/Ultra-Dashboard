import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { translations } from '../i18n/translations';

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: (key: string) => key,
});

export const useLanguage = () => useContext(LanguageContext);

interface LanguageProviderProps {
  children: ReactNode;
}

const LANGUAGE_KEY = 'ultra_dashboard_language';

const getInitialLanguage = () => {
  const savedLanguage = localStorage.getItem(LANGUAGE_KEY);
  if (savedLanguage && ['en', 'fr'].includes(savedLanguage)) {
    return savedLanguage;
  }
  
  const browserLang = navigator.language.toLowerCase();
  if (browserLang.startsWith('fr')) {
    return 'fr';
  }
  return 'en';
};

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguageState] = useState(getInitialLanguage);

  const setLanguage = (lang: string) => {
    if (lang !== language) {
      setLanguageState(lang);
      localStorage.setItem(LANGUAGE_KEY, lang);
      
      // Dispatch a custom event for language change
      window.dispatchEvent(new CustomEvent('languageChange', { detail: { language: lang } }));
    }
  };

  const t = (key: string): string => {
    return translations[language]?.[key] || translations['en'][key] || key;
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
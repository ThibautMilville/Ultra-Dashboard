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

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguageState] = useState(() => {
    // Get language from localStorage or use browser language or fallback to 'en'
    const savedLanguage = localStorage.getItem(LANGUAGE_KEY);
    if (savedLanguage && ['en', 'fr'].includes(savedLanguage)) {
      return savedLanguage;
    }
    
    const browserLang = navigator.language.split('-')[0];
    return ['en', 'fr'].includes(browserLang) ? browserLang : 'en';
  });

  const setLanguage = (lang: string) => {
    setLanguageState(lang);
    localStorage.setItem(LANGUAGE_KEY, lang);
  };

  const t = (key: string): string => {
    return translations[language]?.[key] || translations['en'][key] || key;
  };

  // Update document language attribute
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface Language {
  code: string;
  name: string;
  flagPath: string;
}

interface LanguageSelectorProps {
  isMobile?: boolean;
}

const languages: Language[] = [
  { code: 'en', name: 'English', flagPath: '/assets/flags/en.png' },
  { code: 'fr', name: 'Français', flagPath: '/assets/flags/fr.png' }
];

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ isMobile = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const selectedLanguage = languages.find(lang => lang.code === language);

  const handleLanguageSelect = (code: string) => {
    setLanguage(code);
    setIsOpen(false);
  };

  const FlagImage = ({ src, alt }: { src: string; alt: string }) => (
    <img src={src} alt={alt} className="h-[1.5rem] mr-2" />
  );

  if (isMobile) {
    return (
      <div className="relative">
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="flex flex-col items-center justify-center p-2 transition-colors text-gray-600 hover:text-primary-600 hover:bg-gray-50 cursor-pointer"
        >
          <FlagImage src={selectedLanguage?.flagPath || ''} alt={selectedLanguage?.name || ''} />
          <span className="text-xs mt-1">{t('language')}</span>
        </div>
        {isOpen && (
          <div className="absolute bottom-full right-0 mb-2 w-24 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
            <div className="py-1" role="menu">
              {languages.map((lang) => (
                <div
                  key={lang.code}
                  onClick={() => handleLanguageSelect(lang.code)}
                  className={`${
                    language === lang.code
                      ? 'bg-gray-100 text-gray-900'
                      : 'text-gray-700'
                  } cursor-pointer flex items-center justify-center w-full px-4 py-2 hover:bg-gray-100`}
                  role="menuitem"
                >
                  <FlagImage src={lang.flagPath} alt={lang.name} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="relative">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 cursor-pointer"
      >
        <FlagImage src={selectedLanguage?.flagPath || ''} alt={selectedLanguage?.name || ''} />
        <ChevronDown className="h-4 w-4" />
      </div>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-24 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1" role="menu">
            {languages.map((lang) => (
              <div
                key={lang.code}
                onClick={() => handleLanguageSelect(lang.code)}
                className={`${
                  language === lang.code
                    ? 'bg-gray-100 text-gray-900'
                    : 'text-gray-700'
                } cursor-pointer flex items-center justify-center w-full px-4 py-2 hover:bg-gray-100`}
                role="menuitem"
              >
                <FlagImage src={lang.flagPath} alt={lang.name} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
import React from 'react';
import { Home, BarChart2, Cpu, Coins, Newspaper } from 'lucide-react';
import LanguageSelector from '../common/LanguageSelector';
import { useLanguage } from '../../contexts/LanguageContext';
import { useRouterStore } from '../../store/routerStore';
import type { Route } from '../../store/routerStore';

const Header: React.FC = () => {
  const { t } = useLanguage();
  const { currentRoute, navigate } = useRouterStore();

  const handleNavigation = (route: Route, e: React.MouseEvent) => {
    e.preventDefault();
    navigate(route);
  };

  return (
    <>
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <a 
              href="/" 
              onClick={(e) => handleNavigation('overview', e)}
              className="flex items-center hover:opacity-80 transition-opacity"
            >
              <img
                className="h-8 w-8"
                src="https://assets.coingecko.com/coins/images/4480/small/Ultra.png"
                alt="Ultra Logo"
              />
              <span className="ml-2 text-xl font-bold text-gray-900">Ultra Dashboard</span>
            </a>

            <div className="block md:hidden">
              <LanguageSelector isMobile />
            </div>

            <div className="hidden md:flex md:items-center md:space-x-8">
              <a
                href="/"
                onClick={(e) => handleNavigation('overview', e)}
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors ${
                  currentRoute === 'overview'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Home className="h-4 w-4 mr-2" />
                {t('overview')}
              </a>
              <a
                href="/blockchain"
                onClick={(e) => handleNavigation('blockchain', e)}
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors ${
                  currentRoute === 'blockchain'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Cpu className="h-4 w-4 mr-2" />
                {t('blockchain')}
              </a>
              <a
                href="/tokenomics"
                onClick={(e) => handleNavigation('tokenomics', e)}
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors ${
                  currentRoute === 'tokenomics'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Coins className="h-4 w-4 mr-2" />
                {t('tokenomics')}
              </a>
              <a
                href="/analytics"
                onClick={(e) => handleNavigation('analytics', e)}
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors ${
                  currentRoute === 'analytics'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <BarChart2 className="h-4 w-4 mr-2" />
                {t('analytics')}
              </a>
              <a
                href="/news"
                onClick={(e) => handleNavigation('news', e)}
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors ${
                  currentRoute === 'news'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Newspaper className="h-4 w-4 mr-2" />
                {t('news')}
              </a>

              <LanguageSelector />
            </div>
          </div>
        </nav>
      </header>

      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
        <div className="grid grid-cols-5 gap-1 p-2">
          <a
            href="/"
            onClick={(e) => handleNavigation('overview', e)}
            className={`flex flex-col items-center justify-center p-2 transition-colors ${
              currentRoute === 'overview'
                ? 'text-primary-600 bg-primary-50'
                : 'text-gray-600 hover:text-primary-600 hover:bg-gray-50'
            }`}
          >
            <Home className="h-5 w-5" />
            <span className="text-xs mt-1">{t('overview')}</span>
          </a>
          <a
            href="/blockchain"
            onClick={(e) => handleNavigation('blockchain', e)}
            className={`flex flex-col items-center justify-center p-2 transition-colors ${
              currentRoute === 'blockchain'
                ? 'text-primary-600 bg-primary-50'
                : 'text-gray-600 hover:text-primary-600 hover:bg-gray-50'
            }`}
          >
            <Cpu className="h-5 w-5" />
            <span className="text-xs mt-1">{t('blockchain')}</span>
          </a>
          <a
            href="/tokenomics"
            onClick={(e) => handleNavigation('tokenomics', e)}
            className={`flex flex-col items-center justify-center p-2 transition-colors ${
              currentRoute === 'tokenomics'
                ? 'text-primary-600 bg-primary-50'
                : 'text-gray-600 hover:text-primary-600 hover:bg-gray-50'
            }`}
          >
            <Coins className="h-5 w-5" />
            <span className="text-xs mt-1">{t('tokenomics')}</span>
          </a>
          <a
            href="/analytics"
            onClick={(e) => handleNavigation('analytics', e)}
            className={`flex flex-col items-center justify-center p-2 transition-colors ${
              currentRoute === 'analytics'
                ? 'text-primary-600 bg-primary-50'
                : 'text-gray-600 hover:text-primary-600 hover:bg-gray-50'
            }`}
          >
            <BarChart2 className="h-5 w-5" />
            <span className="text-xs mt-1">{t('analytics')}</span>
          </a>
          <a
            href="/news"
            onClick={(e) => handleNavigation('news', e)}
            className={`flex flex-col items-center justify-center p-2 transition-colors ${
              currentRoute === 'news'
                ? 'text-primary-600 bg-primary-50'
                : 'text-gray-600 hover:text-primary-600 hover:bg-gray-50'
            }`}
          >
            <Newspaper className="h-5 w-5" />
            <span className="text-xs mt-1">{t('news')}</span>
          </a>
        </div>
      </div>
    </>
  );
};

export default Header;
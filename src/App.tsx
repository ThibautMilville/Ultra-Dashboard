import { lazy, Suspense, useEffect } from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import { LanguageProvider } from './contexts/LanguageContext';
import { useRouterStore } from './store/routerStore';

// Lazy load components
const Overview = lazy(() => import('./pages/Overview'));
const Blockchain = lazy(() => import('./pages/Blockchain'));
const Tokenomics = lazy(() => import('./pages/Tokenomics'));
const Analytics = lazy(() => import('./pages/Analytics'));
const News = lazy(() => import('./pages/News'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const TermsOfService = lazy(() => import('./pages/TermsOfService'));

function App() {
  const currentRoute = useRouterStore((state) => state.currentRoute);
  const navigate = useRouterStore((state) => state.navigate);

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      if (path === '/blockchain') navigate('blockchain');
      else if (path === '/tokenomics') navigate('tokenomics');
      else if (path === '/analytics') navigate('analytics');
      else if (path === '/news') navigate('news');
      else if (path === '/privacy') navigate('privacy');
      else if (path === '/terms') navigate('terms');
      else navigate('overview');
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [navigate]);

  const renderPage = () => {
    switch (currentRoute) {
      case 'blockchain':
        return <Blockchain />;
      case 'tokenomics':
        return <Tokenomics />;
      case 'analytics':
        return <Analytics />;
      case 'news':
        return <News />;
      case 'privacy':
        return <PrivacyPolicy />;
      case 'terms':
        return <TermsOfService />;
      default:
        return <Overview />;
    }
  };

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <Suspense fallback={
          <div className="flex items-center justify-center min-h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          </div>
        }>
          {renderPage()}
        </Suspense>
        <Footer />
      </div>
    </LanguageProvider>
  );
}

export default App;
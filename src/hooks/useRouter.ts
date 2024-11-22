import { useState, useEffect } from 'react';

export type Route = 'overview' | 'blockchain' | 'tokenomics' | 'analytics' | 'news' | 'privacy' | 'terms';

export const useRouter = () => {
  const [currentRoute, setCurrentRoute] = useState<Route>(() => {
    const path = window.location.pathname;
    if (path === '/blockchain') return 'blockchain';
    if (path === '/tokenomics') return 'tokenomics';
    if (path === '/analytics') return 'analytics';
    if (path === '/news') return 'news';
    if (path === '/privacy') return 'privacy';
    if (path === '/terms') return 'terms';
    return 'overview';
  });

  useEffect(() => {
    const handleRouteChange = () => {
      const path = window.location.pathname;
      if (path === '/blockchain') setCurrentRoute('blockchain');
      else if (path === '/tokenomics') setCurrentRoute('tokenomics');
      else if (path === '/analytics') setCurrentRoute('analytics');
      else if (path === '/news') setCurrentRoute('news');
      else if (path === '/privacy') setCurrentRoute('privacy');
      else if (path === '/terms') setCurrentRoute('terms');
      else setCurrentRoute('overview');
    };

    window.addEventListener('popstate', handleRouteChange);
    return () => window.removeEventListener('popstate', handleRouteChange);
  }, []);

  const navigate = (route: Route) => {
    const path = route === 'overview' ? '/' : `/${route}`;
    window.history.pushState({}, '', path);
    setCurrentRoute(route);
  };

  return { currentRoute, navigate };
};
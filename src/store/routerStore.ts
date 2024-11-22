import { create } from 'zustand';

export type Route = 'overview' | 'blockchain' | 'tokenomics' | 'analytics' | 'news' | 'privacy' | 'terms';

interface RouterState {
  currentRoute: Route;
  setRoute: (route: Route) => void;
}

export const useRouterStore = create<RouterState>((set) => ({
  currentRoute: (() => {
    if (typeof window === 'undefined') return 'overview';
    
    const path = window.location.pathname;
    if (path === '/blockchain') return 'blockchain';
    if (path === '/tokenomics') return 'tokenomics';
    if (path === '/analytics') return 'analytics';
    if (path === '/news') return 'news';
    if (path === '/privacy') return 'privacy';
    if (path === '/terms') return 'terms';
    return 'overview';
  })(),
  setRoute: (route) => set({ currentRoute: route }),
}));
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Article, Category, CacheData } from '../types/news';

interface NewsState {
  cache: CacheData;
  currentLanguage: string;
  loading: boolean;
  loadingMore: boolean;
  error: string | null;
  page: number;
  hasInitialized: boolean;
  updateCache: (language: string, articles: Article[], categories: Category[], hasMore: boolean) => void;
  appendToCache: (language: string, articles: Article[], hasMore: boolean) => void;
  setLoading: (loading: boolean) => void;
  setLoadingMore: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setPage: (page: number) => void;
  setCurrentLanguage: (language: string) => void;
  clearCache: () => void;
  setHasInitialized: (value: boolean) => void;
}

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

const getInitialLanguage = () => {
  const savedLanguage = localStorage.getItem('ultra_dashboard_language');
  if (savedLanguage && ['en', 'fr'].includes(savedLanguage)) {
    return savedLanguage;
  }
  
  const browserLang = navigator.language.toLowerCase();
  if (browserLang.startsWith('fr')) {
    return 'fr';
  }
  return 'en';
};

export const useNewsStore = create<NewsState>()(
  persist(
    (set) => ({
      cache: {},
      currentLanguage: getInitialLanguage(),
      loading: false,
      loadingMore: false,
      error: null,
      page: 1,
      hasInitialized: false,
      updateCache: (language, articles, categories, hasMore) =>
        set((state) => ({
          cache: {
            ...state.cache,
            [language]: {
              articles,
              categories,
              hasMore,
              timestamp: Date.now(),
            },
          },
          loading: false,
          loadingMore: false,
        })),
      appendToCache: (language, newArticles, hasMore) =>
        set((state) => {
          const existingCache = state.cache[language] || {
            articles: [],
            categories: [],
            hasMore: true,
            timestamp: Date.now(),
          };
          
          // Create a map of existing article IDs for faster lookup
          const existingArticleIds = new Set(existingCache.articles.map(article => article.id));
          
          // Filter out duplicates and append new articles
          const uniqueNewArticles = newArticles.filter(article => !existingArticleIds.has(article.id));
          
          return {
            cache: {
              ...state.cache,
              [language]: {
                ...existingCache,
                articles: [...existingCache.articles, ...uniqueNewArticles],
                hasMore,
                timestamp: Date.now(),
              },
            },
            loading: false,
            loadingMore: false,
          };
        }),
      setLoading: (loading) => set({ loading }),
      setLoadingMore: (loading) => set({ loadingMore: loading }),
      setError: (error) => set({ error }),
      setPage: (page) => set({ page }),
      setCurrentLanguage: (language) => 
        set((state) => {
          const cachedData = state.cache[language];
          return {
            currentLanguage: language,
            page: 1,
            loading: !cachedData?.articles,
            loadingMore: false,
            hasInitialized: !!cachedData?.articles,
          };
        }),
      clearCache: () => set({ 
        cache: {}, 
        page: 1,
        loading: true,
        loadingMore: false,
        hasInitialized: false,
      }),
      setHasInitialized: (value) => set({ hasInitialized: value }),
    }),
    {
      name: 'news-cache',
      partialize: (state) => ({
        cache: state.cache,
        currentLanguage: state.currentLanguage,
      }),
    }
  )
);

export const shouldFetchArticles = (timestamp: number | undefined): boolean => {
  if (!timestamp) return true;
  return Date.now() - timestamp > CACHE_DURATION;
};
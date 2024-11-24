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
  updateCache: (language: string, articles: Article[], categories: Category[], hasMore: boolean) => void;
  appendToCache: (language: string, articles: Article[], hasMore: boolean) => void;
  setLoading: (loading: boolean) => void;
  setLoadingMore: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setPage: (page: number) => void;
  setCurrentLanguage: (language: string) => void;
  clearCache: () => void;
}

const CACHE_DURATION = 300000; // 5 minutes

export const useNewsStore = create<NewsState>()(
  persist(
    (set) => ({
      cache: {},
      currentLanguage: 'en',
      loading: false,
      loadingMore: false,
      error: null,
      page: 1,
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
          const existingArticles = state.cache[language]?.articles || [];
          const uniqueArticles = [...existingArticles];
          
          newArticles.forEach(article => {
            if (!existingArticles.some(existing => existing.id === article.id)) {
              uniqueArticles.push(article);
            }
          });
          
          return {
            cache: {
              ...state.cache,
              [language]: {
                ...state.cache[language],
                articles: uniqueArticles,
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
        set({
          currentLanguage: language,
          page: 1,
          loading: true,
          loadingMore: false,
        }),
      clearCache: () => set({ 
        cache: {}, 
        page: 1,
        loading: true,
        loadingMore: false,
      }),
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
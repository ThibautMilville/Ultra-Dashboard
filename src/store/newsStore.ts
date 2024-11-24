import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Article {
  id: string;
  attributes: {
    title: string;
    alias: string;
    created: string;
    images: {
      image_intro: string;
    };
    text: string;
  };
}

interface CacheData {
  [key: string]: {
    articles: Article[];
    hasMore: boolean;
    timestamp: number;
  };
}

interface NewsState {
  cache: CacheData;
  currentLanguage: string;
  loading: boolean;
  error: string | null;
  page: number;
  updateCache: (language: string, articles: Article[], hasMore: boolean) => void;
  appendToCache: (language: string, articles: Article[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setPage: (page: number) => void;
  setCurrentLanguage: (language: string) => void;
  clearCache: () => void;
}

const CACHE_DURATION = 300000; // 5 minutes cache

export const useNewsStore = create<NewsState>()(
  persist(
    (set) => ({
      cache: {},
      currentLanguage: 'en',
      loading: false,
      error: null,
      page: 1,
      updateCache: (language, articles, hasMore) =>
        set((state) => ({
          cache: {
            ...state.cache,
            [language]: {
              articles,
              hasMore,
              timestamp: Date.now(),
            },
          },
        })),
      appendToCache: (language, newArticles) =>
        set((state) => ({
          cache: {
            ...state.cache,
            [language]: {
              articles: [...(state.cache[language]?.articles || []), ...newArticles],
              hasMore: newArticles.length === 9,
              timestamp: Date.now(),
            },
          },
        })),
      setLoading: (loading) => set({ loading }),
      setError: (error) => set({ error }),
      setPage: (page) => set({ page }),
      setCurrentLanguage: (language) => set({ currentLanguage: language, page: 1 }),
      clearCache: () => set({ cache: {} }),
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
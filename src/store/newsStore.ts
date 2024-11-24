import { create } from 'zustand';
import { Article, Category } from '../types/news';

interface NewsState {
  articles: Article[];
  categories: Category[];
  hasMore: boolean;
  loading: boolean;
  loadingMore: boolean;
  error: string | null;
  page: number;
  setArticles: (articles: Article[]) => void;
  setCategories: (categories: Category[]) => void;
  setHasMore: (hasMore: boolean) => void;
  setLoading: (loading: boolean) => void;
  setLoadingMore: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setPage: (page: number) => void;
}

const initialState = {
  articles: [],
  categories: [],
  hasMore: true,
  loading: true,
  loadingMore: false,
  error: null,
  page: 1,
};

export const useNewsStore = create<NewsState>((set) => ({
  ...initialState,
  setArticles: (articles) => set({ articles }),
  setCategories: (categories) => set({ categories }),
  setHasMore: (hasMore) => set({ hasMore }),
  setLoading: (loading) => set({ loading }),
  setLoadingMore: (loadingMore) => set({ loadingMore }),
  setError: (error) => set({ error }),
  setPage: (page) => set({ page }),
}));
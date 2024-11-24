import React, { useEffect, useCallback, useRef } from 'react';
import { Loader } from 'lucide-react';
import axios from 'axios';
import ArticleCard from '../components/pages/news/ArticleCard';
import LoadMoreButton from '../components/common/LoadMoreButton';
import { useLanguage } from '../contexts/LanguageContext';
import { useNewsStore, shouldFetchArticles } from '../store/newsStore';

const News: React.FC = () => {
  const { language } = useLanguage();
  const initialFetchRef = useRef(false);
  const loadingRef = useRef(false);
  const {
    cache,
    currentLanguage,
    loading,
    loadingMore,
    error,
    page,
    updateCache,
    appendToCache,
    setLoading,
    setLoadingMore,
    setError,
    setPage,
    setCurrentLanguage,
    clearCache,
  } = useNewsStore();

  const currentCache = cache[currentLanguage];
  const articles = currentCache?.articles || [];
  const categories = currentCache?.categories || [];
  const hasMore = currentCache?.hasMore ?? true;

  const fetchArticles = useCallback(async (pageNum: number, isNewFetch: boolean = false) => {
    if (loadingRef.current) return;
    loadingRef.current = true;
    
    try {
      const languageCode = currentLanguage === 'fr' ? 'fr-FR' : 'en-GB';
      
      // Check cache for initial fetch
      if (isNewFetch && currentCache && !shouldFetchArticles(currentCache.timestamp)) {
        setLoading(false);
        loadingRef.current = false;
        return;
      }
      
      // Fetch categories if it's a new fetch
      let currentCategories = categories;
      if (isNewFetch) {
        const categoriesResponse = await axios.get('/api-ultra-times-categories');
        currentCategories = categoriesResponse.data?.data || [];
      }
      
      const response = await axios.get('/api-ultra-times-content', {
        params: {
          'page[limit]': 9,
          'page[offset]': (pageNum - 1) * 9,
          'filter[language]': languageCode,
          'filter[state]': 1
        }
      });

      const newArticles = response.data?.data || [];
      const hasMoreArticles = newArticles.length === 9;
      
      if (isNewFetch) {
        updateCache(currentLanguage, newArticles, currentCategories, hasMoreArticles);
      } else {
        appendToCache(currentLanguage, newArticles, hasMoreArticles);
      }

      setError(null);
    } catch (err) {
      console.error('Error fetching articles:', err);
      setError('Failed to load articles. Please try again later.');
    } finally {
      setLoading(false);
      setLoadingMore(false);
      loadingRef.current = false;
    }
  }, [currentLanguage, currentCache, categories, updateCache, appendToCache, setError, setLoading, setLoadingMore]);

  useEffect(() => {
    if (language !== currentLanguage) {
      setCurrentLanguage(language);
      initialFetchRef.current = false;
    }
  }, [language, currentLanguage, setCurrentLanguage]);

  useEffect(() => {
    if (!initialFetchRef.current) {
      initialFetchRef.current = true;
      if (!currentCache || shouldFetchArticles(currentCache.timestamp)) {
        setLoading(true);
        fetchArticles(1, true);
      }
    }
  }, [currentCache, fetchArticles, setLoading]);

  useEffect(() => {
    if (page > 1 && hasMore && !loadingRef.current) {
      setLoadingMore(true);
      fetchArticles(page, false);
    }
  }, [page, hasMore, fetchArticles]);

  const getCategoryAlias = (categoryId: string): string => {
    const category = categories.find(cat => cat.id === categoryId);
    return category?.attributes.alias || '';
  };

  const handleReadMore = (categoryId: string, alias: string) => {
    const categoryAlias = getCategoryAlias(categoryId);
    const langPrefix = currentLanguage === 'fr' ? '' : 'en/';
    window.open(`https://ultratimes.io/${langPrefix}${categoryAlias}/${alias}`, '_blank');
  };

  const handleRetry = () => {
    clearCache();
    initialFetchRef.current = false;
    loadingRef.current = false;
    setLoading(true);
    fetchArticles(1, true);
  };

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center py-12">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={handleRetry}
            className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Latest News</h1>
        <p className="text-lg text-gray-600">
          Stay updated with the latest developments, announcements, and updates from Ultra Times.
        </p>
      </div>

      {loading && articles.length === 0 ? (
        <div className="flex justify-center items-center py-12">
          <Loader className="h-8 w-8 animate-spin text-primary-600" />
        </div>
      ) : (
        <>
          {articles.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">No articles found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((article) => (
                <ArticleCard
                  key={article.id}
                  title={article.attributes.title}
                  created={article.attributes.created}
                  imageUrl={article.attributes.images.image_intro}
                  text={article.attributes.text}
                  alias={article.attributes.alias}
                  categoryId={article.relationships.category.data.id}
                  onReadMore={handleReadMore}
                />
              ))}
            </div>
          )}

          {hasMore && !loading && articles.length > 0 && (
            <LoadMoreButton
              loading={loadingMore}
              onClick={() => setPage(page + 1)}
            />
          )}
        </>
      )}
    </div>
  );
};

export default News;
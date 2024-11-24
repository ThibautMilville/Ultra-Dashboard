import React, { useEffect, useCallback } from 'react';
import { Loader } from 'lucide-react';
import axios from 'axios';
import ArticleCard from '../components/pages/news/ArticleCard';
import LoadMoreButton from '../components/common/LoadMoreButton';
import { useLanguage } from '../contexts/LanguageContext';
import { useNewsStore, shouldFetchArticles } from '../store/newsStore';

const News: React.FC = () => {
  const { language } = useLanguage();
  const {
    cache,
    currentLanguage,
    loading,
    error,
    page,
    updateCache,
    appendToCache,
    setLoading,
    setError,
    setPage,
    setCurrentLanguage,
  } = useNewsStore();

  const currentCache = cache[currentLanguage];
  const articles = currentCache?.articles || [];
  const hasMore = currentCache?.hasMore ?? true;

  const fetchArticles = useCallback(async (pageNum: number, isNewFetch: boolean = false) => {
    try {
      const languageCode = currentLanguage === 'fr' ? 'fr-FR' : 'en-GB';
      const response = await axios.get('/proxy', {
        params: {
          'page[limit]': 9,
          'page[offset]': (pageNum - 1) * 9,
          'filter[language]': languageCode,
          'filter[state]': 1
        }
      });

      const newArticles = response.data?.data || [];
      
      if (isNewFetch) {
        updateCache(currentLanguage, newArticles, newArticles.length === 9);
      } else {
        appendToCache(currentLanguage, newArticles);
      }

      setError(null);
    } catch (err) {
      console.error('Error fetching articles:', err);
      setError('Failed to load articles. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, [currentLanguage, updateCache, appendToCache, setError, setLoading]);

  useEffect(() => {
    if (language !== currentLanguage) {
      setCurrentLanguage(language);
      const newCache = cache[language];
      
      if (!newCache || shouldFetchArticles(newCache.timestamp)) {
        setLoading(true);
        fetchArticles(1, true);
      }
    }
  }, [language, currentLanguage, cache, fetchArticles, setCurrentLanguage, setLoading]);

  useEffect(() => {
    if (page > 1 && hasMore) {
      setLoading(true);
      fetchArticles(page);
    }
  }, [page, hasMore, fetchArticles]);

  useEffect(() => {
    if (!currentCache || shouldFetchArticles(currentCache.timestamp)) {
      setLoading(true);
      fetchArticles(1, true);
    }
  }, [currentCache, fetchArticles]);

  const handleReadMore = (alias: string) => {
    window.open(`https://ultratimes.io/${alias}`, '_blank');
  };

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center py-12">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => {
              setLoading(true);
              setPage(1);
              fetchArticles(1, true);
            }}
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
          {articles.length === 0 && !loading ? (
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
                  onReadMore={handleReadMore}
                />
              ))}
            </div>
          )}

          {hasMore && !loading && articles.length > 0 && (
            <LoadMoreButton
              loading={loading}
              onClick={() => setPage(page + 1)}
            />
          )}
        </>
      )}
    </div>
  );
};

export default News;
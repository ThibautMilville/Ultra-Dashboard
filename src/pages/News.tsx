import React, { useState, useEffect } from 'react';
import { Loader } from 'lucide-react';
import axios from 'axios';
import ArticleCard from '../components/pages/news/ArticleCard';
import LoadMoreButton from '../components/common/LoadMoreButton';
import { useLanguage } from '../contexts/LanguageContext';

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

const News: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const { language } = useLanguage();
  
  const fetchArticles = async () => {
    try {
      const languageCode = language === 'fr' ? 'fr-FR' : 'en-GB';
      const response = await axios.get('/proxy', {
        params: {
          'page[limit]': 9,
          'page[offset]': (Number(page) - 1) * 9,
          'filter[language]': languageCode,
          'filter[state]': 1
        }
      });

      const newArticles = response.data?.data || [];
      
      if (page === 1) {
        setArticles(newArticles);
      } else {
        setArticles(prev => [...prev, ...newArticles]);
      }

      setHasMore(newArticles.length === 9);
      if (newArticles.length === 0) {
        setHasMore(false);
      }

      setError(null);
    } catch (err) {
      console.error('Error fetching articles:', err);
      setError('Failed to load articles. Please try again later.');
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setPage(1);
    setArticles([]);
    setLoading(true);
    fetchArticles();
  }, [language]);

  useEffect(() => {
    fetchArticles();
  }, [page]);

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
              fetchArticles();
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
              onClick={() => setPage(prev => prev + 1)}
            />
          )}
        </>
      )}
    </div>
  );
};

export default News;
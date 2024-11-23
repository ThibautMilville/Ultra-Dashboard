import React, { useState, useEffect } from 'react';
import { Calendar, ArrowUpRight, Loader } from 'lucide-react';
import axios from 'axios';
import { format } from 'date-fns';

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
  relationships: {
    category: {
      data: {
        id: string;
      };
    };
  };
}

interface ApiResponse {
  data: Article[];
  links: {
    next: string | null;
  };
}

const News: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const API_KEY_ULTRA_TIMES = import.meta.env.VITE_API_KEY_ULTRA_TIMES;

  const fetchArticles = async () => {
    try {
      const response = await axios.get<ApiResponse>(
        'https://ultratimes.io/api/index.php/v1/content/articles',
        {
          headers: {
            Authorization: 'Bearer ' + API_KEY_ULTRA_TIMES
          },
          params: {
            'page[limit]': 9,
            'page[offset]': (page - 1) * 9
          }
        }
      );

      if (page === 1) {
        setArticles(response.data.data);
      } else {
        setArticles(prev => [...prev, ...response.data.data]);
      }

      setHasMore(!!response.data.links.next);
      setError(null);
    } catch (err) {
      setError('Failed to load articles. Please try again later.');
      console.error('Error fetching articles:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, [page]);

  const getExcerpt = (text: string) => {
    const div = document.createElement('div');
    div.innerHTML = text;
    const textContent = div.textContent || div.innerText;
    return textContent.slice(0, 200) + '...';
  };

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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <div key={article.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="relative h-48">
                  <img
                    src={article.attributes.images.image_intro}
                    alt={article.attributes.title}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-4 left-4 bg-primary-600 text-white px-3 py-1 rounded-full text-sm">
                    Ultra Times
                  </span>
                </div>
                <div className="p-6">
                  <div className="flex items-center text-gray-500 text-sm mb-3">
                    <Calendar className="h-4 w-4 mr-2" />
                    {format(new Date(article.attributes.created), 'MMM dd, yyyy')}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {article.attributes.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {getExcerpt(article.attributes.text)}
                  </p>
                  <button
                    onClick={() => handleReadMore(article.attributes.alias)}
                    className="flex items-center text-primary-600 hover:text-primary-700"
                  >
                    Read more on Ultra Times
                    <ArrowUpRight className="h-4 w-4 ml-1" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {hasMore && (
            <div className="mt-8 text-center">
              <button
                onClick={() => setPage(prev => prev + 1)}
                className="px-6 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 disabled:opacity-50"
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center">
                    <Loader className="animate-spin h-4 w-4 mr-2" />
                    Loading...
                  </span>
                ) : (
                  'Load More Articles'
                )}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default News;
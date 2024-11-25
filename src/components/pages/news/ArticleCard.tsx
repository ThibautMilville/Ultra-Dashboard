import React, { useState, useEffect } from 'react';
import { Calendar, ArrowUpRight } from 'lucide-react';
import { format } from 'date-fns';

interface ArticleCardProps {
  title: string;
  created: string;
  imageUrl: string;
  text: string;
  alias: string;
  categoryId: string;
  onReadMore: (categoryId: string, alias: string) => void;
}

const imageCache = new Map<string, string>();
const fallbackImage = 'https://assets.coingecko.com/coins/images/4480/small/Ultra.png';

const ArticleCard: React.FC<ArticleCardProps> = ({
  title,
  created,
  imageUrl,
  text,
  alias,
  categoryId,
  onReadMore,
}) => {
  const [imageSrc, setImageSrc] = useState<string>(() => imageCache.get(imageUrl) || imageUrl);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!imageCache.has(imageUrl)) {
      const img = new Image();
      img.onload = () => {
        imageCache.set(imageUrl, imageUrl);
        setImageSrc(imageUrl);
      };
      img.onerror = () => {
        imageCache.set(imageUrl, fallbackImage);
        setImageSrc(fallbackImage);
      };
      img.src = imageUrl;
    }
  }, [imageUrl]);

  const getExcerpt = (content: string) => {
    try {
      const div = document.createElement('div');
      div.innerHTML = content;
      const textContent = div.textContent || div.innerText;
      return textContent.slice(0, 150) + '...';
    } catch (error) {
      console.error('Error parsing article content:', error);
      return 'Article content unavailable';
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'MMM dd, yyyy');
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Date unavailable';
    }
  };

  const handleClick = () => onReadMore(categoryId, alias);

  return (
    <div className="group bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-lg hover:translate-y-[-2px]">
      <div 
        className="relative h-52 overflow-hidden cursor-pointer"
        onClick={handleClick}
      >
        <img
          src={imageSrc}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            if (target.src !== fallbackImage) {
              target.src = fallbackImage;
            }
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-primary-600 px-4 py-1.5 rounded-full text-sm font-medium shadow-sm">
          Ultra Times
        </span>
      </div>
      <div className="p-6">
        <div className="flex items-center text-gray-500 text-sm mb-3">
          <Calendar className="h-4 w-4 mr-2" />
          {formatDate(created)}
        </div>
        <h3 
          className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2 min-h-[3.5rem] group-hover:text-primary-600 transition-colors duration-200 cursor-pointer"
          onClick={handleClick}
        >
          {title}
        </h3>
        <p className="text-gray-600 mb-6 line-clamp-3 min-h-[4.5rem]">
          {getExcerpt(text)}
        </p>
        <button
          onClick={handleClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative inline-flex items-center justify-center w-full px-6 py-3.5 text-sm font-medium transition-all duration-200 bg-gray-50 hover:bg-primary-600/95 text-gray-900 hover:text-white rounded-lg overflow-hidden shadow-sm hover:shadow-md"
        >
          <span className={`flex items-center transition-transform duration-300 ${
            isHovered ? 'transform translate-x-2' : ''
          }`}>
            Read full article
            <ArrowUpRight className={`ml-2 h-4 w-4 transition-all duration-300 ${
              isHovered ? 'transform translate-x-1 -translate-y-1' : ''
            }`} />
          </span>
        </button>
      </div>
    </div>
  );
};

export default ArticleCard;
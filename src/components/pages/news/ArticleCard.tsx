import React, { useState, useEffect } from 'react';
import { Calendar, ArrowUpRight } from 'lucide-react';
import { format } from 'date-fns';

interface ArticleCardProps {
  title: string;
  created: string;
  imageUrl: string;
  text: string;
  alias: string;
  onReadMore: (alias: string) => void;
}

const imageCache = new Map<string, string>();

const ArticleCard: React.FC<ArticleCardProps> = ({
  title,
  created,
  imageUrl,
  text,
  alias,
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
        const fallbackUrl = 'https://assets.coingecko.com/coins/images/4480/small/Ultra.png';
        imageCache.set(imageUrl, fallbackUrl);
        setImageSrc(fallbackUrl);
      };
      img.src = imageUrl;
    }
  }, [imageUrl]);

  const getExcerpt = (content: string) => {
    const div = document.createElement('div');
    div.innerHTML = content;
    const textContent = div.textContent || div.innerText;
    return textContent.slice(0, 300) + '...';
  };

  return (
    <div className="group bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-lg hover:translate-y-[-2px]">
      <div className="relative h-52 overflow-hidden">
        <img
          src={imageSrc}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-primary-600 px-4 py-1.5 rounded-full text-sm font-medium shadow-sm">
          Ultra Times
        </span>
      </div>
      <div className="p-6">
        <div className="flex items-center text-gray-500 text-sm mb-3">
          <Calendar className="h-4 w-4 mr-2" />
          {format(new Date(created), 'MMM dd, yyyy')}
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2 min-h-[3.5rem] group-hover:text-primary-600 transition-colors duration-200">
          {title}
        </h3>
        <p className="text-gray-600 mb-6 line-clamp-4 min-h-[6rem]">
          {getExcerpt(text)}
        </p>
        <button
          onClick={() => onReadMore(alias)}
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
          <div className="absolute inset-0 bg-gradient-to-r from-primary-600/0 via-primary-600/5 to-primary-600/0 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
        </button>
      </div>
    </div>
  );
};

export default ArticleCard;
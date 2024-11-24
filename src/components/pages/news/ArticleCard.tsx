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
    return textContent.slice(0, 200) + '...';
  };

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="relative h-48">
        <img
          src={imageSrc}
          alt={title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <span className="absolute top-4 left-4 bg-primary-600 text-white px-3 py-1 rounded-full text-sm">
          Ultra Times
        </span>
      </div>
      <div className="p-6">
        <div className="flex items-center text-gray-500 text-sm mb-3">
          <Calendar className="h-4 w-4 mr-2" />
          {format(new Date(created), 'MMM dd, yyyy')}
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {title}
        </h3>
        <p className="text-gray-600 mb-4">
          {getExcerpt(text)}
        </p>
        <button
          onClick={() => onReadMore(alias)}
          className="flex items-center text-primary-600 hover:text-primary-700"
        >
          Read more on Ultra Times
          <ArrowUpRight className="h-4 w-4 ml-1" />
        </button>
      </div>
    </div>
  );
};

export default ArticleCard;
import React from 'react';
import { Loader } from 'lucide-react';

interface LoadMoreButtonProps {
  loading: boolean;
  onClick: () => void;
}

const LoadMoreButton: React.FC<LoadMoreButtonProps> = ({ loading, onClick }) => {
  return (
    <div className="mt-8 text-center">
      <button
        onClick={onClick}
        disabled={loading}
        className={`px-6 py-2 bg-primary-600 text-white rounded-md transition-all duration-200 ${
          loading ? 'opacity-75 cursor-not-allowed' : 'hover:bg-primary-700'
        }`}
      >
        {loading ? (
          <span className="flex items-center justify-center">
            <Loader className="animate-spin h-4 w-4 mr-2" />
            Loading more articles...
          </span>
        ) : (
          'Load More Articles'
        )}
      </button>
    </div>
  );
};

export default LoadMoreButton;
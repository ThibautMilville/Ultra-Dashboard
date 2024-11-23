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
  );
};

export default LoadMoreButton;
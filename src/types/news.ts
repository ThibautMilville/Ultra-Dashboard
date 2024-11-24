export interface Category {
  id: string;
  attributes: {
    id: number;
    title: string;
    alias: string;
  };
}

export interface Article {
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
        type: string;
        id: string;
      };
    };
  };
}

export interface CacheData {
  [key: string]: {
    articles: Article[];
    categories: Category[];
    hasMore: boolean;
    timestamp: number;
  };
}
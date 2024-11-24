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
}

export interface CacheData {
  [key: string]: {
    articles: Article[];
    hasMore: boolean;
    timestamp: number;
  };
}
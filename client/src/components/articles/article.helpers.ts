import { NewsArticle } from "../../react-query/types/newsApi";
import { YouTubeSearchItem } from "../../types/ytApi";

export const getRandomArticles = (
  articles: NewsArticle[] = [],
  count: number
): NewsArticle[] => {
  return [...articles].sort(() => 0.5 - Math.random()).slice(0, count);
};

export const getRandomVideos = (
  videos: YouTubeSearchItem[] = [],
  count: number
): YouTubeSearchItem[] => {
  return [...videos].sort(() => 0.5 - Math.random()).slice(0, count);
};

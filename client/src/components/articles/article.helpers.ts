import { NewsArticle } from "../../react-query/types/newsApi";
import { YouTubePlaylistItem } from "../../types/ytApi";

export const getRandomArticles = (
  articles: NewsArticle[] = [],
  count: number
): NewsArticle[] => {
  return [...articles].sort(() => 0.5 - Math.random()).slice(0, count);
};

export const getRandomVideos = (
  videos: YouTubePlaylistItem[] = [],
  count: number
): YouTubePlaylistItem[] => {
  return [...videos].sort(() => 0.5 - Math.random()).slice(0, count);
};

import { Article } from "@shared/types/article";
import { YouTubePlaylistItem } from "@shared/types/ytApi";

export const getRandomArticles = (
  articles: Article[] = [],
  count: number
): Article[] => {
  return [...articles].sort(() => 0.5 - Math.random()).slice(0, count);
};

export const getRandomVideos = (
  videos: YouTubePlaylistItem[] = [],
  count: number
): YouTubePlaylistItem[] => {
  return [...videos].sort(() => 0.5 - Math.random()).slice(0, count);
};

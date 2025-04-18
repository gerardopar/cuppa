import { NewsArticle } from "../../react-query/types/newsApi";

export const getRandomArticles = (
  articles: NewsArticle[] = [],
  count: number
): NewsArticle[] => {
  return [...articles].sort(() => 0.5 - Math.random()).slice(0, count);
};

export enum NewsCategoriesEnum {
  mostTrendingNews = "Most Trending News",
  politics = "Politics",
  healthLifestyle = "Health & Lifestyle",
  sports = "Sports",
}

export const newsCategories = {
  [NewsCategoriesEnum.mostTrendingNews]: {
    sources: [
      "abc-news",
      "associated-press",
      "axios",
      "cbs-news",
      "cnn",
      "fox-news",
      "nbc-news",
      "usa-today",
      "reuters",
      "the-washington-post",
      "newsweek",
      "time",
    ],
  },
  [NewsCategoriesEnum.politics]: {
    sources: [
      "politico",
      "axios",
      "the-hill",
      "cnn",
      "fox-news",
      "nbc-news",
      "reuters",
      "the-washington-post",
      "associated-press",
      "abc-news",
    ],
  },
  [NewsCategoriesEnum.healthLifestyle]: {
    sources: [
      "medical-news-today",
      "usa-today",
      "nbc-news",
      "cnn",
      "abc-news",
      "time",
      "the-washington-post",
    ],
  },
  [NewsCategoriesEnum.sports]: {
    sources: [
      "bleacher-report",
      "espn",
      "espn-cric-info",
      "fox-sports",
      "nfl-news",
      "nhl-news",
    ],
  },
};

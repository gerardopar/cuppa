export enum NewsCategoriesEnum {
  mostTrendingNews = "Most Trending News",
  politics = "Politics",
  healthLifestyle = "Health & Lifestyle",
  sports = "Sports",
  business = "Business & Finance",
  technology = "Technology",
  entertainment = "Entertainment",
  scienceEnvironment = "Science & Environment",
}

export const newsCategoriesArray: NewsCategoriesEnum[] = Object.values(
  NewsCategoriesEnum
) as NewsCategoriesEnum[];

export const newsCategories: Record<
  NewsCategoriesEnum,
  { sources: string[]; advancedQuery?: string }
> = {
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
    advancedQuery:
      '("mental health" OR wellness OR nutrition OR fitness) AND (habits OR tips OR lifestyle) NOT gaming',
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
  [NewsCategoriesEnum.business]: {
    sources: [
      "bloomberg",
      "business-insider",
      "fortune",
      "the-wall-street-journal",
    ],
  },
  [NewsCategoriesEnum.technology]: {
    sources: [
      "ars-technica",
      "crypto-coins-news",
      "engadget",
      "recode",
      "techcrunch",
      "techradar",
      "the-next-web",
      "the-verge",
      "wired",
    ],
  },
  [NewsCategoriesEnum.entertainment]: {
    sources: [
      "buzzfeed",
      "entertainment-weekly",
      "ign",
      "mashable",
      "mtv-news",
      "polygon",
    ],
  },
  [NewsCategoriesEnum.scienceEnvironment]: {
    sources: ["national-geographic", "new-scientist", "next-big-future"],
  },
};

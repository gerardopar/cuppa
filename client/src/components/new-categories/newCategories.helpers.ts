import { NewsCategoriesEnum } from "../../pages/home/news.helpers";

export enum GeneralCategoryEnum {
  breakingNews = "Breaking News",
  politics = "Politics",
  business = "Business",
  technology = "Technology",
  sports = "Sports",
  entertainment = "Entertainment",
}

export const getActiveCategory = (
  pathname: string,
  category: NewsCategoriesEnum
) => {
  if (pathname === "/" || pathname === "/home") {
    return NewsCategoriesEnum.mostTrendingNews;
  }

  return category;
};

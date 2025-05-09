import { NewsCategoriesEnum } from "../../react-query/helpers/news.helpers";

export const getActiveCategory = (
  pathname: string,
  category: NewsCategoriesEnum
) => {
  if (pathname === "/" || pathname === "/home") {
    return NewsCategoriesEnum.mostTrendingNews;
  } else if (pathname === "/politics") {
    return NewsCategoriesEnum.politics;
  } else if (pathname === "/health-life-style") {
    return NewsCategoriesEnum.healthLifestyle;
  } else if (pathname === "/business") {
    return NewsCategoriesEnum.business;
  } else if (pathname === "/technology") {
    return NewsCategoriesEnum.technology;
  } else if (pathname === "/sports") {
    return NewsCategoriesEnum.sports;
  } else if (pathname === "/entertainment") {
    return NewsCategoriesEnum.entertainment;
  } else if (pathname === "/science-environment") {
    return NewsCategoriesEnum.scienceEnvironment;
  }

  return category;
};

export const getCategoryRoute = (category: NewsCategoriesEnum) => {
  if (category === NewsCategoriesEnum.mostTrendingNews) {
    return "/";
  } else if (category === NewsCategoriesEnum.politics) {
    return "/politics";
  } else if (category === NewsCategoriesEnum.healthLifestyle) {
    return "/health-life-style";
  } else if (category === NewsCategoriesEnum.business) {
    return "/business";
  } else if (category === NewsCategoriesEnum.technology) {
    return "/technology";
  } else if (category === NewsCategoriesEnum.sports) {
    return "/sports";
  } else if (category === NewsCategoriesEnum.entertainment) {
    return "/entertainment";
  } else if (category === NewsCategoriesEnum.scienceEnvironment) {
    return "/science-environment";
  }

  return "/";
};

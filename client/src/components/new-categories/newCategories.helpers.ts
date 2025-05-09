import { NewsCategoriesEnum } from "../../react-query/helpers/news.helpers";

export const getActiveCategory = (
  pathname: string,
  category: NewsCategoriesEnum
) => {
  if (pathname === "/" || pathname === "/home") {
    return NewsCategoriesEnum.mostTrendingNews;
  }

  return category;
};

export const getCategoryRoute = (category: NewsCategoriesEnum) => {
  if (category === NewsCategoriesEnum.mostTrendingNews) {
    return "/";
  } else if (category === NewsCategoriesEnum.politics) {
    return "/politics";
  } else if (category === NewsCategoriesEnum.business) {
    return "/business";
  } else if (category === NewsCategoriesEnum.technology) {
    return "/technology";
  } else if (category === NewsCategoriesEnum.sports) {
    return "/sports";
  } else if (category === NewsCategoriesEnum.entertainment) {
    return "/entertainment";
  }

  return "/";
};

import CBSNewsLogo from "../../assets/images/cbs-logo.webp";
import AxiosLogo from "../../assets/images/axios-logo.webp";
import CNNLogo from "../../assets/images/cnn-logo.png";
import FoxNewsLogo from "../../assets/images/fox-logo.webp";
import NBCNewsLogo from "../../assets/images/nbc-logo.png";
import USATodayLogo from "../../assets/images/usa-today-logo.png";
import ReutersLogo from "../../assets/images/reuters-logo.jpg";
import TheWashingtonPostLogo from "../../assets/images/washington-post-logo.png";
import NewsweekLogo from "../../assets/images/newsweek-logo.webp";
import TimeLogo from "../../assets/images/time-logo.png";
import APLogo from "../../assets/images/ap-logo.svg";

export enum NewsCategoriesEnum {
  mostTrendingNews = "Most Trending News",
  politics = "Politics",
  healthLifestyle = "Health & Lifestyle",
  sports = "Sports",
  business = "Business & Finance",
  technology = "Technology",
  entertainment = "Entertainment",
  scienceEnvironment = "Science & Environment",
  world = "World News",
  opinion = "Opinion & Editorial",
  culture = "Culture & Arts",
  travel = "Travel",
  food = "Food & Drink",
}

export const newsCategories: NewsCategoriesEnum[] = Object.values(
  NewsCategoriesEnum
) as NewsCategoriesEnum[];

export const getNewsLogo = (source: string | null | undefined) => {
  switch (source) {
    case "cbs-news":
      return CBSNewsLogo;
    case "ap":
    case "associated-press":
      return APLogo;
    case "axios":
      return AxiosLogo;
    case "cnn":
      return CNNLogo;
    case "fox-news":
      return FoxNewsLogo;
    case "nbc-news":
      return NBCNewsLogo;
    case "usa-today":
      return USATodayLogo;
    case "reuters":
      return ReutersLogo;
    case "the-washington-post":
      return TheWashingtonPostLogo;
    case "newsweek":
      return NewsweekLogo;
    case "time":
      return TimeLogo;

    default:
      return null;
  }
};

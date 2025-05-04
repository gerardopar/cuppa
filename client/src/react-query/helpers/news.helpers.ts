import ABCNewsLogo from "../../assets/images/abc-logo.png";
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
import PoliticoLogo from "../../assets/images/politico-logo.jpg";
import TheHillLogo from "../../assets/images/the-hill-logo.png";
import FoxSportsLogo from "../../assets/images/fox-sports-logo.svg";
import ESPNLogo from "../../assets/images/espn-logo.webp";
import ESPNCricketLogo from "../../assets/images/espn-ci-logo.png";
import NFLNewsLogo from "../../assets/images/nfl-logo.jpg";
import NHLNewsLogo from "../../assets/images/nhl-logo.jpg";

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

export enum YtChannelIDsEnum {
  CNN = "UCupvZG-5ko_eiXAupbDfxWw", // CNN
  BBC = "UC16niRr50-MSBwiO3YDb3RA", // BBC
  NBC = "UCeY0bbntWzzVIaj2z3QigXg", // NBC
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
    case YtChannelIDsEnum.CNN:
      return CNNLogo;
    case "fox-news":
      return FoxNewsLogo;
    case "nbc-news":
    case YtChannelIDsEnum.NBC:
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
    case "politico":
      return PoliticoLogo;
    case "the-hill":
      return TheHillLogo;
    case "fox-sports":
      return FoxSportsLogo;
    case "espn":
      return ESPNLogo;
    case "espn-cric-info":
      return ESPNCricketLogo;
    case "nfl-news":
      return NFLNewsLogo;
    case "nhl-news":
      return NHLNewsLogo;
    case "abc-news":
      return ABCNewsLogo;
    default:
      return null;
  }
};

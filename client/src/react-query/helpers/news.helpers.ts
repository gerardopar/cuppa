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
import MedicalNewsTodayLogo from "../../assets/images/mnt-logo.jpg";
import BloombergLogo from "../../assets/images/bloomberg-logo.jpg";
import BusinessInsiderLogo from "../../assets/images/business-insider-logo.png";
import FortuneLogo from "../../assets/images/fortune-logo.webp";
import WallStreetJournalLogo from "../../assets/images/wsj-logo.jpg";
import ArsTechnicaLogo from "../../assets/images/ars-logo.jpg";
import CryptoCoinsNewsLogo from "../../assets/images/crypto-coin-logo.webp";
import EngadgetLogo from "../../assets/images/engadget-logo.jpeg";
import RecodeLogo from "../../assets/images/recode-news-logo.png";
import TechCrunchLogo from "../../assets/images/tech-crunch-logo.png";
import TechRadarLogo from "../../assets/images/tech-radar-logo.jpeg";
import TheNextWebLogo from "../../assets/images/tnw-logo.webp";
import TheVergeLogo from "../../assets/images/the-verge-logo.webp";
import WiredLogo from "../../assets/images/wired-news-logo.webp";
import BuzzFeedLogo from "../../assets/images/buzzfeed-logo.svg";
import MTVNewsLogo from "../../assets/images/mtv-news-logo.svg";
import EntertainmentWeeklyLogo from "../../assets/images/ew-logo.jpeg";
import IGNLogo from "../../assets/images/ign-logo.webp";
import MashableLogo from "../../assets/images/mashable-logo.jpeg";
import PolygonLogo from "../../assets/images/polygon-logo.jpeg";
import NationalGeographicLogo from "../../assets/images/natgeo-logo.png";
import NewScientistLogo from "../../assets/images/new-scientist-logo.jpeg";
import NextBigFutureLogo from "../../assets/images/nbg-logo.png";

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

export enum YtChannelIDsEnum {
  cnn = "UCupvZG-5ko_eiXAupbDfxWw", // most trending news
  theHill = "UCPWXiRWZ29zrxPFIQT7eHSA", // politics
  doctorMike = "UC0QHWhjbe5fGJEPz3sVb6nw", // health & lifestyle
  espn = "UCiWLfSweyRNmLpgEHekhoAg", // sports
  bloombergTelevision = "UCIALMKvObZNtJ6AmdCLP7Lg", // business & finance
  unboxTherapy = "UCsTcErHg8oDvUnTzoqsYeNw", // technology
  BuzzFeedVideo = "UCpko_-a4wgz2u_DgDgd9fqA", // entertainment
  veritasium = "UCHnyfMqiRRG1u-2MsSQLbXA", // science & environment
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
    case "bloomberg":
      return BloombergLogo;
    case "business-insider":
      return BusinessInsiderLogo;
    case "fortune":
      return FortuneLogo;
    case "the-wall-street-journal":
      return WallStreetJournalLogo;
    case "ars-technica":
      return ArsTechnicaLogo;
    case "crypto-coins-news":
      return CryptoCoinsNewsLogo;
    case "engadget":
      return EngadgetLogo;
    case "recode":
      return RecodeLogo;
    case "techcrunch":
      return TechCrunchLogo;
    case "techradar":
      return TechRadarLogo;
    case "the-next-web":
      return TheNextWebLogo;
    case "the-verge":
      return TheVergeLogo;
    case "wired":
      return WiredLogo;
    case "buzzfeed":
      return BuzzFeedLogo;
    case "entertainment-weekly":
      return EntertainmentWeeklyLogo;
    case "ign":
      return IGNLogo;
    case "mashable":
      return MashableLogo;
    case "mtv-news":
      return MTVNewsLogo;
    case "polygon":
      return PolygonLogo;
    case "national-geographic":
      return NationalGeographicLogo;
    case "new-scientist":
      return NewScientistLogo;
    case "next-big-future":
      return NextBigFutureLogo;
    case "medical-news-today":
      return MedicalNewsTodayLogo;
    default:
      return null;
  }
};

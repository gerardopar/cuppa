import dotenv from "dotenv";
import {
  NewsEverythingParams,
  NewsEverythingResponse,
  TopHeadlinesParams,
  TopHeadlinesResponse,
} from "../types/newsApi";

dotenv.config();

const newsApiEverythingUrl = "https://newsapi.org/v2/everything";
const newsApiTopHeadlinesUrl = "https://newsapi.org/v2/top-headlines";

const newsApiDefaults = {
  defaultDate: new Date().toISOString().split("T")[0],
  defaultSortBy: "popularity",
  defaultCountry: "us",
  defaultLanguage: "en",
  defaultPageSize: 20,
  defaultPage: 1,
};

export const getNewsEverything = async (
  options: NewsEverythingParams
): Promise<NewsEverythingResponse> => {
  try {
    const {
      defaultDate,
      defaultSortBy,
      defaultLanguage,
      defaultPageSize,
      defaultPage,
    } = newsApiDefaults;

    const url = new URL(newsApiEverythingUrl);
    url.searchParams.append("q", options?.q);
    url.searchParams.append("from", options?.from || defaultDate);
    url.searchParams.append("sortBy", options?.sortBy || defaultSortBy);
    url.searchParams.append("language", options?.language || defaultLanguage);
    if (options?.pageSize)
      url.searchParams.append(
        "pageSize",
        options?.pageSize.toString() || defaultPageSize.toString()
      );
    if (options?.page)
      url.searchParams.append(
        "page",
        options?.page.toString() || defaultPage.toString()
      );
    url.searchParams.append("apiKey", process.env.NEWS_API_KEY as string);

    const response = await fetch(url);
    const data: NewsEverythingResponse = await response.json();

    return data;
  } catch (err) {
    console.error("Error fetching everything news:", err);
    throw new Error("Failed to fetch news");
  }
};

export const getNewsTopHeadlines = async (
  options: TopHeadlinesParams
): Promise<TopHeadlinesResponse> => {
  try {
    const { defaultCountry, defaultPageSize, defaultPage } = newsApiDefaults;

    const url = new URL(newsApiTopHeadlinesUrl);

    if (options?.q) url.searchParams.append("q", options?.q);
    if (options?.country)
      url.searchParams.append("country", options?.country || defaultCountry);
    if (options?.category)
      url.searchParams.append("category", options?.category);
    if (options?.sources) url.searchParams.append("sources", options?.sources);
    if (options?.pageSize)
      url.searchParams.append(
        "pageSize",
        options?.pageSize.toString() || defaultPageSize.toString()
      );
    if (options?.page)
      url.searchParams.append(
        "page",
        options?.page.toString() || defaultPage.toString()
      );

    url.searchParams.append("apiKey", process.env.NEWS_API_KEY as string);

    const response = await fetch(url);
    const data: TopHeadlinesResponse = await response.json();

    return data;
  } catch (err) {
    console.error("Error fetching top headlines:", err);
    throw new Error("Failed to fetch top headlines");
  }
};

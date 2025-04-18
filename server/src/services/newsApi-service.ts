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
  defaultFrom: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0],
  defaultTo: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0],
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
      defaultFrom,
      defaultTo,
      defaultSortBy,
      defaultLanguage,
      defaultPageSize,
      defaultPage,
    } = newsApiDefaults;

    const url = new URL(newsApiEverythingUrl);
    url.searchParams.append("q", options?.q);
    url.searchParams.append("from", options?.from || defaultFrom);
    url.searchParams.append("to", options?.to || defaultTo);
    url.searchParams.append("sortBy", options?.sortBy || defaultSortBy);
    url.searchParams.append("language", options?.language || defaultLanguage);
    url.searchParams.append(
      "pageSize",
      options?.pageSize?.toString() || defaultPageSize.toString()
    );
    url.searchParams.append(
      "page",
      options?.page?.toString() || defaultPage.toString()
    );
    if (options?.sources) url.searchParams.append("sources", options?.sources);
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

    url.searchParams.append("q", options?.q || "");
    url.searchParams.append("country", options?.country || defaultCountry);
    url.searchParams.append(
      "pageSize",
      options?.pageSize?.toString() || defaultPageSize.toString()
    );
    url.searchParams.append(
      "page",
      options?.page?.toString() || defaultPage.toString()
    );
    if (options?.category)
      url.searchParams.append("category", options?.category);
    if (options?.sources) url.searchParams.append("sources", options?.sources);
    url.searchParams.append("apiKey", process.env.NEWS_API_KEY as string);

    const response = await fetch(url);
    const data: TopHeadlinesResponse = await response.json();

    return data;
  } catch (err) {
    console.error("Error fetching top headlines:", err);
    throw new Error("Failed to fetch top headlines");
  }
};

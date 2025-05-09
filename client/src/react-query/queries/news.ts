import { useQuery } from "@tanstack/react-query";

import axiosClient from "../../axios/axiosClient";

import {
  NewsEverythingParams,
  NewsEverythingSuccessResponse,
  TopHeadlinesParams,
  TopHeadlinesSuccessResponse,
} from "../types/newsApi";

export const useGetNews = (options: NewsEverythingParams) => {
  const queryString = new URLSearchParams(
    Object.entries(options).reduce((acc, [key, value]) => {
      if (value !== undefined && value !== null) {
        acc[key] = String(value);
      }
      return acc;
    }, {} as Record<string, string>)
  ).toString();

  return useQuery<NewsEverythingSuccessResponse | null, Error>({
    queryKey: ["getNews", options],
    queryFn: async () => {
      const response = await axiosClient.get<NewsEverythingSuccessResponse>(
        `/news/search?${queryString}`
      );

      return response.data;
    },
    enabled: !!options.q, // Optional: only run if `q` is defined
  });
};

export const useGetTopHeadlines = (options: TopHeadlinesParams) => {
  const queryString = new URLSearchParams(
    Object.entries(options).reduce((acc, [key, value]) => {
      if (value !== undefined && value !== null) {
        acc[key] = String(value);
      }
      return acc;
    }, {} as Record<string, string>)
  ).toString();

  return useQuery<TopHeadlinesSuccessResponse | null, Error>({
    queryKey: ["getTopHeadlines", options],
    queryFn: async () => {
      const response = await axiosClient.get<TopHeadlinesSuccessResponse>(
        `/news/top-headlines?${queryString}`
      );
      return response.data;
    },
    enabled: !!options.q, // Optional: only run if `q` is defined
  });
};

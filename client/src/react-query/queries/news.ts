import {
  useQuery,
  useQueryClient,
  keepPreviousData,
} from "@tanstack/react-query";
import { useEffect } from "react";

import axiosClient from "../../axios/axiosClient";

import { newsCategories } from "../helpers/news.helpers";

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
    placeholderData: (oldData) => oldData,
    enabled: !!options.q,
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

const fetchNews = async (params: NewsEverythingParams) => {
  const queryString = new URLSearchParams(
    Object.entries(params).reduce((acc, [key, value]) => {
      if (value !== undefined && value !== null) {
        acc[key] = String(value);
      }
      return acc;
    }, {} as Record<string, string>)
  ).toString();

  const response = await axiosClient.get<NewsEverythingSuccessResponse>(
    `/news/search?${queryString}`
  );
  return response.data;
};

export const usePrefetchNewsCategories = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    newsCategories.forEach((category) => {
      const params: NewsEverythingParams = {
        q: category,
        language: "en",
        pageSize: 20,
      };

      queryClient.prefetchQuery({
        queryKey: ["getNews", params],
        queryFn: () => fetchNews(params),
      });
    });
  }, [queryClient]);
};

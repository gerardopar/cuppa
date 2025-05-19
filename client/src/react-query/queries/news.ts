import {
  useQuery,
  useQueryClient,
  useInfiniteQuery,
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

import {
  constructQueryParams,
  constructQueryParamsPaginated,
} from "../helpers/query.helpers";

export const useGetNews = (options: NewsEverythingParams) => {
  const queryString = constructQueryParams(options);

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

export const usePaginatedNews = (
  options: Omit<NewsEverythingParams, "page">
) => {
  return useInfiniteQuery<NewsEverythingSuccessResponse, Error>({
    queryKey: ["paginatedNews", options],
    queryFn: async ({ pageParam = 1 }) => {
      const queryString = constructQueryParamsPaginated(
        options,
        pageParam as number
      );

      const response = await axiosClient.get<NewsEverythingSuccessResponse>(
        `/news/search?${queryString}`
      );

      return response.data;
    },
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length + 1;
      return lastPage.hasMore ? nextPage : undefined;
    },
    initialPageParam: 1,
    enabled: !!options.q,
  });
};

export const useGetTopHeadlines = (options: TopHeadlinesParams) => {
  const queryString = constructQueryParams(options);

  return useQuery<TopHeadlinesSuccessResponse | null, Error>({
    queryKey: ["getTopHeadlines", options],
    queryFn: async () => {
      const response = await axiosClient.get<TopHeadlinesSuccessResponse>(
        `/news/top-headlines?${queryString}`
      );
      return response.data;
    },
    enabled: !!options.q,
  });
};

const fetchNews = async (params: NewsEverythingParams) => {
  const queryString = constructQueryParams(params);
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

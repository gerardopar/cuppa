import { useMutation } from "@tanstack/react-query";
import axiosClient from "../../axios/axiosClient";

import {
  NewsEverythingParams,
  NewsEverythingSuccessResponse,
} from "../types/newsApi";

export const useSearchNews = () =>
  useMutation<
    NewsEverythingSuccessResponse | null,
    Error,
    NewsEverythingParams
  >({
    mutationFn: async (options) => {
      const queryString = new URLSearchParams(
        Object.entries(options).reduce((acc, [key, value]) => {
          if (value != null) acc[key] = String(value);
          return acc;
        }, {} as Record<string, string>)
      ).toString();

      const { data } = await axiosClient.get<NewsEverythingSuccessResponse>(
        `/news/search?${queryString}`
      );
      return data ?? null;
    },
  });

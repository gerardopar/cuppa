import { useQuery } from "@tanstack/react-query";

import axiosClient from "../../axios/axiosClient";
import { ZenQuote } from "@shared/types/zenQuotesApi";

export const useGetZenQuotes = () => {
  return useQuery<{ quotes: ZenQuote[] }>({
    queryKey: ["getZenQuotes"],
    queryFn: async () => {
      const response = await axiosClient.get<{ quotes: ZenQuote[] }>(
        `/zenQuotes/get-quotes`
      );

      return response?.data ?? [];
    },
  });
};

import { useQuery } from "@tanstack/react-query";

import axiosClient from "../../axios/axiosClient";

export const useGetPoliticalQuoteWithImage = () => {
  return useQuery<{
    quote: string;
    author: string;
    year: string;
    image: string;
  }>({
    queryKey: ["quote"],
    queryFn: async () => {
      const response = await axiosClient.get("/openAi/quote");

      return response?.data?.quoteWithImage ?? {};
    },
  });
};

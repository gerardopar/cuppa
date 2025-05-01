import { useQuery } from "@tanstack/react-query";

import axiosClient from "../../axios/axiosClient";

import { getRandomTrends } from "../../components/trends/trends.helpers";

export const useGetTrends = () => {
  return useQuery<string[]>({
    queryKey: ["getTrends"],
    queryFn: async () => {
      const response = await axiosClient.get(`/trends/daily`);

      return getRandomTrends(response?.data?.trends ?? [], 10);
    },
  });
};

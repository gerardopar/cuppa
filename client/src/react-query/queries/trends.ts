import { useQuery } from "@tanstack/react-query";

import axiosClient from "../../axios/axiosClient";

export const useGetTrends = () => {
  return useQuery<string[]>({
    queryKey: ["getTrends"],
    queryFn: async () => {
      const response = await axiosClient.get(`/trends/daily`);

      return response?.data?.trends;
    },
  });
};

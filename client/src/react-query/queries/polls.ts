import { useQuery } from "@tanstack/react-query";

import axiosClient from "../../axios/axiosClient";

import { PollFilterOptions, PollResponse } from "@shared/types/voteHubApi";
import { constructQueryParams } from "../helpers/query.helpers";

export const useGetPolls = (options: PollFilterOptions) => {
  const queryString = constructQueryParams(options);

  return useQuery<PollResponse[] | null, Error>({
    queryKey: ["getPolls", options],
    queryFn: async () => {
      const response = await axiosClient.get<PollResponse[]>(
        `/polls/get-polls?${queryString}`
      );
      return response.data;
    },
    placeholderData: (oldData) => oldData,
    enabled: !!options.poll_type,
  });
};

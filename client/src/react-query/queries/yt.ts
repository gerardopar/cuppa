import { useQuery } from "@tanstack/react-query";

import axiosClient from "../../axios/axiosClient";
import { YouTubeSearchResponse } from "../../types/ytApi";

export const useGetYoutubeVideosByChannelID = (channelID: string) => {
  return useQuery<YouTubeSearchResponse, Error>({
    queryKey: ["youtubeSearch", channelID],
    queryFn: async () => {
      const response = await axiosClient.get<YouTubeSearchResponse>(
        `/yt/videos?channelID=${channelID}`
      );

      return response.data;
    },
  });
};

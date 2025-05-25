import { useQuery } from "@tanstack/react-query";

import axiosClient from "../../axios/axiosClient";
import { YouTubePlaylistItemsResponse } from "@shared/types/ytApi";

export const useGetYoutubeVideosByChannelID = (channelID: string) => {
  return useQuery<YouTubePlaylistItemsResponse, Error>({
    queryKey: ["youtubeSearch", channelID],
    queryFn: async () => {
      const response = await axiosClient.get<YouTubePlaylistItemsResponse>(
        `/yt/videos?channelID=${channelID}`
      );

      return response.data;
    },
  });
};

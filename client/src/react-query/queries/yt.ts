import { useQuery } from "@tanstack/react-query";

import axiosClient from "../../axios/axiosClient";
import { YouTubeSearchResponse } from "../../types/ytApi";

export const useYouTubeSearchQuery = () => {
  return useQuery<YouTubeSearchResponse, Error>({
    queryKey: ["youtubeSearch"],
    queryFn: async () => {
      const response = await axiosClient.get<YouTubeSearchResponse>(
        `/yt/videos`
      );

      return response.data;
    },
  });
};

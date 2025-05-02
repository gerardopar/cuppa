import axios from "axios";
import dotenv from "dotenv";

import { YouTubeSearchResponse } from "../types/ytApi";

dotenv.config();

export const ytChannelIDs: string[] = [
  "UCupvZG-5ko_eiXAupbDfxWw", // CNN
  "UC16niRr50-MSBwiO3YDb3RA", // BBC
  "UCeY0bbntWzzVIaj2z3QigXg", // NBC
];

export const getYoutubeVideosByChannelID = async (channelID: string) => {
  const response = await axios.get(
    "https://youtube-v31.p.rapidapi.com/search",
    {
      params: {
        channelId: channelID,
        part: "snippet,id",
        order: "date",
        maxResults: "10",
      },
      headers: {
        "x-rapidapi-key": process.env.YOUTUBE_API_KEY!,
        "x-rapidapi-host": "youtube-v31.p.rapidapi.com",
      },
    }
  );

  console.log("🚀🚀 youTubeSearchQuery 🚀🚀", response);

  return response.data as YouTubeSearchResponse;
};

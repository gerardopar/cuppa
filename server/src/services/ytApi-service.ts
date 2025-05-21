import axios from "axios";
import dotenv from "dotenv";

import { YouTubeSearchResponse } from "../types/ytApi";

dotenv.config();

const ytApiV3Url = "https://www.googleapis.com/youtube/v3";
const apiKey = process.env.YOUTUBE_API_KEY;

export const getYoutubeVideosByChannelID = async (channelId: string) => {
  const url = `${ytApiV3Url}/search?key=${apiKey}&channelId=${channelId}&part=snippet&order=date&maxResults=5&type=video`;

  try {
    const response = await axios.get<YouTubeSearchResponse | null>(url);
    return response?.data;
  } catch (error) {
    console.error("Error fetching videos", error);
    return null;
  }
};

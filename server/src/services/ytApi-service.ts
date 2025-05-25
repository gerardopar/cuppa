import axios from "axios";
import dotenv from "dotenv";

import { YouTubePlaylistItemsResponse } from "@shared/types/ytApi";

dotenv.config();

const ytApiV3Url = "https://www.googleapis.com/youtube/v3";
const apiKey = process.env.YOUTUBE_API_KEY;

export const getUploadsPlaylistId = async (channelId: string) => {
  const url = `${ytApiV3Url}/channels?part=contentDetails&id=${channelId}&key=${apiKey}`; // 1 unit per req

  try {
    const response = await axios.get(url);
    const uploadsPlaylistId =
      response.data.items?.[0]?.contentDetails?.relatedPlaylists?.uploads;

    return uploadsPlaylistId;
  } catch (error) {
    console.error("Error fetching uploads playlist ID", error);
    return null;
  }
};

export const getYoutubeVideosByChannelID = async (channelId: string) => {
  // if we fetching the uploadPlaylistId multiple times from the same channel, we should cache the uploadPlaylist ID
  const uploadsPlaylistId = await getUploadsPlaylistId(channelId);
  if (!uploadsPlaylistId) return null;

  const url = `${ytApiV3Url}/playlistItems?key=${apiKey}&playlistId=${uploadsPlaylistId}&part=snippet&maxResults=5`; // 1 unit per req

  try {
    const response = await axios.get<YouTubePlaylistItemsResponse | null>(url);
    return response?.data;
  } catch (error) {
    console.error("Error fetching playlist videos", error);
    return null;
  }
};

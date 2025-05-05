import { Request, Response } from "express";
import redisClient from "../cache/redis/redisClient";

import { getYoutubeVideosByChannelID } from "../services/ytApi-service";

import { YouTubeSearchResponse } from "../types/ytApi";

export const getYtVideosByChannelID = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { channelID } = req.query;

    const cacheKey = `yt:videos:${channelID}`;
    const cached = await redisClient.get(cacheKey);

    if (cached) {
      const ytVideos = JSON.parse(cached) as YouTubeSearchResponse;
      res.json(ytVideos);
    } else {
      const response: YouTubeSearchResponse = await getYoutubeVideosByChannelID(
        channelID as string
      );

      await redisClient.setEx(cacheKey, 86400, JSON.stringify(response));

      res.json(response);
    }
  } catch (error) {
    console.error("Error fetching breaking news video", error);
    res.status(500).json({ error: "Failed to fetch breaking news video" });
  }
};

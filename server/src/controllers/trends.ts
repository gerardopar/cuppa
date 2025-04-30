import { Request, Response } from "express";
import redisClient from "../cache/redis/redisClient";

import { fetchDailyTrends } from "../services/serpApi-service";

export const getTrends = async (req: Request, res: Response): Promise<void> => {
  try {
    const cacheKey = "trends:top25";

    const cached = await redisClient.get(cacheKey);
    if (cached) {
      const trends = JSON.parse(cached) as string[];
      res.json({ trends });
    }

    const allTrends = await fetchDailyTrends();
    const trends = allTrends.slice(0, 25);

    await redisClient.setEx(cacheKey, 86400, JSON.stringify(trends));

    res.json({ trends });
  } catch (error) {
    console.error("Error fetching trends:", error);
    res.status(500).json({ error: "Failed to fetch trends" });
  }
};

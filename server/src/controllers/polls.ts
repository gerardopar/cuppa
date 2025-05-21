import { Request, Response } from "express";
import redisClient from "../cache/redis/redisClient";

import { PollResponse } from "../types/voteHubApi";
import { getPollsData } from "../services/voteHubApi-service";

import { PollType, PopulationType } from "../types/voteHubApi";

export const getPolls = async (req: Request, res: Response): Promise<void> => {
  try {
    const cacheKey = "polls:latest";

    const {
      poll_type = "",
      pollster = "",
      subject = "",
      from_date = "",
      to_date = "",
      min_sample_size = "500",
      population = "",
    } = req.query;

    const cached = await redisClient.get(cacheKey);
    if (cached) {
      const polls = JSON.parse(cached) as PollResponse[];
      res.json(polls);
      return;
    } else {
      const polls = await getPollsData({
        poll_type: poll_type as PollType,
        pollster: pollster as string,
        subject: subject as string,
        from_date: from_date as string,
        to_date: to_date as string,
        min_sample_size: parseInt(min_sample_size as string),
        population: population as PopulationType,
      });

      const sortedPolls = polls.sort(
        (a, b) =>
          new Date(b.start_date).getTime() - new Date(a.start_date).getTime()
      );

      const limitedPolls = sortedPolls.slice(0, 20);

      await redisClient.setEx(cacheKey, 86400, JSON.stringify(limitedPolls));

      res.json(limitedPolls);
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch polls" });
  }
};

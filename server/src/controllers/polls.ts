import { Request, Response } from "express";
import { getPollsData } from "../services/voteHubApi-service";
import { PollType, PopulationType } from "../types/voteHubApi";

export const getPolls = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      poll_type = "",
      pollster = "",
      subject = "",
      from_date = "",
      to_date = "",
      min_sample_size = "500",
      population = "",
    } = req.query;

    const polls = await getPollsData({
      poll_type: poll_type as PollType,
      pollster: pollster as string,
      subject: subject as string,
      from_date: from_date as string,
      to_date: to_date as string,
      min_sample_size: parseInt(min_sample_size as string),
      population: population as PopulationType,
    });

    res.json(polls);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch polls" });
  }
};

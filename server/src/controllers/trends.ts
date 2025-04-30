import { Request, Response } from "express";
import { fetchDailyTrends } from "../services/serpApi-service";

export const getTrends = async (req: Request, res: Response): Promise<void> => {
  try {
    const trends = await fetchDailyTrends();

    res.json({ trends });
  } catch (error) {
    console.error("Error fetching trends:", error);
    res.status(500).json({ error: "Failed to fetch trends" });
  }
};

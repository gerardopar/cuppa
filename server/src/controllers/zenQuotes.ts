import { Request, Response } from "express";
import redisClient from "../cache/redis/redisClient";

import { getRandomZenQuotes } from "../services/zenQuotes-services";

import { ZenQuote } from "@shared/types/zenQuotesApi";

export const getZenQuotes = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const cacheKey = "zenQuotes:random";

    const cached = await redisClient.get(cacheKey);
    if (cached) {
      const quotes = JSON.parse(cached) as ZenQuote[];
      res.json({ quotes });
      return;
    }

    const response = await getRandomZenQuotes();

    if (response) {
      await redisClient.setEx(cacheKey, 86400, JSON.stringify(response));
    }

    res.json(response);
  } catch (error) {
    console.error("Error fetching Zen Quotes", error);
    res.status(500).json({ error: "Failed to fetch Zen Quotes" });
  }
};

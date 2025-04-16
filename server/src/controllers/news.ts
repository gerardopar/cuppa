import { Request, Response } from "express";

import {
  getNewsEverything,
  getNewsTopHeadlines,
} from "../services/newsApi-service";
import { NewsSortBy } from "../types/newsApi";

export const getNews = async (req: Request, res: Response): Promise<void> => {
  try {
    const { q, from, sortBy } = req.query;

    const news = await getNewsEverything({
      q: q as string,
      from: from as string,
      sortBy: sortBy as NewsSortBy,
    });

    res.json(news);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch news" });
  }
};

export const getTopHeadlines = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { q } = req.query;

    const news = await getNewsTopHeadlines({
      q: q as string,
    });

    res.json(news);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch news" });
  }
};

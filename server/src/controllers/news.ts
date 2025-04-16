import { Request, Response } from "express";

import { getNewsEverything } from "../services/newsApi-service";

export const getNews = async (req: Request, res: Response): Promise<void> => {
  try {
    const { q, from, sortBy } = req.query;

    const news = await getNewsEverything({
      q: q as string,
      from: from as string,
      sortBy: sortBy as string,
    });

    res.json(news);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch news" });
  }
};

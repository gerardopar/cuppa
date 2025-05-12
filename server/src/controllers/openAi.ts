import { Request, Response } from "express";
import redisClient from "../cache/redis/redisClient";

import { openAiClient } from "../services/openAiApi-service";
import { fetchWikiData } from "../services/wikiApi-service";

const CACHE_TTL = 86400; // 1 day

export const getPoliticalQuoteWithImage = async (
  req: Request,
  res: Response
) => {
  try {
    const cacheKey = "dailyQuote:political";

    const cached = await redisClient.get(cacheKey);

    if (cached) {
      const quoteWithImage = JSON.parse(cached) as string[];
      res.json({ quoteWithImage });
    } else {
      const promptTemplates = [
        "Give me a quote about justice in today's world from a well-known political figure.",
        "Give me a one-line quote on equality under the law from a famous public figure.",
        "Give me a quote related to legal fairness or the role of law in democracy.",
        "Share a modern quote that supports nonpartisan views of justice or rights.",
      ];

      const prompt =
        promptTemplates[Math.floor(Math.random() * promptTemplates.length)];

      const response = await openAiClient.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.6,
      });

      const content = response?.choices[0]?.message?.content;

      const match = content?.match(/\"(.+?)\"\s+[-—]\s+(.+?)(?:,\s*(\d{4}))?$/);
      if (!match) throw new Error("Failed to parse quote");

      const [_, quote, author, year] = match;

      const wikiData = await fetchWikiData(author);

      const pages = wikiData?.query?.pages;
      const image = Object.values(pages)?.[0]?.thumbnail?.source || null;

      const quoteWithImage = { quote, author, year, image };

      await redisClient.setEx(
        cacheKey,
        CACHE_TTL,
        JSON.stringify(quoteWithImage)
      );
      res.json(quoteWithImage);
    }
  } catch (error) {
    console.error("Error fetching quote with image:", error);
    res.status(500).json({ error: "Failed to fetch quote with image" });
  }
};

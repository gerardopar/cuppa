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
      const prompt = `
      Give me a **single-sentence** quote related to law or justice that reflects today's political climate.
      The quote should be from a well-known public figure in politics, law, or related fields.
      Make sure it is nonpartisan and appropriate for all audiences. Include the name of the person and the year, if known.
      `;

      const response = await openAiClient.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.4,
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

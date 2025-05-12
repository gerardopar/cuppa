import { Request, Response } from "express";
import redisClient from "../cache/redis/redisClient";

import { openAiClient } from "../services/openAiApi-service";
import { fetchWikiData } from "../services/wikiApi-service";
import { QuoteResponse, QuoteSchema } from "../types/openAi";

const CACHE_TTL = 86400; // 1 day

export const getPoliticalQuoteWithImage = async (
  req: Request,
  res: Response
) => {
  try {
    const cacheKey = "dailyQuote:political";

    const cached = await redisClient.get(cacheKey);
    if (cached) {
      const quoteWithImage = JSON.parse(cached);
      res.json({ quoteWithImage });
    }

    const promptTemplates = [
      "a quote about justice in today's world from a well-known political figure.",
      "a one-line quote on equality under the law from a famous public figure.",
      "a quote related to legal fairness or the role of law in democracy.",
      "a modern quote that supports nonpartisan views of justice or rights.",
    ];

    const selectedPrompt =
      promptTemplates[Math.floor(Math.random() * promptTemplates.length)];

    const prompt = `
      Respond ONLY in this exact JSON format:
      {
        "quote": "string",
        "author": "string",
        "year": optional number
      }

      Give me ${selectedPrompt}
      It should be one sentence long, nonpartisan, and appropriate for all audiences.
      The quote must come from a real public figure in politics, law, or a related field.
    `;

    const response = await openAiClient.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.6,
    });

    const content = response?.choices[0]?.message?.content?.trim();
    if (!content) throw new Error("No response content from OpenAI");

    let quoteData: QuoteResponse;
    try {
      const parsed = JSON.parse(content);
      quoteData = QuoteSchema.parse(parsed);
    } catch (err) {
      console.error(
        "Zod validation failed or OpenAI returned invalid JSON:",
        err
      );
      throw new Error("Failed to validate OpenAI quote response");
    }

    const wikiData = await fetchWikiData(quoteData.author);
    const image =
      Object.values(wikiData?.query?.pages || {})?.[0]?.thumbnail?.source ||
      null;

    const quoteWithImage = {
      ...quoteData,
      image,
    };

    await redisClient.setEx(
      cacheKey,
      CACHE_TTL,
      JSON.stringify(quoteWithImage)
    );
    res.json(quoteWithImage);
  } catch (error) {
    console.error("Error fetching quote with image:", error);
    res.status(500).json({ error: "Failed to fetch quote with image" });
  }
};

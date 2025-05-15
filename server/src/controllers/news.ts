import { Request, Response } from "express";
import redisClient from "../cache/redis/redisClient";

import {
  getNewsEverything,
  getNewsTopHeadlines,
} from "../services/newsApi-service";

import { NewsEverythingSuccessResponse, NewsSortBy } from "../types/newsApi";

import { newsCategories, NewsCategoriesEnum } from "../helpers/news.helpers";

const CACHE_TTL = 3600; // 1 hour

export const getNews = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      q,
      from,
      sortBy = "popularity",
      language = "en",
      pageSize = "20",
      page = "1",
    } = req.query;

    const parsedPageSize = parseInt(pageSize as string);
    const parsedPage = parseInt(page as string);

    const cacheableCategories = Object.values(
      NewsCategoriesEnum
    ) as NewsCategoriesEnum[];

    const shouldCache = cacheableCategories.includes(q as NewsCategoriesEnum);
    const cacheKey = `news:category:${q}:page:${pageSize}:p:${page}`;

    const buildResponse = (news: NewsEverythingSuccessResponse) => {
      const totalResults = news.totalResults || 0;
      const hasMore = parsedPage * parsedPageSize < totalResults;

      return {
        ...news,
        hasMore,
      };
    };

    if (shouldCache) {
      const cached = await redisClient.get(cacheKey);

      if (cached) {
        const news = JSON.parse(cached);
        res.json(buildResponse(news));
        return;
      } else {
        const category = newsCategories[q as NewsCategoriesEnum];
        const news = await getNewsEverything({
          q: q as string,
          from: from as string,
          sortBy: sortBy as NewsSortBy,
          language: language as string,
          pageSize: parsedPageSize,
          page: parsedPage,
          sources: category?.sources?.join(","),
        });

        if (shouldCache && news.status === "ok") {
          await redisClient.set(cacheKey, JSON.stringify(news), {
            EX: CACHE_TTL,
          });
        }

        res.json(buildResponse(news));
      }
    } else {
      const news = await getNewsEverything({
        q: q as string,
        from: from as string,
        sortBy: sortBy as NewsSortBy,
        language: language as string,
        pageSize: parsedPageSize,
        page: parsedPage,
      });

      res.json(buildResponse(news));
    }
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

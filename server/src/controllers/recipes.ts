import { Request, Response } from "express";
import redisClient from "../cache/redis/redisClient";

import { fetchRandomRecipes } from "../services/spoonacularApi-service";

export const getRandomRecipes = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const cacheKey = `recipes:random`;

    const cached = await redisClient.get(cacheKey);

    if (cached) {
      const data = JSON.parse(cached);
      res.json(data);
      return;
    }

    const response = await fetchRandomRecipes();

    if (response.recipes.length > 0) {
      const recipes = response.recipes;
      await redisClient.set(cacheKey, JSON.stringify(recipes));
      res.json(recipes);
      return;
    }

    res.json([]);
  } catch (error) {
    console.error("Error fetching recipes:", error);
    res.status(500).json({ error: "Failed to fetch recipes" });
  }
};

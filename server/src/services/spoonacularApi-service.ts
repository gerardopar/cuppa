import axios from "axios";

import { RandomRecipeResponse } from "@shared/types/spoonacularApi";

const spoonacularRecipesApiUrl = "https://api.spoonacular.com/recipes/";

export const fetchRandomRecipes = async (): Promise<RandomRecipeResponse> => {
  const tagCombos = [
    "healthy,vegetarian",
    "low-carb,high-protein",
    "keto,healthy",
    "vegan,gluten-free",
    "paleo,clean-eating",
    "low-fat,high-fiber",
    "mediterranean,healthy",
  ];

  const tags = tagCombos[Math.floor(Math.random() * tagCombos.length)];

  try {
    const response = await axios.get<RandomRecipeResponse>(
      spoonacularRecipesApiUrl + "random",
      {
        params: {
          apiKey: process.env.SPOONACULAR_API_KEY,
          number: 10,
          tags: tags,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching Spoonacular recipes:", error);
    throw new Error("Failed to fetch Spoonacular recipes");
  }
};

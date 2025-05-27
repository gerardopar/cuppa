import { Recipe } from "@shared/types/spoonacularApi";

export const getRandomRecipe = (
  recipes: Recipe[] = [],
  count: number
): Recipe[] => {
  const recipe = [...recipes].sort(() => 0.5 - Math.random()).slice(0, count);
  return recipe;
};

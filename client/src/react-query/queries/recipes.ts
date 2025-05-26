import { useQuery } from "@tanstack/react-query";

import axiosClient from "../../axios/axiosClient";

import { RandomRecipeResponse } from "@shared/types/spoonacularApi";

export const useGetRandomRecipes = (tags?: string) => {
  return useQuery<RandomRecipeResponse>({
    queryKey: ["randomRecipes", tags],
    queryFn: async () => {
      const response = await axiosClient.get("/recipes/random", {
        params: {
          tags: tags,
        },
      });
      return response.data;
    },
  });
};

import React, { useMemo, useState } from "react";

import { Modal, Backdrop, Skeleton } from "@mui/material";
import RecipeDetails from "./RecipeDetailts";

import { useGetRandomRecipes } from "../../../react-query/queries/recipes";

import { Recipe } from "@shared/types/spoonacularApi";
import { getRandomRecipe } from "./recipe.helpers";

export const RandomRecipe: React.FC<{ containerClassName?: string }> = ({
  containerClassName,
}) => {
  const { data: recipes, isLoading, isFetching } = useGetRandomRecipes();

  const [showModal, setShowModal] = useState<boolean>(false);

  const recipe = useMemo(() => {
    const recipe = getRandomRecipe(recipes?.recipes, 1)[0];
    return recipe;
  }, [recipes]);

  if (isLoading || isFetching) {
    return (
      <div
        className={`relative flex flex-col items-center justify-between bg-[var(--primary-dark)]/90 p-4 rounded-[20px] ${containerClassName}`}
        style={{
          height: "100%",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent z-10 rounded-[12px]" />
        <div className="w-full flex items-center justify-start mt-2">
          <Skeleton
            variant="text"
            width={30}
            height={16}
            sx={{ bgcolor: "grey.600" }}
          />
        </div>
        <div className="w-full h-full flex flex-col items-start justify-end z-10">
          <Skeleton
            variant="text"
            width="80%"
            height={20}
            sx={{ bgcolor: "grey.700" }}
          />
        </div>
      </div>
    );
  }

  return (
    <>
      <div
        className={`relative flex flex-col items-center justify-between bg-[var(--primary-dark)]/90 p-4 rounded-[20px] cursor-pointer ${containerClassName}`}
        style={{
          height: "100%",
          backgroundImage: `url(${recipe?.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        role="button"
        onClick={() => setShowModal(!showModal)}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent z-10 rounded-[12px]" />

        <div className="rounded-[20px] bg-[var(--primary-dark)]/40 absolute top-[10px] left-[15px] flex items-center justify-center px-4 py-2 text-xs text-white z-10">
          <span className="font-semibold mr-1">{recipe?.readyInMinutes}</span>
          <span className="font-semibold">min</span>
        </div>
        <div className="w-full h-full flex flex-col items-start justify-end z-10">
          <h3 className="w-full line-clamp-2 text-white font-semibold text-base">
            {recipe?.title}
          </h3>
        </div>
      </div>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={showModal}
        onClose={() => setShowModal(!showModal)}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
        className="bg-transparent"
      >
        <RecipeDetails
          recipe={recipe as Recipe}
          closeModal={() => setShowModal(false)}
        />
      </Modal>
    </>
  );
};

export default RandomRecipe;

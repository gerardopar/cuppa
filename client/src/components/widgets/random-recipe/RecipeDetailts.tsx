import React from "react";

import DividerLine from "../../shared/DividerLine";
import CloseButton from "../../shared/CloseButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";

import { Recipe } from "@shared/types/spoonacularApi";

export const RecipeDetails: React.FC<{
  recipe: Recipe;
  closeModal: () => void;
}> = ({ recipe, closeModal }) => {
  return (
    <div className="flex items-center justify-center h-full bg-transparent shadow-sm relative">
      <div className="bg-white w-full max-w-[375px] flex flex-col bg-transparent z-10 rounded-[12px] relative">
        <CloseButton
          iconSize="small"
          className="bg-gray-200 w-[40px] h-[40px] absolute top-0 right-0 cursor-pointer"
          handleCloseModal={closeModal}
        />

        <div className="w-full overflow-hidden min-h-[230px] min-w-[345px] px-4 mt-[50px] relative">
          <img
            src={recipe?.image}
            className="w-full h-full object-cover rounded-[20px]"
            alt="recipe"
          />

          <div className="rounded-[20px] bg-[var(--primary-dark)]/40 absolute top-[10px] left-[25px] flex items-center justify-center px-4 py-2 text-xs text-white">
            <span className="font-semibold mr-1">{recipe?.readyInMinutes}</span>
            <span className="font-semibold">min</span>
          </div>
        </div>

        <h3 className="w-full line-clamp-2 text-gray-700 font-semibold text-lg my-2 leading-[1.2] px-4 mt-2">
          {recipe?.title}
        </h3>

        <div className="overflow-y-auto max-h-[250px] w-full !rounded-none">
          <Accordion className="w-full">
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <p className="font-semibold text-gray-700">Ingredients</p>
            </AccordionSummary>
            <AccordionDetails className="flex flex-col gap-2">
              {recipe?.extendedIngredients?.map((ingredient, i) => (
                <div
                  key={i}
                  className="text-gray-700 text-sm flex items-center capitalize border-b-[1px] border-gray-100 pb-2 last:border-b-0"
                >
                  <span className="mr-2 w-[20px] h-[20px]">
                    <img
                      src={`https://img.spoonacular.com/ingredients_100x100/${ingredient.image}`}
                      className="w-full h-full object-contain"
                      alt="ingredient"
                    />
                  </span>

                  {ingredient.original}
                </div>
              ))}
            </AccordionDetails>
          </Accordion>
        </div>

        <DividerLine lineClassName="w-full" />

        <div className="overflow-y-auto max-h-[250px] w-full !rounded-none !rounded-b-[20px]">
          <Accordion className="w-full">
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <p className="font-semibold text-gray-700">Instructions</p>
            </AccordionSummary>
            <AccordionDetails className="flex flex-col gap-2">
              {recipe?.analyzedInstructions?.[0]?.steps?.map((step, i) => (
                <p
                  key={i}
                  className="text-gray-700 text-sm capitalize border-b-[1px] border-gray-100 pb-2 last:border-b-0"
                >
                  {i + 1}. {step.step}
                </p>
              ))}
            </AccordionDetails>
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;

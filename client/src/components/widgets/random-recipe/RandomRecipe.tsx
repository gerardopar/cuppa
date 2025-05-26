import React, { useMemo } from "react";

import { ScheduleOutlined } from "@mui/icons-material";
import { Skeleton } from "@mui/material";

import { useGetRandomRecipes } from "../../../react-query/queries/recipes";

export const RandomRecipe: React.FC<{ containerClassName?: string }> = ({
  containerClassName,
}) => {
  const { data: recipes, isLoading, isFetching } = useGetRandomRecipes();

  const recipe = useMemo(() => {
    return recipes?.recipes[0];
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
        <div className="w-full h-full flex flex-col items-start justify-end z-10">
          <Skeleton
            variant="text"
            width="80%"
            height={20}
            sx={{ bgcolor: "grey.700" }}
          />
          <div className="w-full flex items-center justify-end mt-2">
            <Skeleton
              variant="text"
              width={30}
              height={16}
              sx={{ bgcolor: "grey.600" }}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative flex flex-col items-center justify-between bg-[var(--primary-dark)]/90 p-4 rounded-[20px] cursor-pointer ${containerClassName}`}
      style={{
        height: "100%",
        backgroundImage: `url(${recipe?.image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent z-10 rounded-[12px]" />
      <div className="w-full h-full flex flex-col items-start justify-end z-10">
        <h3 className="w-full line-clamp-2 text-white font-semibold text-base">
          {recipe?.title}
        </h3>
        <p className="w-full text-white font-semibold text-xs flex items-center justify-end">
          <ScheduleOutlined className="text-white mr-1" />{" "}
          {recipe?.readyInMinutes} min
        </p>
      </div>
    </div>
  );
};

export default RandomRecipe;

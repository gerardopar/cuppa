import React from "react";

import CloseIcon from "@mui/icons-material/Close";

import { GeneralCategoryEnum } from "./newCategories.helpers";

export const NewsCategoryOverlay: React.FC<{
  category: GeneralCategoryEnum;
  handleCloseModal: () => void;
}> = ({ category, handleCloseModal }) => {
  return (
    <>
      <button
        onClick={handleCloseModal}
        className="bg-gray-200 w-[70px] h-[70px] absolute top-0 right-0"
      >
        <CloseIcon fontSize="large" />
      </button>

      <div className="w-full">
        <div className="mt-[100px] px-4">
          <h1 className="relative text-gray-900 text-4xl font-bold font-montserrat w-[55%] line-clamp-2 z-20">
            {category}
          </h1>
        </div>
      </div>
    </>
  );
};

export default NewsCategoryOverlay;

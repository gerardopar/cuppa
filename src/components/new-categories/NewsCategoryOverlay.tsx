import React from "react";

import CloseIcon from "@mui/icons-material/Close";
import ArticleCardList from "../articles/ArticleCardList";
import ArticleSlider from "../articles/ArticleSlider/ArticleSlider";

import { GeneralCategoryEnum } from "./newCategories.helpers";

import { ARTICLE_DUMMY_DATA } from "../../data/ARTICLE_DUMMY_DATA";

export const NewsCategoryOverlay: React.FC<{
  category: GeneralCategoryEnum;
  handleCloseModal: () => void;
}> = ({ category, handleCloseModal }) => {
  return (
    <>
      <button
        type="button"
        onClick={handleCloseModal}
        className="bg-gray-200 w-[70px] h-[70px] absolute top-0 right-0 cursor-pointer"
      >
        <CloseIcon fontSize="large" />
      </button>

      <div className="w-full">
        {/* <div className="mt-[100px] px-4">
          <h1 className="relative text-gray-900 text-4xl font-bold font-montserrat w-[55%] line-clamp-2 z-20">
            {category}
          </h1>
        </div> */}

        <ArticleSlider category={category} />

        <ArticleCardList
          articles={ARTICLE_DUMMY_DATA.articles}
          listTitle="Recommendations"
          listContainerClassName="w-full"
          listLimit={9}
        />
      </div>
    </>
  );
};

export default NewsCategoryOverlay;

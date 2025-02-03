import React, { useState } from "react";
import Slide from "@mui/material/Slide";

import NewsCategories from "../components/new-categories/NewsCategories";
import ArticleHero from "../components/articles/ArticleHero";
import ArticleCard from "../components/articles/ArticleCard";

import { GeneralCategoryEnum } from "../components/new-categories/newCategories.helpers";

import { ARTICLE_DUMMY_DATA } from "../data/ARTICLE_DUMMY_DATA";

const Home: React.FC = () => {
  const [activeCategory, setActiveCategory] =
    useState<GeneralCategoryEnum | null>(null);

  const handleCategoryClick = (category: GeneralCategoryEnum | null) => {
    setActiveCategory(category);
  };

  return (
    <div className="w-full flex flex-col relative">
      <div className="h-[600px] flex">
        <ArticleHero />
        <NewsCategories handleCategoryClick={handleCategoryClick} />
        <Slide
          direction="left"
          in={!!activeCategory}
          mountOnEnter
          unmountOnExit
        >
          <div className="bg-black/10 w-full h-full absolute z-[9999]">
            HELLO WORLD
          </div>
        </Slide>
      </div>
      <div className="w-full">
        <h1 className="px-4 pt-4 relative text-gray-900 text-3xl font-bold font-montserrat w-[55%] line-clamp-2 z-20">
          Popular
        </h1>

        <div className="flex flex-wrap items-center w-[75%] mt-4 pl-4">
          {ARTICLE_DUMMY_DATA?.articles?.slice(0, 6)?.map((article, index) => {
            return (
              <ArticleCard key={article?.url ?? index} article={article} />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;

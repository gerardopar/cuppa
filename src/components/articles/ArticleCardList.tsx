import React from "react";

import ArticleCard from "./ArticleCard";

import { Article } from "../../types/article";

export const ArticleCardList: React.FC<{
  articles: Article[];
  className?: string;

  listTitle?: string;
  listContainerClassName?: string;
  listLimit?: number;
}> = ({
  articles,
  className,
  listTitle,
  listContainerClassName,
  listLimit = 6,
}) => {
  return (
    <div className={`w-full ${className}`}>
      <h1 className="px-4 pt-4 relative text-gray-900 text-3xl font-bold font-montserrat w-[55%] line-clamp-2 z-20">
        {listTitle}
      </h1>

      <div
        className={`flex flex-wrap items-center w-[75%] mt-4 pl-4 ${listContainerClassName}`}
      >
        {articles?.slice(0, listLimit)?.map((article, index) => {
          return <ArticleCard key={article?.url ?? index} article={article} />;
        })}
      </div>
    </div>
  );
};

export default ArticleCardList;

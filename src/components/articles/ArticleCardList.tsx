import React from "react";

import ArticleCard from "./ArticleCard";

import { Article } from "../../types/article";

export const ArticleCardList: React.FC<{
  articles: Article[];
  listTitle?: string;
}> = ({ articles, listTitle }) => {
  return (
    <div className="w-full">
      <h1 className="px-4 pt-4 relative text-gray-900 text-3xl font-bold font-montserrat w-[55%] line-clamp-2 z-20">
        {listTitle}
      </h1>

      <div className="flex flex-wrap items-center w-[75%] mt-4 pl-4">
        {articles?.slice(0, 6)?.map((article, index) => {
          return <ArticleCard key={article?.url ?? index} article={article} />;
        })}
      </div>
    </div>
  );
};

export default ArticleCardList;

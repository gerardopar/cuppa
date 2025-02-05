import React from "react";
import { Article } from "../../../types/article";

export const ArticleSliderCard: React.FC<{ article: Article }> = ({
  article,
}) => {
  return (
    <div
      className="relative bg-center bg-cover p-4 h-[300px] w-[400px] min-h-[300px] min-w-[400px] mr-4"
      style={{
        backgroundImage: `url(${article.urlToImage})`,
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent z-10" />
      <div className="h-full flex flex-col items-start justify-end">
        <p className="text-xs font-roboto text-gray-900 z-20 bg-white rounded-full px-2 mb-2">
          {article?.source?.name}
        </p>
        <p className="text-gray-300 z-20 line-clamp-2 font-montserrat">
          {article?.title}
        </p>
      </div>
    </div>
  );
};

export default ArticleSliderCard;

import React from "react";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import NewsEmptyPlaceholder from "../../assets/images/news-empty-placeholder.jpg";

import { Article } from "../../types/article";

const ArticleCard: React.FC<{ article: Article; className?: string }> = ({
  article,
  className,
}) => {
  return (
    <a
      href={article?.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex pr-8 w-[32.5%] items-center mr-2 mb-6 relative cursor-pointer ${className}`}
    >
      <div className="h-[100px] w-[100px] min-h-[100px] min-w-[100px] mr-4 shadow-sm rounded-[12px] overflow-hidden">
        <img
          className="w-full h-full object-cover transform transition-transform duration-300 ease-in-out hover:scale-105"
          src={article?.urlToImage || NewsEmptyPlaceholder}
          alt="article img"
        />
      </div>
      <div className="flex flex-col">
        <p className="line-clamp-2 font-montserrat text-base font-medium">
          {article?.title}
        </p>
        <div className="relative flex items-center mt-1">
          <p className="font-roboto text-gray-500 font-medium">
            {article?.source?.name}
          </p>
        </div>
      </div>

      <button type="button" className="absolute top-0 right-0 cursor-pointer">
        <MoreVertIcon className="text-gray-500" />
      </button>
    </a>
  );
};

export default ArticleCard;

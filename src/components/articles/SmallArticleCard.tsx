import React from "react";
import moment from "moment";

import NewsEmptyPlaceholder from "../../assets/images/news-empty-placeholder.jpg";
import { AccountBoxOutlined, CalendarMonthOutlined } from "@mui/icons-material";

import { Article } from "../../types/article";

export const SmallArticleCard: React.FC<{
  article: Article;
  containerClassName?: string;
}> = ({ article, containerClassName = "" }) => {
  const publishedDate = moment(article.publishedAt).format("MMM Do, YYYY");

  return (
    <a
      href={article?.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex-1 flex items-end justify-start h-full relative bg-center bg-cover p-4 rounded-[12px] cursor-pointer ${containerClassName}`}
      style={{
        backgroundImage: `url(${article.urlToImage || NewsEmptyPlaceholder})`,
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent z-1 rounded-[12px]" />
      <div className="flex flex-col z-10">
        <h3 className="line-clamp-2 font-montserrat text-lg font-bold text-white">
          {article.title}
        </h3>
        <div className="flex mt-2">
          <div className="flex items-center justify-start text-gray-100 mr-4">
            <AccountBoxOutlined className="text-gray-100" />
            <p className="ml-1 text-xs">{article.author}</p>
          </div>
          <div className="flex items-center justify-start text-gray-100">
            <CalendarMonthOutlined className="text-gray-100" />
            <p className="ml-1 text-xs">{publishedDate}</p>
          </div>
        </div>
      </div>
    </a>
  );
};

export default SmallArticleCard;

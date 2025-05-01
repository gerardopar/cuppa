import React from "react";
import moment from "moment";

import NewsLogo from "../shared/NewsLogo";
import NewsEmptyPlaceholder from "../../assets/images/news-empty-placeholder.jpg";
import { CalendarMonthOutlined } from "@mui/icons-material";

import { Article } from "../../types/article";

export const LargeArticleCard: React.FC<{ article: Article }> = ({
  article,
}) => {
  const publishedDate = moment(article?.publishedAt)?.format("MMM Do, YYYY");

  return (
    <a
      href={article?.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex-1 flex items-end justify-start h-full relative mr-4 p-4 rounded-[12px] cursor-pointer overflow-hidden"
    >
      {/* Background image zoom layer */}
      <div
        className="absolute inset-0 bg-center bg-cover transition-transform duration-500 ease-in-out scale-100 group-hover:scale-105"
        style={{
          backgroundImage: `url(${
            article?.urlToImage || NewsEmptyPlaceholder
          })`,
        }}
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent z-10 rounded-[12px]" />

      {/* Article content */}
      <div className="flex flex-col z-20">
        <h3 className="line-clamp-2 font-montserrat text-2xl font-bold text-white">
          {article?.title}
        </h3>
        <div className="flex items-center justify-start mt-2">
          <NewsLogo newsSource={article?.source?.id} />
          <div className="flex items-center justify-start text-gray-100">
            <CalendarMonthOutlined className="text-gray-100" />
            <p className="ml-1 text-xs">{publishedDate}</p>
          </div>
        </div>
      </div>
    </a>
  );
};

export default LargeArticleCard;

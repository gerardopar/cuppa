import React from "react";
import moment from "moment";

import NewsEmptyPlaceholder from "../../assets/images/news-empty-placeholder.jpg";
import { CalendarMonthOutlined } from "@mui/icons-material";
import NewsLogo from "../shared/NewsLogo";

import { Article } from "../../types/article";

export const MediumArticleCard: React.FC<{
  article: Article;
  containerClassName?: string;
}> = ({ article, containerClassName = "" }) => {
  const publishedDate = moment(article.publishedAt).format("MMM Do, YYYY");

  console.log("article", article);

  return (
    <a
      href={article?.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`group w-full h-[200px] relative mt-4 flex items-end justify-start bg-center bg-cover p-4 rounded-[12px] cursor-pointer overflow-hidden ${containerClassName}`}
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

      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent z-1 rounded-[12px]" />
      <div className="flex flex-col z-10">
        <h3 className="line-clamp-2 font-montserrat text-lg font-bold text-white text-left">
          {article?.title}
        </h3>
        <div className="flex mt-2">
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

export default MediumArticleCard;

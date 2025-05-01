import React, { useEffect, useState } from "react";
import moment from "moment";

import NewsEmptyPlaceholder from "../../assets/images/news-empty-placeholder.jpg";
import { CalendarMonthOutlined } from "@mui/icons-material";
import NewsLogo from "../shared/NewsLogo";

import { Article } from "../../types/article";

import Skeleton from "@mui/material/Skeleton";

export const MediumArticleCard: React.FC<{
  article: Article;
  containerClassName?: string;
  loading?: boolean;
}> = ({ article, containerClassName = "", loading = false }) => {
  const publishedDate = moment(article.publishedAt).format("MMM Do, YYYY");

  const [bgUrl, setBgUrl] = useState<string>(
    article?.urlToImage ?? NewsEmptyPlaceholder
  );

  useEffect(() => {
    setBgUrl(article?.urlToImage ?? NewsEmptyPlaceholder);
  }, [article?.urlToImage]);

  if (loading || !article) {
    return (
      <div
        className={`${containerClassName} group w-full h-[200px] relative mt-4 flex items-end justify-start p-4 rounded-[12px] overflow-hidden bg-gray-100`}
      >
        <div className="absolute inset-0">
          <Skeleton variant="rectangular" width="100%" height="100%" />
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent z-10 rounded-[12px]" />

        <div className="flex flex-col z-20 w-full px-2 pb-8">
          <Skeleton variant="text" width="80%" height={24} />
          <Skeleton variant="text" width="60%" height={24} className="mt-2" />
        </div>

        <div className="absolute bottom-4 left-4 flex items-center space-x-2 z-20">
          <Skeleton variant="circular" width={20} height={20} />
          <Skeleton variant="text" width={40} height={16} />
        </div>
      </div>
    );
  }

  return (
    <a
      href={article?.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`group w-full h-[200px] relative mt-4 flex items-end justify-start bg-center bg-cover p-4 rounded-[12px] cursor-pointer overflow-hidden ${containerClassName}`}
    >
      <img
        src={article?.urlToImage ?? ""}
        alt=""
        style={{ display: "none" }}
        onLoad={() => {
          setBgUrl(article?.urlToImage ?? "");
        }}
        onError={() => {
          setBgUrl(NewsEmptyPlaceholder);
        }}
      />
      <div
        className="absolute inset-0 bg-center bg-cover transition-transform duration-500 ease-in-out scale-100 group-hover:scale-105"
        style={{
          backgroundImage: `url(${bgUrl})`,
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

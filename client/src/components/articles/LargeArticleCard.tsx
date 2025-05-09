import React, { useEffect, useState } from "react";
import Skeleton from "@mui/material/Skeleton";

import NewsLogo from "../shared/NewsLogo";
import PublishedDate from "../shared/PublishedDate";
import NewsEmptyPlaceholder from "../../assets/images/news-empty-placeholder.jpg";

import { Article } from "../../types/article";

interface LargeArticleCardProps {
  article?: Article;
  loading?: boolean;
  className?: string;
}

export const LargeArticleCard: React.FC<LargeArticleCardProps> = ({
  article,
  loading = false,
  className,
}) => {
  const [bgUrl, setBgUrl] = useState<string>(
    article?.urlToImage ?? NewsEmptyPlaceholder
  );

  useEffect(() => {
    setBgUrl(article?.urlToImage ?? NewsEmptyPlaceholder);
  }, [article?.urlToImage]);

  if (loading || !article) {
    return (
      <div className="h-full group flex-1 flex flex-col h-64 relative mr-4 p-4 rounded-[12px] overflow-hidden bg-gray-100">
        <div className="absolute inset-0">
          <Skeleton variant="rectangular" width="100%" height="100%" />
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent z-10 rounded-[12px]" />

        <div className="absolute bottom-16 left-4 right-4 z-20">
          <Skeleton variant="text" width="70%" height={32} />
        </div>

        <div className="absolute bottom-4 left-4 flex items-center space-x-2 z-20">
          <Skeleton variant="circular" width={30} height={30} />
          <Skeleton variant="text" width={60} height={20} />
        </div>
      </div>
    );
  }

  return (
    <div
      className={`group flex-1 flex items-end justify-start h-full relative mr-4 p-4 rounded-[12px] cursor-pointer overflow-hidden ${className}`}
    >
      <a
        href={article?.url}
        target="_blank"
        rel="noopener noreferrer"
        className="h-full relative rounded-[12px] cursor-pointer overflow-hidden"
      >
        <img
          src={article?.urlToImage ?? ""}
          alt=""
          className="hidden"
          onLoad={() => setBgUrl(article?.urlToImage ?? "")}
          onError={() => setBgUrl(NewsEmptyPlaceholder)}
        />
      </a>

      <div
        className="absolute inset-0 bg-center bg-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
        style={{ backgroundImage: `url(${bgUrl})` }}
      />

      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent z-10 rounded-[12px]" />

      <div className="flex flex-col z-20">
        <h3 className="line-clamp-2 font-montserrat text-2xl font-bold text-white">
          {article?.title}
        </h3>
        <div className="flex items-center justify-between mt-2 text-gray-100">
          <NewsLogo newsSource={article?.source?.id ?? ""} className="mr-2" />
          <PublishedDate
            publishedAt={article?.publishedAt ?? ""}
            className="!text-gray-100"
          />
        </div>
      </div>
    </div>
  );
};

export default LargeArticleCard;

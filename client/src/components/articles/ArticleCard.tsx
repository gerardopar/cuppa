import React, { useEffect, useState } from "react";

import NewsLogo from "../shared/NewsLogo";
import Skeleton from "@mui/material/Skeleton";
import PublishedDate from "../shared/PublishedDate";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import NewsEmptyPlaceholder from "../../assets/images/news-empty-placeholder.jpg";

import { Article } from "@shared/types/article";

const ArticleCard: React.FC<{
  article: Article;
  className?: string;
  loading?: boolean;
}> = ({ article, className, loading = false }) => {
  const [imgSrc, setImgSrc] = useState(
    article?.urlToImage ?? NewsEmptyPlaceholder
  );

  useEffect(() => {
    setImgSrc(article?.urlToImage ?? NewsEmptyPlaceholder);
  }, [article?.urlToImage]);

  if (loading || !article) {
    return (
      <div
        className={`flex pr-8 w-[32.5%] items-center mr-2 mb-6 relative ${className}`}
      >
        <div className="h-[100px] w-[100px] min-h-[100px] min-w-[100px] mr-4 shadow-sm rounded-[12px] overflow-hidden">
          <Skeleton variant="rectangular" width="100%" height={100} />
        </div>

        <div className="flex flex-col flex-1 space-y-2">
          <Skeleton variant="text" width="80%" height={20} />
          <Skeleton variant="text" width="60%" height={20} />
        </div>

        <div className="absolute top-2 right-2">
          <Skeleton variant="circular" width={24} height={24} />
        </div>
      </div>
    );
  }

  return (
    <div
      className={`flex pr-8 w-[32.5%] items-center mr-2 mb-6 relative ${className}`}
    >
      <a
        href={article?.url}
        target="_blank"
        rel="noopener noreferrer"
        className="relative cursor-pointer"
      >
        <div className="h-[100px] w-[100px] min-h-[100px] min-w-[100px] mr-4 shadow-sm rounded-[12px] overflow-hidden">
          <img
            className="w-full h-full object-cover transform transition-transform duration-300 ease-in-out hover:scale-105"
            src={imgSrc ?? NewsEmptyPlaceholder}
            alt="article img"
            onError={() => setImgSrc(NewsEmptyPlaceholder)}
          />
        </div>
      </a>
      <div className="flex flex-col w-full">
        <p className="line-clamp-2 font-montserrat text-base font-medium">
          {article?.title}
        </p>
        <div className="relative flex items-center justify-between mt-1">
          <NewsLogo
            newsSource={article?.source?.id}
            className="mr-2 !h-[30px] !w-[30px]"
          />
          <PublishedDate
            publishedAt={article?.publishedAt ?? ""}
            className="text-xs"
          />
        </div>
      </div>

      <button type="button" className="absolute top-0 right-0 cursor-pointer">
        <MoreVertIcon className="text-gray-500" />
      </button>
    </div>
  );
};

export default ArticleCard;

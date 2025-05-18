import React, { useEffect, useState } from "react";

import NewsLogo from "../shared/NewsLogo";
import PublishedDate from "../shared/PublishedDate";
import NewsEmptyPlaceholder from "../../assets/images/news-empty-placeholder.jpg";

import { Article } from "../../types/article";
import { Skeleton } from "@mui/material";

export const SmallArticleCardVertical: React.FC<{
  article?: Article;
  containerClassName?: string;
  loading?: boolean;
}> = ({ article, containerClassName = "", loading = false }) => {
  const [bgUrl, setBgUrl] = useState<string>(
    article?.urlToImage ?? NewsEmptyPlaceholder
  );

  useEffect(() => {
    setBgUrl(article?.urlToImage ?? NewsEmptyPlaceholder);
  }, [article?.urlToImage]);

  if (loading || !article) {
    return (
      <div
        className={`flex-1 flex flex-col items-end justify-start h-full bg-center bg-cover p-4 rounded-[12px] relative ${containerClassName}`}
      >
        <div className="w-full h-40 relative rounded-[12px] overflow-hidden">
          <Skeleton variant="rectangular" width="100%" height="100%" />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent z-10 rounded-[12px]" />
        </div>

        <div className="flex flex-col z-10 mt-4 w-full">
          <Skeleton variant="text" width="80%" height={24} />
          <Skeleton variant="text" width="60%" height={24} className="mt-1" />

          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center space-x-2">
              <Skeleton variant="circular" width={32} height={32} />
              <Skeleton variant="text" width={80} height={20} />
            </div>
            <Skeleton variant="text" width={60} height={20} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`flex-1 flex flex-col items-end justify-start h-full bg-center bg-cover p-4 rounded-[12px] relative ${containerClassName}`}
    >
      <a
        href={article?.url}
        target="_blank"
        rel="noopener noreferrer"
        className={`group overflow-hidden h-full w-full relative bg-center bg-cover rounded-[12px] cursor-pointer max-h-[240px]`}
      >
        <img
          src={article?.urlToImage ?? ""}
          alt=""
          className="hidden"
          onLoad={() => setBgUrl(article?.urlToImage ?? "")}
          onError={() => setBgUrl(NewsEmptyPlaceholder)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent z-1 rounded-[12px]" />
        <div
          className="absolute inset-0 bg-center bg-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
          style={{ backgroundImage: `url(${bgUrl})` }}
        />
      </a>
      <div className="w-full flex flex-col z-10 mt-4">
        <h3 className="line-clamp-2 font-montserrat text-base font-bold text-gray-900">
          {article.title}
        </h3>
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center justify-start text-gray-900 mr-4">
            <NewsLogo newsSource={article?.source?.id ?? ""} className="mr-2" />
          </div>
          <div className="flex items-center justify-start text-gray-500">
            <PublishedDate publishedAt={article?.publishedAt ?? ""} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmallArticleCardVertical;

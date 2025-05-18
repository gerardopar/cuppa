import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import { ArrowLeftOutlined, ArrowRightOutlined } from "@mui/icons-material";
import SmallArticleCardVertical from "../../../components/articles/SmallArticleCardVertical";

import { Article } from "../../../types/article";

import "swiper/swiper-bundle.css";

export const PaginatedArticlesList: React.FC<{
  articles: Article[];
  isLoading: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
  hasNextPage: boolean;
}> = ({
  articles,
  isLoading,
  isFetchingNextPage,
  fetchNextPage,
  hasNextPage,
}) => {
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const shouldShowNavigation = articles?.length > 5;
  const canShowNext =
    shouldShowNavigation && (hasNextPage || isFetchingNextPage || !isEnd);

  return (
    <div className="w-full border-solid border-[1px] border-gray-100 rounded-[20px] p-4 mt-4 relative">
      <button
        className={`btn-swiper-prev absolute left-[10px] top-[30%] z-[9999] bg-[var(--secondary-light)]/50 rounded-full h-[50px] w-[50px] max-h-[50px] max-w-[50px] min-h-[50px] min-w-[50px] flex items-center justify-center cursor-pointer text-white transition-opacity duration-200 ${
          !shouldShowNavigation || isBeginning
            ? "opacity-0 pointer-events-none"
            : "opacity-100"
        }`}
      >
        <ArrowLeftOutlined />
      </button>

      <button
        className={`btn-swiper-next absolute right-[10px] top-[30%] z-[9999] bg-[var(--secondary-light)]/50 rounded-full h-[50px] w-[50px] max-h-[50px] max-w-[50px] min-h-[50px] min-w-[50px] flex items-center justify-center cursor-pointer text-white transition-opacity duration-200 ${
          canShowNext ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <ArrowRightOutlined />
      </button>

      <div className="w-full h-[400px] max-h-[400px] overflow-hidden relative">
        <Swiper
          modules={[Navigation]}
          navigation={{
            nextEl: ".btn-swiper-next",
            prevEl: ".btn-swiper-prev",
          }}
          slidesPerView={5}
          spaceBetween={0}
          onReachEnd={() => hasNextPage && fetchNextPage()}
          onSlideChange={(swiper) => {
            setIsBeginning(swiper?.isBeginning);
            setIsEnd(swiper?.isEnd);
          }}
          onSwiper={(swiper) => {
            setIsBeginning(swiper?.isBeginning);
            setIsEnd(swiper?.isEnd);
          }}
          className="h-full w-full px-4"
        >
          {articles?.slice(5)?.map((a, i) => (
            <SwiperSlide key={a?.url ?? i}>
              <SmallArticleCardVertical article={a} loading={isLoading} />
            </SwiperSlide>
          ))}
          {isFetchingNextPage && (
            <SwiperSlide>
              <SmallArticleCardVertical loading />
            </SwiperSlide>
          )}
        </Swiper>
      </div>
    </div>
  );
};

export default PaginatedArticlesList;

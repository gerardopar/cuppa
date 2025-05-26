import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import { ArrowLeftOutlined, ArrowRightOutlined } from "@mui/icons-material";
import SmallArticleCardVertical from "../../../components/articles/SmallArticleCardVertical";

import { Article } from "@shared/types/article";

import "swiper/swiper-bundle.css";

export const PaginatedArticlesList: React.FC<{
  slidesPerView?: number;
  articles: Article[];
  isLoading: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
  hasNextPage: boolean;
  containerClassName?: string;
}> = ({
  slidesPerView = 5,
  articles,
  isLoading,
  isFetchingNextPage,
  fetchNextPage,
  hasNextPage,
  containerClassName,
}) => {
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const shouldShowNavigation = articles?.length > slidesPerView;
  const canShowNext =
    shouldShowNavigation && (hasNextPage || isFetchingNextPage || !isEnd);

  return (
    <div
      className={`w-full border-solid border-[1px] border-gray-100 rounded-[20px] p-4 mt-4 relative ${containerClassName}`}
    >
      <button
        className={`btn-swiper-prev absolute left-[10px] top-[30%] z-[9999] bg-[var(--secondary-light)]/50 hover:bg-[var(--secondary-light)]/70 transition-all rounded-full h-[50px] w-[50px] max-h-[50px] max-w-[50px] min-h-[50px] min-w-[50px] flex items-center justify-center cursor-pointer text-white duration-500 ${
          !shouldShowNavigation || isBeginning
            ? "opacity-0 pointer-events-none"
            : "opacity-100"
        }`}
      >
        <ArrowLeftOutlined />
      </button>

      <button
        disabled={isLoading || isFetchingNextPage}
        className={`btn-swiper-next absolute right-[10px] top-[30%] z-[9999] bg-[var(--secondary-light)]/50 hover:bg-[var(--secondary-light)]/70 transition-all rounded-full h-[50px] w-[50px] max-h-[50px] max-w-[50px] min-h-[50px] min-w-[50px] flex items-center justify-center cursor-pointer text-white duration-500 ${
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
          slidesPerView={slidesPerView}
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
          {articles?.slice(slidesPerView)?.map((a, i) => (
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

import React, { useMemo, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import TopBar from "../../components/top-bar/TopBar";
import ArticleCard from "../../components/articles/ArticleCard";
import LargeArticleCard from "../../components/articles/LargeArticleCard";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@mui/icons-material";
import SmallArticleCardVertical from "../../components/articles/SmallArticleCardVertical";
import NewsCategoryButtonList from "../../components/new-categories/NewsCategoryButtonList";

import { usePaginatedNews } from "../../react-query/queries/news";
import { useGetPoliticalQuoteWithImage } from "../../react-query/queries/openAi";

import {
  NewsCategoriesEnum,
  dedupeArticles,
} from "../../react-query/helpers/news.helpers";

import "swiper/swiper-bundle.css";

export const PoliticsPage: React.FC = () => {
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const {
    data: paginatedNews,
    isLoading: isInitialLoading,
    isFetching: isFetchingInitial,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = usePaginatedNews({
    q: NewsCategoriesEnum.politics,
    language: "en",
    pageSize: 20,
  });

  const { data: quoteWithImage } = useGetPoliticalQuoteWithImage();

  console.log(quoteWithImage);

  const rawArticles = useMemo(
    () => paginatedNews?.pages.flatMap((page) => page.articles) ?? [],
    [paginatedNews]
  );

  const articles = useMemo(() => {
    const dedupedArticles = dedupeArticles(rawArticles);
    return dedupedArticles;
  }, [rawArticles]);

  const isLoading =
    isInitialLoading || (isFetchingInitial && !isFetchingNextPage);

  const shouldShowNavigation = articles.length > 5;
  const canShowNext =
    shouldShowNavigation && (hasNextPage || isFetchingNextPage || !isEnd);

  return (
    <div className="relative w-full h-full">
      <TopBar title="Politics" />
      <div className="w-full h-full p-8 overflow-y-scroll flex flex-col">
        <div className="w-full flex items-center justify-start">
          <NewsCategoryButtonList />
        </div>

        <div className="flex flex-col w-full mt-4">
          <div className="w-full h-[400px] flex items-center justify-center max-h-[400px] p-4 border-solid border-[1px] border-gray-100 rounded-[20px]">
            <div className="w-[50%] h-full">
              <LargeArticleCard article={articles[0]} loading={isLoading} />
            </div>

            <div className="w-[50%] h-full flex flex-col items-center justify-between">
              {articles?.slice(1, 4)?.map((a, i) => {
                return (
                  <ArticleCard
                    key={a?.url ?? i}
                    article={a}
                    className="w-full !m-0"
                    loading={isLoading}
                  />
                );
              })}
            </div>
          </div>

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
                  setIsBeginning(swiper.isBeginning);
                  setIsEnd(swiper.isEnd);
                }}
                onSwiper={(swiper) => {
                  // Set initial state properly
                  setIsBeginning(swiper.isBeginning);
                  setIsEnd(swiper.isEnd);
                }}
                className="h-full w-full px-4"
              >
                {articles.slice(5).map((a, i) => (
                  <SwiperSlide key={a.url ?? i}>
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
        </div>
      </div>
    </div>
  );
};

export default PoliticsPage;

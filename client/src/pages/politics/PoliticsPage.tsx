import React, { useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import TopBar from "../../components/top-bar/TopBar";
import ArticleCard from "../../components/articles/ArticleCard";
import LargeArticleCard from "../../components/articles/LargeArticleCard";
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

          <div className="w-full border-solid border-[1px] border-gray-100 rounded-[20px] p-4 mt-4">
            <div className="w-full h-[400px] max-h-[400px] overflow-hidden">
              <Swiper
                slidesPerView={5}
                spaceBetween={0}
                onReachEnd={() => hasNextPage && fetchNextPage()}
                className="h-full w-full px-4"
              >
                {articles?.slice(4)?.map((a, i) => (
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

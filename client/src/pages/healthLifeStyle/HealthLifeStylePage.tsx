import React, { useMemo } from "react";

import TopBar from "../../components/top-bar/TopBar";
import ArticleCard from "../../components/articles/ArticleCard";
import LocalEvents from "../../components/widgets/events/LocalEvents";
import LargeArticleCard from "../../components/articles/LargeArticleCard";
import RandomRecipe from "../../components/widgets/random-recipe/RandomRecipe";
import ZenQuotesWidget from "../../components/widgets/quote-of-the-day/ZenQuotes";
import NewsCategoryButtonList from "../../components/new-categories/NewsCategoryButtonList";
import PaginatedArticlesList from "../../components/articles/paginatedArticles/PaginatedArticlesList";

import { usePaginatedNews } from "../../react-query/queries/news";

import {
  NewsCategoriesEnum,
  dedupeArticles,
} from "../../react-query/helpers/news.helpers";

export const HealthLifeStylePage: React.FC = () => {
  const {
    data: paginatedNews,
    isLoading: isInitialLoading,
    isFetching: isFetchingInitial,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = usePaginatedNews({
    q: NewsCategoriesEnum.healthLifestyle,
    language: "en",
    pageSize: 20,
  });

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
      <TopBar title="Health & Lifestyle" />
      <div className="w-full h-full p-8 overflow-y-scroll flex flex-col">
        <div className="w-full flex items-center justify-start">
          <NewsCategoryButtonList />
        </div>

        <div className="flex flex-col w-full mt-4">
          <div className="w-full h-[400px] flex items-center justify-center max-h-[400px]">
            <div className="w-[80%] h-full flex items-center justify-center p-6 border-solid border-[1px] border-gray-100 rounded-[20px] mr-4">
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

            <div className="w-[20%] h-full flex flex-col items-center justify-between p-4 border-solid border-[1px] border-gray-100 rounded-[20px]">
              <ZenQuotesWidget containerClassName="mb-2 flex-1 w-full" />
              <RandomRecipe containerClassName="flex-1 w-full" />
            </div>
          </div>

          <div className="w-full flex">
            <div className="w-[20%] h-[400px] max-h-[400px] p-2 border-solid border-[1px] border-gray-100 rounded-[20px] mr-4 mt-4">
              <LocalEvents />
            </div>

            <PaginatedArticlesList
              slidesPerView={4}
              articles={articles}
              isLoading={isLoading}
              isFetchingNextPage={isFetchingNextPage}
              fetchNextPage={fetchNextPage}
              hasNextPage={hasNextPage}
              containerClassName="flex-1 !w-[80%] !p-0"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthLifeStylePage;

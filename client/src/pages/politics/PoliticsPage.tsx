import React, { useMemo } from "react";

import TopBar from "../../components/top-bar/TopBar";
import PollsWidget from "../../components/widgets/polls/PollsWidget";
import ArticleCard from "../../components/articles/ArticleCard";
import LargeArticleCard from "../../components/articles/LargeArticleCard";
import QuoteOfTheDayWidget from "../../components/widgets/quote-of-the-day/QuoteOfTheDayWidget";
import NewsCategoryButtonList from "../../components/new-categories/NewsCategoryButtonList";
import PaginatedArticlesList from "../../components/articles/paginatedArticles/PaginatedArticlesList";

import { usePaginatedNews } from "../../react-query/queries/news";

import {
  NewsCategoriesEnum,
  dedupeArticles,
} from "../../react-query/helpers/news.helpers";

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
              <QuoteOfTheDayWidget containerClassName="mb-2 flex-1 w-full" />
              <PollsWidget containerClassName="flex-1 w-full" />
            </div>
          </div>

          <PaginatedArticlesList
            articles={articles}
            isLoading={isLoading}
            isFetchingNextPage={isFetchingNextPage}
            fetchNextPage={fetchNextPage}
            hasNextPage={hasNextPage}
          />
        </div>
      </div>
    </div>
  );
};

export default PoliticsPage;

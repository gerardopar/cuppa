import React, { useMemo } from "react";

import TopBar from "../../components/top-bar/TopBar";
import ArticleCard from "../../components/articles/ArticleCard";
import LargeArticleCard from "../../components/articles/LargeArticleCard";
import SmallArticleCardVertical from "../../components/articles/SmallArticleCardVertical";
import NewsCategoryButtonList from "../../components/new-categories/NewsCategoryButtonList";

import { useGetNews } from "../../react-query/queries/news";

import { getRandomArticles } from "../../components/articles/article.helpers";

import { NewsCategoriesEnum } from "../../react-query/helpers/news.helpers";

export const HealthLifeStylePage: React.FC = () => {
  const { data: healthLifeStyle, isPending: healthLifeStylePending } =
    useGetNews({
      q: NewsCategoriesEnum.healthLifestyle,
      language: "en",
      pageSize: 20,
    });

  const articles = useMemo(
    () => getRandomArticles(healthLifeStyle?.articles ?? [], 20),
    [healthLifeStyle]
  );

  return (
    <div className="relative w-full h-full">
      <TopBar title="Health & Lifestyle" />
      <div className="w-full h-full p-8 overflow-y-scroll flex flex-col">
        <div className="w-full flex items-center justify-start">
          <NewsCategoryButtonList />
        </div>

        <div className="flex flex-col w-full mt-4">
          <div className="w-full h-[400px] flex items-center justify-center max-h-[400px] p-4 border-solid border-[1px] border-gray-100 rounded-[20px]">
            <div className="w-[50%] h-full">
              <LargeArticleCard
                article={articles[0]}
                loading={healthLifeStylePending}
              />
            </div>

            <div className="w-[50%] h-full flex flex-col items-center justify-between">
              {articles?.slice(1, 4)?.map((a, i) => {
                return (
                  <ArticleCard
                    key={a?.url ?? i}
                    article={a}
                    className="w-full !m-0"
                    loading={healthLifeStylePending}
                  />
                );
              })}
            </div>
          </div>

          <div className="w-full h-[400px] flex items-center justify-center max-h-[400px] p-4 border-solid border-[1px] border-gray-100 rounded-[20px] mt-4">
            {articles?.slice(4, 9)?.map((a, i) => {
              return <SmallArticleCardVertical key={a?.url ?? i} article={a} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthLifeStylePage;

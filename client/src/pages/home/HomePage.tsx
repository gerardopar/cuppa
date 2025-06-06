import React, { useEffect, useState, useMemo } from "react";
import { useSearchParams } from "react-router";

import { Backdrop, Modal } from "@mui/material";
import TopBar from "../../components/top-bar/TopBar";
import TrendsButton, {
  TrendsButtonSkeleton,
} from "../../components/trends/TrendsButton";
import ArticleCard from "../../components/articles/ArticleCard";
import MediumArticleCard from "../../components/articles/MediumArticleCard";
import ResetPassword from "../../components/login/forgotPassword/ResetPassword";
import NewsCategoryButtonList from "../../components/new-categories/NewsCategoryButtonList";
import ArticleVideo from "../../components/articles/media/ArticleVideo";

import { authStore } from "../../stores/authStore";

import { useGetNews } from "../../react-query/queries/news";
import { useGetTrends } from "../../react-query/queries/trends";
import { useSearchNews } from "../../react-query/mutations/news";
import { useGetYoutubeVideosByChannelID } from "../../react-query/queries/yt";

import {
  NewsCategoriesEnum,
  YtChannelIDsEnum,
} from "../../react-query/helpers/news.helpers";
import {
  getRandomArticles,
  getRandomVideos,
} from "../../components/articles/article.helpers";
import { getRandomTrends } from "../../components/trends/trends.helpers";

export const Home: React.FC = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const showResetPasswordModal = searchParams.get("resetPassword") ?? false;

  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    if (token && showResetPasswordModal) {
      authStore.set("resetToken", token);
      setShowModal(Boolean(showResetPasswordModal));
    }
  }, [showResetPasswordModal, token]);

  const {
    data: mostTrendingNews,
    isFetching: mostTrendingNewsFetching,
    isLoading: mostTrendingNewsLoading,
  } = useGetNews({
    q: NewsCategoriesEnum.mostTrendingNews,
    language: "en",
    pageSize: 20,
  });

  const {
    data: politics,
    isFetching: politicsFetching,
    isLoading: politicsLoading,
  } = useGetNews({
    q: NewsCategoriesEnum.politics,
    language: "en",
    pageSize: 20,
  });

  const {
    data: healthLifestyle,
    isFetching: healthLifestyleFetching,
    isLoading: healthLifestyleLoading,
  } = useGetNews({
    q: NewsCategoriesEnum.healthLifestyle,
    language: "en",
    pageSize: 20,
  });

  const {
    data: sports,
    isFetching: sportsFetching,
    isLoading: sportsLoading,
  } = useGetNews({
    q: NewsCategoriesEnum.sports,
    language: "en",
    pageSize: 20,
  });

  const {
    data: trendsData,
    isFetching: trendsFetching,
    isLoading: trendsLoading,
  } = useGetTrends();
  const { mutate: searchNews } = useSearchNews();

  const {
    data: breakingNewsVideos,
    isLoading: breakingNewsVideosLoading,
    isFetching: breakingNewsVideosFetching,
  } = useGetYoutubeVideosByChannelID(YtChannelIDsEnum.cnn);

  const [randomVideo] = useMemo(() => {
    return getRandomVideos(breakingNewsVideos?.items ?? [], 1);
  }, [breakingNewsVideos]);

  const mostTrendingNewsArticles = useMemo(() => {
    return getRandomArticles(mostTrendingNews?.articles ?? [], 4);
  }, [mostTrendingNews]);

  const politicsArticles = useMemo(() => {
    return getRandomArticles(politics?.articles ?? [], 4);
  }, [politics]);

  const healthLifestyleArticles = useMemo(() => {
    return getRandomArticles(healthLifestyle?.articles ?? [], 4);
  }, [healthLifestyle]);

  const sportsArticles = useMemo(() => {
    return getRandomArticles(sports?.articles ?? [], 3);
  }, [sports]);

  const trends = useMemo(() => {
    return getRandomTrends(trendsData?.slice(0, 10), 10);
  }, [trendsData]);

  return (
    <div className="relative w-full h-full">
      <TopBar title="Trending News" />
      <div className="w-full h-full p-8 overflow-y-scroll flex flex-col">
        {/* left column */}
        <div className="w-full flex items-center justify-start">
          <NewsCategoryButtonList />
        </div>

        <div className="flex w-full mt-4">
          <div className="max-w-[70%] w-[70%] mr-4">
            {/* left column row 1 */}
            <div className="w-full h-full flex flex-col items-center justify-center max-h-[400px] p-4 border-solid border-[1px] border-gray-100 rounded-[20px]">
              <div className="flex items-center justify-items-start w-full">
                <h2 className="font-bold text-xl mb-2">Most Trending News</h2>
              </div>
              <div className="w-full h-full flex items-center justify-center">
                <div className="flex w-full h-full flex-col mr-4">
                  <ArticleVideo
                    video={randomVideo}
                    loading={
                      breakingNewsVideosLoading || breakingNewsVideosFetching
                    }
                    showDetails
                  />
                </div>

                <div className="flex flex-col w-full items-center justify-between h-full">
                  {mostTrendingNewsArticles?.slice(0, 3)?.map((a, i) => {
                    return (
                      <ArticleCard
                        key={a?.url ?? i}
                        article={a}
                        className="w-full !m-0"
                        loading={
                          mostTrendingNewsLoading || mostTrendingNewsFetching
                        }
                      />
                    );
                  })}
                </div>
              </div>
            </div>

            {/* left column row 2 */}
            <div className="w-full p-4 border-solid border-[1px] border-gray-100 rounded-[20px] flex items-center justify-center flex-wrap text-center mt-4">
              <div className="flex items-center justify-items-start w-full">
                <h2 className="font-bold text-xl">Politics & World Affairs</h2>
              </div>
              {politicsArticles?.map((a, i) => {
                return (
                  <MediumArticleCard
                    key={a?.url ?? i}
                    article={a}
                    containerClassName="!w-[49%] even:mr-4"
                    loading={politicsLoading || politicsFetching}
                  />
                );
              })}
            </div>
          </div>

          {/* right column */}
          <div className="max-w-[30%] w-[30%]">
            <div className="p-4 pb-2 border-solid border-[1px] border-gray-100 rounded-[20px]">
              <div className="flex items-center justify-items-start w-full mb-2">
                <h2 className="font-bold text-xl">Trendy Topics</h2>
              </div>
              {!trendsLoading && !trendsFetching ? (
                trends?.map((trend, i) => {
                  return (
                    <TrendsButton
                      key={i}
                      trend={trend}
                      onClick={() => searchNews({ q: trend, language: "en" })}
                    />
                  );
                })
              ) : (
                <div className="flex flex-wrap w-full">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <TrendsButtonSkeleton key={i} className="w-full inline" />
                  ))}
                </div>
              )}
            </div>
            <div className="p-4 pb-0 border-solid border-[1px] border-gray-100 rounded-[20px] mt-4">
              <div className="flex items-center justify-items-start w-full mb-2">
                <h2 className="font-bold text-xl">Health & Lifestyle</h2>
              </div>
              {healthLifestyleArticles?.map((a, i) => {
                return (
                  <ArticleCard
                    key={a?.url ?? i}
                    article={a}
                    className="w-full mb-1"
                    loading={healthLifestyleLoading || healthLifestyleFetching}
                  />
                );
              })}
            </div>
            <div className="p-4 pb-0 border-solid border-[1px] border-gray-100 rounded-[20px] mt-4">
              <div className="flex items-center justify-items-start w-full mb-2">
                <h2 className="font-bold text-xl">Sports</h2>
              </div>
              {sportsArticles?.map((a, i) => {
                return (
                  <ArticleCard
                    key={a?.url ?? i}
                    article={a}
                    className="w-full mb-1"
                    loading={sportsLoading || sportsFetching}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={showModal}
        onClose={() => setShowModal(false)}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
        className="bg-transparent"
      >
        <ResetPassword handleCloseModal={() => setShowModal(false)} />
      </Modal>
    </div>
  );
};

export default Home;

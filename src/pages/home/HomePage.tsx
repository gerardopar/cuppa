import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router";

import { Backdrop, Modal } from "@mui/material";
import TopBar from "../../components/top-bar/TopBar";
import ArticleCard from "../../components/articles/ArticleCard";
import LargeArticleCard from "../../components/articles/LargeArticleCard";
import MediumArticleCard from "../../components/articles/MediumArticleCard";
import ResetPassword from "../../components/login/forgotPassword/ResetPassword";

import { authStore } from "../../stores/authStore";

import { ARTICLE_DUMMY_DATA } from "../../data/ARTICLE_DUMMY_DATA";

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

  const articles = ARTICLE_DUMMY_DATA?.articles;

  const leftColumnRow1Articles = articles?.slice(0, 4);
  const leftColumnRow2Articles = articles?.slice(4, 8);
  const rightColumnArticles = articles?.slice(8, 16);

  return (
    <div className="relative w-full h-full">
      <TopBar />
      <div className="w-full h-full p-8 overflow-y-scroll flex pt-[100px]">
        {/* left column */}
        <div className="max-w-[70%] w-[70%] mr-4">
          {/* left column row 1 */}
          <div className="w-full h-full flex flex-col items-center justify-center max-h-[400px] p-4 border-solid border-[1px] border-gray-100 rounded-[20px]">
            <div className="flex items-center justify-items-start w-full">
              <h2 className="font-bold text-xl mb-2">Most Trending News</h2>
            </div>
            <div className="w-full h-full flex items-center justify-center">
              <div className="flex w-full h-full">
                <LargeArticleCard article={leftColumnRow1Articles?.[0]} />
              </div>

              <div className="flex flex-col w-full items-center justify-between h-full">
                {leftColumnRow1Articles?.slice(1, 4).map((a) => {
                  return <ArticleCard article={a} className="w-full !m-0" />;
                })}
              </div>
            </div>
          </div>

          {/* left column row 2 */}
          <div className="w-full p-4 border-solid border-[1px] border-gray-100 rounded-[20px] flex items-center justify-center flex-wrap text-center mt-4">
            <div className="flex items-center justify-items-start w-full">
              <h2 className="font-bold text-xl">Politics & World Affairs</h2>
            </div>
            {leftColumnRow2Articles.map((a) => {
              return (
                <MediumArticleCard
                  article={a}
                  containerClassName="!w-[49%] even:mr-4"
                />
              );
            })}
          </div>
        </div>

        {/* right column */}
        <div className="max-w-[30%] w-[30%]">
          <div className="p-4 pb-0 border-solid border-[1px] border-gray-100 rounded-[20px]">
            <div className="flex items-center justify-items-start w-full mb-2">
              <h2 className="font-bold text-xl">Health & Lifestyle</h2>
            </div>
            {rightColumnArticles?.map((a) => {
              return <ArticleCard article={a} className="w-full mb-1" />;
            })}
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

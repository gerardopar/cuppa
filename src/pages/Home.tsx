import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import Slide from "@mui/material/Slide";

import NewsCategoryOverlay from "../components/new-categories/NewsCategoryOverlay";
import NewsCategoriesBar from "../components/new-categories/NewsCategoriesBar";
import ResetPassword from "../components/login/forgotPassword/ResetPassword";
import LargeArticleCard from "../components/articles/LargeArticleCard";
import SmallArticleCard from "../components/articles/SmallArticleCard";
import MediumArticleCard from "../components/articles/MediumArticleCard";
import ArticleCardList from "../components/articles/ArticleCardList";
import DividerLine from "../components/shared/DividerLine";
import { Backdrop, Modal } from "@mui/material";

import { navStore } from "../stores/navStore";
import { authStore } from "../stores/authStore";

import { GeneralCategoryEnum } from "../components/new-categories/newCategories.helpers";
import { ARTICLE_DUMMY_DATA } from "../data/ARTICLE_DUMMY_DATA";

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

  const [largeArticle, mediumArticle, smallArticle1, smallArticle2] = articles;

  const [activeCategory, setActiveCategory] =
    useState<GeneralCategoryEnum | null>(null);

  const isSlideOpen = navStore.get("isSlideOpen");

  const handleCategoryClick = (category: GeneralCategoryEnum | null) => {
    setActiveCategory(category);
    navStore.set("isSlideOpen", !!category);
  };

  return (
    <div className="relative">
      <div className="w-full h-full px-8">
        <NewsCategoriesBar handleCategoryClick={handleCategoryClick} />
        <DividerLine containerClassName="mt-4" lineClassName="w-[25%]" />
        <div className="flex w-full h-full max-h-[50%] mt-4">
          <LargeArticleCard article={largeArticle} />
          <div className="flex-1 flex-col h-full">
            <div className="flex h-[60%]">
              <SmallArticleCard
                article={smallArticle1}
                containerClassName="mr-4"
              />
              <SmallArticleCard article={smallArticle2} />
            </div>

            <MediumArticleCard article={mediumArticle} />
          </div>
        </div>

        <div className="w-full flex items-cente">
          <ArticleCardList
            articles={ARTICLE_DUMMY_DATA.articles}
            listTitle="Trending"
            className="!w-full"
            listContainerClassName="!w-full"
          />
        </div>
      </div>
      <Slide direction="left" in={isSlideOpen} mountOnEnter unmountOnExit>
        <div className="bg-gray-100 w-full h-full top-0 absolute z-[9999] overflow-y-scroll">
          <NewsCategoryOverlay
            handleCloseModal={() => handleCategoryClick(null)}
            category={activeCategory as GeneralCategoryEnum}
          />
        </div>
      </Slide>
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

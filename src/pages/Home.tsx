import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import Slide from "@mui/material/Slide";

import NewsCategoryOverlay from "../components/new-categories/NewsCategoryOverlay";
import ResetPassword from "../components/login/forgotPassword/ResetPassword";
import NewsCategories from "../components/new-categories/NewsCategories";
import WeatherWidget from "../components/weather-widget/WeatherWidget";
import ArticleCardList from "../components/articles/ArticleCardList";
import ArticleHero from "../components/articles/ArticleHero";
import { Backdrop, Modal } from "@mui/material";

import { GeneralCategoryEnum } from "../components/new-categories/newCategories.helpers";
import { ARTICLE_DUMMY_DATA } from "../data/ARTICLE_DUMMY_DATA";

import { navStore } from "../stores/navStore";
import { authStore } from "../stores/authStore";

const Home: React.FC = () => {
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

  const [activeCategory, setActiveCategory] =
    useState<GeneralCategoryEnum | null>(null);

  const isSlideOpen = navStore.get("isSlideOpen");

  const handleCategoryClick = (category: GeneralCategoryEnum | null) => {
    setActiveCategory(category);
    navStore.set("isSlideOpen", !!category);
  };

  return (
    <>
      <div className="w-full flex flex-col relative">
        <div className="h-[600px] flex">
          <ArticleHero />
          <NewsCategories handleCategoryClick={handleCategoryClick} />
          <Slide direction="left" in={isSlideOpen} mountOnEnter unmountOnExit>
            <div className="bg-gray-100 w-full h-full absolute z-[9999] overflow-y-scroll">
              <NewsCategoryOverlay
                handleCloseModal={() => handleCategoryClick(null)}
                category={activeCategory as GeneralCategoryEnum}
              />
            </div>
          </Slide>
        </div>
        <div className="w-full flex items-center">
          <ArticleCardList
            articles={ARTICLE_DUMMY_DATA.articles}
            listTitle="Trending"
            className="!w-[75%]"
            listContainerClassName="!w-full"
          />
          <WeatherWidget />
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
    </>
  );
};

export default Home;

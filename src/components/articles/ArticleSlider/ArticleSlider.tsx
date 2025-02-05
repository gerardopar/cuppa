import React from "react";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";

import ArticleSliderCard from "./ArticleSliderCard";

import { ARTICLE_DUMMY_DATA } from "../../../data/ARTICLE_DUMMY_DATA";

import "swiper/swiper-bundle.css";

export const ArticleSlider: React.FC = () => {
  const swiper = useSwiper();

  const articles = ARTICLE_DUMMY_DATA?.articles;

  return (
    <div className="w-full ml-4 mt-4 flex">
      <Swiper
        slidesPerView={4}
        spaceBetween={30}
        centeredSlides={false}
        className=""
      >
        {articles?.map((article) => {
          return (
            <SwiperSlide>
              <ArticleSliderCard article={article} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default ArticleSlider;

import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import ArticleSliderCard from "./ArticleSliderCard";

import { ARTICLE_DUMMY_DATA } from "../../../data/ARTICLE_DUMMY_DATA";

import { GeneralCategoryEnum } from "../../new-categories/newCategories.helpers";
import type { Swiper as SwiperType } from "swiper";

import "swiper/swiper-bundle.css";
import { ArrowBackOutlined, ArrowForwardOutlined } from "@mui/icons-material";

export const ArticleSlider: React.FC<{ category?: GeneralCategoryEnum }> = ({
  category,
}) => {
  const swiperRef = useRef<SwiperType>();
  const articles = ARTICLE_DUMMY_DATA?.articles;

  return (
    <>
      <div className="w-full flex items-center justify-between mt-[100px] px-4">
        <h1 className="relative text-gray-900 text-4xl font-bold font-montserrat w-[55%] line-clamp-2 z-20">
          {category}
        </h1>

        <div className="flex">
          <button
            className="bg-gray-100 w-[70px] h-[70px] cursor-pointer border-gray-200 border-solid border-2 hover:bg-white transition-all duration-[1s]"
            onClick={() => swiperRef.current?.slidePrev()}
          >
            <ArrowBackOutlined />
          </button>
          <button
            className="bg-gray-100 w-[70px] h-[70px] cursor-pointer border-gray-200 border-solid border-2 border-l-0 hover:bg-white transition-all duration-[1s]"
            onClick={() => swiperRef.current?.slideNext()}
          >
            <ArrowForwardOutlined />
          </button>
        </div>
      </div>

      <div className="w-full ml-4 mt-4 flex">
        <Swiper
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
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
    </>
  );
};

export default ArticleSlider;

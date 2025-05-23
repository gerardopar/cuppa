import React from "react";
import { useLocation, useNavigate } from "react-router";

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";

import "swiper/swiper-bundle.css";

import { newsCategories } from "../../react-query/helpers/news.helpers";
import { NewsCategoriesEnum } from "../../react-query/helpers/news.helpers";
import { getActiveCategory } from "./newCategories.helpers";
import { getCategoryRoute } from "./newCategories.helpers";

export const NewsCategorySwiper: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleCategoryClick = (category: NewsCategoriesEnum) => {
    navigate(getCategoryRoute(category));
  };

  return (
    <section className="w-full pt-[75px] overflow-x-hidden">
      <Swiper
        modules={[FreeMode]}
        slidesPerView="auto"
        spaceBetween={8}
        freeMode // enable flick-and-glide
        grabCursor // show grab/grabbing cursor
        className="!overflow-visible py-2"
      >
        {newsCategories.map((category) => {
          const isActive: boolean =
            category === getActiveCategory(location?.pathname, category);

          return (
            <SwiperSlide
              key={category}
              style={{ width: "auto", flexShrink: 0 }}
            >
              <button
                key={category}
                className={`rounded-full px-4 py-1 border-solid border-[2px] border-gray-100 mr-2 mb-2 capitalize cursor-pointer hover:bg-[var(--secondary-light)] hover:text-[var(--primary-light)] transition-all duration-300 ease-in-out ${
                  isActive
                    ? "bg-[var(--secondary-light)] border-[var(--secondary-light)] text-[var(--primary-light)]"
                    : ""
                }`}
                onClick={() => handleCategoryClick(category)}
              >
                {category}
              </button>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
};

export default NewsCategorySwiper;

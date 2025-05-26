import React, { useState } from "react";
import { Navigation } from "swiper/modules";
import moment from "moment";

import { Skeleton } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  EventOutlined,
  LocationOnOutlined,
} from "@mui/icons-material";

import { useGetLocalEvents } from "../../../react-query/queries/events";

import "swiper/swiper-bundle.css";

export const LocalEvents: React.FC = () => {
  const { data, isLoading, isFetching } = useGetLocalEvents();

  const events = data?.events?._embedded?.events || [];

  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  if (isLoading || isFetching) {
    return (
      <div className="w-full h-full bg-[var(--primary-dark)]/90 p-4 rounded-[24px] relative">
        <div className="w-full h-[50%] rounded-[16px] overflow-hidden relative">
          <Skeleton
            variant="rectangular"
            width="100%"
            height="100%"
            sx={{ bgcolor: "grey.300" }}
          />
        </div>

        <div className="w-full h-[50%] mt-4 space-y-3">
          <Skeleton
            variant="text"
            width="80%"
            height={24}
            sx={{ bgcolor: "grey.300" }}
          />
          <Skeleton
            variant="text"
            width="60%"
            height={18}
            sx={{ bgcolor: "grey.200" }}
          />
          <Skeleton
            variant="text"
            width="70%"
            height={18}
            sx={{ bgcolor: "grey.200" }}
          />
          <Skeleton
            variant="text"
            width="40%"
            height={18}
            sx={{ bgcolor: "grey.200" }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-[var(--primary-dark)]/90 p-4 rounded-[24px] relative">
      <button
        className={`btn-swiper-prev-events absolute left-[10px] top-[42%] z-[9999] bg-[var(--secondary-light)]/50 hover:bg-[var(--secondary-light)]/70 transition-all rounded-full h-[40px] w-[40px] max-h-[40px] max-w-[40px] min-h-[40px] min-w-[40px] flex items-center justify-center cursor-pointer text-white duration-500 ${
          isBeginning ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <ArrowLeftOutlined />
      </button>

      <button
        className={`btn-swiper-next-events absolute right-[10px] top-[42%] z-[9999] bg-[var(--secondary-light)]/50 hover:bg-[var(--secondary-light)]/70 transition-all rounded-full h-[40px] w-[40px] max-h-[40px] max-w-[40px] min-h-[40px] min-w-[40px] flex items-center justify-center cursor-pointer text-white duration-500 ${
          isEnd ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <ArrowRightOutlined />
      </button>

      <Swiper
        modules={[Navigation]}
        navigation={{
          nextEl: ".btn-swiper-next-events",
          prevEl: ".btn-swiper-prev-events",
        }}
        slidesPerView={1}
        spaceBetween={20}
        onSlideChange={(swiper) => {
          setIsBeginning(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
        }}
        onSwiper={(swiper) => {
          setIsBeginning(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
        }}
        className="w-full h-full px-2 relative"
      >
        {events.map((event, i) => {
          const image =
            event?.images?.find((img) => img?.width > 300)?.url ??
            event?.images?.[0]?.url;

          const hasTime =
            !event?.dates?.start?.timeTBA &&
            !event?.dates?.start?.noSpecificTime;

          const date = moment(event.dates.start.localDate); // e.g. "2025-05-28"

          const eventMonth = date.format("MMM"); // → "May"
          const eventDay = date.format("DD"); // → "28"
          const eventYear = date.format("YYYY"); // → "2025"
          const formattedTime = hasTime
            ? moment(event?.dates?.start?.localTime, "HH:mm:ss").format(
                "h:mm A"
              )
            : "Time TBD";

          return (
            <SwiperSlide key={event.id ?? i}>
              <div className="w-full h-full">
                <div className="w-full h-[50%] rounded-[16px] overflow-hidden relative">
                  <img
                    src={image}
                    alt={event?.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="w-full h-[50%] flex flex-col items-center justify-around">
                  <div className="w-full">
                    <p className="font-semibold text-white text-base line-clamp-2 w-full leading-[1.2]">
                      {event?.name}
                    </p>
                    <p className="mt-2 flex items-center text-sm text-white">
                      <EventOutlined className="text-white mr-2" />
                      {eventMonth} {eventDay}, {eventYear} - @{formattedTime}
                    </p>
                    <p className="mt-2 flex items-center text-sm text-white line-clamp-1 w-full">
                      <LocationOnOutlined className="text-white mr-2" />
                      {event?._embedded?.venues?.[0]?.name}
                    </p>
                  </div>

                  <a
                    href={event?.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center text-sm text-white border-solid border-[1px] border-white px-4 py-2 rounded-[20px] cursor-pointer hover:bg-white hover:text-[var(--primary-dark)] transition-all duration-300 ease-in-out text-center font-semibold w-full"
                  >
                    <span>View Details</span>
                  </a>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default LocalEvents;

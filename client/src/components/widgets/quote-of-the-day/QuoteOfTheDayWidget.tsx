import React from "react";

import { GavelOutlined } from "@mui/icons-material";
import { Skeleton } from "@mui/material";

import { useGetPoliticalQuoteWithImage } from "../../../react-query/queries/openAi";

// TODOS:
// # 1. add paginated list of quotes

export const QuoteOfTheDayWidget: React.FC<{ containerClassName?: string }> = ({
  containerClassName,
}) => {
  const {
    data: quoteWithImage,
    isLoading,
    isFetching,
  } = useGetPoliticalQuoteWithImage();

  if (isLoading || isFetching) {
    return (
      <div
        className={`w-full flex flex-col items-center justify-between bg-[var(--primary-dark)]/90 p-4 rounded-[20px] ${containerClassName}`}
      >
        <div className="w-full flex items-center justify-start">
          <div className="flex items-center justify-center rounded-[20px] h-[40px] w-[40px] overflow-hidden">
            <Skeleton
              variant="circular"
              width={40}
              height={40}
              sx={{ bgcolor: "grey.800" }}
            />
          </div>
          <div className="flex items-center justify-center rounded-full h-[40px] w-[40px] overflow-hidden ml-[-12px]">
            <Skeleton
              variant="circular"
              width={40}
              height={40}
              sx={{ bgcolor: "grey.700" }}
              className="z-10"
            />
          </div>
        </div>

        <div className="w-full flex items-center justify-start mt-4">
          <Skeleton
            variant="text"
            width="80%"
            height={20}
            sx={{ bgcolor: "grey.800" }}
          />
        </div>

        <div className="w-full flex items-center justify-start mt-4">
          <Skeleton
            variant="text"
            width="40%"
            height={16}
            sx={{ bgcolor: "grey.700" }}
          />
        </div>
      </div>
    );
  }

  return (
    <div
      className={`flex flex-col items-center justify-between bg-[var(--primary-dark)]/90 p-4 rounded-[20px] ${containerClassName}`}
    >
      <div className="w-full flex items-center justify-start">
        <div className="flex items-center justify-center rounded-[20px] h-[40px] w-[40px] overflow-hidden border-solid border-[1px] border-white">
          <GavelOutlined className="text-white" />
        </div>
        <div className="flex items-center justify-center rounded-full h-[40px] w-[40px] overflow-hidden ml-[-12px] border-solid border-[1px] border-white">
          <img src={quoteWithImage?.image} alt="" />
        </div>
      </div>

      <div className="w-full flex items-center justify-start mt-4">
        <p className="text-[14px] font-bold text-white">
          {quoteWithImage?.quote}
        </p>
      </div>

      <div className="w-full flex items-center justify-start mt-4">
        <p className="text-xs font-bold text-gray-100">
          {quoteWithImage?.author}
        </p>
      </div>
    </div>
  );
};

export default QuoteOfTheDayWidget;

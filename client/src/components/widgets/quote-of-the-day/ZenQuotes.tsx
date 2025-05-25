import React, { useEffect, useMemo, useState } from "react";

import UserEmptyPlaceholder from "../../../assets/images/user-empty-placeholder.png";
import { SelfImprovementOutlined } from "@mui/icons-material";
import { Skeleton } from "@mui/material";

import { useGetZenQuotes } from "../../../react-query/queries/zenQuotes";
import { getRandomShortZenQuote } from "./quote.helpers";

// TODOS:
// # 1. add paginated list of zen quotes

export const ZenQuotesWidget: React.FC<{ containerClassName?: string }> = ({
  containerClassName,
}) => {
  const { data: zenQuotes, isLoading, isFetching } = useGetZenQuotes();

  const zenQuote = useMemo(() => {
    return getRandomShortZenQuote(70, zenQuotes?.quotes ?? []);
  }, [zenQuotes]);

  const [imgSrc, setImgSrc] = useState(zenQuote?.i ?? "");

  useEffect(() => {
    setImgSrc(zenQuote?.i ?? "");
  }, [zenQuote]);

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
          <SelfImprovementOutlined className="text-white" />
        </div>

        <div className="flex items-center justify-center rounded-full h-[40px] w-[40px] overflow-hidden ml-[-12px] border-solid border-[1px] border-white">
          <img
            src={imgSrc}
            alt="article img"
            onError={() => setImgSrc(UserEmptyPlaceholder)}
          />
        </div>
      </div>

      <div className="w-full flex items-center justify-start mt-4">
        <p className="text-[14px] font-bold text-white">{zenQuote?.q ?? ""}</p>
      </div>

      <div className="w-full flex items-center justify-start mt-4">
        <p className="text-xs font-bold text-gray-100">{zenQuote?.a ?? ""}</p>
      </div>
    </div>
  );
};

export default ZenQuotesWidget;

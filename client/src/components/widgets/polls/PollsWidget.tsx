import React from "react";

import PresidentPlaceholder from "../../../assets/images/pres-placeholder.jpg";

import {
  ApprovalOutlined,
  ArrowForward,
  TrendingDownOutlined,
  TrendingUpOutlined,
} from "@mui/icons-material";
import { Skeleton } from "@mui/material";

import { useGetPolls } from "../../../react-query/queries/polls";

// TODOS:
// # 1. add paginated list of polls

export const PollsWidget: React.FC<{ containerClassName?: string }> = ({
  containerClassName,
}) => {
  const { data, isLoading, isFetching } = useGetPolls({
    poll_type: "approval",
  });

  const poll = data?.[0]; // get latest approval poll

  const approve =
    poll?.answers.find((a) => a.choice.toLowerCase().includes("approve"))
      ?.pct ?? 0;

  const disapprove =
    poll?.answers.find((a) => a.choice.toLowerCase().includes("disapprove"))
      ?.pct ?? 0;

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
      className={`w-full flex flex-col items-center justify-between bg-[var(--primary-dark)]/90 pt-4 px-4 pb-1 rounded-[20px] ${containerClassName}`}
    >
      <div className="flex items-center-safe justify-between w-full">
        <div className="w-full flex items-center justify-start">
          <div className="flex items-center justify-center rounded-[20px] h-[40px] w-[40px] min-h-[40px] min-w-[40px] overflow-hidden border-solid border-[1px] border-white">
            <ApprovalOutlined className="text-white" />
          </div>
          <div className="flex items-center bg-white justify-center rounded-full h-[40px] w-[40px] min-h-[40px] min-w-[40px] overflow-hidden ml-[-12px] border-solid border-[1px] border-white">
            <img src={PresidentPlaceholder} alt="approval poll" />
          </div>
        </div>

        <a
          href={poll?.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center rounded-[20px] h-[40px] w-[40px] min-h-[40px] min-w-[40px] overflow-hidden border-solid border-[1px] border-white text-white hover:bg-white hover:text-[var(--primary-dark)] cursor-pointer transition-all duration-300 ease-in-out"
        >
          <ArrowForward />
        </a>
      </div>

      <div className="w-full flex flex-col items-center justify-start pb-4">
        <div className="w-full">
          <div className="flex items-center justify-between text-xs font-medium text-white">
            <span className="flex items-center">
              <TrendingUpOutlined className="mr-1" fontSize="small" />
              {approve}%
            </span>
            <span className="flex items-center">
              <TrendingDownOutlined className="mr-1" fontSize="small" />
              {disapprove}%
            </span>
          </div>

          <div className="relative w-full h-1 mt-2 rounded-full bg-[var(--secondary-light)]/50 overflow-hidden shadow-sm">
            <div
              className="absolute left-0 top-0 h-full rounded-full bg-[#1ABC9C]"
              style={{ width: `${approve}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PollsWidget;

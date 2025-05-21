import React from "react";

import { useGetPolls } from "../../../react-query/queries/polls";

export const PollsWidget: React.FC<{ containerClassName?: string }> = ({
  containerClassName,
}) => {
  const {
    data: polls,
    isLoading,
    isFetching,
  } = useGetPolls({
    poll_type: "approval",
  });

  console.log("polls", polls);

  return (
    <div
      className={`w-full flex flex-col items-center justify-between bg-[var(--primary-dark)]/90 p-4 rounded-[20px] ${containerClassName}`}
    ></div>
  );
};

export default PollsWidget;

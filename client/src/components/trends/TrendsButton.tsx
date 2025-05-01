import React, { useState } from "react";
import Skeleton from "@mui/material/Skeleton";

export const TrendsButtonSkeleton: React.FC<{ className?: string }> = ({
  className = "",
}) => {
  const [width] = useState(
    () => Math.floor(Math.random() * (160 - 80 + 1)) + 80
  );

  return (
    <Skeleton
      variant="rectangular"
      width={width}
      height={32}
      animation="wave"
      className={`rounded-full mr-2 mb-2 ${className}`}
    />
  );
};

export const TrendsButton: React.FC<{
  trend: string;
  onClick: () => void;
}> = ({ trend, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="rounded-full px-4 py-1 border-solid border-[2px] border-gray-100 mr-2 mb-2 capitalize cursor-pointer hover:bg-[var(--secondary-light)] hover:border-[var(--secondary-light)] hover:text-[var(--primary-light)] transition-all duration-300 ease-in-out"
    >
      {trend}
    </button>
  );
};

export default TrendsButton;

import React from "react";
import { getNewsLogo } from "../../pages/home/home-page.helpers";

export const NewsLogo: React.FC<{
  newsSource: string | null | undefined;
  className?: string;
}> = ({ newsSource, className }) => {
  const logo = getNewsLogo(newsSource);

  if (!logo) return <></>;

  return (
    <div
      className={`bg-white rounded-full flex items-center justify-center h-[40px] w-[40px] overflow-hidden text-center mr-4 ${className}`}
    >
      <img
        src={logo!}
        alt={`logo-${newsSource}`}
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default NewsLogo;

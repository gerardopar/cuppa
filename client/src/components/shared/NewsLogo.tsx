import React from "react";
import { getNewsLogo } from "../../react-query/helpers/news.helpers";

export const NewsLogo: React.FC<{
  newsSource: string | null | undefined;
  className?: string;
}> = ({ newsSource, className }) => {
  const logo = getNewsLogo(newsSource);

  if (!logo) return <></>;

  return (
    <div
      className={`bg-white rounded-full flex items-center justify-center h-[30px] w-[30px] min-h-[30px] min-w-[30px] overflow-hidden text-center mr-4 ${className}`}
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

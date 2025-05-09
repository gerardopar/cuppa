import React from "react";
import moment from "moment";

const PublishedDate: React.FC<{
  publishedAt: string;
  format?: string;
  className?: string;
}> = ({ publishedAt, format, className }) => {
  const publishDate = moment(publishedAt).format(format ?? "MMMM Do, YYYY");

  return (
    <p className={`text-xs text-gray-500 font-normal ${className}`}>
      {publishDate}
    </p>
  );
};

export default PublishedDate;

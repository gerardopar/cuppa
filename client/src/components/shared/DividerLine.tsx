import React from "react";

export const DividerLine: React.FC<{
  containerClassName?: string;
  lineClassName?: string;
}> = ({ containerClassName = "", lineClassName = "" }) => {
  return (
    <div
      className={`flex items-center justify-center w-full ${containerClassName}`}
    >
      <span className={`h-[1px] bg-gray-100 ${lineClassName}`} />
    </div>
  );
};

export default DividerLine;

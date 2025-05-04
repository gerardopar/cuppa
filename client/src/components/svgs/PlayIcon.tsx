import React from "react";

export const PlayIcon: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      fill="currentColor"
      viewBox="0 0 16 16"
    >
      <path d="M6.271 4.055a.5.5 0 0 0-.771.423v7.045a.5.5 0 0 0 .771.423l5.37-3.523a.5.5 0 0 0 0-.846l-5.37-3.522z" />
    </svg>
  );
};

export default PlayIcon;

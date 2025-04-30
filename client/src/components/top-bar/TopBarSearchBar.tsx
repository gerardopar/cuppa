import React from "react";
import { SearchOutlined } from "@mui/icons-material";

export const TopBarSearchBar: React.FC = () => {
  return (
    <div className="relative w-full max-w-md">
      <input
        type="text"
        placeholder="Search..."
        className="w-full pl-6 pr-4 py-[12px] bg-gray-100 text-gray-800 focus:outline-none focus:none focus:none rounded-full"
      />

      <div className="absolute inset-y-0 top-[50%] -translate-y-[50%] right-[5px] pointer-events-none rounded-full bg-[var(--secondary-light)] flex items-center justify-center w-[40px] h-[40px]">
        <SearchOutlined className="text-[var(--primary-light)]" />
      </div>
    </div>
  );
};

export default TopBarSearchBar;

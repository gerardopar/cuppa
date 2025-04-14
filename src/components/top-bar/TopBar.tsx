import React from "react";

import { SearchOutlined } from "@mui/icons-material";

export const TopBar: React.FC = () => {
  return (
    <header className="absolute top-0 left-0 w-full border-b-solid border-b-[1px] border-b-gray-100 bg-white z-10">
      <div className="p-4 w-full flex items-center justify-between">
        <h1 className="font-bold text-3xl">Trending News</h1>

        <div className="relative w-full max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <SearchOutlined className="text-gray-500" />
          </div>
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 focus:outline-none focus:none focus:none rounded-full"
          />
        </div>
      </div>
    </header>
  );
};

export default TopBar;

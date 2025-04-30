import React from "react";
import TopBarSearchBar from "./TopBarSearchBar";

export const TopBar: React.FC = () => {
  return (
    <header className="absolute top-0 left-0 w-full border-b-solid border-b-[1px] border-b-gray-100 bg-white z-10">
      <div className="p-4 w-full flex items-center justify-between">
        <h1 className="font-bold text-3xl">Trending News</h1>

        <TopBarSearchBar />
      </div>
    </header>
  );
};

export default TopBar;

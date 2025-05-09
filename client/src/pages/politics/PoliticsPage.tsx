import React from "react";

import NewsCategoryButtonList from "../../components/new-categories/NewsCategoryButtonList";
import TopBar from "../../components/top-bar/TopBar";

export const PoliticsPage: React.FC = () => {
  return (
    <div className="relative w-full h-full">
      <TopBar title="Politics" />
      <div className="w-full h-full p-8 overflow-y-scroll flex flex-col">
        <div className="w-full flex items-center justify-start">
          <NewsCategoryButtonList />
        </div>
      </div>
    </div>
  );
};

export default PoliticsPage;

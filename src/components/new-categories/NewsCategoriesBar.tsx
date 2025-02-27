import React from "react";

import NewspaperOutlinedIcon from "@mui/icons-material/NewspaperOutlined";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import BusinessCenterOutlinedIcon from "@mui/icons-material/BusinessCenterOutlined";
import DevicesOtherOutlinedIcon from "@mui/icons-material/DevicesOtherOutlined";
import SportsFootballOutlinedIcon from "@mui/icons-material/SportsFootballOutlined";
import MovieOutlinedIcon from "@mui/icons-material/MovieOutlined";

import { GeneralCategoryEnum } from "./newCategories.helpers";

export const NewsCategoriesBar: React.FC<{
  handleCategoryClick: (category: GeneralCategoryEnum | null) => void;
}> = ({ handleCategoryClick }) => {
  const generalCategories: {
    id: number;
    title: string;
    IconComponent: React.ElementType;
    type: GeneralCategoryEnum;
  }[] = [
    {
      id: 1,
      title: "Breaking News",
      IconComponent: NewspaperOutlinedIcon,
      type: GeneralCategoryEnum.breakingNews,
    },
    {
      id: 2,
      title: "Politics",
      IconComponent: AccountBalanceOutlinedIcon,
      type: GeneralCategoryEnum.politics,
    },
    {
      id: 3,
      title: "Business",
      IconComponent: BusinessCenterOutlinedIcon,
      type: GeneralCategoryEnum.business,
    },
    {
      id: 4,
      title: "Technology",
      IconComponent: DevicesOtherOutlinedIcon,
      type: GeneralCategoryEnum.technology,
    },
    {
      id: 5,
      title: "Sports",
      IconComponent: SportsFootballOutlinedIcon,
      type: GeneralCategoryEnum.sports,
    },
    {
      id: 6,
      title: "Entertainment",
      IconComponent: MovieOutlinedIcon,
      type: GeneralCategoryEnum.entertainment,
    },
  ];

  return (
    <div className="w-full mt-4">
      <div className="h-full w-full bg-gray-100 rounded-[12px]">
        <ul className="flex flex-wrap items-center justify-around">
          {generalCategories?.map((category, index) => {
            const { IconComponent, title, type } = category;

            return (
              <button
                key={index}
                className="flex flex-1 flex-col justify-center items-center px-4 py-[32px] cursor-pointer"
                onClick={() => handleCategoryClick(type)}
              >
                <IconComponent className="text-gray-600" />

                {title}
              </button>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default NewsCategoriesBar;

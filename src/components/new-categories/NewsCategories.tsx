import React from "react";

import NewspaperOutlinedIcon from "@mui/icons-material/NewspaperOutlined";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import BusinessCenterOutlinedIcon from "@mui/icons-material/BusinessCenterOutlined";
import DevicesOtherOutlinedIcon from "@mui/icons-material/DevicesOtherOutlined";
import SportsFootballOutlinedIcon from "@mui/icons-material/SportsFootballOutlined";
import MovieOutlinedIcon from "@mui/icons-material/MovieOutlined";

import { GeneralCategoryEnum } from "./newCategories.helpers";

export const NewsCategories: React.FC<{
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
    <div className="w-[25%] pt-4 h-full">
      <h1 className="px-4 relative text-gray-900 text-4xl font-bold font-montserrat w-[55%] line-clamp-2 z-20">
        Discover
      </h1>

      <div className="w-full h-full mt-[35px]">
        <ul className="flex flex-wrap">
          {generalCategories?.map((category, index) => {
            const { IconComponent, title, type } = category;

            return (
              <button
                key={index}
                className="w-[50%] flex flex-col justify-center items-center px-4 py-[60px] odd:border-r-2 odd:border-gray-100 border-b-2 border-gray-100 nth-[5]:border-b-transparent nth-[6]:border-b-transparent hover:bg-gray-200 transition-all duration-[.5s] cursor-pointer"
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

export default NewsCategories;

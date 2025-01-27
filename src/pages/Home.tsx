import React from "react";
import moment from "moment";

import { ARTICLE_DUMMY_DATA } from "../data/ARTICLE_DUMMY_DATA";

import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";

const ARTICLE_DATA = ARTICLE_DUMMY_DATA?.articles;

const Home: React.FC = () => {
  const article = ARTICLE_DATA?.[0];

  const publishDate = moment(article.publishedAt).format("MMMM Do, YYYY");

  return (
    <div className="w-full">
      <div
        className="w-[80%] h-[600px] relative bg-center bg-cover p-20"
        style={{
          backgroundImage: `url(${article.urlToImage})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent z-10" />
        <div className="h-full flex flex-col items-start justify-between">
          {/* Text */}
          <h1 className="relative text-white text-4xl font-bold font-montserrat w-[55%] line-clamp-2 z-20">
            {article?.title}
          </h1>

          <div className="relative flex items-center">
            <p className="text-white font-light text-lg font-roboto z-20">
              {article?.source?.name}{" "}
            </p>
            <span className="bg-blue-600 text-white rounded-full h-[25px] w-[25px] flex items-center justify-center mx-2 mt-[1px] z-20">
              <CheckOutlinedIcon fontSize="small" />
            </span>
            <p className="text-white font-light text-sm font-roboto z-20">
              {publishDate}
            </p>
          </div>
        </div>
      </div>
      <div className="w-[20%]"></div>
    </div>
  );
};

export default Home;

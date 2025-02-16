import React from "react";

import {
  EditOutlined,
  KeyboardArrowRightOutlined,
  LogoutOutlined,
} from "@mui/icons-material";
import CloseButton from "../shared/CloseButton";
import { useGetCurrentUserById } from "../../react-query/queries/user";

export const UserProfile: React.FC<{ handleCloseModal: () => void }> = ({
  handleCloseModal,
}) => {
  const { data, isLoading } = useGetCurrentUserById();

  console.log("data", data);

  return (
    <div className="flex items-center justify-center h-full bg-transparent shadow-sm relative">
      <div className="bg-white w-full max-w-[375px] flex items-center justify-center flex-col bg-transparent z-10 px-4 py-6 rounded-[12px] relative">
        <CloseButton
          iconSize="small"
          className="bg-gray-200 w-[40px] h-[40px] absolute top-0 right-0 cursor-pointer"
          handleCloseModal={handleCloseModal}
        />
        <h4 className="text-gray-900 text-xl font-semibold font-montserrat">
          Profile
        </h4>
        <div className="relative">
          <div className="flex items-center justify-center overflow-hidden w-[80px] h-[80px] rounded-full mt-6 relative border-gray-100 border-solid border-2 border-gray-100">
            <img
              src="https://flomaster.top/uploads/posts/2022-12/1672490333_flomaster-club-p-betmen-risunok-detskii-instagram-1.jpg"
              alt="user thumb"
              className="object-fit"
            />
          </div>
          <button className="flex items-center justify-center absolute bg-gray-200 rounded-full p-[2px] top-[25px] right-[-12px] opacity-90 border-gray-100 border-solid border-2 border-gray-100 cursor-pointer">
            <EditOutlined className="text-gray-900" />
          </button>
        </div>
        <div className="mt-2 flex items-center justify-center">
          <h3 className="text-gray-900 text-2xl font-semibold font-montserrat">
            The Batman
          </h3>
        </div>

        <div className="mt-4 flex items-center justify-center w-full border-t-solid border-t-2 border-gray-100 border-b-solid border-b-2 border-gray-100">
          <div className="w-full flex items-center justify-center ">
            <button
              type="button"
              className="text-gray-500 w-full p-2 text-sm flex flex-col items-center justify-center border-r-solid border-r-2 border-gray-100 hover:bg-gray-100 transition-all duration-[.5s] cursor-pointer"
            >
              <span className="font-bold text-lg text-gray-900">10</span>
              Favorited
            </button>
            <button
              type="button"
              className="text-gray-500 w-full p-2 text-sm flex flex-col items-center justify-center hover:bg-gray-100 transition-all duration-[.5s] cursor-pointer"
            >
              <span className="font-bold text-lg text-gray-900">5</span>
              Pinned
            </button>
          </div>
        </div>

        <div className="items-center justify-center w-full">
          <button
            type="button"
            className="w-full flex items-center justify-between py-4 border-gray-100 border-b-solid border-b-2 border-gray-100 text-gray-900 text-base cursor-pointer font-medium"
          >
            Account Settings{" "}
            <span>
              <KeyboardArrowRightOutlined className="text-gray-500" />
            </span>
          </button>
          <button
            type="button"
            className="w-full flex items-center justify-center py-2 mt-[32px] cursor-pointer rounded-[12px] border-solid border-2 border-gray-100 hover:bg-gray-100 hover:border-gray-100"
          >
            Logout <LogoutOutlined className="ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;

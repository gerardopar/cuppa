import React, { useRef } from "react";

import CloseButton from "../shared/CloseButton";
import { CircularProgress } from "@mui/material";
import LogoutButton from "../shared/LogoutButton";
import { ProfilePicture } from "../shared/ProfilePicture";
import { EditOutlined, KeyboardArrowRightOutlined } from "@mui/icons-material";

import userStore from "../../stores/userStore";

import { useUploadProfilePicture } from "../../react-query/mutations/user";

export const UserProfile: React.FC<{ handleCloseModal: () => void }> = ({
  handleCloseModal,
}) => {
  const fileInputRef = useRef(null);
  const user = userStore.useTracked("user");

  const { mutateAsync: uploadImage, isPending } = useUploadProfilePicture();

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event?.target?.files?.[0];
    if (!file) return;
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      const { user: updatedUser } = await uploadImage(formData);

      userStore.set("user", { ...updatedUser });
    }
  };

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
          <div className="flex items-center justify-center overflow-hidden w-[80px] h-[80px] rounded-full mt-6 relative border-gray-100 border-solid border-2 border-gray-100 bg-gray-200">
            {isPending && (
              <div className="absolute flex items-center justify-center overflow-hidden w-full h-full rounded-full border-gray-100 bg-gray-100/40 blur-1 text-gray-800 top-0 backdrop-blur-[2px]">
                <CircularProgress
                  variant="indeterminate"
                  color="inherit"
                  size="30px"
                />
              </div>
            )}

            <ProfilePicture user={user} />
          </div>
          {!isPending && (
            <>
              <button
                onClick={() => {
                  fileInputRef?.current?.click();
                }}
                className="flex items-center justify-center absolute bg-gray-200 rounded-full p-[2px] top-[25px] right-[-12px] opacity-90 border-gray-100 border-solid border-2 border-gray-100 cursor-pointer"
              >
                <EditOutlined className="text-gray-900" />
              </button>

              <input
                ref={fileInputRef}
                type="file"
                onChange={handleFileUpload}
                className="hidden"
              />
            </>
          )}
        </div>
        <div className="mt-2 flex items-center justify-center">
          <h3 className="text-gray-900 text-2xl font-semibold font-montserrat capitalize">
            {user?.name}
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
          <LogoutButton handleCloseModal={handleCloseModal} />
        </div>
      </div>
    </div>
  );
};

export default UserProfile;

import React from "react";

import { LogoutOutlined } from "@mui/icons-material";

import userStore from "../../stores/userStore";

const LogoutButton: React.FC<{ handleCloseModal?: () => void }> = ({
  handleCloseModal,
}) => {
  const handleLogout = () => {
    userStore.store.setState({
      user: null,
      token: "",
    });

    handleCloseModal?.();
  };

  return (
    <button
      type="button"
      className="w-full flex items-center justify-center py-2 mt-[32px] cursor-pointer rounded-[12px] border-solid border-2 border-gray-100 hover:bg-gray-100 hover:border-gray-100"
      onClick={handleLogout}
    >
      Logout <LogoutOutlined className="ml-2" />
    </button>
  );
};

export default LogoutButton;

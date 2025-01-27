import React from "react";
import { NavLink, Link, useNavigate } from "react-router";

import Logo from "../../assets/images/itl-logo-black.png";

export const SideNav: React.FC = () => {
  const navigate = useNavigate();

  // logo
  // home
  // favorites / bookmarked
  // search
  // profile
  // settings

  return (
    <nav className="w-[100px] bg-gray-100 flex items-center justify-start flex-col pt-8">
      <div>
        <img src={Logo} className="h-auto w-[50px]" />
      </div>
    </nav>
  );
};

export default SideNav;

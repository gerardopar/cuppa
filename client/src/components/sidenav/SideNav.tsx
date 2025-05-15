import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router";

import { Slide, Backdrop, Modal } from "@mui/material";
import Logo from "../../assets/images/cuppa-app-icon.png";
import UserProfile from "../user-profile/UserProfile";
import Login from "../login/Login";

import { navStore } from "../../stores/navStore";
import { userStore } from "../../stores/userStore";

import { routes } from "./sidenav.helpers";

export const SideNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isLoggedIn = userStore.useTracked("token");

  const [activeRoute, setActiveRoute] = useState<string>("");

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleNavigation = (route: string) => navigate(route);

  const isSlideOpen = navStore.useTracked("isSlideOpen");

  const handleCloseModal = () => setIsModalOpen(false);

  useEffect(() => {
    setActiveRoute(location.pathname);
  }, [location.pathname]);

  return (
    <>
      <nav className="w-[120px] min-w-[120px] max-w-[120px] h-[100vh] bg-gray-100 relative rounded-tr-[24px] rounded-br-[32px]">
        <Slide direction="down" in={isSlideOpen} mountOnEnter unmountOnExit>
          <div className="w-full h-full bg-black/30 z-10 absolute top-0 left-0" />
        </Slide>
        <ul className="w-full h-full flex items-center justify-start flex-col pt-8">
          <li
            className="py-8 px-4"
            color="text-red-300"
            onClick={() => handleNavigation("/")}
          >
            {" "}
            <img src={Logo} className="h-auto w-[60px] rounded-full" />
          </li>

          {routes.map((route) => {
            const { Icon, path, id } = route;
            if (path === "/profile")
              return (
                <button
                  key={id}
                  type="button"
                  className={`py-8 px-4 cursor-pointer ${
                    isModalOpen ? "text-gray-900" : "text-gray-600"
                  }`}
                  onClick={() => setIsModalOpen(true)}
                >
                  <Icon />
                </button>
              );

            return (
              <NavLink
                key={id}
                to={route.path}
                className={`py-8 px-4 ${
                  activeRoute === route.path ? "text-gray-900" : "text-gray-600"
                }`}
                onClick={() => handleNavigation(route.path)}
              >
                <Icon />
              </NavLink>
            );
          })}
        </ul>
      </nav>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={isModalOpen}
        onClose={handleCloseModal}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
        className="bg-transparent"
      >
        {isLoggedIn ? (
          <UserProfile handleCloseModal={handleCloseModal} />
        ) : (
          <Login handleCloseModal={handleCloseModal} />
        )}
      </Modal>
    </>
  );
};

export default SideNav;

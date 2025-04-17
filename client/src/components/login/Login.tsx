import React, { useState } from "react";

import Signup from "../signup/Signup";
import CloseButton from "../shared/CloseButton";
import Logo from "../../assets/images/cuppa-app-icon.png";
import ForgotPassword from "./forgotPassword/ForgotPassword";
import { VisibilityOffOutlined, VisibilityOutlined } from "@mui/icons-material";

import { useLoginUser } from "../../react-query/mutations/auth";

import userStore from "../../stores/userStore";

import { LoginStateValidator, LoginViewModeEnum } from "./login.helpers";
import { Alert } from "@mui/material";

export const Login: React.FC<{ handleCloseModal: () => void }> = ({
  handleCloseModal,
}) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPW, setShowPW] = useState<boolean>(false);

  const [errors, setErrors] = useState<{ [key: string]: string[] }>({});

  const [activeViewMode, setActiveViewMode] = useState<LoginViewModeEnum>(
    LoginViewModeEnum.login
  );

  const { set } = userStore;

  const { mutateAsync: loginUser, isPending, error } = useLoginUser();

  const validate = () => {
    const parsedData = LoginStateValidator.safeParse({
      email,
      password,
    });

    if (parsedData.success) {
      setErrors({});
      return true;
    }

    if (parsedData.error) {
      setErrors(parsedData?.error?.flatten()?.fieldErrors);
    }

    return false;
  };

  const handleSubmit = async () => {
    if (validate()) {
      const { token, user } = await loginUser({
        email,
        password,
      });

      set("user", user);
      set("token", token);

      handleCloseModal();
    }
  };

  if (activeViewMode === LoginViewModeEnum.signup) {
    return <Signup handleCloseModal={handleCloseModal} />;
  } else if (activeViewMode === LoginViewModeEnum.forgotPassword) {
    return <ForgotPassword handleCloseModal={handleCloseModal} />;
  }

  return (
    <div className="flex items-center justify-center h-full bg-transparent shadow-sm relative">
      <div className="bg-white w-full max-w-[375px] flex items-center justify-center flex-col bg-transparent z-10 px-4 pt-6 pb-8 rounded-[12px] relative">
        <CloseButton
          iconSize="small"
          className="bg-gray-200 w-[40px] h-[40px] absolute top-0 right-0 cursor-pointer"
          handleCloseModal={handleCloseModal}
        />

        <div className="relative">
          <div className="flex shadow-sm items-center justify-center overflow-hidden w-[120px] h-[120px] rounded-full mt-6 relative border-gray-100 border-solid border-2 border-gray-100">
            <img src={Logo} alt="app logo" className="object-fit" />
          </div>
        </div>
        <div className="mt-2 flex flex-col items-center justify-center">
          <h3 className="text-gray-900 text-2xl font-extralight font-montserrat text-center">
            Welcome Back To
          </h3>
          <h2 className="text-gray-900 text-3xl font-bold font-montserrat text-center">
            Cuppa
          </h2>
        </div>

        {error && (
          <div className="w-full flex items-center justify-center mt-4">
            <Alert
              variant="outlined"
              severity="error"
              className="w-full !rounded-[12px]"
            >
              {error?.message}
            </Alert>
          </div>
        )}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className="w-full flex flex-col items-center justify-start mt-2"
        >
          <div className="flex flex-col items-center justify-start w-full mt-2">
            <label className="w-full text-left ml-2 text-xs text-gray-500">
              Email
            </label>
            <input
              type="text"
              placeholder="john@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full border-solid p-2 rounded-[12px] mt-[2px] focus:outline-none ${
                errors?.email
                  ? "border-red-400 border-1 focus:border-red-400"
                  : "border-gray-100 border-2 focus:border-gray-200"
              }`}
            />
            {errors?.email && (
              <p className="text-red-500 w-full text-left text-xs ml-2 mt-1">
                {errors?.email}
              </p>
            )}
          </div>

          <div className="flex flex-col items-center justify-start w-full mt-2 relative">
            <label className="w-full text-left ml-2 text-xs text-gray-500">
              Password
            </label>
            <input
              type={showPW ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full border-solid p-2 rounded-[12px] mt-[2px] focus:outline-none pr-8 ${
                errors?.password
                  ? "border-red-400 border-1 focus:border-red-400"
                  : "border-gray-100 border-2 focus:border-gray-200"
              }`}
            />
            {errors?.password && (
              <p className="text-red-500 w-full text-left text-xs ml-2 mt-1">
                {errors?.password}
              </p>
            )}
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setShowPW(!showPW);
              }}
              className="absolute right-[10px] top-[25px] text-gray-500"
            >
              {showPW ? (
                <VisibilityOutlined fontSize="small" />
              ) : (
                <VisibilityOffOutlined fontSize="small" />
              )}
            </button>
          </div>

          <div className="flex flex-col items-center justify-end w-full mt-2">
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setActiveViewMode(LoginViewModeEnum.forgotPassword);
              }}
              className="w-full text-right text-sm cursor-pointer"
            >
              Forgot Password?
            </button>
          </div>

          <div className="flex flex-col items-center justify-end w-full mt-8">
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setActiveViewMode(LoginViewModeEnum.signup);
              }}
              className="w-full text-center text-sm cursor-pointer"
            >
              Dont have an account?
            </button>

            <button
              disabled={isPending}
              onClick={handleSubmit}
              type="submit"
              className={`py-2 px-4 w-full rounded-[12px] mt-4 cursor-pointer ${
                isPending ? "bg-gray-300 text-white" : "bg-black text-white"
              }`}
            >
              {isPending ? "Loading..." : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

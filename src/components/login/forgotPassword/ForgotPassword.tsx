import React, { useState } from "react";
import { z } from "zod";

import Login from "../Login";
import CloseButton from "../../shared/CloseButton";
import Logo from "../../../assets/images/itl-logo-black.png";

import { LoginViewModeEnum } from "../login.helpers";

export const ForgotPasswordStateValidator = z.object({
  email: z.string().email("Invalid email address"),
});

export const ForgotPassword: React.FC<{ handleCloseModal: () => void }> = ({
  handleCloseModal,
}) => {
  const [email, setEmail] = useState<string>("");
  const [errors, setErrors] = useState<{ [key: string]: string[] }>({});

  const [activeViewMode, setActiveViewMode] = useState<LoginViewModeEnum>(
    LoginViewModeEnum.forgotPassword
  );

  const validate = () => {
    const parsedData = ForgotPasswordStateValidator.safeParse({
      email,
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
      //
    }
  };

  if (activeViewMode === LoginViewModeEnum.login) {
    return <Login handleCloseModal={handleCloseModal} />;
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
            Forgot Password?
          </h3>
        </div>

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

          <div className="flex flex-col items-center justify-end w-full mt-8">
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setActiveViewMode(LoginViewModeEnum.login);
              }}
              className="w-full text-center text-sm cursor-pointer"
            >
              Back to Login
            </button>

            <button
              onClick={handleSubmit}
              type="button"
              className="py-2 px-4 w-full bg-black text-white rounded-[12px] mt-4 cursor-pointer"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;

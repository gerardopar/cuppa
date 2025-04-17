import React, { useState } from "react";
import { z } from "zod";

import Login from "../Login";
import { Alert } from "@mui/material";
import CloseButton from "../../shared/CloseButton";
import Logo from "../../../assets/images/cuppa-app-icon.png";

import authStore from "../../../stores/authStore";

import { useResetPassword } from "../../../react-query/mutations/auth";

import { LoginViewModeEnum } from "../login.helpers";
import { VisibilityOffOutlined, VisibilityOutlined } from "@mui/icons-material";

export const ForgotPasswordStateValidator = z.object({
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(
      /[?!.@]/,
      "Password must contain at least one special character (?!.@)"
    )
    .regex(
      /^[A-Za-z0-9?!.@]+$/,
      "Password can only contain letters, numbers, and the special characters ?!.@"
    ),
});

export const ResetPassword: React.FC<{ handleCloseModal: () => void }> = ({
  handleCloseModal,
}) => {
  const token = authStore.get("resetToken");

  const [showPW, setShowPW] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");

  const [errors, setErrors] = useState<{ [key: string]: string[] }>({});

  const [activeViewMode, setActiveViewMode] = useState<LoginViewModeEnum>(
    LoginViewModeEnum.forgotPassword
  );

  const {
    mutateAsync: resetPasswordLink,
    isPending,
    isSuccess,
    error,
  } = useResetPassword();

  const validate = () => {
    const parsedData = ForgotPasswordStateValidator.safeParse({
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
      await resetPasswordLink({ newPassword: password, token });
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
            Reset Password
          </h3>
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
          <div className="flex flex-col items-center justify-start w-full mt-2 relative">
            {isSuccess ? (
              <Alert
                variant="outlined"
                severity="success"
                className="w-full !rounded-[12px]"
              >
                Password reset successfully!
              </Alert>
            ) : (
              <>
                <label className="w-full text-left ml-2 text-xs text-gray-500">
                  Password
                </label>
                <input
                  type={showPW ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full border-solid p-2 rounded-[12px] mt-[2px] focus:outline-none ${
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
              </>
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

            {!isSuccess && (
              <button
                onClick={handleSubmit}
                type="button"
                className={`py-2 px-4 w-full rounded-[12px] mt-4 cursor-pointer ${
                  isPending ? "bg-gray-300 text-white" : "bg-black text-white"
                }`}
              >
                {isPending ? "Loading..." : "Set New Password"}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;

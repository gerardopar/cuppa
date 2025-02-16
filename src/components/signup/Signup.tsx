import React, { useState } from "react";

import Login from "../login/Login";
import CloseButton from "../shared/CloseButton";
import Logo from "../../assets/images/itl-logo-black.png";

import { useRegisterUser } from "../../react-query/mutations/auth";

import userStore from "../../stores/userStore";

import {
  SignupErrorTypes,
  SignupStateValidator,
  SignupViewModeEnum,
} from "./signup.helpers";

export const Signup: React.FC<{ handleCloseModal: () => void }> = ({
  handleCloseModal,
}) => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [errors, setErrors] = useState<
    Partial<Record<SignupErrorTypes, string>>
  >({});

  const [activeViewMode, setActiveViewMode] = useState<SignupViewModeEnum>(
    SignupViewModeEnum.signup
  );

  const { set } = userStore;

  const { mutateAsync: registerUser } = useRegisterUser();

  const validate = (): boolean => {
    const parsedData = SignupStateValidator.safeParse({
      name,
      email,
      password,
      confirmPassword,
    });

    if (parsedData.success) {
      setErrors({});
      return true;
    }

    if (parsedData.error) {
      const flattenedErrors = parsedData.error.flatten().fieldErrors;

      const formattedErrors: Partial<Record<SignupErrorTypes, string>> = {};

      for (const key in flattenedErrors) {
        if (flattenedErrors[key as SignupErrorTypes]) {
          formattedErrors[key as SignupErrorTypes] =
            flattenedErrors[key as SignupErrorTypes]?.join(", ");
        }
      }

      setErrors(formattedErrors);
    }

    return false;
  };

  const handleSubmit = async () => {
    if (validate()) {
      const { token, user } = await registerUser({
        name,
        email,
        password,
      });

      set("user", user);
      set("token", token);

      handleCloseModal();
    }
  };

  if (activeViewMode === SignupViewModeEnum.login) {
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
            Welcome To
          </h3>
          <h2 className="text-gray-900 text-3xl font-bold font-montserrat text-center">
            In The Loop
          </h2>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className="w-full flex flex-col items-center justify-start mt-2"
        >
          <div className="flex flex-col items-center justify-start w-full">
            <label className="w-full text-left ml-2 text-xs text-gray-500">
              Name
            </label>
            <input
              type="text"
              placeholder="john"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`w-full  border-solid  p-2 rounded-[12px] mt-[2px] focus:outline-none ${
                errors?.name
                  ? "border-red-400 border-1 focus:border-red-400"
                  : "border-gray-100 border-2 focus:border-gray-200"
              }`}
            />
            {errors?.name && (
              <p className="text-red-500 w-full text-left text-xs ml-2 mt-1">
                {errors?.name}
              </p>
            )}
          </div>
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

          <div className="flex flex-col items-center justify-start w-full mt-2">
            <label className="w-full text-left ml-2 text-xs text-gray-500">
              Password
            </label>
            <input
              type="password"
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
          </div>

          <div className="flex flex-col items-center justify-start w-full mt-2">
            <label className="w-full text-left ml-2 text-xs text-gray-500">
              Set Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`w-full border-solid p-2 rounded-[12px] mt-[2px] focus:outline-none ${
                errors?.confirmPassword
                  ? "border-red-400 border-1 focus:border-red-400"
                  : "border-gray-100 border-2 focus:border-gray-200"
              }`}
            />
            {errors?.confirmPassword && (
              <p className="text-red-500 w-full text-left text-xs ml-2 mt-1">
                {errors?.confirmPassword}
              </p>
            )}
          </div>

          <div className="flex flex-col items-center justify-end w-full mt-8">
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setActiveViewMode(SignupViewModeEnum.login);
              }}
              className="w-full text-center text-sm cursor-pointer"
            >
              Already have an account?
            </button>
            <button
              onClick={handleSubmit}
              type="button"
              className="py-2 px-4 w-full bg-black text-white rounded-[12px] mt-6 cursor-pointer"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;

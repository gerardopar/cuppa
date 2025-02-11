import React, { useState } from "react";
import { z } from "zod";

import CloseButton from "../shared/CloseButton";
import Logo from "../../assets/images/itl-logo-black.png";

const SignupStateValidator = z
  .object({
    name: z.string().nonempty("Name is required"),
    email: z.string().email("Invalid email address"),
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
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export const Signup: React.FC<{ handleCloseModal: () => void }> = ({
  handleCloseModal,
}) => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const [errors, setErrors] = useState<{ [key: string]: string[] }>({});

  const validate = () => {
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
      setErrors(parsedData?.error?.flatten()?.fieldErrors);
    }

    return false;
  };

  const handleSubmit = () => {
    if (validate()) {
      // register here
    }
  };

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
                errors?.name
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

          <button
            onClick={handleSubmit}
            type="button"
            className="py-2 px-4 w-full bg-black text-white rounded-[12px] mt-6 cursor-pointer"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;

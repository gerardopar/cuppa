import { useMutation } from "@tanstack/react-query";

import axiosClient from "../../axios/axiosClient";

import { User } from "../../types/user";
import { getErrorMessage } from "../helpers/getErrorMessage";

type RegisterUserInput = { name: string; email: string; password: string };

export const useRegisterUser = () => {
  return useMutation<{ token: string; user: User }, Error, RegisterUserInput>({
    mutationFn: async ({ name, email, password }: RegisterUserInput) => {
      try {
        const response = await axiosClient.post<{ token: string; user: User }>(
          `/auth/register`,
          {
            name,
            email,
            password,
          }
        );

        return response.data;
      } catch (error: unknown) {
        return Promise.reject(new Error(getErrorMessage(error)));
      }
    },
  });
};

export const useLoginUser = () => {
  return useMutation<
    { token: string; user: User },
    Error,
    Partial<RegisterUserInput>
  >({
    mutationFn: async ({ email, password }: Partial<RegisterUserInput>) => {
      try {
        const response = await axiosClient.post<{ token: string; user: User }>(
          `/auth/login`,
          {
            email,
            password,
          }
        );

        return response.data;
      } catch (error: unknown) {
        return Promise.reject(new Error(getErrorMessage(error)));
      }
    },
  });
};

export const useGetResetPasswordLink = () => {
  return useMutation<
    { message: string; success: boolean },
    Error,
    { email: string }
  >({
    mutationFn: async ({ email }: { email: string }) => {
      try {
        const response = await axiosClient.post<{
          message: string;
          success: boolean;
        }>(`/auth/get-reset-password-link`, {
          email,
        });

        return response.data;
      } catch (error: unknown) {
        return Promise.reject(new Error(getErrorMessage(error)));
      }
    },
  });
};

export const useResetPassword = () => {
  return useMutation<
    { message: string; success: boolean },
    Error,
    { newPassword: string; token: string }
  >({
    mutationFn: async ({
      newPassword,
      token,
    }: {
      newPassword: string;
      token: string;
    }) => {
      try {
        const response = await axiosClient.post<{
          message: string;
          success: boolean;
        }>(`/auth/reset-password`, {
          newPassword,
          token,
        });

        return response.data;
      } catch (error: unknown) {
        return Promise.reject(new Error(getErrorMessage(error)));
      }
    },
  });
};

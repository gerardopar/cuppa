import { useMutation } from "@tanstack/react-query";

import axiosClient from "../../axios/axiosClient";

import { User } from "../../types/user";

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
      } catch (error) {
        return Promise.reject(new Error(error as string));
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
      } catch (error) {
        return Promise.reject(new Error(error as string));
      }
    },
  });
};

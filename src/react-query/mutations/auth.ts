import axios from "axios";
import { useMutation } from "@tanstack/react-query";

type RegisterUserInput = { name: string; email: string; password: string };

const apiBaseURL = `http://localhost:8080`;

export const useRegisterUser = () => {
  return useMutation<{ token: string }, Error, RegisterUserInput>({
    mutationFn: async ({ name, email, password }: RegisterUserInput) => {
      try {
        const response = await axios.post<{ token: string }>(
          `${apiBaseURL}/auth/register`,
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
  return useMutation<{ token: string }, Error, Partial<RegisterUserInput>>({
    mutationFn: async ({ email, password }: Partial<RegisterUserInput>) => {
      try {
        const response = await axios.post<{ token: string }>(
          `${apiBaseURL}/auth/login`,
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

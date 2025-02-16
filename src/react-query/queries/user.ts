import { useQuery } from "@tanstack/react-query";

import axiosClient from "../../axios/axiosClient";

import userStore from "../../stores/userStore";

import { User } from "../../types/user";

export const useGetUserById = (userId?: string) => {
  return useQuery<User | null, Error>({
    queryKey: ["getUser", userId],
    queryFn: async () => {
      if (!userId) throw new Error("User ID is required");

      const response = await axiosClient.get<{ user: User }>(
        `/user/get-user?userId=${userId}`
      );
      return response.data.user ?? null;
    },
    enabled: !!userId,
  });
};

export const useGetCurrentUserById = () => {
  const userId = userStore?.get("user")?.id;

  return useQuery<User | null, Error>({
    queryKey: ["getUser", userId],
    queryFn: async () => {
      if (!userId) throw new Error("User ID is required");

      const response = await axiosClient.get<{ user: User }>(
        `/user/get-user?userId=${userId}`
      );
      return response.data.user ?? null;
    },
    enabled: !!userId,
  });
};

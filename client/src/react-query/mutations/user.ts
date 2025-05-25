import { useMutation } from "@tanstack/react-query";

import axiosClient from "../../axios/axiosClient";

import { User } from "@shared/types/user";

export const useUploadProfilePicture = () => {
  return useMutation<{ user: User }, Error, FormData>({
    mutationFn: async (formData: FormData) => {
      try {
        const response = await axiosClient.post<{ user: User }>(
          `/user/upload-profile-picture`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        return response.data;
      } catch (error) {
        return Promise.reject(new Error(error as string));
      }
    },
  });
};

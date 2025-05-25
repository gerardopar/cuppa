import React from "react";
import { User } from "@shared/types/user";

export const ProfilePicture: React.FC<{
  user: User | undefined | null;
  placeHolderClassName?: string;
  imageClassName?: string;
}> = ({
  user,
  placeHolderClassName = "text-2xl",
  imageClassName = "object-fit",
}) => {
  const firstLetter = user?.name?.[0] ?? "?";

  if (!user?.picture) {
    return (
      <h4
        className={`font-roboto capitalize font-medium ${placeHolderClassName}`}
      >
        {firstLetter}
      </h4>
    );
  }

  return (
    <img src={user?.picture} alt="user thumb" className={`${imageClassName}`} />
  );
};

export default ProfilePicture;

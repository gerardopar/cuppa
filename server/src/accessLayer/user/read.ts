import { User } from "../../models/Users";

export const getUserById = async (userId?: string) => {
  try {
    const user = await User.findById(userId).select("-password");

    if (!user) return null;

    return user;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch user by ID");
  }
};

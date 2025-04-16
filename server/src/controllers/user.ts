import { Request, Response } from "express";

import { User } from "../models/Users";

import { getUserById } from "../accessLayer/user/read";

export const getUser = async (req: Request, res: Response): Promise<void> => {
  try {
    // Use userId from query params or fall back to userContext from the middleware
    const userId = (req.query.userId as string) || req.userContext?.id;

    if (!userId) {
      res.status(400).json({ message: "User ID is required." });
    }

    const user = await getUserById(userId);

    if (!user) {
      res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({ user });
  } catch (e) {
    console.error("Error fetching user:", e);
    res.status(500).json({ message: "Unable to get user." });
  }
};

export const uploadProfilePicture = async (
  req: Request,
  res: Response
): Promise<void> => {
  // Check that our upload middleware added the fileUrl
  // @ts-ignore
  if (!req.fileUrl) {
    res.status(400).json({ message: "File upload failed" });
    return;
  }

  const userId = req.userContext?.id;
  if (!userId) {
    res.status(401).json({ message: "Unauthorized: No user context" });
    return;
  }

  try {
    // Update the user's picture field with the new URL
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      // @ts-ignore
      { picture: req.fileUrl },
      { new: true }
    ).select("-password");

    if (!updatedUser) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json({
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error updating profile picture:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

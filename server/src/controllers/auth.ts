import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import { sendEmail } from "../email/nodemailer";

import { User } from "../models/Users";

const generateToken = (user: {
  id: string;
  name: string;
  email: string;
  picture?: string;
}): string => {
  return jwt.sign(
    { id: user.id, name: user.name, email: user.email, picture: user.picture }, // Add more data here
    process.env.JWT_SECRET_KEY as string,
    { expiresIn: "30d" }
  );
};

export const registerUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { email, password, name } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    user = new User({ email, password, name });
    await user.save();

    const token = generateToken({
      id: user.id,
      name: user.name,
      email: user.email,
      picture: user.picture,
    });

    res.status(201).json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        picture: user.picture,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ message: "Invalid credentials" });
      return;
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      res.status(400).json({ message: "Invalid credentials" });
      return;
    }

    const token = generateToken({
      id: user.id,
      name: user.name,
      email: user.email,
    });

    res.status(200).json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        picture: user.picture,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const requestResetPasswordLink = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ message: "Invalid Email" });
      return;
    }

    // Generate reset token valid for 5 minutes
    const resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY!, {
      expiresIn: "5m",
    });

    // Store token inside settings.password
    user.settings.password = {
      resetPasswordToken: resetToken,
      resetPasswordExpires: new Date(Date.now() + 5 * 60 * 1000), // 5 minutes from now
    };

    await user.save();

    // Send email with reset link
    const resetLink = `http://localhost:5173/?token=${encodeURIComponent(
      resetToken
    )}&resetPassword=true`;

    await sendEmail(
      user.email,
      "inTheLoop - Password Reset",
      `Click here to reset your password: ${resetLink}`
    );

    res
      .status(200)
      .json({ message: "Reset link sent to your email.", success: true });
  } catch (error) {
    console.error("Error requesting password reset:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const resetPassword = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { token, newPassword } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY!) as {
      id: string;
    };

    const user = await User.findOne({
      _id: decoded.id,
      "settings.password.resetPasswordToken": token,
      "settings.password.resetPasswordExpires": { $gt: new Date() },
    });

    if (!user) {
      res.status(400).json({ message: "Invalid or expired token" });
      return;
    }

    // Update password and remove reset token
    user.password = newPassword;
    user.settings.password = {}; // Clear password reset settings
    await user.save();

    res
      .status(200)
      .json({ message: "Password has been reset successfully", success: true });
  } catch (error) {
    console.error("Error resetting password:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

import { Router } from "express";

import { getUser, uploadProfilePicture } from "../controllers/user";

import { userContextMiddleware } from "../context/userContext";
import { upload, uploadToS3 } from "../middleware/uploadMiddleware";

const router = Router();

router.get("/get-user", getUser);

router.post(
  "/upload-profile-picture",
  userContextMiddleware, // Ensure the user is authenticated and req.userContext is available
  upload.single("file"), // Parse the file upload from the form field named "file"
  // @ts-ignore
  uploadToS3, // Upload the file to S3 and attach fileUrl to req
  uploadProfilePicture // Update the user's profile picture in the database
);

export default router;

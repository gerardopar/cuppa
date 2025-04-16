import multer from "multer";
import { Request, Response, NextFunction } from "express";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

import path from "path";
import crypto from "crypto";

// Configure AWS S3 client
const s3 = new S3Client({
  region: process.env.AWS_S3_BUCKET_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

const bucketName = process.env.AWS_S3_BUCKET_NAME!;

// Generate a random file name
const generateFileName = (originalName: string) => {
  const randomBytes = crypto.randomBytes(16).toString("hex");
  return `profile-pictures/${randomBytes}${path.extname(originalName)}`;
};

// Multer storage configuration (memory storage to pass buffer to S3)
const storage = multer.memoryStorage();

export const upload = multer({ storage });

export const uploadToS3 = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  try {
    const fileName = generateFileName(req.file.originalname);

    const uploadParams = {
      Bucket: bucketName,
      Key: fileName,
      Body: req.file.buffer,
      ContentType: req.file.mimetype,
    };

    // @ts-ignore
    await s3.send(new PutObjectCommand(uploadParams));

    // @ts-ignore
    req.fileUrl = `https://${bucketName}.s3.${process.env.AWS_S3_BUCKET_REGION}.amazonaws.com/${fileName}`;

    next();
  } catch (error) {
    console.error("S3 Upload Error:", error);
    res.status(500).json({ message: "File upload failed" });
  }
};

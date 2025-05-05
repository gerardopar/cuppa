import { Router } from "express";
import { getYtVideosByChannelID } from "../controllers/yt";

const router = Router();

router.get("/videos", getYtVideosByChannelID);

export default router;

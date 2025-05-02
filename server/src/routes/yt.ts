import { Router } from "express";
import { getBreakingNewsVideo } from "../controllers/yt";

const router = Router();

router.get("/videos", getBreakingNewsVideo);

export default router;

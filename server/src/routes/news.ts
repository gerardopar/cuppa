import { Router } from "express";
import { getNews } from "../controllers/news";

const router = Router();

router.get("/search", getNews);

export default router;

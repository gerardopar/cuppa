import { Router } from "express";
import { getNews, getTopHeadlines } from "../controllers/news";

const router = Router();

router.get("/search", getNews);
router.get("/top-headlines", getTopHeadlines);

export default router;

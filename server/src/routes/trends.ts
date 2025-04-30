import { Router } from "express";
import { getTrends } from "../controllers/trends";

const router = Router();

router.get("/daily", getTrends);

export default router;

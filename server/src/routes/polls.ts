import { Router } from "express";
import { getPolls } from "../controllers/polls";

const router = Router();

router.get("/get-polls", getPolls);

export default router;

import { Router } from "express";
import { getPoliticalQuoteWithImage } from "../controllers/openAi";

const router = Router();

router.get("/quote", getPoliticalQuoteWithImage);

export default router;

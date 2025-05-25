import { Router } from "express";

import { getZenQuotes } from "../controllers/zenQuotes";

const router = Router();

router.get("/get-quotes", getZenQuotes);

export default router;

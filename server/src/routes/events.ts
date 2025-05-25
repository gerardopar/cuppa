import { Router } from "express";

import { getLocalEvents } from "../controllers/events";

const router = Router();

router.get("/local", getLocalEvents);

export default router;

import { Router } from "express";
import { getRandomRecipes } from "../controllers/recipes";

const router = Router();

router.get("/random", getRandomRecipes);

export default router;
